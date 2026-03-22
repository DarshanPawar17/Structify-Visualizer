import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const Scene3DBackground = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "#000000",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
        
        <GeometricContent />
      </Canvas>
    </div>
  );
};

const GeometricContent = () => {
  const icosaRef = useRef();
  const torusRef = useRef();
  const particlesRef = useRef();

  // Create random particles
  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const time = state.clock.getElapsedTime();

    // Scroll-linked rotation + idle rotation
    if (icosaRef.current) {
      icosaRef.current.rotation.y = time * 0.1 + scrollY * 0.002;
      icosaRef.current.rotation.x = time * 0.05 + scrollY * 0.001;
    }

    if (torusRef.current) {
      torusRef.current.rotation.y = -time * 0.15 - scrollY * 0.003;
      torusRef.current.rotation.z = time * 0.1 + scrollY * 0.0015;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02 + scrollY * 0.0005;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Icosahedron - Main shape */}
        <mesh ref={icosaRef} position={[2, 1, -2]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#00D4FF"
            wireframe
            transparent
            opacity={0.4}
            emissive="#00D4FF"
            emissiveIntensity={2}
          />
        </mesh>

        {/* Torus Knot - Secondary depth */}
        <mesh ref={torusRef} position={[-3, -2, -4]}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 16]} />
          <meshStandardMaterial
            color="#0050FF"
            wireframe
            transparent
            opacity={0.3}
            emissive="#0050FF"
            emissiveIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Floating Particles */}
      <Points ref={particlesRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </>
  );
};

export default Scene3DBackground;
