"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/api';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = await loginAdmin(email, password);
      localStorage.setItem('admin_token', token);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-lg py-xl">
      <div className="w-full max-w-2xl mx-auto bg-surface-container-lowest rounded-3xl p-10 md:p-12 lg:p-16 border border-outline-variant/20 shadow-xl">
        <div className="text-center mb-xl">
          <span className="material-symbols-outlined text-primary text-6xl mb-md">admin_panel_settings</span>
          <h1 className="text-headline-xl font-headline-xl text-primary">Admin CMS</h1>
          <p className="text-body-lg text-on-surface-variant mt-sm">Accedi per gestire i contenuti</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-xl">
          <div className="space-y-md">
            <label className="text-label-lg font-label-lg text-outline uppercase">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border-2 border-outline-variant rounded-2xl p-md outline-none focus:border-primary transition-colors text-body-md"
              placeholder="admin@ivitrasporti.it"
              required
            />
          </div>
          <div className="space-y-md">
            <label className="text-label-lg font-label-lg text-outline uppercase">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border-2 border-outline-variant rounded-2xl p-md outline-none focus:border-primary transition-colors text-body-md"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="bg-error-container/10 text-error text-body-lg p-lg rounded-2xl">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-md rounded-2xl font-headline-md text-headline-md hover:bg-primary-container transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
        <div className="mt-xl text-center">
          <a href="/" className="text-body-lg text-primary hover:underline font-bold">← Torna al sito</a>
        </div>
      </div>
    </div>
  );
}
