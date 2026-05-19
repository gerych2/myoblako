import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Breadcrumbs from '../components/Breadcrumbs'
import './ProductDetail.css'

const products = [
  {
    id: 1,
    name: 'Полуночный сатин',
    price: 24900,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80'
    ],
    description: 'Египетский хлопок, 600 нитей',
    fullDescription: 'Погрузитесь в мир роскоши с нашим постельным бельем из египетского хлопка. Плотность 600 нитей обеспечивает невероятную мягкость и долговечность. Каждая ночь станет незабываемым опытом комфорта.',
    material: 'Сатин',
    colors: ['#AFC6D4', '#8FAFC2', '#9BB8C8'],
    colorNames: ['Небесный', 'Пыльный синий', 'Морской'],
    sizes: ['Евро', 'King Size', 'Семейный'],
    features: ['600 нитей', 'Египетский хлопок', 'Гипоаллергенно', 'Легкий уход']
  },
  {
    id: 2,
    name: 'Жемчужный шелк',
    price: 42900,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80'
    ],
    description: 'Натуральный шелк тутового дерева, 22 момми',
    fullDescription: 'Роскошь в чистом виде. Шелк тутового дерева 22 момми — это вершина качества. Естественная терморегуляция, гипоаллергенность и невероятная гладкость для вашей кожи.',
    material: 'Шелк',
    colors: ['#F7F6F2', '#FAF8F4', '#E8E6E1'],
    colorNames: ['Жемчужный', 'Молочный', 'Песочный'],
    sizes: ['Евро', 'King Size'],
    features: ['22 момми', 'Натуральный шелк', 'Терморегуляция', 'Для чувствительной кожи']
  },
  {
    id: 3,
    name: 'Бамбук люкс',
    price: 18900,
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80'
    ],
    description: 'Органическая бамбуковая вискоза, гипоаллергенно',
    fullDescription: 'Экологичный выбор для осознанных людей. Бамбуковая вискоза обладает антибактериальными свойствами, невероятно мягкая и дышащая. Идеально для любого сезона.',
    material: 'Бамбук',
    colors: ['#C7D7E2', '#AFC6D4', '#9BB8C8'],
    colorNames: ['Облачный', 'Небесный', 'Морской'],
    sizes: ['Евро', 'King Size', 'Семейный'],
    features: ['Органический бамбук', 'Антибактериальное', 'Дышащее', 'Экологично']
  },
  {
    id: 4,
    name: 'Облачный перкаль',
    price: 21900,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80'
    ],
    description: 'Итальянский перкаль, хрустящая отделка',
    fullDescription: 'Классика итальянского качества. Перкаль с хрустящей отделкой создает ощущение свежести каждую ночь. Долговечность и элегантность в одном комплекте.',
    material: 'Перкаль',
    colors: ['#E8E6E1', '#C7D7E2', '#AFC6D4'],
    colorNames: ['Песочный', 'Облачный', 'Небесный'],
    sizes: ['Евро', 'King Size'],
    features: ['Итальянский перкаль', 'Хрустящая текстура', 'Долговечное', 'Премиум качество']
  },
  {
    id: 5,
    name: 'Королевский жаккард',
    price: 38900,
    images: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80'
    ],
    description: 'Тканый жаккард, архитектурный узор',
    fullDescription: 'Искусство ткачества в каждой детали. Жаккардовый узор создает объемную текстуру, которая выглядит роскошно и ощущается божественно. Для тех, кто ценит эксклюзивность.',
    material: 'Жаккард',
    colors: ['#8FAFC2', '#9BB8C8', '#AFC6D4'],
    colorNames: ['Пыльный синий', 'Морской', 'Небесный'],
    sizes: ['Евро', 'King Size', 'Семейный'],
    features: ['Жаккардовое плетение', 'Объемный узор', 'Эксклюзивный дизайн', 'Ручная работа']
  },
  {
    id: 6,
    name: 'Натуральный лен',
    price: 28900,
    images: [
      'https://images.unsplash.com/photo-1615800001234-4c3c3b0b6f36?w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80'
    ],
    description: 'Французский лен, стиранный камнем',
    fullDescription: 'Французский лен — символ естественной элегантности. Стиранный камнем для мягкости, он становится только лучше с каждой стиркой. Идеален для теплого сезона.',
    material: 'Лен',
    colors: ['#FAF8F4', '#F7F6F2', '#E8E6E1'],
    colorNames: ['Молочный', 'Жемчужный', 'Песочный'],
    sizes: ['Евро', 'King Size'],
    features: ['Французский лен', 'Стиранный камнем', 'Дышащий', 'Натуральный']
  }
]

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      navigate('/')
    }
  }, [id, navigate])

  if (!product) return null

  const handleAddToCart = () => {
    addToCart(product, product.colorNames[selectedColor], product.sizes[selectedSize])
  }

  return (
    <div className="product-detail">
      <Breadcrumbs productName={product.name} />
      
      <button className="back-button" onClick={() => navigate('/')}>
        ← Назад к коллекции
      </button>

      <div className="product-detail-content">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-price">{product.price.toLocaleString('ru-RU')} ₽</div>

          <div className="product-full-description">
            {product.fullDescription}
          </div>

          <div className="product-features">
            {product.features.map((feature, index) => (
              <span key={index} className="feature-badge">{feature}</span>
            ))}
          </div>

          <div className="product-options-section">
            <div className="option-group">
              <h3>Цвет</h3>
              <div className="color-selector">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-choice ${selectedColor === index ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(index)}
                  >
                    <div className="color-swatch" style={{ backgroundColor: color }} />
                    <span className="color-name">{product.colorNames[index]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h3>Размер</h3>
              <div className="size-selector">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`size-choice ${selectedSize === index ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(index)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="add-to-cart-large" onClick={handleAddToCart}>
            Добавить в корзину — {product.price.toLocaleString('ru-RU')} ₽
          </button>

          <div className="product-info-blocks">
            <div className="info-block">
              <h4>Бесплатная доставка</h4>
              <p>По всей России при заказе от 15 000 ₽</p>
            </div>
            <div className="info-block">
              <h4>Возврат 30 дней</h4>
              <p>Если вам что-то не понравится</p>
            </div>
            <div className="info-block">
              <h4>Гарантия качества</h4>
              <p>Сертифицированные материалы</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
export { products }
