"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { HoverScrambleButton } from "@/components/animation/HoverScrambleButton";

interface SessaoConsultoriaProps {
  title?: string;
  description?: string;
  descriptionButton: string;
}

export const SessaoConsultoria = ({
  title,
  description,
}: SessaoConsultoriaProps) => {
  const t = useTranslations("Posicionamento");

  return (
    <section
      className="
        relative overflow-hidden flex justify-center
        md:w-[70%] max-w-screen-xl mx-auto border border-[#E32320] rounded-md
        bg-gradient-to-r from-[#1a0000] to-[#0a0000] p-5 md:p-10 text-center
      "
    >
      {/* Content */}
      <div className="relative">
        <h2 className="text-2xl font-bold text-white mb-4">
          {title ?? t("title")}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          {description ?? t("description")}
        </p>
        <Link href="http://wa.me/553284263423" target="_blank">
          <Button
            className="bg-[#E32320] hover:bg-white hover:text-[#E32320] text-white font-semibold px-6 py-3 rounded transition cursor-pointer"
            asChild
          >
            <HoverScrambleButton
              text={t("button")}
            />
          </Button>
        </Link>
      </div>
    </section>
  );
};
