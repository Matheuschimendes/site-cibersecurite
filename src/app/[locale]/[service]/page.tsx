"use client"
import { Navbar } from "@/app/sections/navbar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation"
import SectionSevice from "./_components/sectionSevice";
import { About } from "./_components/aboutService";
import { SectionServiceSecond } from "./_components/sectionSeviceSecond";


export default function ServicePage() {

  const { service } = useParams(); // pegar 'leak_detection' ou 'outros servicos'
  const t = useTranslations(`galLery.items.${service}`); // pegar tradução do JSON
  return (
    <>
      <div className="p-10 mx-full mx-auto">
        <Navbar />
        <SectionSevice />
        <About />
        <SectionServiceSecond />
      </div>
    </>
  )
}