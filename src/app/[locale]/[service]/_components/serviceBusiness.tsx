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
  const serviceKey = pathname.split("/")[2] || "brand_protection";
  const t = useTranslations(`galLery.items.${serviceKey}.seu_negocio`);

  return (
    <div
      className="
        relative flex w-full flex-col items-center justify-center
        bg-gradient-to-br
        px-4 sm:px-6 md:px-10
        py-8 sm:py-12 md:py-20
        overflow-hidden
      "
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <h1
            className="
              mx-auto
              flex flex-wrap justify-center text-center
              max-w-md sm:max-w-2xl md:max-w-5xl
              text-3xl sm:text-4xl md:text-6xl
              font-extrabold tracking-tight text-neutral-300
              leading-tight
              overflow-hidden"
          >
            <TextScramble className="text-white">{t("title")}</TextScramble>
          </h1>


          <TextScramble
            className="
              mx-auto mt-4
              max-w-sm sm:max-w-2xl
              text-center
              text-base sm:text-lg md:text-2xl
              font-medium text-neutral-400
            "
          >
            {t("description")}
          </TextScramble>

          {/* Cards responsivos: coluna no mobile */}
          <div className="mt-8 w-full flex flex-col gap-6 sm:gap-8 md:gap-10 sm:flex-row sm:flex-wrap sm:justify-center">
            <CardsSectionBusiness />
          </div>

          <div className="mt-8 sm:mt-10 flex items-center justify-center">
            <Button
              size="lg"
              className="
                z-10 rounded-lg
                px-6 py-3
                text-sm sm:text-base font-semibold text-white
                transition-colors
              "
              asChild
            >
              <Link href="http://wa.me/447367184395" passHref target="_blank">
                <HoverScrambleButton
                  text={t("button")}
                  className="
                    cursor-pointer rounded bg-[#E32320]
                    px-6 py-3
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
