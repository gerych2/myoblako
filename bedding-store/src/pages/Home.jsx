import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useApp } from '../context/AppContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const colors = [
  { hex: '#4A5F7F', neon: '#4A5F7F', name: 'Синий индиго' },
  { hex: '#8BA6B9', neon: '#8BA6B9', name: 'Серо-голубой' },
  { hex: '#D2B4B4', neon: '#D2B4B4', name: 'Пыльная роза' },
  { hex: '#A8BBA2', neon: '#A8BBA2', name: 'Оливковый' },
  { hex: '#E5DED5', neon: '#E5DED5', name: 'Кремовый' },
  { hex: '#F0F0F0', neon: '#F0F0F0', name: 'Белый' }
]

const Home = () => {
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const canvasRef = useRef(null)

  // THREE refs
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const bedGroupRef = useRef(null)
  const neonGroupRef = useRef(null)
  const composerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })

  // State
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('#4A5F7F')
  const [selectedFabric, setSelectedFabric] = useState('Сатин')
  const [selectedSize, setSelectedSize] = useState('2 сп')
  const [colorName, setColorName] = useState('Синий индиго')

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene - Cinematic Dark Studio
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050505)
    scene.fog = new THREE.FogExp2(0x050505, 0.05)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 4, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: false, // Turn off antialias for bloom pass
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ReinhardToneMapping
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const spotLight = new THREE.SpotLight(0xffffff, 0.5)
    spotLight.position.set(-5, 5, 5)
    spotLight.penumbra = 1
    scene.add(spotLight)

    // Bed Group
    const bedGroup = new THREE.Group()
    bedGroupRef.current = bedGroup
    scene.add(bedGroup)

    // Bed Frame
    const frameGeometry = new THREE.BoxGeometry(4.2, 0.5, 4.6)
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x111111,
      roughness: 0.8,
      metalness: 0.1
    })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    frame.position.y = 0.25
    frame.castShadow = true
    frame.receiveShadow = true
    bedGroup.add(frame)

    // Mattress
    const mattressGeometry = new THREE.BoxGeometry(3.8, 0.4, 4.3)
    const mattressMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      roughness: 0.9
    })
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial)
    mattress.position.y = 0.7
    mattress.castShadow = true
    mattress.receiveShadow = true
    bedGroup.add(mattress)

    // Sheet
    const sheetGeometry = new THREE.BoxGeometry(3.85, 0.05, 4.35)
    const sheetMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(selectedColor),
      roughness: 0.6,
      metalness: 0.1
    })
    const sheet = new THREE.Mesh(sheetGeometry, sheetMaterial)
    sheet.position.y = 0.925
    sheet.castShadow = true
    sheet.receiveShadow = true
    sheet.name = 'sheet'
    bedGroup.add(sheet)

    // Duvet
    const duvetGeometry = new THREE.BoxGeometry(3.9, 0.2, 3.5)
    const duvetMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(selectedColor),
      roughness: 0.8,
      metalness: 0.05
    })
    const duvet = new THREE.Mesh(duvetGeometry, duvetMaterial)
    duvet.position.set(0, 1.05, 0.4)
    duvet.castShadow = true
    duvet.receiveShadow = true
    duvet.name = 'duvet'
    bedGroup.add(duvet)

    // Pillows
    const pillowGeometry = new THREE.BoxGeometry(1.2, 0.15, 0.6)
    const pillowMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(selectedColor),
      roughness: 0.8,
      metalness: 0.05
    })
    
    const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial)
    pillow1.position.set(-0.7, 1.15, -1.3)
    pillow1.rotation.set(0.1, 0.1, 0)
    pillow1.castShadow = true
    pillow1.receiveShadow = true
    pillow1.name = 'pillow'
    bedGroup.add(pillow1)

    const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial.clone())
    pillow2.position.set(0.7, 1.15, -1.3)
    pillow2.rotation.set(0.1, -0.1, 0)
    pillow2.castShadow = true
    pillow2.receiveShadow = true
    pillow2.name = 'pillow'
    bedGroup.add(pillow2)

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.8,
      metalness: 0.2
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    floor.receiveShadow = true
    scene.add(floor)

    // Neon Lights
    const neonGroup = new THREE.Group()
    neonGroupRef.current = neonGroup
    neonGroup.position.set(0, 2, -4)

    const neonMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(selectedColor) })
    const neonGeometry = new THREE.CylinderGeometry(0.05, 0.05, 6, 16)

    const neon1 = new THREE.Mesh(neonGeometry, neonMaterial)
    neon1.position.x = -3
    neonGroup.add(neon1)

    const neon2 = new THREE.Mesh(neonGeometry, neonMaterial)
    neon2.position.x = 3
    neonGroup.add(neon2)

    scene.add(neonGroup)

    // Post-processing (Bloom)
    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    )

    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)
    composerRef.current = composer

    // Camera target for smooth lookAt interpolation
    const cameraTarget = new THREE.Vector3(0, 0, 0)

    // Setup GSAP Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-3d",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    // Screen 2: Zoom in
    tl.to(camera.position, {
      x: 0,
      y: 2,
      z: 5,
      ease: "power2.inOut"
    }, 0)

    tl.to(cameraTarget, {
      y: 0.5,
      ease: "power2.inOut"
    }, 0)

    // Screen 3: Move to side to accommodate UI
    tl.to(camera.position, {
      x: 4,
      y: 3,
      z: 5,
      ease: "power2.inOut"
    }, 1)

    tl.to(cameraTarget, {
      x: -1,
      z: -1,
      ease: "power2.inOut"
    }, 1)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      
      if (!isDraggingRef.current && bedGroupRef.current) {
        // Slow auto rotation
        bedGroupRef.current.rotation.y += 0.001
      }

      if (cameraRef.current) {
        cameraRef.current.lookAt(cameraTarget)
      }
      
      if (composerRef.current) {
        composerRef.current.render()
      } else {
        renderer.render(scene, camera)
      }
    }
    animate()

    setTimeout(() => setLoading(false), 1500)

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (composerRef.current) {
        composerRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }
    window.addEventListener('resize', handleResize)

    // Mouse controls
    const handleMouseDown = (e) => {
      if (e.target.closest('.panel') || e.target.closest('.header-3d') || e.target.closest('.hero-content')) return
      isDraggingRef.current = true
      previousMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !bedGroupRef.current) return
      
      const deltaX = e.clientX - previousMouseRef.current.x
      const deltaY = e.clientY - previousMouseRef.current.y
      
      bedGroupRef.current.rotation.y += deltaX * 0.01
      bedGroupRef.current.rotation.x += deltaY * 0.01
      
      bedGroupRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, bedGroupRef.current.rotation.x))
      
      previousMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      ScrollTrigger.getAll().forEach(t => t.kill())

      // We must check refs before disposing to avoid errors if they are already cleaned up
      if (rendererRef.current) {
         rendererRef.current.dispose()
      }
    }
  }, []) // Empty dependency array -> run once

  // Update colors (interpolate using useFrame equivalent in vanilla three)
  useEffect(() => {
    if (!bedGroupRef.current || !neonGroupRef.current) return

    const targetColor = new THREE.Color(selectedColor)
    const toAnimate = []

    bedGroupRef.current.children.forEach(child => {
      if (child.name === 'sheet' || child.name === 'duvet' || child.name === 'pillow') {
        toAnimate.push(child.material.color)
      }
    })

    // Add neon material (it's shared between the two cylinders)
    toAnimate.push(neonGroupRef.current.children[0].material.color)

    gsap.to(toAnimate, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 1,
      ease: "power2.out"
    })

  }, [selectedColor])

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
    <div className="home-3d" style={{ height: '300vh' }}>
      {/* Loading */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>загрузка...</p>
        </div>
      )}

      {/* Header */}
      <header className="header-3d">
        <div className="logo text-white">MYOBLAKO</div>
        <nav className="nav">
          <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); navigate('/') }}>коллекции</a>
          <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); navigate('/about') }}>материалы</a>
          <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); navigate('/cart') }}>купить</a>
        </nav>
      </header>

      {/* Canvas */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
        <canvas ref={canvasRef} className="canvas-3d"></canvas>

        {/* Hero Content */}
        <div className="hero-content" style={{ position: 'absolute', top: '30%', left: '10%', pointerEvents: 'none' }}>
            <h1 style={{ color: 'white', fontSize: '4rem', fontFamily: 'serif', marginBottom: '1rem' }}>Премиальный сон</h1>
            <p style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '400px' }}>
                Погрузитесь в комфорт с нашими комплектами. Листайте вниз, чтобы настроить свою кровать.
            </p>
        </div>

        {/* Panel */}
        <div className="panel dark-panel">
          <div className="panel-content">
            <div className="panel-header" style={{ borderBottomColor: '#333' }}>
              <h2 style={{ color: 'white' }}>myoblako</h2>
              <p style={{ color: '#aaa' }}>3D конфигуратор</p>
            </div>

            {/* Colors */}
            <div className="section">
              <label style={{ color: 'white' }}>цвет комплекта</label>
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
              <p className="color-name" style={{ color: '#aaa' }}>{colorName}</p>
            </div>

            {/* Fabric */}
            <div className="section">
              <label style={{ color: 'white' }}>ткань</label>
              <div className="options">
                {['Сатин', 'Лён', 'Перкаль', 'Тенсель'].map((fabric) => (
                  <button
                    key={fabric}
                    className={`option dark-option ${selectedFabric === fabric ? 'active' : ''}`}
                    onClick={() => setSelectedFabric(fabric)}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="section">
              <label style={{ color: 'white' }}>размер</label>
              <div className="options">
                {['1.5 сп', '2 сп', 'King', 'Евро'].map((size) => (
                  <button
                    key={size}
                    className={`option dark-option ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="summary" style={{ background: '#111' }}>
              <p className="summary-text" style={{ color: 'white' }}>{selectedFabric} · {colorName} · {selectedSize}</p>
              <p className="summary-price" style={{ color: 'white' }}>8 900 ₽</p>
            </div>

            {/* Actions */}
            <div className="actions">
              <button className="btn-cart" style={{ background: 'white', color: 'black' }} onClick={handleAddToCart}>
                в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
