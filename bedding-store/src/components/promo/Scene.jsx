import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Bed from './Bed';
import CameraController from './CameraController';
import { usePromoStore } from '../../store';

const NeonLights = () => {
  const neonColor = usePromoStore((state) => state.neonColor);
  const colorRef = useRef();

  useFrame(() => {
    if (colorRef.current) {
      colorRef.current.color.lerp(new THREE.Color(neonColor), 0.05);
    }
  });

  return (
    <group position={[0, 2, -4]}>
      <mesh position={[-3, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 6, 16]} />
        <meshBasicMaterial ref={colorRef} color={neonColor} toneMapped={false} />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 6, 16]} />
        <meshBasicMaterial color={neonColor} toneMapped={false} />
      </mesh>
    </group>
  );
};

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        shadows
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 4, 8], fov: 45 }}
      >
        <color attach="background" args={['#050505']} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[-5, 5, 5]} intensity={0.5} penumbra={1} />

        <Suspense fallback={null}>
          <Bed />
          <NeonLights />
        </Suspense>

        <CameraController />
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
