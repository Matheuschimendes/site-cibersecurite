"use client";

import { TextReveal } from "@/components/magicui/text-reveal";
import React from "react";
import StarCanvas from "../_components/star";
import { Formulario } from "../_components/Form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Contato");
  return (
    <div className="relative group flex flex-col gap-6 p-10 rounded-[20px] border border-transparent">
      <div className="pointer-events-none absolute inset-0 z-0 rounded-[20px]" />

      <div className="relative z-10 ">
        <div className="text-xs uppercase tracking-widest text-[#E32320] font-extrabold font-mono mb-1">
          {t("title")}
        </div>

        <h3 className="text-3xl font-extrabold text-white leading-snug mb-3">
          {t("subtitle")}
        </h3>

        <div className="text-gray-300 text-base leading-relaxed space-y-4">
          <p>{t("description")}</p>
          <p>{feature.subDescription}</p>
        </div>
      </div>
    </div>
  );
};

const InformacoesContato = () => {
  const t = useTranslations("Contato");

  return (
    <div className="space-y-10 text-gray-200">
      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <Mail className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-white">{t("email.title")}</h3>
          <p className="text-gray-300">{t("email.primary")}</p>
          <p className="text-gray-300">{t("email.secondary")}</p>
        </div>
      </div>

      {/* Telefone */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <Phone className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-white">{t("phone.title")}</h3>
          <p className="text-gray-300">{t("phone.primary")}</p>
          <p className="text-gray-300">{t("phone.secondary")}</p>
        </div>
      </div>

      {/* Localização */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#1b1b1b] flex items-center justify-center">
          <MapPin className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-white">{t("location.title")}</h3>
          <p className="text-gray-300">{t("location.city")}</p>
          <p className="text-gray-300">{t("location.service")}</p>
        </div>
      </div>

      {/* Horário de Atendimento */}
      <div className="rounded-lg bg-[#1e1e1e] p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-white">{t("hours.title")}</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>{t("hours.weekdays.label")}</span>
            <span>{t("hours.weekdays.time")}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>{t("hours.saturday.label")}</span>
            <span>{t("hours.saturday.time")}</span>
          </div>
          <div className="flex justify-between text-gray-400 italic">
            <span>{t("hours.sunday.label")}</span>
            <span>{t("hours.sunday.time")}</span>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-3 text-red-500 font-medium text-sm">
          {t("hours.emergency")}
        </div>
      </div>
    </div>
  );
};

const Contato = ({
  heading,
  headingSecond,
  description
}: DescriptionProps) => {
  const t = useTranslations("Contato");

  return (
    <section className="p-5 py-24 flex flex-col items-center justify-center relative w-full bg-gradient-to-br">
      <StarCanvas />
      <div className="container max-w-7xl mx-auto">
        {/* Título */}
        <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {t("title")}{" "}
          <span
            className="bg-gradient-to-r from-[#E32320] to-[#ff574d] bg-clip-text text-transparent"
            style={{ fontWeight: 900 }}
          >
            {t("subtitle")}
          </span>
        </h2>

        {/* Linha decorativa */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

        {/* Descrição */}
        <TextReveal className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-3xl mb-16">
          {t("description")}
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
