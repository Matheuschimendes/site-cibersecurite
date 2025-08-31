"use client";

import { TextScramble } from "@/components/animation/TextScramble";
import React from "react";
import StarCanvas from "../_components/star";
import { Formulario } from "../_components/Form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

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

const Contato = () => {
  const t = useTranslations("Contato");

  return (
    <section className="p-5 py-24 flex flex-col items-center justify-center relative w-full bg-gradient-to-br">
      <StarCanvas />
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 leading-tight inline-flex">
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

        {/* Linha decorativa */}
        <div className="w-24 h-1 bg-gradient-to-r from-[#E32320] to-[#ff574d] rounded-full mb-8"></div>

        {/* Descrição */}
        <TextScramble className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-3xl mb-16">
          {t("description")}
        </TextScramble>

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
