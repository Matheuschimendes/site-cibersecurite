"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Target,
  Video,
  Award,
  Lightbulb,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
  heading?: string;
  headingSecond?: string;
  paragraph?: string;
  items?: GalleryItem[];
}

const Gallery = ({
  heading,
  headingSecond,
  paragraph,
  items = [
    { id: "item-1", key: "threat_intelligence", icon: <BookOpen size={40} />, namespace: "mentorias" },
    { id: "item-2", key: "threat_operational", icon: <Target size={40} />, namespace: "mentorias" },
    { id: "item-3", key: "dark_web", icon: <Video size={40} />, namespace: "mentorias" },
    { id: "item-4", key: "opsec", icon: <Award size={40} />, namespace: "mentorias" },
    { id: "item-5", key: "open_source_intelligence", icon: <Lightbulb size={40} />, namespace: "mentorias" },
    { id: "item-6", key: "advanced_investigations", icon: <Users size={40} />, namespace: "mentorias" },
  ],
}: GalleryProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const t = useTranslations("mentorias");
  const tConsultoria = useTranslations("Personalizada2");

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
    <section className="p-5 mt-30 w-screen h-full flex flex-col items-center justify-center relative bg-gradient-to-br">
      <StarCanvas />

      <div className="container max-w-7xl px-4">
        <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl flex-col font-extrabold tracking-tight mb-4 leading-tight inline-flex">
              {/* Título normal */}
              <TextScramble className="text-white mr-4">
                {t("title")}
              </TextScramble>

              {/* Subtítulo com gradiente */}
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

          <div className="mt-8 flex shrink-0 items-center justify-start gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="border-[#E32320] text-[#E32320] hover:bg-[#E32320]/30 hover:shadow-[0_0_15px_rgba(227,35,32,0.7)] disabled:text-gray-600 disabled:border-gray-600 transition-shadow duration-300"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="border-[#E32320] text-[#E32320] hover:bg-[#E32320]/30 hover:shadow-[0_0_15px_rgba(227,35,32,0.7)] disabled:text-gray-600 disabled:border-gray-600 transition-shadow duration-300"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-hidden md:mb-10">
        <Carousel
          setApi={setCarouselApi}
          opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
          className="relative w-full h-full m-auto"
        >
          <CarouselContent className="hide-scrollbar md:w-full m-auto mb-20 h-full">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="
                  mx-4 my-6 md:max-w-[352px] w-5 rounded-[24px] border-transparent
                  bg-gradient-to-br from-[#1e1e1e] via-[#171717] to-[#0f0f0f]
                  p-8 text-white shadow-lg shadow-[#E32320]/25
                  transition-all duration-300
                  hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:border-[#E32320]]
                "
              >
                <div
                  onClick={() => setSelectedItem(item)}
                  className="flex flex-col h-full group cursor-pointer"
                >
                  <div className="mb-5 flex items-center justify-start gap-4">
                    {item.icon}
                    <div>
                      <h3 className="text-xl font-semibold uppercase tracking-wide text-[#E32320] group-hover:text-[#ff574d] transition-colors duration-300">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <p>
                        {t(`items.${item.key}.paragraph`) ||
                          t(`items.${item.key}.summary`)}
                      </p>
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

      {/* Modal agora com namespace dinâmico */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={
          selectedItem
            ? {
              ...selectedItem,
              namespace: "mentorias", // define que o modal vai buscar do JSON de mentorias
            }
            : undefined
        }
      />
    </section>
  );
};

export default Gallery;
