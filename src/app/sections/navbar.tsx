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
  menu?: MenuItem[];
}

const Navbar = ({
  logo = {
    url: "/",
    src: "/Logo Horizontal.png",
    alt: "logo",
    title: "",
  },
  menu = [
    { title: "inicio", url: "/" },
    { title: "sobre", url: "#" },
    {
      title: "servicos",
      url: "#",
      items: [
        { title: "brandProtection", icon: <Zap className="size-5 shrink-0" />, url: "#" },
        { title: "leakDetection", icon: <Sunset className="size-5 shrink-0" />, url: "#" },
        { title: "vipProtection", icon: <Trees className="size-5 shrink-0" />, url: "#" },
        { title: "cyberRiskInsights", icon: <Book className="size-5 shrink-0" />, url: "#" },
      ],
    },
    { title: "mentorias", url: "#" },
  ],
}: Navbar1Props) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const t = useTranslations("Navbar"); // agora é usado

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= lastScrollY || currentScrollY <= 80);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // --- Funções de renderização de menus ---
  const renderMenuItem = (item: MenuItem) => {
    const title = t(item.title);
    if (item.items) {
      return (
        <NavigationMenuItem key={item.title}>
          <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#E32320] min-w-[220px]">
            {item.items.map((subItem) => (
              <NavigationMenuLink
                asChild
                key={subItem.title}
                className="p-2 hover:bg-white hover:*:text-[#E32320] transition-colors block"
              >
                <SubMenuLink item={{ ...subItem, title: t(subItem.title) }} />
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
          {title}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    const title = t(item.title);
    if (item.items) {
      return (
        <AccordionItem key={item.title} value={item.title} className="border-b-0">
          <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
            {title}
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={{ ...subItem, title: t(subItem.title) }} />
            ))}
          </AccordionContent>
        </AccordionItem>
      );
    }
    return (
      <Link key={item.title} href={item.url} className="text-md font-semibold">
        {title}
      </Link>
    );
  };

  const SubMenuLink = ({ item }: { item: MenuItem }) => (
    <Link
      href={item.url}
      className="hover:bg-white hover:text-[#E32320] flex select-none flex-row gap-4 rounded-md p-3 transition-colors"
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

  return (
    <section
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-500 ${visible ? "translate-y-0" : "-translate-y-full"
        } bg-black/10 backdrop-blur-md shadow-lg`}
    >
      <div className="container mx-auto w-full p-5">
        {/* Desktop */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} width={100} height={100} />
              <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>{menu.map(renderMenuItem)}</NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/" locale="pt">
              <Button size="sm" className={`border cursor-pointer ${currentLocale === "pt" ? "bg-[#E32320] text-white" : "hover:bg-[#E32320] hover:text-white"}`}>BR</Button>
            </Link>
            <Link href="/" locale="en">
              <Button size="sm" className={`border cursor-pointer ${currentLocale === "en" ? "bg-[#E32320] text-white" : "hover:bg-[#E32320] hover:text-white"}`}>US</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} alt={logo.alt} width={100} height={100} className="max-h-8 dark:invert" />
            </Link>

            <Sheet>
              <SheetTrigger asChild className="bg-[#E32320] border">
                <Button variant="outline" size="icon"><Menu className="size-4" /></Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto bg-[#E32320]">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image src={logo.src} alt={logo.alt} width={100} height={100} className="max-h-8 dark:invert" />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map(renderMobileMenuItem)}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Link href="/" locale="pt">
                      <Button size="sm" className={`border cursor-pointer w-full ${currentLocale === "pt" ? "bg-white text-[#E32320]" : "bg-[#E32320] text-white hover:bg-white hover:text-[#E32320]"}`}>BR</Button>
                    </Link>
                    <Link href="/" locale="en">
                      <Button size="sm" className={`border cursor-pointer w-full ${currentLocale === "en" ? "bg-white text-[#E32320]" : "bg-[#E32320] text-white hover:bg-white hover:text-[#E32320]"}`}>US</Button>
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
