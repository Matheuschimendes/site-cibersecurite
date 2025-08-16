"use client";

import { TextReveal } from "@/components/magicui/text-reveal";
import React from "react";
import StarCanvas from "../_components/star";
import { Formulario } from "../_components/Form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

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

const CardWithLight = ({ feature }: { feature: Feature }) => {
  return (
    <div
      className="
        relative group flex flex-col gap-6 p-10 rounded-[20px] border border-transparent
      "
    >
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[20px]" />

      <div className="relative z-10 ">
        <div className="text-xs uppercase tracking-widest text-[#E32320] font-extrabold font-mono mb-1">
          {feature.subtitle}
        </div>

        <h3 className="text-3xl font-extrabold text-white leading-snug mb-3">
          {feature.title}
        </h3>

        <div className="text-gray-300 text-base leading-relaxed space-y-4">
          <p>{feature.description}</p>
          <p>{feature.subDescription}</p>
        </div>
      </div>
    </div>
  );
};

const InformacoesContato = () => {
  return (
    <div className="space-y-10 text-gray-200">
      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <Mail className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-white">Email</h3>
          <p className="text-gray-300">contato@kryfal.com</p>
          <p className="text-gray-300">comercial@kryfal.com</p>
        </div>
      </div>

      {/* Telefone */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <Phone className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-white">Telefone</h3>
          <p className="text-gray-300">+55 (11) 9999-9999</p>
          <p className="text-gray-300">+55 (11) 8888-8888</p>
        </div>
      </div>

      {/* Localização */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <MapPin className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-white">Localização</h3>
          <p className="text-gray-300">São Paulo, Brasil</p>
          <p className="text-gray-300">Atendimento Nacional e Internacional</p>
        </div>
      </div>

      {/* Horário de Atendimento */}
      <div className="rounded-lg bg-[#1e1e1e] p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-white">Horário de Atendimento</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Segunda - Sexta:</span>
            <span>08:00 - 18:00</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Sábado:</span>
            <span>09:00 - 14:00</span>
          </div>
          <div className="flex justify-between text-gray-400 italic">
            <span>Domingo:</span>
            <span>Fechado</span>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-3 text-red-500 font-medium text-sm">
          Emergências <span className="font-bold">24/8</span> para clientes corporativos
        </div>
      </div>
    </div>
  );
};

const Contato = ({
  heading = "Entre em ",
  headingSecond = "contato",
  description =
  "Pronto para fortalecer sua segurança cibernética? Fale com nossos especialistas.",
  features = [
    {
      id: "feature-1",
      title: "Nossa História",
      subtitle: "História",
      description:
        "A Kryfal nasceu da necessidade crescente de empresas terem acesso a inteligência cibernética de alta qualidade. Fundada por especialistas com vasta experiência em investigações digitais e análise de ameaças, nossa empresa se posiciona na vanguarda da proteção cibernética corporativa.",
      subDescription:
        "Combinamos técnicas avançadas de OSINT, análise de Deep e Dark Web, e metodologias investigativas para oferecer soluções completas de inteligência e proteção digital.",
    },
  ],
}: DescriptionProps) => {
  return (
    <section className="p-5 py-24 flex flex-col items-center justify-center relative w-full bg-gradient-to-br">
      <StarCanvas />
      <div className="container max-w-7xl mx-auto">
        {/* Título */}
        <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {heading}{" "}
          <span
            className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent"
            style={{ fontWeight: 900 }}
          >
            {headingSecond}
          </span>
        </h2>

        {/* Linha decorativa */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

        {/* Descrição */}
        <TextReveal className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-3xl mb-16">
          {description}
        </TextReveal>

        {/* Grid */}
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <InformacoesContato />
          <Formulario />
        </div>
      </div>
    </section>
  );
};

export { Contato };
