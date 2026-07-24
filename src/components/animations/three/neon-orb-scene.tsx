"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/utils/cn";

function NeonCore({ reduced }: { reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.35;
    mesh.current.rotation.x += delta * 0.12;
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={mesh} scale={1.15}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ff2d6f"
          emissive="#ff2d6f"
          emissiveIntensity={0.55}
          metalness={0.3}
          roughness={0.35}
          wireframe
        />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00e5ef"
          emissive="#00e5ef"
          emissiveIntensity={0.4}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

export type NeonOrbSceneProps = {
  className?: string;
};

/**
 * Why in-view + DPR cap: WebGL stays off the critical path and pauses when unseen.
 */
export function NeonOrbScene({ className }: NeonOrbSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "100px 0px",
    threshold: 0.15,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-ink-950",
        className,
      )}
    >
      {inView && !reducedMotion ? (
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          className="!absolute inset-0 size-full"
        >
          <color attach="background" args={["#03040a"]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 3, 5]} intensity={40} color="#ff2d6f" />
          <pointLight position={[-4, -2, 3]} intensity={30} color="#00e5ef" />
          <Suspense fallback={null}>
            <NeonCore reduced={reducedMotion} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-24 rounded-full border border-vice-pink/40 bg-vice-pink/10 shadow-glow-pink" />
        </div>
      )}
    </div>
  );
}
