import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

const Node = ({ position, color = "#6366f1", size = 0.4 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.002;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const Connection = ({ start, end, color = "#6366f1" }) => {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.2}
    />
  );
};

const TreeStructure = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  // Simple Binary Tree Coordinates
  const nodes = [
    { pos: [0, 2, 0], color: "#6366f1" }, // Root
    { pos: [-2, 0, 0], color: "#818cf8" }, // Level 1 L
    { pos: [2, 0, 0], color: "#818cf8" }, // Level 1 R
    { pos: [-3, -2, 1], color: "#a5b4fc" }, // Level 2 LL
    { pos: [-1, -2, -1], color: "#a5b4fc" }, // Level 2 LR
    { pos: [1, -2, 1], color: "#a5b4fc" }, // Level 2 RL
    { pos: [3, -2, -1], color: "#a5b4fc" }, // Level 2 RR
  ];

  const connections = [
    { start: nodes[0].pos, end: nodes[1].pos },
    { start: nodes[0].pos, end: nodes[2].pos },
    { start: nodes[1].pos, end: nodes[3].pos },
    { start: nodes[1].pos, end: nodes[4].pos },
    { start: nodes[2].pos, end: nodes[5].pos },
    { start: nodes[2].pos, end: nodes[6].pos },
  ];

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => (
        <Connection key={i} {...conn} />
      ))}
      {nodes.map((node, i) => (
        <Node key={i} position={node.pos} color={node.color} />
      ))}
    </group>
  );
};

const DynamicDSVisual = () => {
  return (
    <div className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <TreeStructure />
        
        {/* Decorative background particles */}
        <Stars count={500} />
      </Canvas>
    </div>
  );
};

// Simple Stars component if not using drei's
const Stars = ({ count = 500 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 20;
        p[i * 3 + 1] = (Math.random() - 0.5) * 20;
        p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.4} />
    </points>
  );
};

export default DynamicDSVisual;
