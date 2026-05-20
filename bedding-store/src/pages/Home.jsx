import { useEffect, useRef, useState, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useApp } from '../context/AppContext'
import RealisticBed from '../components/RealisticBed'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const colors = [
  { hex: '#4A5F7F', name: 'Синий индиго' },
  { hex: '#8BA6B9', name: 'Серо-голубой' },
  { hex: '#AFC6D4', name: 'Облачный' },
  { hex: '#D2B4B4', name: 'Пыльная роза' },
  { hex: '#A8BBA2', name: 'Оливковый' },
  { hex: '#F0F0F0', name: 'Белый' }
]

function CameraController() {
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    // We animate the camera across 3 scroll sections.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-3d",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    // Initial explicit position
    camera.position.set(0, 4, 8)

    // Screen 2: Zoom in slightly
    tl.to(camera.position, {
      x: 0,
      y: 2.5,
      z: 5.5,
      ease: "power1.inOut"
    }, 0)

    tl.to(targetRef.current, {
      y: 0.5,
      z: -1,
      ease: "power1.inOut"
    }, 0)

    // Screen 3: Move to side for configurator
    tl.to(camera.position, {
      x: 3.5,
      y: 3,
      z: 5,
      ease: "power1.inOut"
    }, 1)

    tl.to(targetRef.current, {
      x: -0.5,
      y: 0.2,
      z: -0.5,
      ease: "power1.inOut"
    }, 1)

    return () => {
      if (tl) tl.kill()
    }
  }, [camera])

  useFrame(() => {
    camera.lookAt(targetRef.current)
  })

  return null
}

const Home = () => {
  const navigate = useNavigate()
  const { addToCart } = useApp()

  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('#4A5F7F')
  const [selectedFabric, setSelectedFabric] = useState('Вареный хлопок')
  const [selectedSize, setSelectedSize] = useState('2 сп')
  const [colorName, setColorName] = useState('Синий индиго')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleColorChange = (color) => {
    setSelectedColor(color.hex)
    setColorName(color.name)
  }

  const handleAddToCart = () => {
    const product = {
      id: 1,
      name: 'MYOBLAKO Premium',
      price: 8900,
      selectedColor: colorName,
      material: selectedFabric,
      size: selectedSize
    }
    addToCart(product, selectedColor, selectedSize)
  }

  return (
    <div className="home-3d" style={{ height: '300vh', background: '#050505' }}>
      {loading && (
        <div className="loading" style={{ background: '#050505' }}>
          <div className="spinner"></div>
          <p style={{ color: '#fff' }}>загрузка...</p>
        </div>
      )}

      {/* Transparent Header */}
      <header className="header-3d" style={{ background: 'transparent', backdropFilter: 'none', borderBottom: 'none' }}>
        <div className="logo text-white">MYOBLAKO</div>
        <nav className="nav">
          <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); navigate('/') }}>коллекции</a>
          <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); navigate('/about') }}>материалы</a>
          <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); navigate('/cart') }}>купить</a>
        </nav>
      </header>

      {/* Canvas container stuck to viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
        <Canvas shadows camera={{ position: [0, 4, 8], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight position={[-5, 5, -5]} intensity={0.5} penumbra={1} color="#AFC6D4" />

          <CameraController />

          <Suspense fallback={null}>
            <RealisticBed duvetColor={selectedColor} sheetColor={selectedColor} pillowColor={selectedColor} />
            <ContactShadows position={[0, -0.99, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />

            {/* Ambient Neon Accents */}
            <group position={[0, 2, -4]}>
              <mesh position={[-3, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 6, 16]} />
                <meshBasicMaterial color={selectedColor} toneMapped={false} />
              </mesh>
              <mesh position={[3, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 6, 16]} />
                <meshBasicMaterial color={selectedColor} toneMapped={false} />
              </mesh>
            </group>

            {/* Cinematic Studio Reflection */}
            <Environment preset="studio" />
          </Suspense>

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Canvas>

        {/* Cinematic Title (Sans-serif) */}
        <div className="hero-content" style={{ position: 'absolute', top: '35%', left: '10%', pointerEvents: 'none' }}>
            <h1 style={{ color: 'white', fontSize: '4.5rem', fontFamily: 'sans-serif', fontWeight: '300', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Премиальный сон
            </h1>
            <p style={{ color: '#aaa', fontSize: '1.1rem', maxWidth: '400px', fontFamily: 'sans-serif', fontWeight: '300', lineHeight: '1.6' }}>
              Погрузитесь в комфорт с нашими комплектами. Листайте вниз, чтобы настроить свою кровать.
            </p>
        </div>

        {/* Configuration Panel */}
        <div className="panel dark-panel">
          <div className="panel-content">
            <div className="panel-header" style={{ borderBottomColor: '#222' }}>
              <h2 style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: '400' }}>myoblako</h2>
              <p style={{ color: '#888', fontFamily: 'sans-serif' }}>3D конфигуратор</p>
            </div>

            <div className="section">
              <label style={{ color: 'white', fontFamily: 'sans-serif' }}>Цвет комплекта</label>
              <div className="colors">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    className={`color ${selectedColor === color.hex ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex, borderColor: selectedColor === color.hex ? 'white' : 'transparent' }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
              <p className="color-name" style={{ color: '#aaa', fontFamily: 'sans-serif' }}>{colorName}</p>
            </div>

            <div className="section">
              <label style={{ color: 'white', fontFamily: 'sans-serif' }}>Ткань</label>
              <div className="options">
                {['Страйп-сатин', 'Вареный хлопок'].map((fabric) => (
                  <button
                    key={fabric}
                    className={`option dark-option ${selectedFabric === fabric ? 'active' : ''}`}
                    style={{ fontFamily: 'sans-serif' }}
                    onClick={() => setSelectedFabric(fabric)}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            <div className="section">
              <label style={{ color: 'white', fontFamily: 'sans-serif' }}>Размер</label>
              <div className="options">
                {['1.5 сп', '2 сп', 'King', 'Евро'].map((size) => (
                  <button
                    key={size}
                    className={`option dark-option ${selectedSize === size ? 'active' : ''}`}
                    style={{ fontFamily: 'sans-serif' }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="summary" style={{ background: '#111', border: '1px solid #222' }}>
              <p className="summary-text" style={{ color: 'white', fontFamily: 'sans-serif' }}>{selectedFabric} · {colorName} · {selectedSize}</p>
              <p className="summary-price" style={{ color: 'white', fontFamily: 'sans-serif', fontWeight: '300' }}>8 900 ₽</p>
            </div>

            <div className="actions">
              <button className="btn-cart" style={{ background: 'white', color: 'black', fontFamily: 'sans-serif', fontWeight: '500' }} onClick={handleAddToCart}>
                В корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
