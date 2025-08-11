import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { SecaoConsultoria } from "../_components/SecaoConsultoria";
import { Button } from "@/components/ui/button";

interface SecaoConsultoriaProps {
  title: string;
  description: string;
  descriptionButton?: string;
}

const footerSections = [
  {
    title: "Seviços",
    links: [
      {
        title: "Threat Intelligence",
        href: "#",
      },
      {
        title: "Brand Protection",
        href: "#",
      },
      {
        title: "Investigações Digitais",
        href: "#",
      },
      {
        title: "VIP Protection",
        href: "#",
      },
      {
        title: "Treinamentos",
        href: "#",
      },
    ],
  },
  // {
  //   title: "Contato",
  //   links: [
  //     {
  //       title: "Blog",
  //       href: "#",
  //     },
  //     {
  //       title: "Newsletter",
  //       href: "#",
  //     },
  //     {
  //       title: "Events",
  //       href: "#",
  //     },
  //     {
  //       title: "Help centre",
  //       href: "#",
  //     },
  //     {
  //       title: "Tutorials",
  //       href: "#",
  //     },
  //     {
  //       title: "Support",
  //       href: "#",
  //     },
  //   ],
  // },
];

export const Footer03Page = ({
  title,
  description,
  descriptionButton = "Consulte Nossos Especialistas",
}: SecaoConsultoriaProps) => {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0 border-b border-b-gray-200">
            <div className="col-span-full xl:col-span-2 ">
              {/* Logo */}
              <img src="/Logo Horizontal.png" alt="" width={100} />

              <p className="mt-4 text-muted-foreground ">
                Especialistas em Threat Intelligence e investigações digitais, protegendo empresas contra ameaças cibernéticas avançadas com soluções estratégicas e tecnologia de ponta.
              </p>
              <p className="mt-4 text-muted-foreground">
                Segurança e confidencialidade garantidas
              </p>
            </div>
            {footerSections.map(({ title, links }) => (
              <div key={title}>
                <h6 className="font-semibold">{title}</h6>
                <ul className="mt-6 space-y-4">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <Link
                        href={href}
                        className="text-muted-foreground hover:text-foreground"
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
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Kryfal
              </Link>
              . Todo direiro reservados.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secao Consultoria */}
        <section
          className="relative overflow-hidden flex justify-center
        md:w-[90%] mb-10 mx-auto border border-[#E32320] rounded-md
        bg-gradient-to-r from-[#1a0000] to-[#0a0000] p-5 md:p-10 text-center"
        >
          {/* Conteúdo */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">{description}</p>
            <Button
              className="bg-[#E32320] hover:bg-white hover:text-[#E32320] text-whitefont-semibold px-6 py-3 rounded transition cursor-pointer"
              asChild
            >
              {/* <Link href="/contact">{descriptionButton}</Link> */}
            </Button>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer03Page;
