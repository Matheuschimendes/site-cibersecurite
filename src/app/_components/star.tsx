"use client";

import { useRef, Suspense, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";
import { useInView } from "react-intersection-observer";

// Componente memoizado para reduzir re-renders desnecessários
const Star = memo(({ animate }: { animate: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  // Cria posições dos pontos uma vez
  const positions = useRef(
    new Float32Array(random.inSphere(new Float32Array(200), { radius: 1.2 }))
  );

  useFrame((_, delta) => {
    if (animate && ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.004}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
});

const StarCanvas = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [shouldRender, setShouldRender] = useState(false);

  // Só renderiza Canvas quando o componente entra na viewport
  useEffect(() => {
    if (inView) setShouldRender(true);
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full absolute inset-0 z-[-1] pointer-events-none">
      {shouldRender && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          frameloop="demand" // só renderiza quando houver animação
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Star animate={inView} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default StarCanvas;
