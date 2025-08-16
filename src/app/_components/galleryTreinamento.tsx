"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, BookOpen, Check, Lightbulb, Target, Users, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import StarCanvas from "./Star";
import { SessaoConsultoria } from "./SessaoConsultoria";
import { TextReveal } from "@/components/magicui/text-reveal";
import Image from "next/image";
import Tags from "./tags";

interface GalleryItem {
  id: string;
  title: string;
  headingSecond?: string;
  paragraph?: string;
  tags?: string;
  tagsSecond?: string;
  summary: string;
  url: string;
  icon?: React.ReactNode;
  listItems?: string[];
}

interface Gallery6Props {
  heading?: string;
  items?: GalleryItem[];
  listItems?: GalleryItem[];
  headingSecond?: string;
  paragraph?: string;
  tags?: string;
  tagsSecond?: string;
}

const Gallery = ({
  heading = "Mentorias e ",
  headingSecond = "Treinamentos",
  paragraph =
  "Capacitação especializada em threat intelligence, OSINT e investigações cibernéticas.",
  items = [
    {
      id: "item-1",
      title: "Introdução à Threat Intelligence",
      paragraph: "Curso Gravado",
      tags: "Duração: 8 horas",
      tagsSecond: "Iniciante",
      summary: "Fundamentos essenciais de inteligência de ameaças",
      url: "#",
      listItems: [
        "Monitoramento contínuo de violações de marca",
        "Detecção de domínios maliciosos e phishing",
        "Takedown de conteúdos e perfis falsos",
        "Proteção de propriedade intelectual",
      ],
      icon: <BookOpen size={40} />,
    },
    {
      id: "item-2",
      title: "Threat Intelligence Operacional",
      summary: "Aplicação prática de CTI em operações de segurança",
      paragraph: "Curso Ao Vivo",
      tags: "Duração: 16 horas",
      tagsSecond: "Intermediário",
      url: "#",
      listItems: [
        "Monitoramento contínuo de violações de marca",
        "Análise de credenciais comprometidas",
        "Investigação em fóruns clandestinos",
        "Alertas em tempo real de exposições",
      ],
      icon: <Target size={40} />,
    },
    {
      id: "item-3",
      title: "Deep e Dark Web na Prática",
      summary: "Navegação segura e investigação em ambientes ocultos",
      paragraph: "Curso Gravado",
      tags: "Duração: 12 horas",
      tagsSecond: "Avançado",
      url: "#",
      icon: <Video size={40} />,
    },
    {
      id: "item-4",
      title: "OPSEC para Investigações",
      summary: "Segurança operacional em investigações digitais",
      paragraph: "Curso Ao Vivo",
      tags: "Duração: 6 horas",
      tagsSecond: "Intermediário",
      url: "#",
      icon: <Award size={40} />,
    },
    {
      id: "item-5",
      title: "Ferramentas e Técnicas de OSINT",
      summary: "Domínio de ferramentas de inteligência de fontes abertas",
      paragraph: "Curso Gravado",
      tags: "Duração: 20 horas",
      tagsSecond: "Todos os níveis",
      url: "#",
      icon: <Lightbulb size={40} />,
    },
    {
      id: "item-6",
      title: "Investigações Cibernéticas Avançadas",
      summary: "Metodologias avançadas de investigação digital",
      paragraph: "Curso Ao Vivo",
      tags: "Duração: 24 horas",
      tagsSecond: "Avanaçado",
      url: "#",
      icon: <Users size={40} />,
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
    <section className="p-5 mt-30 w-screen h-full flex flex-col items-center justify-center relative bg-gradient-to-br">
      <StarCanvas />
      <div className="container max-w-7xl px-4">
        < div className="mb-12 flex flex-col justify-between md:mb-16 md:flex-row md:items-end" >
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-blacktracking-tight leading-tight">
              {heading}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#E32320] to-[#ff574d]"
                style={{ fontWeight: 900 }}
              >
                {" "}
                {headingSecond}
              </span>
            </h2>
            {/* Linha decorativa */}
            <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>
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
      </div >

      <div className="w-full h-full overflow-hidden md:mb-10">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
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
                <a
                  href={item.url}
                  className="flex flex-col h-full group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mb-5 flex items-center justify-start gap-4">
                    {item.icon}
                    <div className="">
                      <h3 className="text-xl font-semibold uppercase tracking-wide text-[#E32320] group-hover:text-[#ff574d] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p>
                        {item.paragraph}
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 flex-grow text-gray-300 leading-relaxed text-base">
                    {item.summary}
                  </p>
                  <div className="md:mt-5 md:mb-5 flex flex-wrap gap-2 justify-between">
                    <p>{item.tags}</p>
                    <Tags>{item.tagsSecond}</Tags>
                  </div>

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

      <SessaoConsultoria
        title={"Precisa de uma Solução Personalizada?"}
        description={
          "Nossos especialistas podem desenvolver estratégias de inteligência sob medida para as necessidades específicas da sua organização."
        }
      />
    </section >
  );
};

export default Gallery;