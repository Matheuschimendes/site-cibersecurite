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
    innovation?: Platform;
  };
}

const CardsService = ({ platforms }: CardsProps) => {
  const pathname = usePathname();
  const serviceKey = pathname.split("/")[2] || "brand_protection";
  const t = useTranslations(`galLery.items.${serviceKey}`);

  const icons = [Target, UsersRound, Award, Star];

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
    <section
      className="
        relative w-full bg-gradient-to-br
        flex flex-col items-center justify-center
        px-4 sm:px-6 md:px-10
        py-5 sm:py-14 md:py-20
        overflow-hidden
      "
    >
      <div className="mx-auto w-full max-w-9xl">
        {/* Grid responsivo: 1 coluna mobile, 2 em sm/md, 4 em lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {Object.entries(data).map(([key, platform], idx) => {
            if (!platform) return null;
            const Icon = icons[idx];

            const isWhiteCard = idx % 3 === 0;

            return (
              <div
                key={key}
                className={`
                  group relative flex flex-col items-start gap-2
                  rounded-2xl border border-zinc-700
                  px-6 py-8 sm:px-8 sm:py-10
                  text-white transition-all duration-300
                  hover:scale-[1.02] hover:ring-2 hover:ring-[#E32320]/50 hover:shadow-lg
                  ${isWhiteCard
                    ? "bg-[#E32320]/20 backdrop-blur-md text-white border border-[#E32320]/50"
                    : "bg-[#0c0c0c] text-white border-zinc-700"
                  }
                `}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a1a] shadow">
                  <Icon className="h-8 w-8 text-[#ffffff]" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold tracking-widest uppercase font-mono">
                  {platform.subtitle}
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
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

export { CardsService };
