"use client";

import { TextScramble } from "@/components/animation/TextScramble";
import Image from "next/image";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  subDescription: string;
  image: string;
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
        relative group flex flex-col md:flex-row gap-8 p-8 rounded-[20px] border border-transparent
        bg-gradient-to-br from-[#1b1b1b] via-[#121212] to-[#0a0a0a]
        shadow-[0_0_15px_rgba(227,35,32,0.15)]
        transition-transform duration-400 ease-in-out
        hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:-translate-y-2
        overflow-hidden
      "
    >
      {/* Efeito de luz restrito ao card */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[20px] overflow-hidden"
        style={{
          background: `radial-gradient(250px circle at var(--x, 50%) var(--y, 50%), rgba(227, 35, 32, 0.25), transparent 85%)`,
          transition: "background 0.25s ease",
          filter: "blur(60px)",
          opacity: 0.8,
        }}
      />

      {/* Texto */}
      <div className="relative z-10 flex-1">
        <h3 className="text-3xl font-extrabold text-white leading-snug mb-3">
          {feature.title}
        </h3>
        <div className="text-gray-300 text-base leading-relaxed space-y-4">
          <p>{feature.description}</p>
          <p>{feature.subDescription}</p>
        </div>
      </div>

      {/* Imagem isolada do efeito */}
      <div className="relative flex-shrink-0 w-full md:w-1/3 z-0">
        <Image
          src={feature.image}
          alt={feature.title}
          width={400}
          height={300}
          className="rounded-xl object-cover w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

const AboutService = ({ features = [] }: AboutProps) => {
  const pathname = usePathname(); // /pt/leak_detection
  const serviceKey = pathname.split("/")[2] || "brand_protection"; // pega o segmento da rota
  const t = useTranslations(`galLery.items.${serviceKey}`); // pega as traduções do serviço automaticamente

  return (
    <section
      id="about"
      className="p-5 flex flex-col items-center justify-center relative w-full bg-gradient-to-br overflow-hidden -mt-30"
    >
      <div className="container mx-auto">
        {/* Sections desafio */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 relative">
          {/* Texto principal com z-10 */}
          <div className="flex-1 flex flex-col items-start relative overflow-hidden">
            <h1 className="text-3xl font-extrabold tracking-tight mb-4 leading-tight text-left flex flex-col md:flex-row items-start">
              <TextScramble
                className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent font-extrabold"
                duration={2.5}
              >
                {t("list_title_desafio")}
              </TextScramble>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

            <p className="text-xl font-light text-gray-300 leading-relaxed max-w-full break-words">
              {t("list_title_Description_desafio")}
            </p>

          </div>

          {/* Imagem isolada, z-0, não afetada pelo texto */}
          <div className="flex-1 relative z-0 w-full">
            <Image
              src={t("image_desafio") || "/person.jpg"}
              alt={t("title") || "About Service Image"}
              width={600}
              height={400}
              className="rounded-xl object-center w-full h-auto"
              priority
            />
          </div>
        </div>
        {/* Sections solucao */}
        <div className="mt-20 flex flex-col md:flex-row md:items-start md:justify-between gap-12 relative">
          {/* Imagem isolada, z-0, não afetada pelo texto */}
          <div className="flex-1 relative z-0 w-full">
            <Image
              src={t("image_solucao") || "/person.jpg"}
              alt={t("title_solucao") || "About Service Image"}
              width={600}
              height={400}
              className="rounded-xl object-center w-full h-auto"
              priority
            />
          </div>

          {/* Texto principal com z-10 */}
          <div className="flex-1 flex flex-col items-start relative overflow-hidden">
            <h1 className="text-3xl font-extrabold tracking-tight mb-4 leading-tight text-left flex flex-col md:flex-row items-start">
              <TextScramble
                className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent font-extrabold"
                duration={2.5}
              >
                {t("list_title_solucao")}
              </TextScramble>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

            <p className="text-xl font-light text-gray-300 leading-relaxed max-w-full break-words">
              {t("list_title_Description_solucao")}
            </p>

          </div>
        </div>

        {/* Cards opcionais */}
        {features.length > 0 && (
          <div className="mt-12 grid gap-12 w-full">
            {features.map((feature) => (
              <CardWithLight key={feature.id} feature={feature} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { AboutService };
