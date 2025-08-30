"use client";
import React, { useState, useEffect } from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "../../i18n/navigation";
import { useTranslations } from "next-intl";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}

const Navbar = ({ logo }: Navbar1Props) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1]; // captura "pt" ou "en"
  const t = useTranslations("Navbar");

  // Menu traduzido
  const menu: MenuItem[] = [
    { title: t("inicio"), url: "/" },
    { title: t("sobre"), url: "/about" },
    {
      title: t("servicos"),
      url: "#",
      items: [
        {
          title: t("submenus.brand_protection.title"),
          description: t("submenus.brand_protection.description"),
          icon: <Zap className="size-5 shrink-0" />,
          url: "/services/brand-protection",
        },
        {
          title: t("submenus.leak_detection.title"),
          description: t("submenus.leak_detection.description"),
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/services/leak-detection",
        },
        {
          title: t("submenus.vip_protection.title"),
          description: t("submenus.vip_protection.description"),
          icon: <Trees className="size-5 shrink-0" />,
          url: "/services/vip-protection",
        },
        {
          title: t("submenus.cyber_risk_insights.title"),
          description: t("submenus.cyber_risk_insights.description"),
          icon: <Book className="size-5 shrink-0" />,
          url: "/services/cyber-risk-insights",
        },
      ],
    },
    { title: t("mentorias"), url: "/mentorias" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Renderiza submenu Desktop
  const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#E32320] min-w-[320px]">
            {item.items.map((subItem) => (
              <NavigationMenuLink
                asChild
                key={subItem.title}
                className="p-2 hover:bg-white hover:*:text-[#E32320] transition-colors block"
              >
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuLink
          href={item.url}
          className="bg-transparent hover:bg-muted group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          {item.title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  // Renderiza submenu Mobile
  const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }
    return (
      <a key={item.title} href={item.url} className="text-md font-semibold">
        {item.title}
      </a>
    );
  };

  const SubMenuLink = ({ item }: { item: MenuItem }) => (
    <a
      className="hover:bg-white hover:text-[#E32320] flex select-none flex-row gap-4 rounded-md p-3 transition-colors"
      href={item.url}
    >
      <div>{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-snug">{item.description}</p>
        )}
      </div>
    </a>
  );

  return (
    <section
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-500 
      ${visible ? "translate-y-0" : "-translate-y-full"} 
      bg-black/10 backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto w-full p-5">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href="/">
              <Image src="/Logo Horizontal.png" className="max-h-8 dark:invert" alt="logo" width={100} height={100} />
            </a>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Idiomas Desktop */}
          <div className="flex gap-2">
            <Link href="/" locale="pt">
              <Button size="sm" className={`border ${currentLocale === "pt" ? "bg-[#E32320] text-white" : "hover:bg-[#E32320] hover:text-white"}`}>BR</Button>
            </Link>
            <Link href="/" locale="en">
              <Button size="sm" className={`border ${currentLocale === "en" ? "bg-[#E32320] text-white" : "hover:bg-[#E32320] hover:text-white"}`}>US</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href="/">
              <img src="/Logo Horizontal.png" className="max-h-8 dark:invert" alt="logo" />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon"><Menu className="size-4" /></Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-[#E32320]">
                <SheetHeader>
                  <SheetTitle>
                    <a href="/"><img src="/Logo Horizontal.png" className="max-h-8 dark:invert" alt="logo" /></a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {/* Idiomas Mobile */}
                  <div className="flex flex-col gap-3">
                    <Link href="/" locale="pt"><Button size="sm" className={`border w-full ${currentLocale === "pt" ? "bg-white text-[#E32320]" : "bg-[#E32320] text-white hover:bg-white hover:text-[#E32320]"}`}>BR</Button></Link>
                    <Link href="/" locale="en"><Button size="sm" className={`border w-full ${currentLocale === "en" ? "bg-white text-[#E32320]" : "bg-[#E32320] text-white hover:bg-white hover:text-[#E32320]"}`}>US</Button></Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
