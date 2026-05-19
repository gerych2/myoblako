import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <span className="my">MY</span>
              <span className="oblako">OBLAKO</span>
            </h3>
            <p>
              Премиальное постельное белье для тех, кто ценит качество и комфорт. 
              Каждая ночь — это новое начало.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12c0-2.5 2-4.5 4.5-4.5S17 9.5 17 12c0 1.5-.5 2.5-1.5 3.5-.5.5-1 .5-1.5.5-.5 0-1-.5-1-1 0-.5.5-1 1-1s1 .5 1 1"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Магазин</h4>
            <ul className="footer-links">
              <li><Link to="/">Все товары</Link></li>
              <li><a href="#">Новинки</a></li>
              <li><a href="#">Хиты продаж</a></li>
              <li><a href="#">Распродажа</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Компания</h4>
            <ul className="footer-links">
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
              <li><a href="#">Вакансии</a></li>
              <li><a href="#">Блог</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Поддержка</h4>
            <ul className="footer-links">
              <li><a href="#">Доставка и возврат</a></li>
              <li><a href="#">Уход за изделиями</a></li>
              <li><a href="#">Таблица размеров</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 MYOBLAKO. Все права защищены.
          </p>
          <div className="footer-legal">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Условия использования</a>
            <a href="#">Политика cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
