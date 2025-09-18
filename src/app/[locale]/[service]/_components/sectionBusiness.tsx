"use client";

import { TextScramble } from "@/components/animation/TextScramble";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { SessaoConsultoria } from "@/app/_components/SessaoConsultoria";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";
import { Cards } from "./cardsSecvice";
import { usePathname } from "next/navigation";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  subDescription: string;
}

interface AboutProps {
  features?: Feature[];
}

const CardWithLight = ({ feature }: { feature: Feature }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="
        relative group flex flex-col gap-6 p-10 rounded-[20px] border border-transparent
        bg-gradient-to-br from-[#1b1b1b] via-[#121212] to-[#0a0a0a]
        shadow-[0_0_15px_rgba(227,35,32,0.15)] 
        transition-transform duration-400 ease-in-out
        hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:-translate-y-2
        overflow-hidden
      "
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      {/* Luz dinâmica com gradiente vermelho suave */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[20px]"
        style={{
          background: `radial-gradient(250px circle at var(--x, 50%) var(--y, 50%), rgba(227, 35, 32, 0.25), transparent 85%)`,
          transition: "background 0.25s ease",
          filter: "blur(60px)",
          opacity: 0.8,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10">
        <h3 className="text-3xl font-extrabold text-white leading-snug mb-3">
          {feature.title}
        </h3>

        <div className="text-gray-300 text-base leading-relaxed space-y-4">
          <p>{feature.description}</p>
          <p>{feature.subDescription}</p>
        </div>
      </div>
    </div>
  );
};

const SectionBusiness = ({ features = [] }: AboutProps) => {
  const pathname = usePathname();
  const serviceKey = pathname.split("/")[2] || "brand_protection" // pega o nome do serviço
  const t = useTranslations(`galLery.items.${serviceKey}`); // pega as traduções específicas do serviço

  return (
    <div className="p-0 md:p-10 py-24 flex flex-col items-center justify-center relative w-full bg-gradient-to-br overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-full px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h1 className="text-center text-3xl md:text-7xl  font-extrabold md:max-w-2xl tracking-tight leading-tight flex justify-center flex-wrap
        text-neutral-400 max-w-2xl mt-4 mx-auto">
            <TextScramble className="text-white">{t('SectionServiceSecond.title')}</TextScramble>
          </h1>

          <TextScramble className="text-center text-lg md:text-2xl font-medium text-neutral-400 max-w-2xl mt-4 mx-auto z-10">
            {t('SectionServiceSecond.description')}
          </TextScramble>

          <Cards />

          <div className="flex items-center justify-center mt-8">
            <Button
              size="lg"
              className="z-10  text-white font-semibold text-base px-6 py-3 rounded-lg transition-colors"
              asChild
            >
              <Link href="/login" passHref>
                <HoverScrambleButton
                  text={t('SectionServiceSecond.button')}       // aqui passa o texto corretamente
                  className="bg-[#E32320] hover:bg-white hover:text-[#E32320] text-white font-semibold px-6 py-3 rounded transition cursor-pointer"
                />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div >
    </div >
  );
};

export { SectionBusiness };
