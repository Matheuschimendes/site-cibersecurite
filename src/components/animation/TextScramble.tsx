"use client";

import { useEffect, useRef } from "react";
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

    // Se a página já estiver carregada, inicia imediatamente
    if (document.readyState === "complete") {
      startAnimation();
    } else {
      // Aguarda o carregamento total da página
      window.addEventListener("load", startAnimation);
      return () => window.removeEventListener("load", startAnimation);
    }
  }, [children, duration, chars]);

  return (
    <div className={cn("", className)}>
      <span ref={textRef}></span>
    </div>
  );
}
