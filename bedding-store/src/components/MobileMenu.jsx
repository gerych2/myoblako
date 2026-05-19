import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './MobileMenu.css'

function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  const { cart } = useApp()

  const handleLinkClick = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <span className="mobile-logo-my">MY</span>
            <span className="mobile-logo-oblako">OBLAKO</span>
          </div>
          <button className="mobile-menu-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="mobile-nav">
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <span className="mobile-nav-icon">🏠</span>
            Коллекция
          </Link>
          
          <Link 
            to="/about" 
            className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <span className="mobile-nav-icon">ℹ️</span>
            О нас
          </Link>
          
          <Link 
            to="/contact" 
            className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <span className="mobile-nav-icon">📧</span>
            Контакты
          </Link>

          <div className="mobile-nav-divider" />

          <Link 
            to="/cart" 
            className={`mobile-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            <span className="mobile-nav-icon">🛒</span>
            Корзина
            {cart.length > 0 && (
              <span className="mobile-nav-badge">{cart.length}</span>
            )}
          </Link>
        </nav>

        <div className="mobile-menu-footer">
          <p className="mobile-menu-tagline">Постельное белье премиум класса</p>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
