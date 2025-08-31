import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "../../app/globals.css";
import StarCanvas from "../_components/star";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";

// Font
const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
});

export const metadata: Metadata = {
  title: "Kryfal",
  description: "Kryfal - Experts in Threat Intelligence and digital investigations, protecting companies against advanced cyber threats.",
};

// Locales suportados
const SUPPORTED_LOCALES = ["pt", "en"];

// Layout em /[locale]/layout.tsx
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Usa locale apenas se for suportado
  const { locale: rawLocale } = await params; //
  const locale = SUPPORTED_LOCALES.includes(rawLocale)
    ? (rawLocale as string)
    : "pt";

  let messages = {};
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Locale "${locale}" não encontrado, usando "en".`);
    }
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <body className={`${kanit.className} bg-black text-white antialiased`}>
        <StarCanvas />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}