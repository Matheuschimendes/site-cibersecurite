import { Target, UsersRound, Award, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface Platform {
  subtitle: string;
  description: string;
  url: string;
}

interface CardsProps {
  heading?: string;
  description?: string;
  platforms?: {
    precision?: Platform;
    expertise?: Platform;
    excellence?: Platform;
  };
}

const Cards = ({ platforms }: CardsProps) => {
  const pathname = usePathname(); // /pt/leak_detection
  const serviceKey = pathname.split("/")[2] || "brand_protection"; // pega o segmento da rota
  const t = useTranslations(`galLery.items.${serviceKey}`); // pega as traduções do serviço automaticamente

  // Ícones na ordem correta
  const icons = [Target, UsersRound, Award, Star];

  // Dados default via tradução
  const defaultPlatforms = {
    precision: {
      subtitle: t("CardsService.Cards.card1.title"),
      description: t("CardsService.Cards.card1.description"),
      url: "#",
    },
    expertise: {
      subtitle: t("CardsService.Cards.card2.title"),
      description: t("CardsService.Cards.card2.description"),
      url: "#",
    },
    excellence: {
      subtitle: t("CardsService.Cards.card3.title"),
      description: t("CardsService.Cards.card3.description"),
      url: "#",
    },
    innovation: {
      subtitle: t("CardsService.Cards.card4.title"),
      description: t("CardsService.Cards.card4.description"),
      url: "#",
    },
  };

  const data = platforms ?? defaultPlatforms;

  return (
    <section className="p-0 md:p-10 py-24 flex flex-col items-center justify-center relative w-full bg-gradient-to-br overflow-hidden">
      <div className="container max-w-sx mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2">
          {Object.entries(data).map(([key, platform], idx) => {
            if (!platform) return null;

            const Icon = icons[idx];

            return (
              <div
                key={key}
                className="group relative flex flex-col items-start gap-1 rounded-2xl border border-zinc-700 bg-[#0c0c0c] px-8 py-10 text-white transition-all duration-300 hover:scale-[1.02] hover:ring-2 hover:ring-[#E32320]/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a] shadow">
                  <Icon className="w-8 h-8 text-[#E32320]" />
                </div>
                <h2 className="text-lg font-semibold tracking-widest uppercase font-mono">
                  {platform.subtitle}
                </h2>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  {platform.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Cards };
