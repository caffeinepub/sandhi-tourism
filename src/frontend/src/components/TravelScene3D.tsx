import { Octahedron, Torus, TorusKnot } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

interface FloatingMeshProps {
  scrollY: number;
}

function WireframeGlobe({ scrollY }: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.15 - scrollY * 0.002;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#c8640f" wireframe />
    </mesh>
  );
}

function SpinningDiamond({ scrollY }: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.2 - scrollY * 0.0015;
  });

  return (
    <Octahedron ref={meshRef} args={[0.7, 0]}>
      <meshBasicMaterial color="#d4a017" wireframe />
    </Octahedron>
  );
}

function FloatingTorusKnot({ scrollY }: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.4 + 2) * 0.15 - scrollY * 0.001;
  });

  return (
    <TorusKnot ref={meshRef} args={[0.5, 0.15, 80, 12]}>
      <meshBasicMaterial color="#c8640f" wireframe />
    </TorusKnot>
  );
}

function FloatingRing({ scrollY }: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.6;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.6 + 3) * 0.15 - scrollY * 0.0012;
  });

  return (
    <Torus ref={meshRef} args={[0.6, 0.08, 12, 36]}>
      <meshBasicMaterial color="#d4a017" wireframe />
    </Torus>
  );
}

// Globe Scene (top right)
function GlobeScene({ scrollY }: FloatingMeshProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ background: "transparent" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.5} />
      <WireframeGlobe scrollY={scrollY} />
    </Canvas>
  );
}

// Diamond Scene (left)
function DiamondScene({ scrollY }: FloatingMeshProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      style={{ background: "transparent" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.5} />
      <SpinningDiamond scrollY={scrollY} />
    </Canvas>
  );
}

// Knot Scene (bottom)
function KnotScene({ scrollY }: FloatingMeshProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      style={{ background: "transparent" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.5} />
      <FloatingTorusKnot scrollY={scrollY} />
    </Canvas>
  );
}

// Ring scene (additional)
function RingScene({ scrollY }: FloatingMeshProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 50 }}
      style={{ background: "transparent" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.5} />
      <FloatingRing scrollY={scrollY} />
    </Canvas>
  );
}

export default function TravelScene3D() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Globe - top right */}
      <div className="absolute top-16 right-8 md:right-16 lg:right-24 w-32 h-32 md:w-44 md:h-44 opacity-60">
        <GlobeScene scrollY={scrollY} />
      </div>

      {/* Diamond - left middle */}
      <div className="absolute top-1/3 left-4 md:left-12 w-24 h-24 md:w-36 md:h-36 opacity-50">
        <DiamondScene scrollY={scrollY} />
      </div>

      {/* Torus knot - bottom center */}
      <div className="absolute bottom-24 right-8 md:right-32 w-28 h-28 md:w-40 md:h-40 opacity-45">
        <KnotScene scrollY={scrollY} />
      </div>

      {/* Ring - top left */}
      <div className="absolute top-28 left-1/4 w-20 h-20 md:w-28 md:h-28 opacity-35 hidden md:block">
        <RingScene scrollY={scrollY} />
      </div>
    </div>
  );
}
