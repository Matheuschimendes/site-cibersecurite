"use client";

import { useState } from "react";
import { ArrowUpRight, Video } from "lucide-react";

import StarCanvas from "./star";
import { SessaoConsultoria } from "./SessaoConsultoria";
import Tags from "./tags";
import Modal from "./modal";
import { useTranslations } from "next-intl";
import { TextScramble } from "@/components/animation/TextScramble";

interface GalleryItem {
  id: string;
  key: string;
  icon?: React.ReactNode;
  namespace?: "galLery" | "mentorias";
}

interface GalleryProps {
  paragraph?: string;
  items?: GalleryItem[];
}

const Gallery = ({
  paragraph,
  items = [
    { id: "item-1", key: "OPSEC", icon: <Video size={40} />, namespace: "mentorias" },
    { id: "item-2", key: "Threat_Intelligence", icon: <Video size={40} />, namespace: "mentorias" },
    { id: "item-3", key: "Pentest_Web", icon: <Video size={40} />, namespace: "mentorias" },
  ],
}: GalleryProps) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const t = useTranslations("mentorias");
  const tConsultoria = useTranslations("Personalizada2");

  return (
    <section
      id="treinamentos"
      className="p-5 mt-30 w-screen h-full flex flex-col items-center justify-center relative bg-gradient-to-br"
    >
      <StarCanvas />

      <div className="container max-w-7xl px-4">
        {/* ===== Título e descrição ===== */}
        <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl flex-col md:flex-row font-extrabold tracking-tight mb-4 leading-tight inline-flex">
              <TextScramble className="text-white mr-4">{t("title")}</TextScramble>
              <TextScramble
                className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent font-extrabold"
                duration={2.5}
              >
                {t("subtitle")}
              </TextScramble>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

            <TextScramble className="mt-6 max-w-xl text-gray-300 text-lg leading-relaxed">
              {paragraph || t("description")}
            </TextScramble>
          </div>
        </div>

        {/* ===== Cards centralizados ===== */}
        <div className="flex flex-wrap justify-center gap-8 md:mb-10 mb-20">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="
                mx-4 my-6 md:max-w-[352px] w-full sm:w-[352px]
                rounded-[24px] border-transparent
                bg-gradient-to-br from-[#1e1e1e] via-[#171717] to-[#0f0f0f]
                p-8 text-white shadow-lg shadow-[#E32320]/25
                transition-all duration-300 cursor-pointer
                hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:border-[#E32320]
              "
            >
              <div className="flex flex-col h-full group">
                <div className="mb-5 flex items-center justify-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold uppercase tracking-wide text-[#E32320] group-hover:text-[#ff574d] transition-colors duration-300">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p>{t(`items.${item.key}.paragraph`) || t(`items.${item.key}.summary`)}</p>
                  </div>
                </div>

                <p className="mb-6 flex-grow text-gray-300 leading-relaxed text-base">
                  {t(`items.${item.key}.description`)}
                </p>

                <div className="md:mt-5 md:mb-5 flex flex-wrap gap-2 justify-between">
                  <p>{t(`items.${item.key}.tags`)}</p>
                  <Tags>{t(`items.${item.key}.tagsSecond`)}</Tags>
                </div>

                <div className="mt-auto flex items-center gap-3 text-sm font-semibold text-[#E32320] group-hover:underline">
                  {t("learn_more")}
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Sessão Consultoria ===== */}
      <SessaoConsultoria
        title={tConsultoria("title")}
        description={tConsultoria("description")}
        descriptionButton={tConsultoria("button")}
      />

      {/* ===== Modal ===== */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={
          selectedItem
            ? { ...selectedItem, namespace: "mentorias" }
            : undefined
        }
      />
    </section>
  );
};

export default Gallery;
