"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
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

import StarCanvas from "./star";
import { SessaoConsultoria } from "./SessaoConsultoria";
import { TextScramble } from "@/components/animation/TextScramble";

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
  const t = useTranslations("galLery");
  const tConsultoria = useTranslations("Personalizada");
  const locale = useLocale();

  // dados traduzidos
  const jsonItems = t.raw("items") as Record<string, GalleryTranslationItem>;

  const items: GalleryItem[] = Object.keys(jsonItems).map((key, index) => ({
    id: `item-${index + 1}`,
    key,
    icon: iconMap[key] || <Zap size={40} />,
    namespace: "galLery",
  }));

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
        </div>
      </div>

      <div className="w-full h-full overflow-hidden md:mb-10 mb-10">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="mx-auto my-6 w-[90%] md:w-full
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
            </div>
          ))}
        </div>
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
