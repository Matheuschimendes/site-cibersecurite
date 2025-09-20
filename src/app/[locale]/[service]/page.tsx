"use client";

import { Navbar } from "@/app/sections/navbar";
import { useParams } from "next/navigation";
import SectionSevice from "./_components/sectionSevice";
import { SectionServiceSecond } from "./_components/sectionSeviceSecond";
import { AboutService } from "./_components/aboutService";
import { SectionBusiness } from "./_components/serviceBusiness";
import FooterPage from "@/app/sections/footer";
import { Contato } from "@/app/sections/contato";

export default function ServicePage() {
  // Pegamos o parâmetro caso queira usar futuramente
  const _ = useParams(); // ex: 'leak_detection' ou outros

  return (
    <div className="p-5">
      <Navbar />
      <SectionSevice />
      <AboutService />
      <SectionServiceSecond />
      <SectionBusiness />
      <Contato />
      <FooterPage />
    </div>
  );
}
