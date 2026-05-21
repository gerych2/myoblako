import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PresentationControls, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import RealisticBed from './RealisticBed'
import './InteractiveBed.css'

const InteractiveBed = ({ product }) => {
  const [selectedPart, setSelectedPart] = useState(null)

  // Setup default requested colors: White, Cloud Blue (#AFC6D4), and Dusty Rose
  const defaultColors = ['#FFFFFF', '#AFC6D4', '#D2B4B4', '#8FAFC2', '#4A5F7F', '#E5DED5']

  const [duvetColor, setDuvetColor] = useState(defaultColors[1])
  const [sheetColor, setSheetColor] = useState(defaultColors[0])
  const [pillowColor, setPillowColor] = useState(defaultColors[1])
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '2 сп')

  const navigate = useNavigate()
  const { addToCart } = useApp()

  const handlePartClick = (part) => {
    setSelectedPart(selectedPart === part ? null : part)
  }

  const handleColorChange = (color) => {
    if (selectedPart === 'duvet') setDuvetColor(color)
    else if (selectedPart === 'sheet') setSheetColor(color)
    else if (selectedPart === 'pillow') setPillowColor(color)
  }

  const handleAddToCart = () => {
    const customProduct = {
      ...product,
      selectedColor: `Одеяло: ${duvetColor}, Простынь: ${sheetColor}, Подушки: ${pillowColor}`,
      customColors: { duvet: duvetColor, sheet: sheetColor, pillow: pillowColor }
    }
    addToCart(customProduct, duvetColor, selectedSize)
  }

  const getPartName = () => {
    if (selectedPart === 'duvet') return 'Одеяло'
    if (selectedPart === 'sheet') return 'Простынь'
    if (selectedPart === 'pillow') return 'Подушки'
    return ''
  }

  return (
    <div className="interactive-bed-container">
      {/* 3D Scene */}
      <Canvas shadows camera={{ position: [0, 4, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />

        {/* Cinematic Studio Lighting */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <spotLight position={[-5, 5, -5]} intensity={0.5} penumbra={1} color="#AFC6D4" />

        <PresentationControls
          global
          rotation={[0.1, -Math.PI / 4, 0]}
          polar={[-0.2, 0.4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 40 }}
        >
          <RealisticBed duvetColor={duvetColor} sheetColor={sheetColor} pillowColor={pillowColor} />
          <ContactShadows position={[0, -0.99, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
        </PresentationControls>

        {/* Neon Accents */}
        <group position={[0, 2, -4]}>
          <mesh position={[-3, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 6, 16]} />
            <meshBasicMaterial color={duvetColor} toneMapped={false} />
          </mesh>
          <mesh position={[3, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 6, 16]} />
            <meshBasicMaterial color={duvetColor} toneMapped={false} />
          </mesh>
        </group>

        <Environment preset="studio" />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>

      {/* UI Overlay */}
      <div className="bed-ui-overlay">
        {/* Top Part Selectors */}
        <div className="bed-ui-header">
          <button
            className={`part-selector-btn ${selectedPart === 'pillow' ? 'active' : ''}`}
            onClick={() => handlePartClick('pillow')}
          >
            Подушки
          </button>
          <button
            className={`part-selector-btn ${selectedPart === 'duvet' ? 'active' : ''}`}
            onClick={() => handlePartClick('duvet')}
          >
            Одеяло
          </button>
          <button
            className={`part-selector-btn ${selectedPart === 'sheet' ? 'active' : ''}`}
            onClick={() => handlePartClick('sheet')}
          >
            Простынь
          </button>
        </div>

        {/* Bottom Configurator Panel */}
        {selectedPart && (
          <div className="bed-ui-footer">
            <div className="configurator-header">
              <h3>{getPartName()}</h3>
              <button className="close-config-btn" onClick={() => setSelectedPart(null)}>✕</button>
            </div>

            <div className="color-grid">
              {defaultColors.map((color, index) => (
                <button
                  key={index}
                  className={`color-swatch ${
                    (selectedPart === 'duvet' && duvetColor === color) ||
                    (selectedPart === 'sheet' && sheetColor === color) ||
                    (selectedPart === 'pillow' && pillowColor === color)
                      ? 'active' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>

            <div className="product-summary">
              <div>
                <p className="product-name-sm">{product.name || 'MYOBLAKO Premium'}</p>
                <p className="product-price">{(product.price || 8900).toLocaleString('ru-RU')} ₽</p>
              </div>
              <select
                className="size-selector"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizes ? product.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                )) : ['1.5 сп', '2 сп', 'Евро'].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InteractiveBed
