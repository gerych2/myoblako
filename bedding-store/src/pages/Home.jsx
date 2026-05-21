import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, PresentationControls, ContactShadows, useProgress, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { usePromoStore } from '../store/promoStore'
import RealisticBed from '../components/RealisticBed'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="loader-container">
        <div className="loader-text">Loading 3D assets... {Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

function CameraController({ targetRef }) {
  const { camera } = useThree()

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 4, 10)

    // Clear any existing scroll triggers
    ScrollTrigger.getAll().forEach(t => t.kill())

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    // Screen 2: Zoom in and change angle
    tl.to(camera.position, {
      x: -4,
      y: 2,
      z: 6,
      ease: "power2.inOut"
    }, 0)

    tl.to(targetRef.current, {
      x: 0,
      y: 0.5,
      z: 0,
      ease: "power2.inOut"
    }, 0)

    // Screen 3: Fly over to the side, looking at folds
    tl.to(camera.position, {
      x: 5,
      y: 1.5,
      z: 3,
      ease: "power2.inOut"
    }, 1)

    tl.to(targetRef.current, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power2.inOut"
    }, 1)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [camera, targetRef])

  // Constantly look at the target
  useThree(({ camera }) => {
    camera.lookAt(targetRef.current)
  })

  return null
}

const Home = () => {
  const {
    selectedColor, setSelectedColor,
    selectedMaterial, setSelectedMaterial,
    colors, materials
  } = usePromoStore()

  const cameraTargetRef = useRef(new THREE.Vector3(0, 0.5, 0))

  return (
    <div className="home-container">
      {/* 3D Canvas Background */}
      <div className="canvas-wrapper">
        <Canvas shadows camera={{ position: [0, 4, 10], fov: 45 }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.3} />

          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />

          <Suspense fallback={<Loader />}>
            <CameraController targetRef={cameraTargetRef} />
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-0.2, 0.4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 40 }}
            >
              <RealisticBed
                duvetColor={selectedColor}
                sheetColor={selectedColor}
                pillowColor={selectedColor}
              />
              <ContactShadows position={[0, -0.01, 0]} opacity={0.8} scale={10} blur={2.5} far={4} color="#000000" />
            </PresentationControls>

            {/* Neon Decorative Light */}
            <group position={[0, 2, -4]}>
              <mesh position={[-3, 0, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 6, 16]} />
                <meshBasicMaterial color={selectedColor} toneMapped={false} />
              </mesh>
            </group>

            <Environment preset="studio" />

            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* HTML UI Layer */}
      <div className="ui-layer">

        {/* Screen 1 */}
        <section className="screen-section hero-section">
          <div className="hero-content">
            <h1 className="hero-title">MYOBLAKO</h1>
            <p className="hero-subtitle">Кинематографичный комфорт</p>
          </div>
        </section>

        {/* Screen 2 */}
        <section className="screen-section feature-section">
          <div className="feature-content">
            <h2 className="feature-title">Премиальные Ткани</h2>
            <p className="feature-description">
              Почувствуйте мягкость и глубину фактуры. Наше белье создано для идеального сна.
            </p>
          </div>
        </section>

        {/* Screen 3: Configurator */}
        <section className="screen-section config-section">
          <div className="config-panel">
            <h2 className="config-title">Собери свой комплект</h2>

            <div className="material-selector">
              {materials.map(mat => (
                <button
                  key={mat}
                  className={`material-btn ${selectedMaterial === mat ? 'active' : ''}`}
                  onClick={() => setSelectedMaterial(mat)}
                >
                  {mat}
                </button>
              ))}
            </div>

            <div className="color-selector">
              {colors.map(colorObj => (
                <button
                  key={colorObj.hex}
                  className={`color-btn ${selectedColor === colorObj.hex ? 'active' : ''}`}
                  style={{ backgroundColor: colorObj.hex }}
                  onClick={() => setSelectedColor(colorObj.hex)}
                  title={colorObj.name}
                />
              ))}
            </div>

            <button className="add-to-cart-btn-large">
              Добавить в корзину (8 900 ₽)
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Home
