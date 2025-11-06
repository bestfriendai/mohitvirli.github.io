'use client';

import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function Bmw() {
  const gltf = useGLTF('/models/bmw.glb');
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useEffect(() => {
    console.log('BMW model loaded successfully');
    console.log('BMW scene:', gltf.scene);

    // Ensure materials are visible
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.side = THREE.DoubleSide;
          mat.needsUpdate = true;
        }
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const scrollProgress = data.range(0, 1);

    // Always visible for first 60% of scroll
    if (scrollProgress < 0.6) {
      groupRef.current.visible = true;

      // Start just above Patrick Francis text and fall down
      // Y: 3 (start) to -35 (end)
      groupRef.current.position.y = 3 - scrollProgress * 63;

      // Slower rotation as it falls
      groupRef.current.rotation.y += delta * 0.8; // Slower Y rotation
      groupRef.current.rotation.z += delta * 0.3; // Gentle Z tumble
    } else {
      groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, -5]}>
      {/* BMW model - properly oriented to show top of car */}
      <primitive object={gltf.scene} scale={2} rotation={[-Math.PI / 6, Math.PI / 4, 0]} />

      {/* Enhanced lighting for visibility */}
      <hemisphereLight intensity={1} groundColor="#ffffff" />
      <pointLight position={[5, 5, 5]} intensity={500} distance={50} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={500} distance={50} color="#ffffff" />
      <pointLight position={[0, 5, -5]} intensity={500} distance={50} color="#ffffff" />
      <pointLight position={[0, -5, 0]} intensity={400} distance={50} color="#4da6ff" />
      <directionalLight position={[0, 10, 0]} intensity={3} />
    </group>
  );
}

useGLTF.preload('/models/bmw.glb');
