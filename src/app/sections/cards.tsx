import { Download, Target, UsersRound, Award } from "lucide-react";

interface Platform {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  url: string;
}

interface CardsProps {
  heading?: string;
  description?: string;
  platforms?: {
    desktop?: Platform;
    ios?: Platform;
    android?: Platform;
  };
}

const Cards = ({
  platforms = {
    desktop: {
      title: "Desktop",
      subtitle: "Precisão",
      description:
        "Análises detalhadas e investigações meticulosas que fornecem insights precisos e acionáveis.",
      url: "#",
    },
    ios: {
      title: "Mobile Phone",
      subtitle: "Expertise",
      description:
        "Equipe especializada com certificações e experiência comprovada em cibersegurança e investigações.",
      url: "#",
    },
    android: {
      title: "Mobile Phone / Tablet",
      subtitle: "Excelência",
      description:
        "Compromisso com a qualidade e inovação constante em metodologias e tecnologias de proteção.",
      url: "#",
    },
  },
}: CardsProps) => {
  // Ícones por índice para manter a ordem Desktop, iOS, Android
  const icons = [Target, UsersRound, Award];

  return (
    <section className="flex justify-center w-full py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {[platforms.desktop, platforms.ios, platforms.android].map(
            (platform, idx) => {
              if (!platform) return null;

              const Icon = icons[idx];

              return (
                <div
                  key={platform.title}
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
                  {platform.buttonText && (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded bg-[#E32320] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ff574d]"
                    >
                      <Download className="w-4 h-4" />
                      {platform.buttonText}
                    </a>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export { Cards };
