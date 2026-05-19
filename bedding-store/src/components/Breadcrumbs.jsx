import { Link, useLocation } from 'react-router-dom'
import './Breadcrumbs.css'

const routeNames = {
  '': 'Главная',
  'product': 'Товар',
  'cart': 'Корзина',
  'about': 'О нас',
  'contact': 'Контакты'
}

function Breadcrumbs({ productName }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  if (pathnames.length === 0) return null

  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumb-item">
        Главная
      </Link>
      
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        
        // If it's a product ID, show product name
        if (pathnames[index - 1] === 'product' && productName) {
          return (
            <span key={to} className="breadcrumb-item current">
              <span className="breadcrumb-separator">/</span>
              {productName}
            </span>
          )
        }
        
        // Skip numeric IDs
        if (!isNaN(value)) {
          return null
        }

        const name = routeNames[value] || value

        return isLast ? (
          <span key={to} className="breadcrumb-item current">
            <span className="breadcrumb-separator">/</span>
            {name}
          </span>
        ) : (
          <Link key={to} to={to} className="breadcrumb-item">
            <span className="breadcrumb-separator">/</span>
            {name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
