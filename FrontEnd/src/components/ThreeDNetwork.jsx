import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 3D Nodes Network
function NetworkCluster() {
  const pointsRef = useRef();
  const count = 40;

  // Generate randomized positions
  const points = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }
  });

  return (
    <group ref={pointsRef}>
      {/* Nodes points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#06b6d4"
          size={0.12}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Network Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.25}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

// Fallback Premium SVG Cyber Network
function SvgNetworkFallback({ size = "100%" }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[300px] overflow-hidden">
      {/* Cyber Grid Scanning overlay */}
      <div className="absolute w-[80%] h-[80%] border border-cyan-500/10 rounded-xl glass-panel flex items-center justify-center p-6">
        <svg
          className="w-full h-full text-cyan-500/40"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glowing central node */}
          <circle cx="100" cy="100" r="6" fill="#06b6d4" className="animate-ping" />
          <circle cx="100" cy="100" r="4" fill="#06b6d4" />

          {/* Connected orbiting nodes */}
          <g className="animate-spin" style={{ transformOrigin: '100px 100px', animationDuration: '40s' }}>
            <line x1="100" y1="100" x2="60" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <line x1="100" y1="100" x2="150" y2="70" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="110" y2="160" stroke="currentColor" strokeWidth="0.5" />
            <line x1="100" y1="100" x2="50" y2="130" stroke="#a855f7" strokeWidth="0.5" />

            <circle cx="60" cy="60" r="3" fill="#a855f7" />
            <circle cx="150" cy="70" r="3.5" fill="#06b6d4" />
            <circle cx="110" cy="160" r="2.5" fill="#10b981" />
            <circle cx="50" cy="130" r="3" fill="#06b6d4" />
          </g>

          <g className="animate-spin" style={{ transformOrigin: '100px 100px', animationDuration: '25s', animationDirection: 'reverse' }}>
            <line x1="60" y1="60" x2="40" y2="90" stroke="currentColor" strokeWidth="0.5" />
            <line x1="150" y1="70" x2="160" y2="120" stroke="currentColor" strokeWidth="0.5" />
            <line x1="110" y1="160" x2="70" y2="170" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="2 2" />

            <circle cx="40" cy="90" r="2" fill="#06b6d4" />
            <circle cx="160" cy="120" r="3" fill="#a855f7" />
            <circle cx="70" cy="170" r="2.5" fill="#10b981" />
          </g>
        </svg>

        {/* Binary code bits matrix floating in background */}
        <div className="absolute top-8 left-8 font-mono text-[9px] text-cyan-500/20 select-none leading-none">
          01101001 01101110<br/>
          01110100 01110010<br/>
          01110101 01100100
        </div>
        <div className="absolute bottom-8 right-8 font-mono text-[9px] text-purple-500/20 select-none leading-none">
          SECURE_SYS_ON<br/>
          FIREWALL: PASS<br/>
          IP: 192.168.1.99
        </div>
      </div>
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
    console.warn("R3F failed to render 3D Network, falling back to SVG.", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function ThreeDNetwork() {
  const [useFallback, setUseFallback] = useState(false);

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
    return <SvgNetworkFallback />;
  }

  return (
    <ErrorBoundary fallback={<SvgNetworkFallback />}>
      <div className="w-full h-full min-h-[350px] relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="w-full h-full">
          <ambientLight intensity={0.6} />
          <Stars radius={80} depth={30} count={60} factor={3} saturation={0.5} fade speed={1.5} />
          <NetworkCluster />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
