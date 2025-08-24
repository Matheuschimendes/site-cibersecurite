import type { NextConfig } from "next";
import next from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  webpack(config) {
    // Adiciona uma regra para importar arquivos SVG como componentes React
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // Você pode adicionar outras opções de configuração aqui, se necessário
};

export default withNextIntl(nextConfig);
