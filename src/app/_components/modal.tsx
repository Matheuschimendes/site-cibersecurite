"use client";

import { Check, X } from "lucide-react";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: string;
  key: string;
  icon?: ReactNode;
  namespace?: "galLery" | "mentorias";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: GalleryItem;
}

const Modal = ({ isOpen, onClose, item }: ModalProps) => {
  const namespace = item?.namespace || "galLery";
  const t = useTranslations(namespace);

  if (!isOpen || !item) return null;

  // Pegando diretamente os dados do JSON
  const title = t(`items.${item.key}.title`);
  const description = t(`items.${item.key}.description`);
  const listItems = t.raw(`items.${item.key}.listItems`) as string[]; // <-- retorna array
  const button = t(`items.${item.key}.button`);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] text-white rounded-2xl max-w-2xl w-full p-8 relative shadow-xl shadow-[#E32320]/30">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-6">
          {item?.icon}
          <h2 className="text-2xl font-bold text-[#E32320]">
            {title}
          </h2>
        </div>

        {/* Descrição */}
        <p className="text-gray-300 mb-6">
          {description}
        </p>

        {/* Lista de itens */}
        {listItems && listItems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-[#E32320] mb-3">
              {t(`items.${item.key}.list_title`, { default: "Itens incluídos" })}
            </h3>
            <p className="text-sm font-semibold text-white mb-3">
              {t(`items.${item.key}.list_title2`, { default: "Itens incluídos" })}
            </p>
            <ul className="space-y-3 text-sm text-gray-400">
              {listItems.map((listItem, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#E32320]" />
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold text-[#E32320] mb-3 mt-5">
              {t(`items.${item.key}.list_description`, { default: "Itens incluídos" })}
            </h3>
          </div>
        )}

        {/* Botão CTA */}
        {button && (
          <div className="mt-6">
            <Button className="px-6 py-3 bg-[#E32320] rounded-xl text-white font-semibold hover:bg-[#ff574d] transition">
              {button}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
