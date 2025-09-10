"use client";

import { useRef, Suspense, useEffect, useState, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";
import { useInView } from "react-intersection-observer";

// Componente memoizado Star
const Star = memo(({ animate }: { animate: boolean }) => {
  const ref = useRef<THREE.Points>(null);
  const [time, setTime] = useState(0);

  // Cria posições dos pontos apenas uma vez
  const positions = useRef(
    new Float32Array(random.inSphere(new Float32Array(200), { radius: 1.2 }))
  );

  useFrame((_, delta) => {
    if (animate && ref.current) {
      // Animação de rotação
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // Incrementa o tempo para animações baseadas no tempo
      setTime((prevTime) => prevTime + delta);

      // Animação de movimento das estrelas (com suavização)
      ref.current.position.x = Math.sin(time * 0.5) * 0.1;
      ref.current.position.y = Math.cos(time * 0.5) * 0.1;
      ref.current.position.z = Math.sin(time * 2) * 0.05;
    }
  });

  // Alteração de cor dinâmica baseada no tempo
  const color = new THREE.Color();
  color.setHSL(Math.sin(time * 0.25) * 0.5 + 0.5, 1.0, 0.5); // Oscilação de cor

  // Alteração do tamanho das estrelas baseado no tempo
  const size = 0.004 + Math.sin(time) * 0.001; // Efeito de pulsação de tamanho

  // Intensidade do brilho (emissivo) - Usando Opacidade e Cor
  const opacity = Math.sin(time * 1.5) * 0.5 + 0.5; // Pulsação de opacidade

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
          opacity={opacity} // Agora usa opacidade para o efeito de brilho
        />
      </Points>
    </group>
  );
});

// Define displayName para eliminar warning do ESLint
Star.displayName = "Star";

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
          frameloop="demand" // só renderiza quando há animação
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
