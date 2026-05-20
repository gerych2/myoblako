import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePromoStore } from '../../store';

export default function Bed() {
  const selectedColor = usePromoStore((state) => state.selectedColor);
  const materialRef = useRef();

  const materials = useRef({
    base: new THREE.MeshStandardMaterial({ color: "#222", roughness: 0.8 }),
    mattress: new THREE.MeshStandardMaterial({ color: "#eee", roughness: 0.9 }),
    blanket: new THREE.MeshStandardMaterial({ roughness: 0.4 }),
    pillowWhite: new THREE.MeshStandardMaterial({ color: "#fff", roughness: 0.5 }),
    pillowColor: new THREE.MeshStandardMaterial({ roughness: 0.4 })
  });

  useEffect(() => {
    return () => {
      Object.values(materials.current).forEach(mat => mat.dispose());
    };
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.color.lerp(new THREE.Color(selectedColor), 0.05);
    }
    if (materials.current.pillowColor) {
      materials.current.pillowColor.color.lerp(new THREE.Color(selectedColor), 0.05);
    }
  });

  return (
    <group position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, 0.25, 0]} material={materials.current.base}>
        <boxGeometry args={[4, 0.5, 4.5]} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.7, 0]} material={materials.current.mattress}>
        <boxGeometry args={[3.8, 0.4, 4.3]} />
      </mesh>

      {/* Blanket */}
      <mesh position={[0, 0.95, 0.4]} material={materials.current.blanket} ref={materialRef}>
        <boxGeometry args={[3.9, 0.1, 3.5]} />
      </mesh>

      {/* Pillows */}
      <group position={[0, 1.05, -1.6]}>
        <mesh position={[-0.9, 0, 0]} rotation={[0.1, 0, 0]} material={materials.current.pillowWhite}>
          <boxGeometry args={[1.5, 0.2, 0.8]} />
        </mesh>
        <mesh position={[0.9, 0, 0]} rotation={[0.1, 0, 0]} material={materials.current.pillowWhite}>
          <boxGeometry args={[1.5, 0.2, 0.8]} />
        </mesh>
        <mesh position={[-0.7, 0.1, 0.3]} rotation={[0.2, 0.1, 0]} material={materials.current.pillowColor}>
          <boxGeometry args={[1.2, 0.15, 0.6]} />
        </mesh>
        <mesh position={[0.7, 0.1, 0.3]} rotation={[0.2, -0.1, 0]} material={materials.current.pillowColor}>
          <boxGeometry args={[1.2, 0.15, 0.6]} />
        </mesh>
      </group>
    </group>
  );
}
