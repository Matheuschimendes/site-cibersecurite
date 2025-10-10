"use client";

import { Separator } from "@/components/ui/separator";
import {
  Book,
  ChartColumnIncreasing,
  DribbbleIcon,
  GithubIcon,
  Mail,
  MapPin,
  Phone,
  ShieldIcon,
  Sunset,
  Trees,
  TwitchIcon,
  TwitterIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const FooterPage = () => {
  const t = useTranslations("Footer");

  // Dados da seção de consultoria
  const consultoriaData = [{
    title: t("securityNotice.title"),
    description: t("securityNotice.description"),
  }];

  // Links do rodapé
  const footerSections = [
    {
      title: t("sections.services"),
      links: [
        { title: t("services.brandProtection"), href: "#", icon: <Zap className="size-5 shrink-0" />, },
        { title: t("services.leakDetection"), href: "#", icon: <Sunset className="size-5 shrink-0" />, },
        { title: t("services.vipProtection"), href: "#", icon: <Trees className="size-5 shrink-0" />, },
        { title: t("services.trainings"), href: "#", icon: <ChartColumnIncreasing className="size-5 shrink-0" /> },
      ],
    },
    {
      title: t("sections.contacts"),
      links: [
        { title: "comercial@kryfal.com", href: "mailto:comercial@kryfal.com", icon: <Mail className="size-5 shrink-0" /> },
        { title: "contact@kryfal.com", href: "mailto:contact@kryfal.com", icon: <Mail className="size-5 shrink-0" /> },
        { title: "+55 (11) 9999-9999", href: "tel:+551199999999", icon: <Phone className="size-5 shrink-0" /> },
        { title: "+55 (11) 8888-8888", href: "tel:+551188888888", icon: <Phone className="size-5 shrink-0" /> },
        { title: t("address"), href: "#", icon: <MapPin className="size-5 shrink-0" /> },
      ],
    },
  ];

  return (
    <div className="flex flex-col md:mb-10">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          {/* Seções do Rodapé */}
          <div className="py-12 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-x-1 gap-y-10 px-6 xl:px-0 border-b border-b-gray-200">
            {/* Logo e Descrição */}
            <div className="col-span-full xl:col-span-2">
              <Image
                src="/Logo Horizontal.webp"
                alt="Logo Kryfal"
                width={100}
                height={100}
                priority={false}
              />
              <p className="mt-4 text-muted-foreground">
                {t("description")}
              </p>
              <div className="mt-10 flex md:flex-row items-center gap-1">
                <ShieldIcon className="h-6 w-6 md:h-6 md:w-6 text-[#E32320]" />
                <div>
                  <span className="text-white">{t("guarantee")}</span>
                </div>
              </div>
            </div>

            {/* Links dinâmicos */}
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-semibold">{title}</h6>
                <ul className="mt-5 space-y-4">
                  {links.map(({ title, href, icon }) => (
                    <li key={title} className="flex text-muted-foreground transition-colors hover:text-[#E32320] items-center">
                      {icon}
                      <Link
                        href={href}
                        className="text-muted-foreground transition-colors hover:text-[#E32320] ml-2 items-center"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator />

          {/* Redes sociais e copyright */}
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            <span className="text-muted-foreground text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank" className="hover:underline">
                Kryfal
              </Link>
              . {t("rights")}
            </span>

            <div className="flex items-center gap-5 text-muted-foreground ">
              <Link href="#" target="_blank"><TwitterIcon className="h-5 w-5 hover:text-[#E32320]" /></Link>
              <Link href="#" target="_blank"><DribbbleIcon className="h-5 w-5 hover:text-[#E32320]" /></Link>
              <Link href="#" target="_blank"><TwitchIcon className="h-5 w-5 hover:text-[#E32320]" /></Link>
              <Link href="#" target="_blank"><GithubIcon className="h-5 w-5 hover:text-[#E32320]" /></Link>
            </div>
          </div>
        </div>

        {/* Aviso de Segurança */}
        <section className="relative overflow-hidden md:mb-0 mb-10 w-[90%] md:w-[90%] mx-auto border border-[#E32320] rounded-md bg-gradient-to-r from-[#1a0000] to-[#0a0000] p-5 md:p-10 ">
          {consultoriaData.map(({ title, description }, idx) => (
            <div key={idx} className=" flex flex-row md:flex-row items-start md:items-center gap-4">
              <h2 className="text-[12px] md:text-sm font-bold text-[#E32320]">
                <div className="flex md:flex-row items-center gap-1">
                  <ShieldIcon className="h-10 w-10 md:h-6 md:w-6" />
                  <div>
                    {title}
                    <span className="text-white">{description}</span>
                  </div>
                </div>
              </h2>
            </div>
          ))}
        </section>
      </footer>
    </div>
  );
};

export default FooterPage;
