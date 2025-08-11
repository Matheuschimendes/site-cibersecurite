"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { ComponentPropsWithoutRef, FC, ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="">
        {words.map((word, i) => (
          <Word key={i} index={i} controls={controls}>
            {word}
          </Word>
        ))}
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  index: number;
  controls: ReturnType<typeof useAnimation>;
}

const Word: FC<WordProps> = ({ children, index, controls }) => {
  return (
    <motion.span
      className="mx-1 inline-block"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delay: index * 0.05, // efeito cascata por palavra
            duration: 0.4,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.span>
  );
};
