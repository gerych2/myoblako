import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RealisticBed({ duvetColor, sheetColor, pillowColor, ...props }) {
  const duvetRef = useRef()
  const pillowsRef = useRef([])

  // Create materials with colors based on the props
  const duvetMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: duvetColor,
    roughness: 0.9,
    metalness: 0.05
  }), [])

  const sheetMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: sheetColor,
    roughness: 0.8,
    metalness: 0.1
  }), [])

  const pillowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: pillowColor,
    roughness: 0.9,
    metalness: 0.05
  }), [])

  const bedFrameMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#333333',
    roughness: 0.5,
    metalness: 0.2
  }), [])

  useFrame(() => {
    duvetMaterial.color.lerp(new THREE.Color(duvetColor), 0.1)
    sheetMaterial.color.lerp(new THREE.Color(sheetColor), 0.1)
    pillowMaterial.color.lerp(new THREE.Color(pillowColor), 0.1)
  })

  return (
    <group {...props}>
      {/* Bed Frame Base */}
      <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.2, 0.4, 2.4]} />
        <primitive object={bedFrameMaterial} attach="material" />
      </mesh>

      {/* Headboard */}
      <mesh position={[0, 0.9, -1.15]} receiveShadow castShadow>
        <boxGeometry args={[2.2, 1.0, 0.1]} />
        <primitive object={bedFrameMaterial} attach="material" />
      </mesh>

      {/* Mattress / Sheet */}
      <mesh position={[0, 0.45, 0.05]} receiveShadow castShadow>
        <boxGeometry args={[2.0, 0.15, 2.1]} />
        <primitive object={sheetMaterial} attach="material" />
      </mesh>

      {/* Duvet / Blanket */}
      <mesh ref={duvetRef} position={[0, 0.55, 0.25]} receiveShadow castShadow>
        <boxGeometry args={[2.05, 0.1, 1.7]} />
        <primitive object={duvetMaterial} attach="material" />
      </mesh>

      {/* Pillows */}
      {/* Back Pillows */}
      <mesh position={[-0.5, 0.55, -0.8]} rotation={[-0.2, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.8, 0.15, 0.5]} />
        <primitive object={pillowMaterial} attach="material" />
      </mesh>
      <mesh position={[0.5, 0.55, -0.8]} rotation={[-0.2, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.8, 0.15, 0.5]} />
        <primitive object={pillowMaterial} attach="material" />
      </mesh>

      {/* Front Pillows */}
      <mesh position={[-0.45, 0.6, -0.6]} rotation={[-0.1, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.12, 0.4]} />
        <primitive object={pillowMaterial} attach="material" />
      </mesh>
      <mesh position={[0.45, 0.6, -0.6]} rotation={[-0.1, -0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.12, 0.4]} />
        <primitive object={pillowMaterial} attach="material" />
      </mesh>
    </group>
  )
}
