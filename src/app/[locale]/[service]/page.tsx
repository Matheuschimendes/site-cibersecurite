"use client"
import { Navbar } from "@/app/sections/navbar";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation"
import SectionSevice from "./_components/sectionSevice";
import { SectionServiceSecond } from "./_components/sectionSeviceSecond";
import { AboutService } from "./_components/aboutService";
import { SectionBusiness } from "./_components/sectionBusiness";




export default function ServicePage() {

  const { service } = useParams(); // pegar 'leak_detection' ou 'outros servicos'
  const t = useTranslations(`galLery.items.${service}`); // pegar tradução do JSON
  return (
    <>
      <div className="p-5" >
        <Navbar />
        <SectionSevice />
        <AboutService />
        <SectionServiceSecond />
        <SectionBusiness />
      </div>
    </>
  )
}