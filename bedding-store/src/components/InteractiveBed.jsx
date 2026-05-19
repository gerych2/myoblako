import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './InteractiveBed.css'

function InteractiveBed({ product }) {
  const [selectedPart, setSelectedPart] = useState(null) // 'duvet', 'sheet', 'pillow'
  const [duvetColor, setDuvetColor] = useState('#FFFFFF')
  const [sheetColor, setSheetColor] = useState('#FFFFFF')
  const [pillowColor, setPillowColor] = useState('#FFFFFF')
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const navigate = useNavigate()
  const { addToCart } = useApp()

  const handlePartClick = (part, e) => {
    e.stopPropagation()
    setSelectedPart(selectedPart === part ? null : part)
  }

  const handleColorChange = (color) => {
    if (selectedPart === 'duvet') {
      setDuvetColor(color)
    } else if (selectedPart === 'sheet') {
      setSheetColor(color)
    } else if (selectedPart === 'pillow') {
      setPillowColor(color)
    }
  }

  const handleAddToCart = () => {
    const customProduct = {
      ...product,
      selectedColor: `Одеяло: ${duvetColor}, Простынь: ${sheetColor}, Подушки: ${pillowColor}`,
      customColors: { duvet: duvetColor, sheet: sheetColor, pillow: pillowColor }
    }
    addToCart(customProduct, duvetColor, selectedSize)
  }

  const getPartName = () => {
    if (selectedPart === 'duvet') return 'Одеяло'
    if (selectedPart === 'sheet') return 'Простынь'
    if (selectedPart === 'pillow') return 'Подушки'
    return ''
  }

  return (
    <div className="interactive-bed-container">
      <div className="bed-scene-realistic">
        {/* Фон комнаты */}
        <div className="room-background"></div>

        {/* Композиция кровати из реальных фото */}
        <div className="bed-composition">
          {/* Каркас кровати (база) */}
          <img 
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80" 
            alt="Кровать"
            className="bed-frame-image"
          />

          {/* Простынь (слой 1) */}
          <div 
            className={`bedding-layer sheet-layer ${selectedPart === 'sheet' ? 'selected' : ''}`}
            onClick={(e) => handlePartClick('sheet', e)}
          >
            <img 
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80" 
              alt="Простынь"
              className="bedding-image"
            />
            <div 
              className="color-overlay"
              style={{ backgroundColor: sheetColor, mixBlendMode: 'multiply', opacity: 0.6 }}
            ></div>
          </div>

          {/* Одеяло (слой 2) */}
          <div 
            className={`bedding-layer duvet-layer ${selectedPart === 'duvet' ? 'selected' : ''}`}
            onClick={(e) => handlePartClick('duvet', e)}
          >
            <img 
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&q=80" 
              alt="Одеяло"
              className="bedding-image"
            />
            <div 
              className="color-overlay"
              style={{ backgroundColor: duvetColor, mixBlendMode: 'multiply', opacity: 0.6 }}
            ></div>
          </div>

          {/* Подушки (слой 3) */}
          <div 
            className={`bedding-layer pillow-layer ${selectedPart === 'pillow' ? 'selected' : ''}`}
            onClick={(e) => handlePartClick('pillow', e)}
          >
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80" 
              alt="Подушки"
              className="bedding-image"
            />
            <div 
              className="color-overlay"
              style={{ backgroundColor: pillowColor, mixBlendMode: 'multiply', opacity: 0.6 }}
            ></div>
          </div>

          {/* Индикаторы выбора */}
          {selectedPart === 'sheet' && (
            <div className="selection-indicator sheet-indicator">
              <span>Простынь</span>
            </div>
          )}
          {selectedPart === 'duvet' && (
            <div className="selection-indicator duvet-indicator">
              <span>Одеяло</span>
            </div>
          )}
          {selectedPart === 'pillow' && (
            <div className="selection-indicator pillow-indicator">
              <span>Подушки</span>
            </div>
          )}
        </div>

        {/* Подсказка */}
        {!selectedPart && (
          <div className="hint-overlay">
            <div className="hint-box">
              <p className="hint-text">Нажмите на постельное белье, чтобы выбрать цвет</p>
              <div className="hint-arrows">
                <span className="hint-arrow">↑ Подушки</span>
                <span className="hint-arrow">↑ Одеяло</span>
                <span className="hint-arrow">↑ Простынь</span>
              </div>
            </div>
          </div>
        )}

        {/* Панель с выбором цвета */}
        {selectedPart && (
          <div className="color-panel-floating visible">
            <div className="color-panel-content">
              <div className="color-panel-header">
                <h3>{getPartName()}</h3>
                <button 
                  className="close-panel-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPart(null)
                  }}
                >
                  ✕
                </button>
              </div>
              
              <div className="color-options-grid">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-swatch-large ${
                      (selectedPart === 'duvet' && duvetColor === color) ||
                      (selectedPart === 'sheet' && sheetColor === color) ||
                      (selectedPart === 'pillow' && pillowColor === color)
                        ? 'active'
                        : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange(color)
                    }}
                    title={`Цвет ${index + 1}`}
                  />
                ))}
              </div>

              <div className="quick-colors">
                <p className="quick-colors-label">Популярные цвета:</p>
                <div className="quick-color-buttons">
                  <button 
                    className="quick-color-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange('#FFFFFF')
                    }}
                  >
                    Белоснежный
                  </button>
                  <button 
                    className="quick-color-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange('#F7F6F2')
                    }}
                  >
                    Кремовый
                  </button>
                  <button 
                    className="quick-color-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange('#E8E6E1')
                    }}
                  >
                    Бежевый
                  </button>
                  <button 
                    className="quick-color-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange('#AFC6D4')
                    }}
                  >
                    Небесный
                  </button>
                  <button 
                    className="quick-color-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange('#8FAFC2')
                    }}
                  >
                    Морской
                  </button>
                  <button 
                    className="quick-color-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleColorChange('#C7D7E2')
                    }}
                  >
                    Облачный
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Панель с деталями и кнопками */}
      <div className="details-panel-bottom">
        <div className="details-content">
          <div className="details-header">
            <div>
              <h3>{product.name}</h3>
              <p className="product-material">{product.material}</p>
            </div>
            <div className="product-price-large">
              {product.price.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          {/* Выбор размера */}
          <div className="option-group">
            <label className="option-label">Размер комплекта</label>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Характеристики */}
          <div className="features-list">
            {product.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Кнопки действий */}
          <div className="action-buttons">
            <button 
              className="btn-add-to-cart"
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </button>
            <button 
              className="btn-view-details"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveBed
