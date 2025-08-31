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
  chars?: string; // caracteres usados na transição (default: binário "01")
}

export function TextScramble({
  children,
  className,
  duration = 2.3,
  chars = "01",
}: TextScrambleProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
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
        start: "top 80%", // quando 80% da tela chegar no elemento
        once: true, // roda só uma vez
      },
    });
  }, [children, duration, chars]);

  return (
    <div className={cn("", className)}>
      <span ref={textRef}></span>
    </div>
  );
}
