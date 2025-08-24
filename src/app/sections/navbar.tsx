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
    { title: "Inicio", url: "/" },
    { title: "Sobre", url: "#" },
    {
      title: "Serviços",
      url: "#",
      items: [
        { title: "Brand Protection", icon: <Zap className="size-5 shrink-0" />, url: "#" },
        { title: "Leak Detection", icon: <Sunset className="size-5 shrink-0" />, url: "#" },
        { title: "VIP Protection", icon: <Trees className="size-5 shrink-0" />, url: "#" },
        { title: "Cyber Risk Insights", icon: <Book className="size-5 shrink-0" />, url: "#" },
      ],
    },
    { title: "Mentorias", url: "#" },
  ],
}: Navbar1Props) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1]; // captura "pt" ou "en"

  const t = useTranslations('Navbar');

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
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
                width={100}
                height={100}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Idiomas Desktop */}
          <div className="flex gap-2">
            <Link href="/" locale="pt">
              <Button
                size="sm"
                className={`border cursor-pointer ${currentLocale === "pt"
                  ? "bg-[#E32320] text-white"
                  : "hover:bg-[#E32320] hover:text-white"
                  }`}
              >
                BR
              </Button>
            </Link>
            <Link href="/" locale="en">
              <Button
                size="sm"
                className={`border cursor-pointer ${currentLocale === "en"
                  ? "bg-[#E32320] text-white"
                  : "hover:bg-[#E32320] hover:text-white"
                  }`}
              >
                US
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild className="bg-[#E32320] border">
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-[#E32320]">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Idiomas Mobile */}
                  <div className="flex flex-col gap-3">
                    <Link href="/" locale="pt">
                      <Button
                        size="sm"
                        className={`border cursor-pointer w-full ${currentLocale === "pt"
                          ? "bg-white text-[#E32320]"
                          : "bg-[#E32320] text-white hover:bg-white hover:text-[#E32320]"
                          }`}
                      >
                        BR
                      </Button>
                    </Link>
                    <Link href="/" locale="en">
                      <Button
                        size="sm"
                        className={`border cursor-pointer w-full ${currentLocale === "en"
                          ? "bg-white text-[#E32320]"
                          : "bg-[#E32320] text-white hover:bg-white hover:text-[#E32320]"
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

// Submenu Desktop
const renderMenuItem = (item: MenuItem) => {

  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{(`${item.title}`)}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-[#E32320] min-w-[220px]">
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

// Submenu Mobile
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

export { Navbar };
