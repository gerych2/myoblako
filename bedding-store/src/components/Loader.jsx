import { useEffect, useState } from 'react'
import './Loader.css'

function Loader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-logo">
          <span className="loader-my">MY</span>
          <span className="loader-oblako">OBLAKO</span>
        </div>
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loader-text">Загружаем роскошь...</p>
      </div>
    </div>
  )
}

export default Loader
