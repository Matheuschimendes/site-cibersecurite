import { Download, Monitor, Smartphone, Tablet } from "lucide-react";
import { useTheme } from "next-themes";

interface CardsProps {
  heading?: string;
  description?: string;
  platforms?: {
    desktop?: {
      title: string;
      subtitle: string;
      description: string;
      buttonText: string;
      url: string;
    };
    ios?: {
      title: string;
      subtitle: string;
      description: string;
      url: string;
    };
    android?: {
      title: string;
      subtitle: string;
      description: string;
      url: string;
    };
  };
}

const Cards = ({
  platforms = {
    desktop: {
      title: "Desktop",
      subtitle: "Precisão",
      description: "Análises detalhadas e investigações meticulosas que fornecem insights precisos e acionáveis.",
      buttonText: "Download",
      url: "#",
    },
    ios: {
      title: "Mobile Phone",
      subtitle: "Expertise",
      description: "Equipe especializada com certificações e experiência comprovada em cibersegurança e investigações.",
      url: "#",
    },
    android: {
      title: "Mobile Phone / Tablet",
      subtitle: "Excelência",
      description: "Compromisso com a qualidade e inovação constante em metodologias e tecnologias de proteção.",
      url: "#",
    },
  },
}: CardsProps) => {
  const { theme } = useTheme();

  return (
    <section className="flex justify-center w-full py-20 px-4">
      <div className="container">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {/* Card Genérico */}
          {[platforms.desktop, platforms.ios, platforms.android].map(
            (platform, idx) => {
              const Icon =
                idx === 0 ? Monitor : idx === 1 ? Smartphone : Tablet;

              return (
                <div
                  key={platform?.title}
                  className="custom-hex-border group relative flex flex-col gap-4 border border-zinc-700 bg-[#0c0c0c] px-6 py-10 text-white transition hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a] shadow">
                    <Icon className="w-8 h-8 text-[#E32320]" />
                  </div>
                  <h1 className="text-lg font-semibold tracking-widest uppercase font-mono text-center">
                    {platform?.subtitle}
                  </h1>
                  <p className="text-sm text-white/80 text-center leading-relaxed">
                    {platform?.description}
                  </p>
                  {/* Botões ou links podem ser adicionados aqui */}
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
