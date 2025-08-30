import { Target, UsersRound, Award } from "lucide-react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Cards");

  // Ícones por índice para manter a ordem Precision, Expertise, Excellence
  const icons = [Target, UsersRound, Award];

  // Conteúdo default puxando das traduções
  const defaultPlatforms = {
    precision: {
      subtitle: t("card1.title"),
      description: t("card1.description"),
      url: "#",
    },
    expertise: {
      subtitle: t("card2.title"),
      description: t("card2.description"),
      url: "#",
    },
    excellence: {
      subtitle: t("card3.title"),
      description: t("card3.description"),
      url: "#",
    },
  };

  const data = platforms ?? defaultPlatforms;

  return (
    <section className="flex justify-center w-full py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {Object.entries(data).map(([key, platform], idx) => {
            if (!platform) return null;

            const Icon = icons[idx];

            return (
              <div
                key={key} // ✅ chave estável
                className="custom-hex-border group relative flex flex-col gap-4 border border-zinc-700 bg-[#0c0c0c] px-6 py-10 text-white transition hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a] shadow">
                  <Icon className="w-8 h-8 text-[#E32320]" />
                </div>
                <h2 className="text-lg font-semibold tracking-widest uppercase font-mono text-center">
                  {platform.subtitle}
                </h2>
                <p className="text-sm text-white/80 text-center leading-relaxed">
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
