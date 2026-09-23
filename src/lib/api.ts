export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const API_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

export async function fetchContents(section?: string): Promise<Record<string, any>> {
  const url = section
    ? `${API_BASE}/contents?section=${section}`
    : `${API_BASE}/contents`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch contents');
  return res.json();
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export async function loginAdmin(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || 'Login fallito');
  return data.token;
}

export async function saveContents(updates: { key: string; value: any }[]): Promise<void> {
  const token = getToken();
  if (!token) throw new Error('Non autenticato');
  const res = await fetch(`${API_BASE}/contents/bulk`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ updates }),
  });
  if (!res.ok) throw new Error('Salvataggio fallito');
}

export const SECTIONS = [
  { id: 'globale', label: 'Globale (Header, Footer, Logo, Contatti)' },
  { id: 'home', label: 'Home Page' },
  { id: 'servizi', label: 'Servizi' },
  { id: 'chi-siamo', label: 'Chi Siamo' },
  { id: 'contatti', label: 'Contatti' },
] as const;
