import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import CheckoutProgress from '../components/CheckoutProgress'
import './CartPage.css'

function CartPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, clearCart } = useApp()
  const [isCheckout, setIsCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  })

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Спасибо за ваш заказ, ${formData.name}! Мы свяжемся с вами по телефону ${formData.phone}`)
    setFormData({ name: '', phone: '', address: '', comment: '' })
    clearCart()
    navigate('/')
  }

  if (cart.length === 0 && !isCheckout) {
    return (
      <div className="cart-page">
        <div className="cart-empty-state">
          <div className="empty-icon">🛏️</div>
          <h1>Ваша корзина пуста</h1>
          <p>Добавьте что-нибудь прекрасное из нашей коллекции</p>
          <Link to="/" className="continue-shopping-btn">
            Перейти к покупкам
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <CheckoutProgress currentStep={isCheckout ? 2 : 1} />
      
      {!isCheckout ? (
        <>
          <div className="cart-header-section">
            <h1>Корзина</h1>
            <p className="cart-subtitle">{cart.length} {cart.length === 1 ? 'товар' : 'товара'}</p>
          </div>

          <div className="cart-content-grid">
            <div className="cart-items-section">
              {cart.map(item => (
                <div key={item.cartId} className="cart-item-card">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    
                    <div className="cart-item-options">
                      <div className="cart-item-option">
                        <span className="option-label">Цвет:</span>
                        <span className="option-value">{item.selectedColor}</span>
                      </div>
                      <div className="cart-item-option">
                        <span className="option-label">Размер:</span>
                        <span className="option-value">{item.selectedSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-item-price">
                      {(item.price * (item.quantity || 1)).toLocaleString('ru-RU')} ₽
                    </div>
                    
                    <div className="quantity-selector">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cartId, -1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity || 1}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cartId, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Итого</h2>
                
                <div className="summary-row">
                  <span>Товары ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)})</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                
                <div className="summary-row">
                  <span>Доставка</span>
                  <span className="free-text">Бесплатно</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-total">
                  <span>Итого к оплате</span>
                  <span className="total-amount">{total.toLocaleString('ru-RU')} ₽</span>
                </div>

                <button 
                  className="checkout-button"
                  onClick={() => setIsCheckout(true)}
                >
                  Оформить заказ
                </button>

                <Link to="/" className="continue-link">
                  ← Продолжить покупки
                </Link>
              </div>

              <div className="benefits-card">
                <div className="benefit-item">
                  <span className="benefit-icon">🚚</span>
                  <div>
                    <h4>Бесплатная доставка</h4>
                    <p>По всей России</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">↩️</span>
                  <div>
                    <h4>Возврат 30 дней</h4>
                    <p>Без вопросов</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <div>
                    <h4>Гарантия качества</h4>
                    <p>Сертифицировано</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="checkout-section">
          <button className="back-to-cart" onClick={() => setIsCheckout(false)}>
            ← Вернуться в корзину
          </button>

          <div className="checkout-grid">
            <div className="checkout-form-section">
              <h1>Оформление заказа</h1>
              
              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Контактная информация</h3>
                  
                  <div className="form-field">
                    <label htmlFor="name">Полное имя *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Телефон *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Адрес доставки</h3>
                  
                  <div className="form-field">
                    <label htmlFor="address">Адрес *</label>
                    <textarea
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Улица, дом, квартира, город, индекс"
                      rows="3"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="comment">Комментарий к заказу</label>
                    <textarea
                      id="comment"
                      value={formData.comment}
                      onChange={(e) => setFormData({...formData, comment: e.target.value})}
                      placeholder="Особые пожелания"
                      rows="2"
                    />
                  </div>
                </div>

                <button type="submit" className="place-order-btn">
                  Подтвердить заказ — {total.toLocaleString('ru-RU')} ₽
                </button>
              </form>
            </div>

            <div className="checkout-summary">
              <div className="order-summary-card">
                <h3>Ваш заказ</h3>
                
                <div className="order-items">
                  {cart.map(item => (
                    <div key={item.cartId} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.selectedSize}</p>
                        <span className="order-item-qty">× {item.quantity || 1}</span>
                      </div>
                      <div className="order-item-price">
                        {(item.price * (item.quantity || 1)).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary-totals">
                  <div className="summary-row">
                    <span>Товары</span>
                    <span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="summary-row">
                    <span>Доставка</span>
                    <span className="free-text">Бесплатно</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-total">
                    <span>Итого</span>
                    <span>{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
