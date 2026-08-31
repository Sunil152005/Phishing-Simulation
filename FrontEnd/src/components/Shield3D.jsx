import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

// Interactive 3D Shield Model inside Canvas
function ShieldModel() {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate central object
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
      meshRef.current.position.y = Math.sin(time) * 0.15; // float
    }
    
    // Rotate orbit rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.8;
      ring1Ref.current.rotation.x = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.6;
      ring2Ref.current.rotation.y = time * 0.4;
    }
  });

  return (
    <group>
      {/* Central Cyber Diamond/Shield Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          wireframe 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Solid Inner Core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial 
          color="#a855f7" 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Orbit Ring 1 (Cyan) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 8, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>

      {/* Orbit Ring 2 (Purple) */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.02, 8, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Fallback Premium SVG Shield Component
function SvgShieldFallback({ size = 200 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow Rings */}
      <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-ping pointer-events-none duration-1000 opacity-20"></div>
      <div className="absolute w-[85%] h-[85%] border border-purple-500/30 rounded-full animate-spin pointer-events-none duration-[12s]"></div>
      
      {/* Custom Vector Shield */}
      <svg
        className="w-[70%] h-[70%] text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 8C33 12 20 18 20 18C20 40 25 65 50 88C75 65 80 40 80 18C80 18 67 12 50 8Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(11, 15, 26, 0.6)"
        />
        {/* Core details inside shield */}
        <path
          d="M50 20V74M32 30C32 30 42 35 50 35C58 35 68 30 68 30M32 48C32 48 42 53 50 53C58 53 68 48 68 48"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Glowing Center Node */}
        <circle cx="50" cy="44" r="5" fill="#a855f7" className="animate-pulse" />
      </svg>

      {/* Floating Sparkles around shield */}
      <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
      <div className="absolute bottom-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse"></div>
    </div>
  );
}

// Error Boundary Wrapper
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("R3F failed to render, falling back to SVG Shield.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Shield3D({ size = 300 }) {
  const [useFallback, setUseFallback] = useState(false);

  // Check if WebGL is supported
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      if (!support) setUseFallback(true);
    } catch (e) {
      setUseFallback(true);
    }
  }, []);

  if (useFallback) {
    return <SvgShieldFallback size={size} />;
  }

  return (
    <ErrorBoundary fallback={<SvgShieldFallback size={size} />}>
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="w-full h-full">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={50} factor={4} saturation={0.5} fade speed={1} />
          <ShieldModel />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
