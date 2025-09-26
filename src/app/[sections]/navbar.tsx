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

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}

const Navbar = ({ logo }: NavbarProps) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const t = useTranslations("Navbar");

  const menu: MenuItem[] = [
    { title: t("inicio"), url: "/" },
    { title: t("sobre"), url: "#about" },
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
    { title: t("mentorias"), url: "#treinamentos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= lastScrollY || currentScrollY <= 80);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      <Link key={item.title} href={item.url} className="text-md font-semibold">
        {item.title}
      </Link>
    );
  };

  const SubMenuLink = ({ item }: { item: MenuItem }) => (
    <Link
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
    </Link>
  );

  // Função corrigida: remove parâmetro não usado
  const getLocaleHref = () => {
    const segments = pathname.split("/").filter(Boolean); // ["pt","leak_detection"]
    segments.shift(); // remove o locale atual
    return "/" + segments.join("/"); // "/leak_detection"
  };

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
            <Link href="/">
              <Image
                src={logo?.src || "/Logo Horizontal.png"}
                className="max-h-8 dark:invert"
                alt={logo?.alt || "logo"}
                width={100}
                height={100}
              />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Idiomas Desktop */}
          <div className="flex gap-2">
            <Link href={getLocaleHref()} locale="pt">
              <Button
                size="sm"
                className={`border ${currentLocale === "pt"
                  ? "bg-red-600 text-white"
                  : "hover:bg-red-600 hover:text-white"
                  }`}
              >
                PT
              </Button>
            </Link>
            <Link href={getLocaleHref()} locale="en">
              <Button
                size="sm"
                className={`border ${currentLocale === "en"
                  ? "bg-red-600 text-white"
                  : "hover:bg-red-600 hover:text-white"
                  }`}
              >
                EN
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src={logo?.src || "/Logo Horizontal.png"}
                className="max-h-8 dark:invert"
                alt={logo?.alt || "logo"}
                width={100}
                height={100}
              />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-[#E32320]">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/">
                      <Image
                        src={logo?.src || "/Logo Horizontal.png"}
                        className="max-h-8 dark:invert"
                        alt={logo?.alt || "logo"}
                        width={100}
                        height={100}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {/* Idiomas Mobile */}
                  <div className="flex flex-col gap-3">
                    <Link href={getLocaleHref()} locale="pt">
                      <Button
                        size="sm"
                        className={`border w-full cursor-pointer ${currentLocale === "pt"
                          ? "bg-white text-red-600"
                          : "bg-red-600 text-white hover:bg-white hover:text-[#E32320]"
                          }`}
                      >
                        BR
                      </Button>
                    </Link>

                    <Link href={getLocaleHref()} locale="en">
                      <Button
                        size="sm"
                        className={`border w-full cursor-pointer ${currentLocale === "en"
                          ? "bg-white text-red-600"
                          : "bg-red-600 text-white hover:bg-white hover:text-[#E32320]"
                          }`}
                      >
                        US
                      </Button>
                    </Link>
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
