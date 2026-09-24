"use client";

import { useState } from "react";

export default function ColorPreview() {
  const [showPreview, setShowPreview] = useState(false);
  
  if (!showPreview) {
    return (
      <button
        onClick={() => setShowPreview(true)}
        className="fixed bottom-20 right-4 bg-primary text-on-primary px-3 py-1 rounded text-xs z-50 opacity-50 hover:opacity-100"
        title="Anteprima Colori"
      >
         COLORI
      </button>
    );
  }

  const colors = [
    { name: 'Primary', bg: 'bg-primary', text: 'text-on-primary', desc: '#1976d2 - Blu Energico' },
    { name: 'Primary Container', bg: 'bg-primary-container', text: 'text-on-primary-container', desc: 'Azzurro Chiaro' },
    { name: 'Secondary', bg: 'bg-secondary', text: 'text-on-secondary', desc: '#ff8f00 - Arancione Vivace' },
    { name: 'Secondary Container', bg: 'bg-secondary-container', text: 'text-on-secondary-container', desc: 'Arancione Chiaro' },
    { name: 'Tertiary', bg: 'bg-tertiary', text: 'text-on-tertiary', desc: '#00acc1 - Teal Moderno' },
    { name: 'Surface', bg: 'bg-surface', text: 'text-on-surface', desc: 'Background Pulito' },
    { name: 'Surface Container', bg: 'bg-surface-container', text: 'text-on-surface', desc: 'Cards Eleganti' },
    { name: 'Error', bg: 'bg-error', text: 'text-on-error', desc: 'Rosso Sicuro' },
  ];

  return (
    <div className="fixed inset-4 bg-black bg-opacity-90 text-white p-4 rounded-lg overflow-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Anteprima Nuova Palette Colori</h2>
        <button
          onClick={() => setShowPreview(false)}
          className="bg-red-500 px-2 py-1 rounded text-xs"
        >
           Chiudi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {colors.map(color => (
          <div key={color.name} className={`${color.bg} ${color.text} p-4 rounded-lg`}>
            <div className="font-bold text-sm">{color.name}</div>
            <div className="text-xs opacity-80">{color.desc}</div>
            <div className="text-xs mt-2">Questo è un testo di esempio</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Nuova Palette Energica</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Primario:</strong> #1976d2
            <div className="text-xs text-gray-400">Blu Material energico e professionale</div>
          </div>
          <div>
            <strong>Secondario:</strong> #ff8f00  
            <div className="text-xs text-gray-400">Arancione vivace e dinamico</div>
          </div>
          <div>
            <strong>Terziario:</strong> #00acc1
            <div className="text-xs text-gray-400">Teal moderno e fresco</div>
          </div>
        </div>
      </div>

      {/* Esempi di componenti con i nuovi colori */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-bold mb-4">Esempi Componenti</h3>
        
        {/* Header Example */}
        <div className="bg-surface text-on-surface p-3 rounded mb-3 border border-outline-variant">
          <div className="flex justify-between items-center">
            <div className="text-primary font-bold">IVI Trasporti</div>
            <button className="bg-secondary text-on-secondary px-3 py-1 rounded">
              Contatti
            </button>
          </div>
        </div>

        {/* Button Examples */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <button className="bg-primary text-on-primary px-4 py-2 rounded font-medium">
             Blu Primario
          </button>
          <button className="bg-secondary text-on-secondary px-4 py-2 rounded font-medium">
             Arancione Vivace
          </button>
          <button className="bg-tertiary text-on-tertiary px-4 py-2 rounded font-medium">
             Teal Fresco
          </button>
          <button className="bg-primary-container text-on-primary-container px-4 py-2 rounded font-medium">
            Azzurro Container
          </button>
        </div>

        {/* Card Example */}
        <div className="bg-surface-container text-on-surface p-4 rounded-lg border border-outline-variant dynamic-shadow">
          <div className="text-primary font-bold mb-2">Servizio Trasporti Energico</div>
          <div className="text-on-surface-variant text-sm mb-3">
            La nuova palette trasmette energia, dinamismo e professionalità. Perfetta per un'azienda di trasporti moderna!
          </div>
          <div className="flex gap-2">
            <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-xs">
               Dinamico
            </span>
            <span className="bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded text-xs">
               Moderno
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
         Palette energica e moderna applicata! Ricarica per vedere i cambiamenti vivaci.
      </div>
    </div>
  );
}