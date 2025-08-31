"use client";

import { useRef, useEffect } from "react";
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

  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.textContent = text;
  }, [text]);

  const handleMouseEnter = () => { // Alterado para handleMouseEnter
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      scrambleText: {
        text,
        chars,
        speed: 0,
      },
      duration: 0.5,
      ease: "none",
    });
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={cn(className)}
    >
      <span ref={textRef}>{text}</span>
    </button>
  );
}
