"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Eye,
  Globe,
  Search,
  ShieldIcon,
  TriangleAlert,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import StarCanvas from "./star";
import { SessaoConsultoria } from "./SessaoConsultoria";
import { TextScramble } from "@/components/animation/TextScramble";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface GalleryItem {
  id: string;
  key: string;
  icon?: React.ReactNode;
  namespace?: "galLery" | "mentorias";
}

interface GalleryTranslationItem {
  title: string;
  description: string;
}

const iconMap: Record<string, React.ReactNode> = {
  brand_protection: <ShieldIcon size={40} />,
  leak_detection: <Search size={40} />,
  vip_protection: <Eye size={40} />,
  cyber_risk_insights: <Brain size={40} />,
  corporate_counterintelligence: <Users size={40} />,
  digital_investigations: <TriangleAlert size={40} />,
  threat_analysis: <Globe size={40} />,
  takedown_disassembly: <Zap size={40} />,
};

const Gallery = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const t = useTranslations("galLery");
  const tConsultoria = useTranslations("Personalizada");
  const locale = useLocale(); // ✅ idioma atual (ex: "pt")

  // Tipagem segura para os dados traduzidos
  const jsonItems = t.raw("items") as Record<string, GalleryTranslationItem>;

  const items: GalleryItem[] = Object.keys(jsonItems).map((key, index) => ({
    id: `item-${index + 1}`,
    key,
    icon: iconMap[key] || <Zap size={40} />,
    namespace: "galLery",
  }));

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);
  }, [carouselApi]);

  return (
    <section className="p-5 w-screen h-full flex flex-col items-center justify-center relative bg-gradient-to-br md:pb-10">
      <StarCanvas />

      <div className="container max-w-7xl px-4">
        <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl flex-col md:flex-row font-extrabold tracking-tight mb-4 leading-tight inline-flex">
              <TextScramble className="text-white mr-4">
                {t("title")}
              </TextScramble>
              <TextScramble
                className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent font-extrabold"
                duration={2.5}
              >
                {t("subtitle")}
              </TextScramble>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>
            <TextScramble className="mt-6 max-w-xl text-gray-300 text-lg leading-relaxed">
              {t("description")}
            </TextScramble>
          </div>

          <div className="mt-8 flex shrink-0 items-center justify-start gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="border-[#E32320] text-[#E32320] hover:bg-[#E32320]/30 hover:shadow-[0_0_15px_rgba(227,35,32,0.7)] disabled:text-gray-600 disabled:border-gray-600 transition-shadow duration-300"
              aria-label={t("previous_slide")}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="border-[#E32320] text-[#E32320] hover:bg-[#E32320]/30 hover:shadow-[0_0_15px_rgba(227,35,32,0.7)] disabled:text-gray-600 disabled:border-gray-600 transition-shadow duration-300"
              aria-label={t("next_slide")}
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-hidden md:mb-10">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "center",
            slidesToScroll: 1,
            breakpoints: {
              "(max-width: 768px)": { dragFree: false, slidesToScroll: 1 },
            },
          }}
          className="relative w-full h-full"
        >
          <CarouselContent className="hide-scrollbar flex justify-center md:w-full md:ml-auto ml-auto mb-20 h-full">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="flex-none mx-auto my-6 basis-full m-5 md:basis-auto w-[90%] md:max-w-[352px]
                  rounded-[24px] border-transparent 
                  bg-gradient-to-br from-[#1e1e1e] via-[#171717] to-[#0f0f0f] p-8 text-white shadow-lg shadow-[#E32320]/25 
                  transition-all duration-300 hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:border-[#E32320]"
              >
                <div className="flex flex-col h-full group">
                  <div className="mb-5 flex items-center justify-start gap-4">
                    {item.icon}
                    <h3 className="text-xl font-semibold uppercase tracking-wide text-[#E32320] group-hover:text-[#ff574d] transition-colors duration-300">
                      {t(`items.${item.key}.title`)}
                    </h3>
                  </div>

                  <p className="mb-6 flex-grow text-gray-300 leading-relaxed text-base">
                    {t(`items.${item.key}.description`)}
                  </p>

                  <Link
                    href={`/${locale}/${item.key}`}
                    className="mt-auto flex items-center gap-3 text-sm font-semibold text-[#E32320] group-hover:underline"
                  >
                    {t("learn_more")}
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <SessaoConsultoria
        title={tConsultoria("title")}
        description={tConsultoria("description")}
        descriptionButton={tConsultoria("button")}
      />
    </section>
  );
};

export default Gallery;
