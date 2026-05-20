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
import PromoPage from './pages/PromoPage'
import './App.css'

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    pageview(location.pathname + location.search)
  }, [location])

  return null
}

function MainLayout({ children }) {
  return (
    <div className="app">
      <Header />
      <Notification />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
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

        <Routes>
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
