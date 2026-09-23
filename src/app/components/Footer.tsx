"use client";

import Link from "next/link";
import { useContent } from "@/lib/useContent";

export default function Footer() {
  const { get } = useContent("globale");

  const logoText = get("logo_text", "IVI Trasporti");
  const logoSrc = get("logo_img_src", "");
  // Usa il rewrite di Next.js invece di costruire l'URL manualmente
  const logoUrl = logoSrc?.startsWith("/uploads/")
    ? logoSrc  // Next.js gestirà il rewrite automaticamente
    : logoSrc;

  const sedeTitle = get("footer_sede_title", "Sede Operativa");
  const sedeIndirizzo = get("footer_sede_indirizzo", "Via dell'Industria, 42");
  const sedeCitta = get("footer_sede_citta", "43122 Parma (PR)");
  const sedePaese = get("footer_sede_paese", "Italia");

  const contattiTitle = get("footer_contatti_title", "Contatti Diretti");
  const telefono = get("footer_telefono", "Tel: +39 0521 1234567");
  const email = get("footer_email", "Email: info@ivitrasporti.it");
  const pec = get("footer_pec", "PEC: ivitrasportisrls@pec.it");

  const legaliTitle = get("footer_legali_title", "Informazioni Legali");
  const piva = get("footer_piva", "P.IVA 01234567890");
  const rea = get("footer_rea", "REA: PR-123456");
  const privacyLabel = get("footer_privacy_label", "Privacy Policy");
  const privacyUrl = get("privacy_policy_url", "");
  const terminiLabel = get("footer_termini_label", "Cookie Policy");
  const cookieUrl = get("cookie_policy_url", "");

  const copyrightText = get("footer_copyright", "© 2024 IVI Trasporti S.r.l. - Parma, Italia - Tutti i diritti riservati.");
  const langLabel = get("footer_lang_label", "ITALIANO");
  const versionLabel = get("footer_version", "v2.1.0");

  return (
    <footer
      className="w-full bg-primary text-on-primary mb-[64px] md:mb-0"
      id="contact"
    >
      <div className="container mx-auto px-md py-xl">
        <div className="flex flex-col items-center text-center space-y-md">
          <Link href="/" className="flex items-center gap-xs mb-md">
              {/* <span
                className="material-symbols-outlined text-secondary-container text-headline-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span> */}

            {/* <span className="text-headline-md font-headline-md text-secondary-container font-bold tracking-tight">
              {logoText}
            </span> */}
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg w-full max-w-container-max text-left mb-xl justify-items-center">
            <div className="space-y-sm">
              <h5 className="font-label-md text-label-md text-white uppercase tracking-widest">
                {sedeTitle}
              </h5>
              <p className="font-body-md text-body-md text-on-primary/70">
                {sedeIndirizzo}
                <br />
                {sedeCitta}
                <br />
                {sedePaese}
              </p>
            </div>
            <div className="space-y-sm">
              <h5 className="font-label-md text-label-md text-white uppercase tracking-widest">
                {contattiTitle}
              </h5>
              <p className="font-body-md text-body-md text-on-primary/70">
                {telefono}
                <br />
                {email}
                <br />
                {pec}
              </p>
            </div>
            <div className="space-y-sm">
              <h5 className="font-label-md text-label-md text-white uppercase tracking-widest">
                {legaliTitle}
              </h5>
              <nav className="flex flex-col space-y-xs">
                <span className="font-body-md text-body-md text-on-primary/70">
                  {piva}
                </span>
                <span className="font-body-md text-body-md text-on-primary/70">
                  {rea}
                </span>
                {privacyUrl ? (
                  <a
                    className="font-body-md text-body-md text-on-primary/70 hover:text-secondary-container transition-colors"
                    href={privacyUrl}
                    target="_blank"
                  >
                    {privacyLabel}
                  </a>
                ) : (
                  <span className="font-body-md text-body-md text-on-primary/70">
                    {privacyLabel}
                  </span>
                )}
                {cookieUrl ? (
                  <a
                    className="font-body-md text-body-md text-on-primary/70 hover:text-secondary-container transition-colors"
                    href={cookieUrl}
                    target="_blank"
                  >
                    {terminiLabel}
                  </a>
                ) : (
                  <span className="font-body-md text-body-md text-on-primary/70">
                    {terminiLabel}
                  </span>
                )}
              </nav>
            </div>
          </div>
          <div className="w-full pt-md border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="font-label-sm text-label-sm text-on-primary/50">
              {copyrightText}
            </p>
            <div className="flex gap-md">
              <span className="font-label-sm text-label-sm text-on-primary/50 flex items-center gap-xs">
                <span className="material-symbols-outlined text-xs">language</span>
                {langLabel}
              </span>
              <span className="font-label-sm text-label-sm text-on-primary/50">
                {versionLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
