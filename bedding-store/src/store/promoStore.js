import { create } from 'zustand'

export const usePromoStore = create((set) => ({
  selectedColor: '#AFC6D4',
  selectedMaterial: 'Страйп-сатин',
  colors: [
    { name: 'Cloud Blue', hex: '#AFC6D4' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Dusty Rose', hex: '#D2B4B4' },
  ],
  materials: ['Страйп-сатин', 'Вареный хлопок', 'Тенсель'],
  setSelectedColor: (color) => set({ selectedColor: color }),
  setSelectedMaterial: (material) => set({ selectedMaterial: material }),
}))
