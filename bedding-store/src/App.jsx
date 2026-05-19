import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { initGA, pageview } from './utils/analytics'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Notification from './components/Notification'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import './App.css'

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    pageview(location.pathname + location.search)
  }, [location])

  return null
}

function App() {
  useEffect(() => {
    initGA()
  }, [])

  return (
    <AppProvider>
      <Router>
        <AnalyticsTracker />
        <Loader />
        <div className="app">
          <Header />
          <Notification />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
