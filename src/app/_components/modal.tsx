"use client";

import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";
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

  const [showMore, setShowMore] = useState(false);

  if (!isOpen || !item) return null;

  const title = t(`items.${item.key}.title`);
  const description = t(`items.${item.key}.modal.description`);
  const second_description = t(`items.${item.key}.modal.second_description`);
  const listItems = t.raw(`items.${item.key}.modal.listItems`) as string[];
  const button = t(`items.${item.key}.modal.button`);

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
          <h2 className="text-2xl font-bold text-[#E32320]">{title}</h2>
        </div>

        {/* Descrição */}
        <p className="text-gray-300 mb-6">{description}</p>

        {/* Descrição oculta/expandível */}
        {second_description && ( // Verifique se second_description existe
          <div className="mb-6">
            <p className="text-gray-300">
              {showMore ? second_description : `${second_description.substring(0, 120)}...`}
            </p>
            <button onClick={() => setShowMore(!showMore)} // Verifique se showMore é verdadeiro
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-600 transition" // Verifique se showMore é verdadeiro
            >
              {showMore ? (
                <>
                  <ChevronUp size={16} /> Mostrar menos
                </>

              ) : (
                <>
                  <ChevronDown size={16} /> Mostrar mais
                </>
              )}
            </button>
          </div>
        )}

        {/* Lista de itens */}
        {listItems && listItems.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-white mb-3">
              {t(`items.${item.key}.modal.list_title`, { default: "Itens incluídos" })}
            </h2>
            <ul className="space-y-3 text-sm text-gray-400">
              {listItems.map((listItem, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#E32320]" />
                  <span>{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botão CTA */}
        {button && (
          <div className="mt-6">
            <a href="http://wa.me/551199999999" target="_blank">
              <Button className="px-6 py-3 bg-red-600 rounded-xl text-white font-semibold hover:bg-white hover:text-red-600 transition cursor-pointer">
                {button}
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
