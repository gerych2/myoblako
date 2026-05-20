import { create } from 'zustand'

export const usePromoStore = create((set) => ({
  selectedColor: '#AFC6D4',
  neonColor: '#8FAFC2',
  material: 'Satin',
  price: 8990,
  colors: [
    { name: 'Sky Blue', hex: '#AFC6D4', neon: '#8FAFC2' },
    { name: 'Dusty Rose', hex: '#D4AFB9', neon: '#C28FA0' },
    { name: 'Sage Green', hex: '#B9D4AF', neon: '#A0C28F' },
    { name: 'Lavender', hex: '#C6AFD4', neon: '#AF8FC2' },
  ],
  materials: [
    { name: 'Satin', price: 8990 },
    { name: 'Washed Cotton', price: 7490 },
    { name: 'Tencel', price: 10990 },
  ],
  handleColorChange: (color) => set({ selectedColor: color.hex, neonColor: color.neon }),
  handleMaterialChange: (mat) => set({ material: mat.name, price: mat.price }),
}))
