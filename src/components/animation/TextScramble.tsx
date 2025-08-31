"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { animatePageIn } from "../../utils/animations"; // seu util de animação de carregamento

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
  duration = 2.3,
  chars = "01",
}: TextScrambleProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      if (!textRef.current) return;

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
    };

    // Aguarda o carregamento completo da página e a animação de entrada
    const init = async () => {
      if (document.readyState !== "complete") {
        await new Promise((resolve) =>
          window.addEventListener("load", resolve, { once: true })
        );
      }

      // Espera animatePageIn terminar (assumindo que é uma Promise)
      if (animatePageIn) await animatePageIn();

      startAnimation();
    };

    init();
  }, [children, duration, chars]);

  return (
    <div className={cn("", className)}>
      <span ref={textRef}></span>
    </div>
  );
}
