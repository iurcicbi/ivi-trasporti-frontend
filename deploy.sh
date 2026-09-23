#!/usr/bin/env bash
# Deploy di ivi-trasporti-frontend su VPS (Contabo)
# Uso: sudo bash deploy.sh   (oppure eseguirlo come utente con sudo)
# Prerequisiti: git, apt/Ubuntu/Debian. DNS del dominio gia' puntato alla VPS.
set -euo pipefail

DOMAIN_PLACEHOLDER="esempio.it"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

MODE="${1:-deploy}"

SUDO=""
if [ "$(id -u)" != "0" ]; then
  if command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
  else
    echo "ERRORE: esegui come root oppure con sudo." >&2
    exit 1
  fi
fi

# Modalità rinnovo certificato (chiamata dal cron)
if [ "$MODE" = "renew" ]; then
  ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  source "$ROOT_DIR/.env"
  echo "==> Rinnovo certificato SSL..."
  $SUDO docker run --rm \
    -v "$ROOT_DIR/deploy/certbot/etc:/etc/letsencrypt" \
    -v "$ROOT_DIR/deploy/certbot/www:/var/www/certbot" \
    certbot/certbot renew --quiet
  $SUDO docker compose -f "$ROOT_DIR/docker-compose.yml" restart nginx
  echo "==> Fatto."
  exit 0
fi

echo "==> Verifica Docker..."
if ! command -v docker >/dev/null 2>&1; then
  echo "==> Installazione Docker + plugin Compose..."
  $SUDO apt-get update
  $SUDO apt-get install -y ca-certificates curl gnupg
  $SUDO install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | $SUDO gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  $SUDO chmod a+r /etc/apt/keyrings/docker.gpg
  # Rileva distro (Ubuntu/Debian)
  . /etc/os-release
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$ID $VERSION_CODENAME stable" | \
    $SUDO tee /etc/apt/sources.list.d/docker.list > /dev/null
  $SUDO apt-get update
  $SUDO apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  $SUDO systemctl enable --now docker || true
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "ERRORE: plugin docker-compose non disponibile." >&2
  exit 1
fi

echo "==> Verifica file .env..."
if [ ! -f .env ]; then
  cp deploy/env.example .env
  echo
  echo "Attenzione: creato il file .env con valori predefiniti."
  echo "Devi modificarlo prima di proseguire:"
  echo "  1. DOMAIN=<il tuo dominio>"
  echo "  2. CERTBOT_EMAIL=<email>"
  echo "  3. JWT_SECRET (genera con: openssl rand -hex 32)"
  echo "  4. ADMIN_PASSWORD=<password amministratore>"
  echo "  quindi rieseguire: sudo bash deploy.sh"
  exit 1
fi

source .env

if [ -z "${DOMAIN:-}" ] || [ "$DOMAIN" = "$DOMAIN_PLACEHOLDER" ]; then
  echo "ERRORE: imposta DOMAIN nel file .env" >&2
  exit 1
fi
if [ -z "${JWT_SECRET:-}" ]; then
  echo "ERRORE: imposta JWT_SECRET nel file .env" >&2
  exit 1
fi
if [ -z "${CERTBOT_EMAIL:-}" ]; then
  echo "ERRORE: imposta CERTBOT_EMAIL nel file .env" >&2
  exit 1
fi

mkdir -p deploy/certbot/www deploy/certbot/etc

# FASE 1: nginx su HTTP (per ACME challenge di Let's Encrypt)
echo "==> Configurazione nginx (HTTP) per ACME..."
export DOMAIN
if ! command -v envsubst >/dev/null 2>&1; then
  $SUDO apt-get install -y gettext-base >/dev/null
fi
envsubst '${DOMAIN}' < deploy/nginx-http.conf.template > deploy/nginx.conf

echo "==> Build e avvio container (frontend, backend, mongo, nginx)..."
$SUDO docker compose up -d --build

sleep 5

# FASE 2: rilascio certificato Let's Encrypt
CERT_DIR="deploy/certbot/etc/live/$DOMAIN"
if [ ! -f "$CERT_DIR/fullchain.pem" ]; then
  echo "==> Rilascio certificato SSL per $DOMAIN..."
  $SUDO docker run --rm \
    -v "$ROOT_DIR/deploy/certbot/etc:/etc/letsencrypt" \
    -v "$ROOT_DIR/deploy/certbot/www:/var/www/certbot" \
    certbot/certbot certonly \
      --webroot -w /var/www/certbot \
      -d "$DOMAIN" \
      --email "$CERTBOT_EMAIL" \
      --agree-tos --no-eff-email --keep
else
  echo "==> Certificato gia' presente, aggiorno configurazione HTTPS..."
fi

# FASE 3: passa nginx a HTTPS
echo "==> Configurazione nginx (HTTPS)..."
envsubst '${DOMAIN}' < deploy/nginx-https.conf.template > deploy/nginx.conf
$SUDO docker compose restart nginx

# Rinnovo automatico certificato (cron giornaliero)
DEPLOY_SCRIPT="$ROOT_DIR/deploy.sh"
CRON_LINE="@daily $DEPLOY_SCRIPT renew >/dev/null 2>&1"
if ! crontab -l 2>/dev/null | grep -qF "$DEPLOY_SCRIPT"; then
  echo "==> Aggiunta attività di rinnovo certificato al cron..."
  ( crontab -l 2>/dev/null | grep -vF "$DEPLOY_SCRIPT"; echo "$CRON_LINE" ) | crontab - || true
fi

echo
echo "===================================================="
echo " Deploy completato!"
echo " Sito:     https://$DOMAIN"
echo " Admin:    https://$DOMAIN/admin/login"
echo " API:      https://$DOMAIN/api/health"
echo "===================================================="
echo
echo "Per creare l'utente amministratore esegui:"
echo "  $SUDO docker compose exec backend node create-admin.js <email> <password>"
echo "(oppure usa la password impostata in ADMIN_PASSWORD se già inizializzato)"
echo