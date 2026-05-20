import React from 'react';
import { usePromoStore } from '../../store';

export default function Configurator() {
  const {
    colors,
    materials,
    selectedColor,
    material,
    price,
    handleColorChange,
    handleMaterialChange
  } = usePromoStore();

  return (
    <div className="pointer-events-auto bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-full max-w-sm">

      {/* Colors */}
      <div className="mb-6">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-sans">Color</h3>
        <div className="flex gap-3">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => handleColorChange(c)}
              className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                selectedColor === c.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50' : ''
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 font-sans">Material</h3>
        <div className="flex flex-col gap-2">
          {materials.map((m) => (
            <button
              key={m.name}
              onClick={() => handleMaterialChange(m)}
              className={`text-left px-4 py-3 rounded-lg transition-colors font-sans ${
                material === m.name
                  ? 'bg-white text-black font-medium'
                  : 'hover:bg-white/10 text-gray-300'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          <p className="text-sm text-gray-400 font-sans">Total</p>
          <p className="text-2xl font-serif">{price.toLocaleString('ru-RU')} ₽</p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 font-sans">
          Add to Cart
        </button>
      </div>

    </div>
  );
}
