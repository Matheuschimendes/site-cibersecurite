"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextScramble } from "@/components/animation/TextScramble";
import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";

export default function SectionSevice() {
  const pathname = usePathname();
  const serviceKey = pathname.split("/")[2] || "brand_protection" // pega o nome do serviço
  const t = useTranslations(`galLery.items.${serviceKey}`); // pega as traduções específicas do serviço

  return (
    <>
      <div className="mt-30 items-center justify-center py-10 h-screen md:h-auto relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] h-[40rem]px-4">
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
            className="flex flex-col items-center text-center"
          >
            <h1
              className="mt-20
              text-3xl sm:text-4xl md:text-5xl
              font-extrabold tracking-tight leading-tight
              text-neutral-300
              max-w-2xl sm:max-w-3xl md:max-w-5xl
            "
            >
              <TextScramble className="text-white">{t("title")}</TextScramble>
            </h1>


            <TextScramble className="text-center text-lg md:text-2xl font-medium text-neutral-400 max-w-2xl mt-4 mx-auto">
              {t('description')}
            </TextScramble>

            <div className="flex items-center justify-center mt-8">
              <Button
                size="lg"
                className="text-white font-semibold text-base px-6 py-3 rounded-lg transition-colors"
                asChild
              >
                <Link href="#" passHref>
                  <HoverScrambleButton
                    text={t('button')}       // aqui passa o texto corretamente
                    className="bg-red-600 hover:bg-white hover:text-[#E32320] text-white font-semibold px-6 py-3 rounded transition cursor-pointer"
                  />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div >
      </div >
    </>
  );
}