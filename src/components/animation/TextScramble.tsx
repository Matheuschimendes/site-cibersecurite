"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrambleTextPlugin);

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
    const handleLoad = () => {
      if (!textRef.current) return;

      gsap.to(textRef.current, {
        scrambleText: {
          text: children,
          chars,
          speed: 1,
        },
        duration,
        ease: "1010",
      });
    };

    // Inicia a animação após a página carregar completamente
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [children, duration, chars]);

  return (
    <div
      className={cn(
        "",
        className
      )}
    >
      <span ref={textRef}></span>
    </div>
  );
}
