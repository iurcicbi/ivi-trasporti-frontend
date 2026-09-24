"use client";

import { useState } from "react";

type ColorPalette = {
  name: string;
  description: string;
  primary: string;
  secondary: string;
  tertiary: string;
  style: 'energic' | 'professional' | 'modern';
};

const palettes: ColorPalette[] = [
  {
    name: "Energica",
    description: "Blu energico + Arancione dinamico",
    primary: "#1976d2",
    secondary: "#ff8f00", 
    tertiary: "#00acc1",
    style: "energic"
  },
  {
    name: "Professionale",
    description: "Blu navy + Verde corporate", 
    primary: "#0d47a1",
    secondary: "#388e3c",
    tertiary: "#7b1fa2",
    style: "professional"
  },
  {
    name: "Moderna",
    description: "Indigo + Teal + Rosa accent",
    primary: "#3f51b5",
    secondary: "#009688",
    tertiary: "#e91e63",
    style: "modern"
  }
];

export default function ColorSelector() {
  const [showSelector, setShowSelector] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]);
  
  if (!showSelector) {
    return (
      <button
        onClick={() => setShowSelector(true)}
        className="fixed bottom-36 right-4 bg-purple-600 text-white px-3 py-1 rounded text-xs z-50 opacity-50 hover:opacity-100"
        title="Scegli Palette"
      >
         PALETTE
      </button>
    );
  }

  const applyPalette = (palette: ColorPalette) => {
    setSelectedPalette(palette);
    
    const cssVariables = generateCSSVariables(palette);
    
    // Applica le variabili CSS dinamicamente
    Object.entries(cssVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    // Salva la scelta nel localStorage
    localStorage.setItem('selectedPalette', JSON.stringify(palette));
    
    alert(`Palette "${palette.name}" applicata! Ricarica la pagina per vedere tutti i cambiamenti.`);
  };

  return (
    <div className="fixed inset-4 bg-black bg-opacity-90 text-white p-4 rounded-lg overflow-auto z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Scegli la Palette Colori</h2>
        <button
          onClick={() => setShowSelector(false)}
          className="bg-red-500 px-2 py-1 rounded text-xs"
        >
           Chiudi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {palettes.map((palette, index) => (
          <div 
            key={palette.name}
            className={`bg-gray-800 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPalette.name === palette.name 
                ? 'border-yellow-400 bg-gray-700' 
                : 'border-gray-600 hover:border-gray-400'
            }`}
            onClick={() => setSelectedPalette(palette)}
          >
            <div className="text-center mb-3">
              <h3 className="font-bold text-lg">{palette.name}</h3>
              <p className="text-sm text-gray-300">{palette.description}</p>
            </div>
            
            <div className="flex gap-2 mb-3 justify-center">
              <div 
                className="w-8 h-8 rounded-full border-2 border-white"
                style={{ backgroundColor: palette.primary }}
                title="Primario"
              />
              <div 
                className="w-8 h-8 rounded-full border-2 border-white"
                style={{ backgroundColor: palette.secondary }}
                title="Secondario"
              />
              <div 
                className="w-8 h-8 rounded-full border-2 border-white"
                style={{ backgroundColor: palette.tertiary }}
                title="Terziario"
              />
            </div>
            
            <div className="text-xs text-gray-400 text-center space-y-1">
              <div>{palette.primary}</div>
              <div>{palette.secondary}</div>
              <div>{palette.tertiary}</div>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                applyPalette(palette);
              }}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium"
            >
               Applica {palette.name}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Palette Attuale: {selectedPalette.name}</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Primario:</strong> {selectedPalette.primary}
            <div className="text-xs text-gray-400">Header, logo, bottoni principali</div>
          </div>
          <div>
            <strong>Secondario:</strong> {selectedPalette.secondary}
            <div className="text-xs text-gray-400">Accenti, CTA, highlight</div>
          </div>
          <div>
            <strong>Terziario:</strong> {selectedPalette.tertiary}
            <div className="text-xs text-gray-400">Dettagli, badge, icone</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
         Scegli la palette che meglio rappresenta l'energia della tua azienda!
      </div>
    </div>
  );
}

function generateCSSVariables(palette: ColorPalette) {
  // Genera automaticamente le variazioni tonali
  const lighten = (color: string, amount: number) => {
    // Semplificazione: in realtà dovresti usare una libreria per manipolare i colori
    return color;
  };
  
  return {
    '--color-primary': palette.primary,
    '--color-secondary': palette.secondary,
    '--color-tertiary': palette.tertiary,
    '--color-primary-container': palette.style === 'energic' ? '#bbdefb' : 
                                 palette.style === 'professional' ? '#e3f2fd' : '#c8e6c9',
    '--color-secondary-container': palette.style === 'energic' ? '#ffcc80' :
                                  palette.style === 'professional' ? '#c8e6c9' : '#b2dfdb',
    '--color-tertiary-container': palette.style === 'energic' ? '#80deea' :
                                 palette.style === 'professional' ? '#f3e5f5' : '#f8bbd9',
  };
}