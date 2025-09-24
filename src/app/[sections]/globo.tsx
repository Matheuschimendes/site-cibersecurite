"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextScramble } from "@/components/animation/TextScramble";
import { useTranslations } from 'next-intl';
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function Globe() {
  const t = useTranslations('Home');

  const globeConfig = {
    pointSize: 4, //alterar tamanho dos pontos
    globeColor: "#000000", //alterar cor do globo
    showAtmosphere: true, //alterar cor da atmosfera
    atmosphereColor: "#FFFFFF",//alterar cor da atmosfera
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#E32320",
    directionalLeftLight: "#E32320",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#E32320", "#E32320", "#E32320"];
  const sampleArcs = [
    {
      order: 1,
      startLat: 37.0902, // EUA (aprox. centro)
      startLng: -95.7129,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -14.2350, // Brasil
      startLng: -51.9253,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length + 1))],
    },
    {
      order: 3,
      startLat: 61.5240, // Rússia
      startLng: 105.3188,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 35.8617, // China
      startLng: 104.1954,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 36.2048, // Japão
      startLng: 138.2529,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 51.1657, // Alemanha
      startLng: 10.4515,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 23.6345, // México
      startLng: -102.5528,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 31.0461, // Israel
      startLng: 34.8516,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: -30.5595, // África do Sul
      startLng: 22.9375,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    <>
      <div className="flex flex-row items-center justify-center py-10 h-screen md:h-auto relative w-full">
        <div className="mt-30 max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[65rem] px-4">
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
            <h1 className="text-center text-3xl md:text-7xl font-extrabold tracking-tight leading-tight flex justify-center flex-wrap">
              <TextScramble className="text-white">{t('title')}</TextScramble>
              <TextScramble className="text-[#E32320] ml-1">{t('subtitle')}</TextScramble>
              <TextScramble className="text-white ml-1">{t('subtitle2')}</TextScramble>
            </h1>

            {/* <p className="text-center text-lg md:text-2xl font-medium">Don&rsquo;t <span className=" text-[#E32320]">React. </span> Anticipate </p> */}
            <TextScramble className="text-center text-lg md:text-2xl font-medium text-neutral-300 max-w-2xl mt-4 mx-auto">
              {t('title2')}
            </TextScramble>

            <TextScramble className="text-center text-lg md:text-1xl font-medium text-neutral-400 max-w-2xl mt-4 mx-auto z-10">
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
          <div className=" absolute w-full bottom-10 inset-x-0 h-10 bg-gradient-to-b pointer-events-none select-none from-transparent " />
        </div >
        {/* Globos */}
        <div
          className="md:-mt-290 absolute w-full -bottom-50 md:-bottom-25 h-120 md:h-230"
          id="hero-lightpass" >
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>

      </div >
    </>
  );
}