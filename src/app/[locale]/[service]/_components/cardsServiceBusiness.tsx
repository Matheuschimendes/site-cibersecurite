import {
  ShieldIcon,
  CircleDollarSign,
  ClockFading,
  ZoomIn,
  BrainCircuit,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface Platform {
  subtitle: string;
  description?: string;
  url: string;
}

interface CardsProps {
  heading?: string;
  description?: string;
  platforms?: {
    precision?: Platform;
    expertise?: Platform;
    excellence?: Platform;
    innovation?: Platform;
    innovat?: Platform;
  };
}

const CardsSectionBusiness = ({ platforms }: CardsProps) => {
  const pathname = usePathname();
  const serviceKey = pathname.split("/")[2] || "brand_protection";
  const t = useTranslations(`galLery.items.${serviceKey}.seu_negocio`);

  const icons = [ShieldIcon, CircleDollarSign, ClockFading, ZoomIn, BrainCircuit];

  const defaultPlatforms = {
    precision: { subtitle: t("cards.card1.title"), url: "#" },
    expertise: { subtitle: t("cards.card2.title"), url: "#" },
    excellence: { subtitle: t("cards.card3.title"), url: "#" },
    innovation: { subtitle: t("cards.card4.title"), url: "#" },
    innovat: { subtitle: t("cards.card5.title"), url: "#" },
  };

  // Decide qual fonte usar: plataformas passadas ou defaults
  const source = platforms ?? defaultPlatforms;

  // Filtra somente as plataformas com subtítulo válido
  const validPlatforms = Object.entries(source).filter(
    ([, platform]) => platform && platform.subtitle && !platform.subtitle.includes("galLery")
  );

  return (
    <section className="relative flex w-full flex-col items-center justify-center bg-gradient-to-br px-2 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20 overflow-hidden">
      <div className="w-full max-w-full">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 justify-between w-full">
          {validPlatforms.map(([key, platform], idx) => {
            const Icon = icons[idx % icons.length];
            const isWhiteCard = idx % 2 === 0;

            return (
              <div
                key={key}
                className={`
                  flex-1 flex flex-col items-start gap-2
                  rounded-2xl border px-5 py-6 sm:px-6 sm:py-8
                  transition-all duration-300
                  hover:scale-[1.02] hover:ring-2 hover:ring-[#E32320]/50 hover:shadow-lg
                  ${isWhiteCard
                    ? "bg-[#E32320]/20 backdrop-blur-md text-white border border-[#E32320]/50"
                    : "bg-[#0c0c0c]/80 backdrop-blur-md text-white border border-zinc-700/50"
                  }
                `}
              >
                <div
                  className={`
                    mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow
                    ${isWhiteCard ? "bg-gray-100" : "bg-[#1a1a1a]"}
                  `}
                >
                  <Icon className={`${isWhiteCard ? "text-black" : "text-[#E32320]"}`} />
                </div>
                <h2 className="text-[14px] lg:text-balance font-semibold tracking-widest font-mono">
                  {platform.subtitle}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { CardsSectionBusiness };
