"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextScramble } from "@/components/animation/TextScramble";
import { useTranslations } from 'next-intl';
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";
import Image from "next/image";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function SectionSevice() {
  const t = useTranslations('SectionService');

  return (
    <>
      <div className="flex flex-row items-center justify-center py-10 h-screen md:h-auto relative w-full">
        <div className="mt-30 max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
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
            <h1 className="text-center text-5xl md:text-7xl  font-extrabold md:max-w-2xl tracking-tight leading-tight flex justify-center flex-wrap
            text-neutral-400 max-w-2xl mt-10 mx-auto">
              <TextScramble className="text-white">{t('title')}</TextScramble>
            </h1>

            <TextScramble className="text-center text-lg md:text-2xl font-medium text-neutral-400 max-w-2xl mt-4 mx-auto z-10">
              {t('description')}
            </TextScramble>

            <div className="flex items-center justify-center mt-8">
              <Button
                size="lg"
                className="z-10  text-white font-semibold text-base px-6 py-3 rounded-lg transition-colors"
                asChild
              >
                <Link href="/login" passHref>
                  <HoverScrambleButton
                    text={t('button')}       // aqui passa o texto corretamente
                    className="bg-[#E32320] hover:bg-white hover:text-[#E32320] text-white font-semibold px-6 py-3 rounded transition cursor-pointer"
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