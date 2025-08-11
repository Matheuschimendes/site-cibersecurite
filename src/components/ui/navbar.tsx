"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Threat Intelligence",
    href: "/inteligencia",
    description: "Soluções que monitoram e neutralizam ameaças em tempo real.",
  },
  {
    title: "Investigação Digital",
    href: "/investigacao",
    description: "Rastreamento e análise de fraudes, vazamentos e ataques.",
  },
  {
    title: "Resposta a Incidentes",
    href: "/resposta",
    description: "Ação rápida e eficaz para conter e remediar incidentes cibernéticos.",
  },
  {
    title: "Dark Web Monitor",
    href: "/darkweb",
    description: "Monitoramento avançado de ativos em ambientes ocultos da internet.",
  },
  {
    title: "Consultoria",
    href: "/consultoria",
    description: "Suporte estratégico em segurança da informação e compliance.",
  },
];

export function Navbar() {
  return (
    <div className="w-full sticky top-0 z-50">
      <NavigationMenu className="w-full px-4">
        <NavigationMenuList className="flex flex-wrap gap-4 py-3">
          {/* INÍCIO */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-[#E32320] transition-colors">
              Início
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#0a0a0a] p-4 rounded-md shadow-lg">
              <ul className="grid gap-2 w-[250px]">
                <ListItem href="/" title="Página Inicial">
                  Explore os recursos e soluções da Kryfal.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* SOBRE */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-[#E32320] transition-colors">
              Sobre
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#0a0a0a] p-4 rounded-md shadow-lg">
              <ul className="grid gap-2 w-[550px] md:grid-cols-2">
                <ListItem href="/historia" title="Nossa História">
                  Conheça a trajetória da Kryfal na segurança cibernética.
                </ListItem>
                <ListItem href="/missao" title="Missão e Visão">
                  Entenda os princípios que guiam nossas ações.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* SERVIÇOS */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-[#E32320] transition-colors">
              Serviços
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#0a0a0a] p-4 rounded-md shadow-lg">
              <ul className="grid gap-3 w-[600px] md:grid-cols-2">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* TREINAMENTOS */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:text-[#E32320] transition-colors">
              Treinamentos
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#0a0a0a] p-4 rounded-md shadow-lg">
              <ul className="grid gap-2 w-[250px]">
                <ListItem href="/treinamentos/oficiais" title="Certificações Oficiais">
                  Cursos com certificação internacional.
                </ListItem>
                <ListItem href="/treinamentos/custom" title="Treinamentos Customizados">
                  Treinamentos adaptados à necessidade da sua empresa.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#E32320]/10 hover:text-[#E32320] focus:bg-[#E32320]/10"
        >
          <div className="text-sm font-semibold text-white">{title}</div>
          <p className="text-sm text-neutral-400 leading-tight">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
