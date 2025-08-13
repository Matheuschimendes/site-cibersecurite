import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Dados da seção de consultoria
const consultoriaData = [{
  title: "Aviso de Segurança: ",
  description: "Todas as comunicações são criptografadas e tratadas com máxima confidencialidade. Nossos serviços seguem os mais altos padrões de segurança da informação.",
}];

// Links do rodapé
const footerSections = [
  {
    title: "Serviços",
    links: [
      { title: "Threat Intelligence", href: "#" },
      { title: "Brand Protection", href: "#" },
      { title: "Investigações Digitais", href: "#" },
      { title: "VIP Protection", href: "#" },
      { title: "Treinamentos", href: "#" },
    ],
  },
];

export const FooterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />

      <footer>
        <div className="max-w-screen-xl mx-auto">
          {/* Seções do Rodapé */}
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0 border-b border-b-gray-200">
            {/* Logo e Descrição */}
            <div className="col-span-full xl:col-span-2">
              <Image
                src="/Logo Horizontal.png"
                alt="Logo Kryfal"
                width={100}
                height={100}
                priority={false}
              />
              <p className="mt-4 text-muted-foreground">
                Especialistas em Threat Intelligence e investigações digitais, protegendo empresas contra ameaças cibernéticas com soluções estratégicas e tecnologia de ponta.
              </p>
              <p className="mt-4 text-muted-foreground">
                Segurança e confidencialidade garantidas.
              </p>
            </div>

            {/* Links dinâmicos */}
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-semibold">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
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
              . Todos os direitos reservados.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="#" target="_blank"><TwitterIcon className="h-5 w-5" /></Link>
              <Link href="#" target="_blank"><DribbbleIcon className="h-5 w-5" /></Link>
              <Link href="#" target="_blank"><TwitchIcon className="h-5 w-5" /></Link>
              <Link href="#" target="_blank"><GithubIcon className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>

        {/* Aviso de Segurança */}
        <section className="relative overflow-hidden w-[90%] md:w-[90%] mx-auto mb-5 border border-[#E32320] rounded-md bg-gradient-to-r from-[#1a0000] to-[#0a0000] p-5 md:p-10 m-10 ">
          {consultoriaData.map(({ title, description }, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <h2 className="text-[12px] md:text-sm  font-bold text-[#E32320]">
                {title}
                <span className="text-white">{description}</span>
              </h2>
            </div>
          ))}
        </section>
      </footer>
    </div>
  );
};

export default FooterPage;
