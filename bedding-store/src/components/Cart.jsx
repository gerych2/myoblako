import { useState } from 'react'
import './Cart.css'

function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity }) {
  const [isCheckout, setIsCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  })

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Спасибо за ваш заказ, ${formData.name}! Мы свяжемся с вами по телефону ${formData.phone}`)
    setIsCheckout(false)
    setFormData({ name: '', phone: '', address: '', comment: '' })
  }

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">
            {isCheckout ? 'Оформление заказа' : 'Корзина'}
          </h2>
          <button className="cart-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {!isCheckout ? (
          <>
            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="empty-icon">—</div>
                  <p>Корзина пуста</p>
                  <p className="empty-subtitle">Добавьте товары для начала</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.cartId} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <div className="cart-item-details">
                        <div className="cart-item-color" style={{ backgroundColor: item.selectedColor }} />
                        <span className="cart-item-size">{item.selectedSize}</span>
                      </div>
                      <div className="cart-item-price">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity || 1}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => onRemove(item.cartId)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span className="total-label">Итого</span>
                  <span className="total-amount">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={() => setIsCheckout(true)}
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="checkout-form-container">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="phone">Номер телефона *</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Адрес доставки *</label>
                <textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Улица, дом, квартира, город, индекс"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="comment">Примечания к заказу</label>
                <textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  placeholder="Особые пожелания по доставке"
                  rows="2"
                />
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Товаров</span>
                  <span>{items.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
                </div>
                <div className="summary-row">
                  <span>Доставка</span>
                  <span className="free-delivery">Бесплатно</span>
                </div>
                <div className="summary-row total-row">
                  <span>Итого</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setIsCheckout(false)}
                >
                  Назад
                </button>
                <button type="submit" className="submit-btn">
                  Оформить заказ
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart
