import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#ffffff',
  transmission: 0.95,
  opacity: 1,
  metalness: 0.1,
  roughness: 0.05,
  ior: 1.5,
  thickness: 2,
  specularIntensity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
});

const accentMaterial = new THREE.MeshPhysicalMaterial({
  color: '#6366f1', 
  emissive: '#4338ca',
  emissiveIntensity: 0.3,
  metalness: 0.7,
  roughness: 0.2,
  clearcoat: 1,
});

const emeraldMaterial = new THREE.MeshPhysicalMaterial({
  color: '#10b981', 
  emissive: '#059669',
  emissiveIntensity: 0.2,
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 0.5,
});

function RotatingShape({ children, speed = 0.5 }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed;
    ref.current.rotation.y += delta * speed * 1.2;
  });
  return <group ref={ref}>{children}</group>;
}

export default function ThreeHeroModels() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-80 transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#4f46e5" />
        
        <Environment preset="city" />

        {/* Center Main Shape - Torus Knot */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2} position={[0, -0.5, -3]}>
          <RotatingShape speed={0.2}>
            <mesh material={glassMaterial}>
              <torusKnotGeometry args={[2.5, 0.8, 128, 32]} />
            </mesh>
          </RotatingShape>
        </Float>

        {/* Left Floating Element */}
        <Float speed={3} rotationIntensity={1.5} floatIntensity={3} position={[-6, 2, -5]}>
          <RotatingShape speed={0.4}>
            <mesh material={accentMaterial}>
              <icosahedronGeometry args={[1.5, 0]} />
            </mesh>
          </RotatingShape>
        </Float>

        {/* Right Floating Element */}
        <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5} position={[6, -2, -2]}>
          <RotatingShape speed={0.3}>
            <mesh material={emeraldMaterial}>
              <sphereGeometry args={[1.2, 64, 64]} />
            </mesh>
          </RotatingShape>
        </Float>
      </Canvas>
    </div>
  );
}
