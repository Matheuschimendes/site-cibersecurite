"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrambleTextPlugin);

interface HoverScrambleButtonProps {
  text: string;
  className?: string;
  chars?: string;
  onClick?: () => void;
}

export function HoverScrambleButton({
  text,
  className,
  chars = "0110",
  onClick,
}: HoverScrambleButtonProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Garante que o texto inicial está correto
  useEffect(() => {
    if (textRef.current) {
      textRef.current.textContent = text;
    }
  }, [text]);

  // // Função de hover otimizada
  // const handleMouseEnter = useCallback(() => {
  //   if (!textRef.current) return;

  //   // Mata qualquer animação anterior antes de criar uma nova
  //   animationRef.current?.kill();

  //   animationRef.current = gsap.to(textRef.current, {
  //     scrambleText: {
  //       text,
  //       chars,
  //       speed: 1.2,
  //     },
  //     duration: 0.4,
  //     ease: "none",
  //   });
  // }, [text, chars]);

  return (
    <button
      // onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-lg bg-[#E32320] text-white font-semibold text-base transition-colors hover:bg-[#b41c1a]",
        className
      )}
    >
      <span ref={textRef}>{text}</span>
    </button>
  );
}
