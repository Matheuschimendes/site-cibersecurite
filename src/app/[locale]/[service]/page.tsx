"use client"
import { Navbar } from "@/app/sections/navbar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation"

export default function ServicePage() {

  const { service } = useParams(); // pegar 'leak_detection' ou 'outros servicos'
  const t = useTranslations(`galLery.items.${service}`); // pegar tradução do JSON
  return (
    <>
      <div className="p-10 mx-full mx-auto">
        <Navbar />
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-gray-700">{t("description")}</p>
        <Link href="/" className="text-[#E32320] underline">Home</Link>
      </div>
    </>
  )
}