"use client";

import { useMemo, useEffect, useState } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextScramble } from "@/components/animation/TextScramble";
import { useTranslations } from "next-intl";
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";

// Importa globo dinamicamente, sem SSR, sem loading
const World = dynamic(() => import("@/components/ui/globe").then(m => m.World), {
  ssr: false,
});

// Tipo compatível com a prop cameraPosition do World
type CameraPosition = {
  x: number;
  y: number;
  z: number;
};

export default function Globe() {
  const t = useTranslations("Home");

  // Valor padrão da câmera
  const defaultCameraPosition: CameraPosition = { x: 0, y: 0, z: 300 };

  // Estado booleano para mostrar o globo
  const [showGlobe, setShowGlobe] = useState<boolean>(false);
  // Estado da posição da câmera
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>(defaultCameraPosition);

  useEffect(() => {
    try {
      const storedCamera = localStorage.getItem("globe-camera");
      if (storedCamera) {
        const parsed = JSON.parse(storedCamera) as CameraPosition;
        if (
          typeof parsed.x === "number" &&
          typeof parsed.y === "number" &&
          typeof parsed.z === "number"
        ) {
          setCameraPosition(parsed);
        }
      }
      setShowGlobe(true);
      localStorage.setItem("globe-rendered", "true");
    } catch {
      setShowGlobe(true);
    }
  }, []);

  const globeConfig = useMemo(
    () => ({
      pointSize: 4,
      globeColor: "#000000",
      showAtmosphere: true,
      atmosphereColor: "#FFFFFF",
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
    }),
    []
  );

  const colors = useMemo(() => ["#E32320", "#E32320", "#E32320"], []); // cores aleatórias para os arcos do globo

  const sampleArcs = useMemo( // 4 arcos aleatórios para o globo rotacionar ao longo do tempo
    () => [
      { order: 1, startLat: 37.0902, startLng: -95.7129, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 2, startLat: -14.235, startLng: -51.9253, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[1] },
      { order: 3, startLat: 61.524, startLng: 105.3188, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 4, startLat: 35.8617, startLng: 104.1954, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 5, startLat: 36.2048, startLng: 138.2529, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 6, startLat: 51.1657, startLng: 10.4515, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 7, startLat: 23.6345, startLng: -102.5528, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 8, startLat: 31.0461, startLng: 34.8516, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
      { order: 9, startLat: -30.5595, startLng: 22.9375, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
    ],
    [colors]
  );

  return (
    <div className="flex flex-col items-center justify-center py-10 h-screen md:h-auto relative w-full">
      <div className="mt-30 max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[55rem] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="div"
        >
          <h1 className="text-center text-3xl md:text-7xl font-extrabold tracking-tight leading-tight flex justify-center flex-wrap">
            <TextScramble className="text-white">{t("title")}</TextScramble>
            <TextScramble className="text-red-600 ml-1">{t("subtitle")}</TextScramble>
            <TextScramble className="text-white ml-1">{t("subtitle2")}</TextScramble>
          </h1>

          <TextScramble className="text-center text-lg md:text-2xl font-medium text-neutral-300 max-w-2xl mt-4 mx-auto">
            {t("title2")}
          </TextScramble>

          <TextScramble className="text-center text-lg md:text-1xl font-medium text-neutral-400 max-w-2xl mt-4 mx-auto z-10">
            {t("description")}
          </TextScramble>

          <div className="flex items-center justify-center mt-8">
            <Button
              size="lg"
              className="z-10 text-white font-semibold text-base px-6 py-3 rounded-lg transition-colors"
              asChild
            >
              <Link href="/login" passHref>
                <HoverScrambleButton
                  text={t("button")}
                  className="bg-red-600 hover:bg-white hover:text-[#E32320] text-white font-semibold px-6 py-3 rounded transition cursor-pointer"
                />
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="absolute w-full bottom-10 inset-x-0 h-10 bg-gradient-to-b pointer-events-none select-none from-transparent" />
      </div>

      {/* 🌍 Renderiza o globo */}
      {showGlobe && (
        <div
          className="md:-mt-200 absolute w-full -bottom-50 md:-bottom-10 h-100 md:h-180"
          id="hero-lightpass"
        >
          <World
            data={sampleArcs}
            globeConfig={globeConfig}
            cameraPosition={cameraPosition} // sempre válido
          />
        </div>
      )}
    </div>
  );
}
