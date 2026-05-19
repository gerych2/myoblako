import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import * as THREE from 'three'
import './BedConfigurator3D.css'

function BedConfigurator3D() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const bedGroupRef = useRef(null)
  const isDraggingRef = useRef(false)
  const previousMouseRef = useRef({ x: 0, y: 0 })
  
  const navigate = useNavigate()
  const { addToCart, showNotification } = useApp()
  
  const [isLoading, setIsLoading] = useState(true)
  const [config, setConfig] = useState({
    color: '#4A5F7F',
    fabric: 'Сатин',
    size: '2 сп',
    price: 8900
  })

  const colors = [
    { name: 'Синий индиго', value: '#4A5F7F' },
    { name: 'Небесный', value: '#AFC6D4' },
    { name: 'Морской', value: '#8FAFC2' },
    { name: 'Облачный', value: '#C7D7E2' },
    { name: 'Кремовый', value: '#F7F6F2' },
    { name: 'Белоснежный', value: '#FFFFFF' }
  ]

  const fabrics = ['Сатин', 'Лён', 'Перкаль', 'Тенсель']
  const sizes = ['1.5 сп', '2 сп', 'King', 'Евро']

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xF7F6F2)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 3, 8)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)
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

    // Create bed group
    const bedGroup = new THREE.Group()
    bedGroupRef.current = bedGroup
    scene.add(bedGroup)

    // Bed frame (dark wood)
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

    // Sheet (fitted)
    const sheetGeometry = new THREE.BoxGeometry(3.8, 0.05, 5.8)
    const sheetMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(config.color),
      roughness: 0.3,
      metalness: 0.1
    })
    const sheet = new THREE.Mesh(sheetGeometry, sheetMaterial)
    sheet.position.y = 0.725
    sheet.castShadow = true
    sheet.receiveShadow = true
    sheet.name = 'sheet'
    bedGroup.add(sheet)

    // Duvet (with folds)
    const duvetGeometry = new THREE.BoxGeometry(3.6, 0.3, 5.4)
    const duvetMaterial = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(config.color),
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
      color: new THREE.Color(config.color),
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

    // Floor shadow plane
    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.1 })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    floor.receiveShadow = true
    scene.add(floor)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      
      if (!isDraggingRef.current && bedGroupRef.current) {
        bedGroupRef.current.rotation.y += 0.002
      }
      
      renderer.render(scene, camera)
    }
    animate()

    setIsLoading(false)

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
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

    renderer.domElement.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // Update colors when config changes
  useEffect(() => {
    if (!bedGroupRef.current) return

    bedGroupRef.current.children.forEach(child => {
      if (child.name === 'sheet' || child.name === 'duvet' || child.name === 'pillow') {
        child.material.color.set(config.color)
      }
    })
  }, [config.color])

  const handleColorChange = (color) => {
    setConfig({ ...config, color: color.value })
  }

  const handleAddToCart = () => {
    const product = {
      id: 1,
      name: 'Коллекция MYOBLAKO',
      price: config.price,
      selectedColor: colors.find(c => c.value === config.color)?.name || 'Синий индиго',
      material: config.fabric,
      size: config.size
    }
    addToCart(product, config.color, config.size)
  }

  return (
    <div className="bed-configurator-3d">
      {/* Loading */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>инициализация...</p>
        </div>
      )}

      {/* Header */}
      <header className="config-header">
        <div className="logo-3d">MYOBLAKO</div>
        <nav className="nav-3d">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>коллекции</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/about') }}>материалы</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cart') }}>купить</a>
        </nav>
      </header>

      {/* 3D Canvas */}
      <div className="canvas-container" ref={containerRef}>
        <div className="canvas-hint">
          <p>тяни · крути · смотри</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel-3d">
        <button className="panel-toggle">настроить</button>

        <div className="panel-content">
          <div className="panel-header">
            <h2>myoblako</h2>
            <p>3D конфигуратор постельного белья</p>
          </div>

          {/* Color Selection */}
          <div className="config-section">
            <label>цвет комплекта</label>
            <div className="color-swatches-3d">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-swatch-3d ${config.color === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorChange(color)}
                  title={color.name}
                />
              ))}
            </div>
            <p className="selected-color">{colors.find(c => c.value === config.color)?.name || 'Синий индиго'}</p>
          </div>

          {/* Fabric Selection */}
          <div className="config-section">
            <label>ткань</label>
            <div className="fabric-options">
              {fabrics.map((fabric, index) => (
                <button
                  key={index}
                  className={`fabric-btn ${config.fabric === fabric ? 'active' : ''}`}
                  onClick={() => setConfig({ ...config, fabric })}
                >
                  {fabric}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="config-section">
            <label>размер</label>
            <div className="size-options">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`size-btn ${config.size === size ? 'active' : ''}`}
                  onClick={() => setConfig({ ...config, size })}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="config-summary">
            <p className="summary-text">
              {config.fabric} · {colors.find(c => c.value === config.color)?.name} · {config.size}
            </p>
            <p className="summary-price">{config.price.toLocaleString('ru-RU')} ₽</p>
            <p className="summary-delivery">бесплатная доставка</p>
          </div>

          {/* Actions */}
          <div className="config-actions">
            <button className="btn-add-cart-3d" onClick={handleAddToCart}>
              добавить в корзину
            </button>
            <button className="btn-save-3d">сохранить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BedConfigurator3D
