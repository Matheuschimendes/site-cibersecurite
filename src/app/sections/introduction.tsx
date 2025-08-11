import { TextReveal } from "@/components/magicui/text-reveal";
import Tags from "../_components/tags";

export const Introduction = () => {
  return (
    <section className="p-10 mt-30 md:-mt-50 flex flex-row items-center justify-center py-10 h-screen md:h-auto relative w-full">
      <div className="container md:w-[80%]">
        <div className="flex justify-center">
          <Tags>Sobre a Kryfal</Tags>
        </div>

        {/* Texto principal com animação */}
        <TextReveal className="text-2xl md:text-3xl text-center font-medium mt-10">
          A Kryfal nasceu da necessidade crescente de empresas terem acesso a inteligência cibernética de alta qualidade. Fundada por especialistas com vasta experiência em investigações digitais e análise de ameaças, nossa empresa se posiciona na vanguarda da proteção cibernética corporativa.
        </TextReveal>

        {/* Texto adicional em vermelho com animação também */}
        <TextReveal className="text-2xl md:text-3xl text-center font-medium mt-6 text-[#E32320]">
          Sobre a Kryfal

          Especialistas em Threat Intelligence e investigações digitais, protegendo empresas contra ameaças cibernéticas avançadas.
        </TextReveal>
      </div>
    </section>
  );
};
