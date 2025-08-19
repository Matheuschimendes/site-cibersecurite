"use client";

import { Check, X } from "lucide-react";
import { ReactNode } from "react";

interface GalleryItem {
  id: string;
  title: string;
  headingSecond?: string;
  paragraph?: string;
  summary: string;
  url: string;
  icon?: ReactNode;
  listItems?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: GalleryItem;
}

const Modal = ({ isOpen, onClose, item }: ModalProps) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] text-white rounded-2xl max-w-2xl w-full p-8 relative shadow-xl shadow-[#E32320]/30">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          {item.icon}
          <h2 className="text-2xl font-bold text-[#E32320]">{item.title}</h2>
        </div>

        <p className="text-gray-300 mb-6">{item.summary}</p>

        {item.listItems && (
          <ul className="space-y-3 text-sm text-gray-400">
            {item.listItems.map((listItem, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#E32320]" />
                <span>{listItem}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Modal;
