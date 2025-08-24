import { languages } from "@/constants/language";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

const locales = languages;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const requested = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale, // <-- obrigatório no retorno
    messages: (await import(`../app/messages/${locale}.json`)).default,
  };
});
