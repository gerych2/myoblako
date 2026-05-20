import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CameraController() {
  const { camera, size } = useThree();
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const mouse = useRef({ x: 0, y: 0 });
  const basePosition = useRef(new THREE.Vector3(0, 4, 8));

  useEffect(() => {
    if (size.width < 768) {
      camera.fov = 60;
    } else {
      camera.fov = 45;
    }
    camera.updateProjectionMatrix();
  }, [size.width, camera]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    basePosition.current.set(0, 4, 8);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#promo-scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Screen 2: Zoom in
    tl.to(basePosition.current, {
      x: 0,
      y: 2,
      z: 5,
      ease: 'power2.inOut',
    }, 0);
    tl.to(cameraTarget.current, {
      y: 0.5,
      z: -1,
      ease: 'power2.inOut',
    }, 0);

    // Screen 3: Move to side
    tl.to(basePosition.current, {
      x: 4,
      y: 3,
      z: 4,
      ease: 'power2.inOut',
    }, 1);
    tl.to(cameraTarget.current, {
      y: 0,
      z: 0,
      ease: 'power2.inOut',
    }, 1);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useFrame((state, delta) => {
    const parallaxX = mouse.current.x * 0.5;
    const parallaxY = mouse.current.y * 0.5;

    const targetX = basePosition.current.x + parallaxX;
    const targetY = basePosition.current.y + parallaxY;
    const targetZ = basePosition.current.z;

    camera.position.x += (targetX - camera.position.x) * 5 * delta;
    camera.position.y += (targetY - camera.position.y) * 5 * delta;
    camera.position.z += (targetZ - camera.position.z) * 5 * delta;

    camera.lookAt(cameraTarget.current);
  });

  return null;
}
