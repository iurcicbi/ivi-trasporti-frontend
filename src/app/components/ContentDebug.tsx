"use client";

import { useContent } from "@/lib/useContent";
import { API_BASE } from "@/lib/api";
import { useState } from "react";

export default function ContentDebug() {
  const [showDebug, setShowDebug] = useState(false);
  const { content, loading, error } = useContent("globale");
  
  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded text-xs z-50 opacity-50 hover:opacity-100"
        title="Debug Contenuti"
      >
        🔍 DEBUG
      </button>
    );
  }

  const keys = Object.keys(content);
  const importantKeys = [
    'logo_text', 'logo_img_src', 'phone_number', 'phone_label',
    'footer_copyright', 'footer_sede_indirizzo', 'nav_home'
  ];

  return (
    <div className="fixed inset-4 bg-black bg-opacity-90 text-white p-4 rounded-lg overflow-auto z-50 text-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">🔍 Debug Contenuti Globali</h2>
        <button
          onClick={() => setShowDebug(false)}
          className="bg-red-500 px-2 py-1 rounded text-xs"
        >
          ✕ Chiudi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status */}
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-bold mb-2">📊 Status</h3>
          <div className="space-y-1 text-xs">
            <div>Loading: {loading ? '🔄 Sì' : '✅ No'}</div>
            <div>Error: {error ? `❌ ${error}` : '✅ Nessuno'}</div>
            <div>Contenuti caricati: {keys.length}</div>
            <div>API URL: {API_BASE}</div>
          </div>
        </div>

        {/* Rate Limit Debug */}
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-bold mb-2">⚡ Rate Limit & Cache</h3>
          <div className="space-y-1 text-xs">
            <div>Errori consecutivi: {error ? 'SÌ' : 'NO'}</div>
            <div>Cache attiva: SÌ (30s TTL)</div>
            <div>Rate limit dev: 500 req/15min</div>
            <button 
              onClick={() => {
                // Pulisce la cache per testare
                if (typeof window !== 'undefined') {
                  (window as any).contentCache = new Map();
                  window.location.reload();
                }
              }}
              className="mt-1 bg-orange-600 px-2 py-1 rounded text-xs"
            >
              🔄 Pulisci Cache
            </button>
          </div>
        </div>

        {/* Important Keys */}
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-bold mb-2">🔑 Chiavi Importanti</h3>
          <div className="space-y-1 text-xs">
            {importantKeys.map(key => {
              const value = content[key];
              const hasValue = value !== undefined && value !== null && value !== '';
              return (
                <div key={key} className="flex justify-between">
                  <span>{key}:</span>
                  <span className={hasValue ? 'text-green-400' : 'text-red-400'}>
                    {hasValue ? '✅ OK' : '❌ Vuoto'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image URLs Debug */}
        <div className="bg-gray-800 p-3 rounded">
          <h3 className="font-bold mb-2">🖼️ URLs Immagini</h3>
          <div className="space-y-1 text-xs">
            {Object.entries(content).map(([key, value]) => {
              if (key.includes('img_src') || key.includes('image')) {
                const displayValue = String(value);
                const isUploaded = displayValue.startsWith('/uploads/');
                return (
                  <div key={key} className="border-b border-gray-600 pb-1">
                    <div><strong>{key}:</strong></div>
                    <div className="ml-2 text-gray-300">{displayValue || '❌ Vuoto'}</div>
                    {isUploaded && (
                      <div className="ml-2 text-green-400">
                        ✅ Rewrite: /{displayValue.substring(1)}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            }).filter(Boolean)}
            {!Object.keys(content).some(k => k.includes('img_src')) && (
              <div className="text-red-400">Nessuna immagine configurata</div>
            )}
          </div>
        </div>

        {/* All Content */}
        <div className="bg-gray-800 p-3 rounded md:col-span-2 max-h-64 overflow-auto">
          <h3 className="font-bold mb-2">📋 Tutti i Contenuti</h3>
          {keys.length === 0 ? (
            <div className="text-red-400">
              ❌ Nessun contenuto trovato.
              <br />
              Vai su <strong>/admin/globale</strong> per configurare i contenuti.
            </div>
          ) : (
            <div className="text-xs space-y-1">
              {keys.map(key => (
                <div key={key} className="border-b border-gray-600 pb-1">
                  <strong>{key}:</strong> 
                  <span className="ml-2 text-gray-300">
                    {String(content[key]).substring(0, 100)}
                    {String(content[key]).length > 100 ? '...' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-gray-800 p-3 rounded md:col-span-2">
          <h3 className="font-bold mb-2">🛠️ Azioni Rapide</h3>
          <div className="flex gap-2 text-xs">
            <a
              href="/admin/login"
              className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
            >
              🔐 Admin Login
            </a>
            <a
              href="/admin/globale"
              className="bg-green-600 px-2 py-1 rounded hover:bg-green-700"
            >
              ⚙️ Configura Globale
            </a>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 px-2 py-1 rounded hover:bg-orange-700"
            >
              🔄 Ricarica Pagina
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}