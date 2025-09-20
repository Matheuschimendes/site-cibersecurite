"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { TextScramble } from "@/components/animation/TextScramble";
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";
import { Button } from "@/components/ui/button";
import { CardsSectionBusiness } from "./cardsServiceBusiness";

const SectionBusiness = () => {
  const pathname = usePathname();
  const serviceKey = pathname.split("/")[0] || "seu_negocio";
  const t = useTranslations(`galLery.${serviceKey}`);

  return (
    <div
      className="
        relative flex w-full flex-col items-center justify-center
        bg-gradient-to-br px-4 sm:px-6 md:px-10
        py-5 sm:py-16 md:py-0
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
