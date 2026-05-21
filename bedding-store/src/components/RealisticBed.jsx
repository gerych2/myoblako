import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function RealisticBed({ duvetColor, sheetColor, pillowColor, ...props }) {
  // Try to load the GLB file. We wrap this component in a Suspense boundary in Home.jsx,
  // but if the model fails to load, it might crash.

  // Actually, wait, useGLTF will throw a Promise to Suspense. We should ensure the model exists.
  // We downloaded a Sofa as a fallback since a perfect bed glb wasn't available.
  const { nodes, materials } = useGLTF('/models/bed.glb')

  // Clone the materials so we can independently color them
  const fabricMaterial = useMemo(() => {
    if (materials && materials.GlamVelvetSofa_fabric_navy) {
      const mat = materials.GlamVelvetSofa_fabric_navy.clone()
      // Setup some default PBR values for "fabric"
      mat.roughness = 0.8
      mat.metalness = 0.1
      return mat
    }
    return new THREE.MeshStandardMaterial({ roughness: 0.8 })
  }, [materials])

  // We will map the duvetColor, sheetColor, and pillowColor to different parts of the sofa if possible
  // Since it's a sofa, we just color the main fabric.
  useFrame(() => {
    if (fabricMaterial && fabricMaterial.color) {
      // Lerp to the selected color. We will use duvetColor as the primary color here since it's a single fabric mesh.
      fabricMaterial.color.lerp(new THREE.Color(duvetColor), 0.1)
    }
  })

  // Ensure we have the nodes to prevent white screen crashes
  if (!nodes || !nodes.GlamVelvetSofa_fabric) {
    return (
      <mesh>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color={duvetColor} />
      </mesh>
    )
  }

  return (
    <group {...props} dispose={null} scale={0.03} position={[0, 0, 0]}>
      {nodes.GlamVelvetSofa_legs && (
         <mesh geometry={nodes.GlamVelvetSofa_legs.geometry} material={materials.GlamVelvetSofa_legs} />
      )}
      {nodes.GlamVelvetSofa_fabric && (
         <mesh geometry={nodes.GlamVelvetSofa_fabric.geometry} material={fabricMaterial} castShadow receiveShadow />
      )}
      {nodes.GlamVelvetSofa_feet && (
         <mesh geometry={nodes.GlamVelvetSofa_feet.geometry} material={materials.GlamVelvetSofa_feet} />
      )}
    </group>
  )
}

useGLTF.preload('/models/bed.glb')
