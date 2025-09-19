"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { TextScramble } from "@/components/animation/TextScramble";
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";
import { Button } from "@/components/ui/button";
import { CardsSectionBusiness } from "./cardsServiceBusiness";

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
        relative group flex flex-col gap-4 sm:gap-6
        p-6 sm:p-10 rounded-[20px] border border-transparent
        bg-gradient-to-br from-[#1b1b1b] via-[#121212] to-[#0a0a0a]
        shadow-[0_0_15px_rgba(227,35,32,0.15)]
        transition-transform duration-400 ease-in-out
        hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:-translate-y-2
        overflow-hidden
      "
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[20px]"
        style={{
          background: `radial-gradient(
            250px circle at var(--x, 50%) var(--y, 50%),
            rgba(227, 35, 32, 0.25),
            transparent 85%
          )`,
          transition: "background 0.25s ease",
          filter: "blur(60px)",
          opacity: 0.8,
        }}
      />

      <div className="relative">
        <h3 className="mb-2 sm:mb-3 text-2xl sm:text-3xl font-extrabold leading-snug text-white">
          {feature.title}
        </h3>

        <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-gray-300">
          <p>{feature.description}</p>
          <p>{feature.subDescription}</p>
        </div>
      </div>
    </div>
  );
};

const SectionBusiness = ({ features = [] }: AboutProps) => {
  const pathname = usePathname();
  const serviceKey = pathname.split("/")[0] || "seu_negocio";
  const t = useTranslations(`galLery.${serviceKey}`);

  return (
    <div
      className="
        relative flex w-full flex-col items-center justify-center
        bg-gradient-to-br px-4 sm:px-6 md:px-10
        py-5 sm:py-16 md:py-0   /* <-- margens verticais */
        overflow-hidden
      "
    >
      <div className="relative mx-auto h-full w-full max-w-full overflow-hidden md:h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1
            className="
              mx-auto mt-2 sm:mt-4 md:mt-6
              flex flex-wrap justify-center text-center
              max-w-xl sm:max-w-2xl md:max-w-5xl
              text-4xl sm:text-3xl md:text-6xl
              font-extrabold tracking-tight text-neutral-400
              leading-tight
            "
          >
            <TextScramble className="text-white">{t("title")}</TextScramble>
          </h1>

          <TextScramble
            className="
              mx-auto mt-3 sm:mt-4 md:mt-6
              max-w-lg sm:max-w-2xl
              text-center text-base sm:text-lg md:text-2xl
              font-medium text-neutral-400
            "
          >
            {t("description")}
          </TextScramble>

          <CardsSectionBusiness />

          <div className="mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-6 flex items-center justify-center">
            <Button
              size="lg"
              className="
                z-10 rounded-lg px-5 sm:px-6 py-2 sm:py-3
                text-sm sm:text-base font-semibold text-white
                transition-colors
              "
              asChild
            >
              <Link href="/login" passHref>
                <HoverScrambleButton
                  text={t("button")}
                  className="
                    cursor-pointer rounded bg-[#E32320]
                    px-5 sm:px-6 py-2 sm:py-3
                    text-sm sm:text-base font-semibold text-white
                    transition hover:bg-white hover:text-[#E32320]
                  "
                />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export { SectionBusiness };
