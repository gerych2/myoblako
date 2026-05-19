import { createContext, useContext, useState, useEffect } from 'react'
import * as analytics from '../utils/analytics'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export function AppProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('myoblako-cart')
    return saved ? JSON.parse(saved) : []
  })

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('myoblako-cart', JSON.stringify(cart))
  }, [cart])

  // Cart functions
  const addToCart = (product, selectedColor, selectedSize) => {
    const cartItem = {
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
      cartId: `${product.id}-${selectedColor}-${selectedSize}-${Date.now()}`
    }
    setCart([...cart, cartItem])
    
    // Analytics
    analytics.trackAddToCart(product)
    
    // Show notification
    showNotification('Товар добавлен в корзину', 'success')
  }

  const removeFromCart = (cartId) => {
    const item = cart.find(i => i.cartId === cartId)
    if (item) {
      analytics.trackRemoveFromCart(item)
    }
    setCart(cart.filter(item => item.cartId !== cartId))
    showNotification('Товар удален из корзины', 'info')
  }

  const updateQuantity = (cartId, change) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = (item.quantity || 1) + change
        if (newQuantity <= 0) return null
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(Boolean))
  }

  const clearCart = () => {
    setCart([])
  }

  // Notification state
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    notification,
    showNotification
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
