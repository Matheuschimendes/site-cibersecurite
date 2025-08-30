"use client";

import { TextReveal } from "@/components/magicui/text-reveal";
import React, { useRef } from "react";
import { Cards } from "./cards";
import { SessaoConsultoria } from "../_components/SessaoConsultoria";
import { useTranslations } from "next-intl";

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

const About = ({ features = [] }: AboutProps) => {
  const t = useTranslations("About");
  const tConsultoria = useTranslations("Posicionamento");

  return (
    <section className="-mt-20 md:-mt-70 p-5 py-24 flex flex-col items-center justify-center relative w-full bg-gradient-to-br">
      <div className="container max-w-7xl mx-auto">
        {/* Título */}
        <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {t("title")}{" "}
          <span
            className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent"
            style={{ fontWeight: 900 }}
          >
            {t("subtitle")}
          </span>
        </h2>

        {/* Linha decorativa */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

        {/* Descrição com efeito */}
        <TextReveal className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-3xl">
          {t("description")}
        </TextReveal>

        {/* Grid de Cards */}
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {features.map((feature) => (
            <CardWithLight key={feature.id} feature={feature} />
          ))}
        </div>
      </div>

      {/* Cards adicionais */}
      <div>
        <Cards />
      </div>

      <SessaoConsultoria
        title={tConsultoria("title")}
        description={tConsultoria("description")}
        descriptionButton={tConsultoria("button")}
      />
    </section>
  );
};

export { About };
