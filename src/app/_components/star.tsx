"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, invalidate } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";
import { useInView } from "react-intersection-observer";

const Star = ({ animate }: { animate: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const sphere = new Float32Array(random.inSphere(new Float32Array(200), { radius: 1.2 }));

  useFrame((_, delta) => {
    if (animate && ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      invalidate(); // só renderiza quando houver movimento
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
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
};

const StarCanvas = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(inView);
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-auto absolute inset-0 z-[-1]">
      {shouldRender && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          frameloop="demand" // renderiza apenas quando pedimos
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
