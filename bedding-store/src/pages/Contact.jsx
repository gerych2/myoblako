import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Спасибо за ваше сообщение, ${formData.name}! Мы свяжемся с вами в ближайшее время.`)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1 className="contact-title">Свяжитесь с нами</h1>
        <p className="contact-subtitle">Мы всегда рады помочь</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Контактная информация</h2>
          
          <div className="info-item">
            <h3>Адрес</h3>
            <p>
              ул. Тверская, 123<br />
              Москва, 125009<br />
              Россия
            </p>
          </div>

          <div className="info-item">
            <h3>Телефон</h3>
            <p><a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
          </div>

          <div className="info-item">
            <h3>Email</h3>
            <p><a href="mailto:hello@oblako.ru">hello@oblako.ru</a></p>
          </div>

          <div className="info-item">
            <h3>Часы работы</h3>
            <p>
              Понедельник - Пятница: 9:00 - 18:00<br />
              Суббота: 10:00 - 16:00<br />
              Воскресенье: Выходной
            </p>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Напишите нам</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Имя *</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ваше имя"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Тема *</label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Чем мы можем помочь?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Сообщение *</label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Расскажите подробнее..."
              />
            </div>

            <button type="submit" className="submit-btn">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
