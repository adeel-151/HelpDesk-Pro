import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

function TechGlobe() {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={ref}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[4, 48, 48]} />
        <meshBasicMaterial 
          color="#6366f1" 
          wireframe={true} 
          transparent={true}
          opacity={0.15}
        />
      </mesh>
      
      {/* Inner Glowing Sphere */}
      <mesh>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial 
          color="#4f46e5" 
          transparent={true}
          opacity={0.02}
        />
      </mesh>
      
      {/* Floating Tech Particles */}
      <Sparkles count={300} scale={12} size={2} speed={0.3} opacity={0.3} color="#10b981" />
      <Sparkles count={150} scale={10} size={4} speed={0.2} opacity={0.2} color="#6366f1" />
    </group>
  );
}

export default function ThreeHeroModels() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-100 transition-opacity duration-1000">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1} position={[0, -2, -2]}>
          <TechGlobe />
        </Float>
      </Canvas>
    </div>
  );
}
