"use client";

import { Navbar } from "../../[sections]/navbar";
import SectionSevice from "./_components/sectionSevice";
import { SectionServiceSecond } from "./_components/sectionSeviceSecond";
import { AboutService } from "./_components/aboutService";
import { SectionBusiness } from "./_components/serviceBusiness";
import { Contato } from "@/app/[sections]/contato";
import FooterPage from "../../[sections]/footer";

export default function ServicePage() {
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
