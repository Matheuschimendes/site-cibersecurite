"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

interface TextScrambleProps {
  children: string;
  className?: string;
  duration?: number;
  chars?: string;
}

export function TextScramble({
  children,
  className,
  duration = 1.2,
  chars = "01",
}: TextScrambleProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      if (textRef.current && !animationStarted) {
        gsap.to(textRef.current, {
          scrambleText: {
            text: children,
            chars,
            speed: 1,
          },
          duration,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        });
        setAnimationStarted(true); // Evita reiniciar a animação
      }
    };

    // Verifica se a página está carregada
    if (document.readyState === "complete") {
      startAnimation();
    } else {
      // Espera pelo carregamento total da página
      const handleLoad = () => {
        startAnimation();
        window.removeEventListener("load", handleLoad); // Remover listener após o evento
      };

      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad); // Cleanup
    }
  }, [children, duration, chars, animationStarted]); // A animação será chamada apenas uma vez

  return (
    <div className={cn("", className)}>
      <span ref={textRef}>{children}</span>
    </div>
  );
}
