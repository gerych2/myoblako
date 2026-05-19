import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import * as THREE from 'three'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const bedGroupRef = useRef(null)
  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })
  
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('#4A5F7F')
  const [selectedFabric, setSelectedFabric] = useState('Сатин')
  const [selectedSize, setSelectedSize] = useState('2 сп')
  const [colorName, setColorName] = useState('Синий индиго')

  const colors = [
    { name: 'Синий индиго', hex: '#4A5F7F' },
    { name: 'Небесный', hex: '#AFC6D4' },
    { name: 'Морской', hex: '#8FAFC2' },
    { name: 'Облачный', hex: '#C7D7E2' },
    { name: 'Кремовый', hex: '#F7F6F2' },
    { name: 'Белоснежный', hex: '#FFFFFF' }
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xF7F6F2)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 3, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const fillLight = new THREE.DirectionalLight(0xAFC6D4, 0.3)
    fillLight.position.set(-5, 5, -5)
    scene.add(fillLight)

    // Bed Group
    const bedGroup = new THREE.Group()
    bedGroupRef.current = bedGroup
    scene.add(bedGroup)

    // Bed Frame
    const frameGeometry = new THREE.BoxGeometry(4, 0.3, 6)
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2a2a2a,
      roughness: 0.7,
      metalness: 0.1
    })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    frame.position.y = 0.15
    frame.castShadow = true
    frame.receiveShadow = true
    bedGroup.add(frame)

    // Mattress
    const mattressGeometry = new THREE.BoxGeometry(3.8, 0.4, 5.8)
    const mattressMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5F5F5,
      roughness: 0.8
    })
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial)
    mattress.position.y = 0.5
    mattress.castShadow = true
    mattress.receiveShadow = true
    bedGroup.add(mattress)

    // Sheet
    const sheetGeometry = new THREE.BoxGeometry(3.8, 0.05, 5.8)
    const sheetMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(selectedColor),
      roughness: 0.3,
      metalness: 0.1
    })
    const sheet = new THREE.Mesh(sheetGeometry, sheetMaterial)
    sheet.position.y = 0.725
    sheet.castShadow = true
    sheet.receiveShadow = true
    sheet.name = 'sheet'
    bedGroup.add(sheet)

    // Duvet
    const duvetGeometry = new THREE.BoxGeometry(3.6, 0.3, 5.4)
    const duvetMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(selectedColor),
      roughness: 0.4,
      metalness: 0.05
    })
    const duvet = new THREE.Mesh(duvetGeometry, duvetMaterial)
    duvet.position.set(0, 0.95, -0.2)
    duvet.castShadow = true
    duvet.receiveShadow = true
    duvet.name = 'duvet'
    bedGroup.add(duvet)

    // Pillows
    const pillowGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.6)
    const pillowMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(selectedColor),
      roughness: 0.5,
      metalness: 0.05
    })
    
    const pillow1 = new THREE.Mesh(pillowGeometry, pillowMaterial)
    pillow1.position.set(-1, 1.1, -2.5)
    pillow1.rotation.x = -0.2
    pillow1.castShadow = true
    pillow1.receiveShadow = true
    pillow1.name = 'pillow'
    bedGroup.add(pillow1)

    const pillow2 = new THREE.Mesh(pillowGeometry, pillowMaterial.clone())
    pillow2.position.set(1, 1.1, -2.5)
    pillow2.rotation.x = -0.2
    pillow2.castShadow = true
    pillow2.receiveShadow = true
    pillow2.name = 'pillow'
    bedGroup.add(pillow2)

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.1 })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    floor.receiveShadow = true
    scene.add(floor)

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      
      if (!isDraggingRef.current && bedGroupRef.current) {
        bedGroupRef.current.rotation.y += 0.002
      }
      
      renderer.render(scene, camera)
    }
    animate()

    setTimeout(() => setLoading(false), 1500)

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Mouse controls
    const handleMouseDown = (e) => {
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
      renderer.dispose()
    }
  }, [])

  // Update colors
  useEffect(() => {
    if (!bedGroupRef.current) return

    bedGroupRef.current.children.forEach(child => {
      if (child.name === 'sheet' || child.name === 'duvet' || child.name === 'pillow') {
        child.material.color.set(selectedColor)
      }
    })
  }, [selectedColor])

  const handleColorChange = (color) => {
    setSelectedColor(color.hex)
    setColorName(color.name)
  }

  const handleAddToCart = () => {
    const product = {
      id: 1,
      name: 'MYOBLAKO',
      price: 8900,
      selectedColor: colorName,
      material: selectedFabric,
      size: selectedSize
    }
    addToCart(product, selectedColor, selectedSize)
  }

  return (
    <div className="home-3d">
      {/* Loading */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>инициализация...</p>
        </div>
      )}

      {/* Header */}
      <header className="header-3d">
        <div className="logo">MYOBLAKO</div>
        <nav className="nav">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>коллекции</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about') }}>материалы</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cart') }}>купить</a>
        </nav>
      </header>

      {/* Canvas */}
      <canvas ref={canvasRef} className="canvas-3d"></canvas>

      {/* Hint */}
      <div className="hint">
        <p>тяни · крути · смотри</p>
      </div>

      {/* Panel */}
      <div className="panel">
        <button className="panel-toggle">настроить</button>

        <div className="panel-content">
          <div className="panel-header">
            <h2>myoblako</h2>
            <p>3D конфигуратор постельного белья</p>
          </div>

          {/* Colors */}
          <div className="section">
            <label>цвет комплекта</label>
            <div className="colors">
              {colors.map((color, i) => (
                <button
                  key={i}
                  className={`color ${selectedColor === color.hex ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
            <p className="color-name">{colorName}</p>
          </div>

          {/* Fabric */}
          <div className="section">
            <label>ткань</label>
            <div className="options">
              {['Сатин', 'Лён', 'Перкаль', 'Тенсель'].map((fabric) => (
                <button
                  key={fabric}
                  className={`option ${selectedFabric === fabric ? 'active' : ''}`}
                  onClick={() => setSelectedFabric(fabric)}
                >
                  {fabric}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="section">
            <label>размер</label>
            <div className="options">
              {['1.5 сп', '2 сп', 'King', 'Евро'].map((size) => (
                <button
                  key={size}
                  className={`option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="summary">
            <p className="summary-text">{selectedFabric} · {colorName} · {selectedSize}</p>
            <p className="summary-price">8 900 ₽</p>
            <p className="summary-delivery">бесплатная доставка</p>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="btn-cart" onClick={handleAddToCart}>
              добавить в корзину
            </button>
            <button className="btn-save">сохранить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
