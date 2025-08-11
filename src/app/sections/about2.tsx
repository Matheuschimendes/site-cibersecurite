import React from "react";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  subDescription: string;
}

interface DescriptionProps {
  heading?: string;
  headingSecond?: string;
  description?: string;
  features?: Feature[];
}

const About2 = ({
  heading = "Sobre a",
  headingSecond = "Kryfal",
  description = "Especialistas em Threat Intelligence e investigações digitais, protegendo empresas contra ameaças cibernéticas avançadas.",
  features = [
    {
      id: "feature-1",
      title: "Nossa Missão",
      subtitle: "Nossa Missão",
      description:
        "Capacitar organizações com inteligência cibernética estratégica, investigações digitais precisas e soluções de proteção que antecipam e neutralizam ameaças antes que causem danos.",
      subDescription:
        "Nosso compromisso é ser o parceiro de confiança na jornada de transformação digital segura, oferecendo expertise técnica e visão estratégica para enfrentar os desafios do cenário cibernético atual.",
    },

  ],
}: DescriptionProps) => {
  return (
    <section className="p-10 mt-30 md:-mt-100 flex flex-row items-center justify-center py-10 h-screen md:h-auto  relative w-full">
      <div className="container max-w-7xl">
        <div className="mt-20 grid gap-9 lg:grid-cols-2">
          <img src="/Logo Vertical.png" alt="" id="feature-1" />
          {features.map((feature) => (
            <>
              <div>
                <div
                  key={feature.id}
                  className="mt-10 flex flex-col justify-between rounded-lg p-4 transition-colors hover:text-white"
                >

                  <div className="flex justify-between gap-10">
                    <div className="flex flex-col justify-between gap-1 py-6 pl-4 md:py-0 md:pl-8 lg:justify-normal">
                      <h2 className="text-7xl font-medium lg:text-4xl">{heading}
                        <span className="text-[#E32320]"> {headingSecond}</span>
                      </h2>
                      <p className="mt-4 text-muted-foreground text-2xl ">{description}</p>

                    </div>

                  </div>
                </div>

              </div>
              <div className="gap-10">
                <p className="text-xs text-muted-foreground">
                  {feature.subtitle}
                </p><h3 className="text-2xl md:text-4xl">{feature.title}</h3><div className="m-0">
                  <div className="">
                    {feature.description}
                    {feature.subDescription}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section >
  );
};

export { About2 };
