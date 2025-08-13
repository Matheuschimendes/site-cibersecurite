"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import StarCanvas from "../_components/star";
import { SecaoConsultoria } from "../_components/SecaoConsultoria";
import { TextReveal } from "@/components/magicui/text-reveal";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  headingSecond?: string;
  paragraph?: string;
  summary: string;
  url: string;
  image: string;
  listItems?: string[];
}

interface Gallery6Props {
  heading?: string;
  // demoUrl?: string;
  items?: GalleryItem[];
  listItems?: GalleryItem[];
  headingSecond?: string;
  paragraph?: string;
}

const Gallery = ({
  heading = "Serviços de ",
  headingSecond = "Inteligência",
  paragraph =
  "Soluções completas de threat intelligence e investigações digitais para proteger sua organização.",
  // demoUrl = "https://www.shadcnblocks.com",
  items = [
    {
      id: "item-1",
      title: "Brand Protection",
      summary: "Monitoramento e resposta a usos indevidos de marca",
      url: "#",
      listItems: [
        "Monitoramento contínuo de violações de marca",
        "Detecção de domínios maliciosos e phishing",
        "Takedown de conteúdos e perfis falsos",
        "Proteção de propriedade intelectual",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-2",
      title: "Leak Detection",
      summary: "Detecção de vazamentos na Surface, Deep e Dark Web",
      url: "#",
      listItems: [
        "Monitoramento contínuo de violações de marca",
        "Análise de credenciais comprometidas",
        "Investigação em fóruns clandestinos",
        "Alertas em tempo real de exposições",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-3",
      title: "VIP Protection",
      summary: "Proteção de executivos em ambientes digitais",
      url: "#",
      listItems: [
        "Monitoramento de ameaças direcionadas",
        "Proteção de identidade digital",
        "Análise de exposição pessoal",
        "Estratégias de mitigação de riscos",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-4",
      title: "Cyber Risk Insights",
      summary: "Análise técnica e estratégica do risco cibernético",
      url: "#",
      listItems: [
        "Avaliação de superfície de ataque",
        "Análise de vulnerabilidades",
        "Relatórios de inteligência estratégica",
        "Recomendações de mitigação",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-5",
      title: "Contrainteligência Corporativa",
      summary: "Mapeamento de ativos sensíveis e investigações de risco",
      url: "#",
      listItems: [
        "Mapeamento de ativos críticos",
        "Investigações de vinculações de risco",
        "Análise de ameaças internas",
        "Estratégias de proteção corporativa",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-6",
      title: "Investigações Digitais",
      summary: "Investigações avançadas de fraudes e golpes estruturados",
      url: "#",
      listItems: [
        "Análise forense digital",
        "Investigação de fraudes complexas",
        "Rastreamento de ativos digitais",
        "Coleta e preservação de evidências",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-7",
      title: "Análise de Ameaças",
      summary: "Análise de campanhas maliciosas e atuação em Deep/Dark Web",
      url: "#",
      listItems: [
        "Análise de campanhas de malware",
        "Investigação de grupos criminosos",
        "Monitoramento de mercados ilegais",
        "Monitoramento de mercados ilegais",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "item-8",
      title: "Takedown & Desmonte",
      summary: "Rastreio e desmonte de infraestruturas maliciosas",
      url: "#",
      listItems: [
        "Identificação de infraestruturas maliciosas",
        "Coordenação de takedowns",
        "Desmonte de operações criminosas",
        "Colaboração com autoridades",
      ],
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ],
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    // Iniciar autoplay para a rotação automática do carrossel
    const autoplayInterval = setInterval(() => {
      if (carouselApi?.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi?.scrollTo(0); // Volta ao primeiro item quando chegar no último
      }
    }, 3000); // 3000ms de intervalo para a rotação

    return () => {
      carouselApi.off("select", updateSelection);
      clearInterval(autoplayInterval); // Limpa o intervalo quando o componente for desmontado
    };
  }, [carouselApi]);

  return (
    <section
      className="md:-mt-10 px-5 flex flex-col items-center justify-center py-24 relative w-full bg-gradient-to-br"
    >
      <StarCanvas />
      <div className="container max-w-7xl px-4">
        <div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {heading}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#E32320] to-[#ff574d]"
                style={{ fontWeight: 900 }}
              >
                {" "}
                {headingSecond}
              </span>
            </h2>
            <TextReveal className="mt-6 max-w-xl text-gray-300 text-lg leading-relaxed">
              {paragraph}
            </TextReveal>
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

      <div className="w-full overflow-hidden md:w-[calc(100vw-2rem)]">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative w-full md:left-[-1rem] transition-all"
        >
          <CarouselContent className="hide-scrollbar w-full max-w-full md:px-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="
            mx-4 my-6 md:max-w-[352px] rounded-[24px] border-transparent
            bg-gradient-to-br from-[#1e1e1e] via-[#171717] to-[#0f0f0f]
            p-8 text-white shadow-lg shadow-[#E32320]/25
            transition-all duration-300
            hover:shadow-[0_0_40px_rgba(227,35,32,0.6)] hover:border-[#E32320] hover:scale-105
            md:hover:shadow-[0_0_60px_rgba(227,35,32,0.7)]
          "
              >
                <a
                  href={item.url}
                  className="flex flex-col h-full group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mb-5 flex items-center justify-start gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain"
                      loading="lazy"
                      width={56}
                      height={56}
                    />
                    <h3 className="text-2xl font-semibold uppercase tracking-wide text-[#E32320] group-hover:text-[#ff574d] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mb-6 flex-grow text-gray-300 leading-relaxed text-base">
                    {item.summary}
                  </p>

                  {item.listItems && (
                    <ul className="mb-8 space-y-3 text-sm text-gray-400">
                      {item.listItems.map((listItem, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="w-6 h-6 text-[#E32320]" />
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex items-center gap-3 text-sm font-semibold text-[#E32320] group-hover:underline">
                    Saiba mais
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <SecaoConsultoria
        title={"Precisa de uma Solução Personalizada?"}
        description={
          "Nossos especialistas podem desenvolver estratégias de inteligência sob medida para as necessidades específicas da sua organização."
        }
      />
    </section>
  );
};

export default Gallery;