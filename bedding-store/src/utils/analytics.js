// Google Analytics Integration
// Замените 'G-XXXXXXXXXX' на ваш реальный ID Google Analytics

export const initGA = () => {
  // Проверяем, что мы в production и GA ID установлен
  const GA_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX'
  
  if (typeof window !== 'undefined' && GA_ID !== 'G-XXXXXXXXXX') {
    // Загружаем скрипт Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // Инициализируем gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_ID, {
      page_path: window.location.pathname,
    })
  }
}

// Отслеживание просмотров страниц
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX', {
      page_path: url,
    })
  }
}

// Отслеживание событий
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Специфичные события для e-commerce
export const trackAddToCart = (product) => {
  event({
    action: 'add_to_cart',
    category: 'E-commerce',
    label: product.name,
    value: product.price,
  })
}

export const trackRemoveFromCart = (product) => {
  event({
    action: 'remove_from_cart',
    category: 'E-commerce',
    label: product.name,
    value: product.price,
  })
}

export const trackPurchase = (total, items) => {
  event({
    action: 'purchase',
    category: 'E-commerce',
    label: `${items.length} items`,
    value: total,
  })
}

export const trackProductView = (product) => {
  event({
    action: 'view_item',
    category: 'E-commerce',
    label: product.name,
    value: product.price,
  })
}

export const trackSearch = (searchTerm) => {
  event({
    action: 'search',
    category: 'Engagement',
    label: searchTerm,
  })
}

export const trackAddToWishlist = (product) => {
  event({
    action: 'add_to_wishlist',
    category: 'Engagement',
    label: product.name,
  })
}

export const trackAddToCompare = (product) => {
  event({
    action: 'add_to_compare',
    category: 'Engagement',
    label: product.name,
  })
}
