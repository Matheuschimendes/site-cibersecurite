import Globe from "./_components/Globo";
import { About } from "./sections/about";
import { Navbar } from "./sections/navbar";
import FooterPage from "@/app/sections/footer";
import Gallery from "@/app/_components/Gallery";
import { Treinamento } from "./sections/treinamento";
import { Contato } from "./sections/Contato";




export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Globe />
      <About />
      <Gallery />
      <Treinamento />
      <Contato />
      <FooterPage />
    </div>
  );
}
