import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({ product, index = 0 }) {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="product-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />

        <div className="product-overlay">
          <div className="product-name-overlay">{product.name}</div>
          <div className="product-description-overlay">
            {product.description}
          </div>
          <div className="product-price-overlay">
            {product.price.toLocaleString('ru-RU')} ₽
          </div>
          <div className="view-details">Посмотреть детали →</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
