import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = ({ color, distort, speed }) => {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed}
          roughness={0.4}
          metalness={0.2}
        />
      </Sphere>
    </Float>
  );
};

const BackgroundParticles = () => {
  const group = useRef(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

const Hero3DBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Soft lighting for the scene */}
        <ambientLight intensity={1} />
        {/* Accent light matching the primary blue color */}
        <directionalLight position={[10, 10, 5]} intensity={3} color="#4A5C8A" />
        {/* Accent light matching the orange/accent color */}
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#9BA8AB" />
        
        <BackgroundParticles />
        
        {/* Right main orb */}
        <group position={[4, 0, -2]} scale={1.2}>
          <AnimatedSphere color="#4A5C8A" distort={0.4} speed={2} />
        </group>
        
        {/* Left secondary orb */}
        <group position={[-5, 1, -4]} scale={0.8}>
          <AnimatedSphere color="#253745" distort={0.3} speed={1.5} />
        </group>

        {/* Top small orb */}
        <group position={[1, 3, -6]} scale={0.5}>
          <AnimatedSphere color="#9BA8AB" distort={0.5} speed={3} />
        </group>
      </Canvas>
    </div>
  );
};

export default Hero3DBackground;
