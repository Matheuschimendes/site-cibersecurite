import { languages } from "@/constants/language";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

const locales = languages;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Define o locale que será usado, com fallback
  const localeToUse = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  // Se o locale não for válido, retorna 404
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale: localeToUse, // obrigatório
    messages: (await import(`../messages/${localeToUse}.json`)).default,
  };
});
