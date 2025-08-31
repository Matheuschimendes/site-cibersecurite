"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HoverScrambleButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function HoverScrambleButton({
  text,
  className,
  onClick,
}: HoverScrambleButtonProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);

  // Garante que o texto inicial está correto
  useEffect(() => {
    if (textRef.current) {
      textRef.current.textContent = text;
    }
  }, [text]);

  return (
    <button
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
