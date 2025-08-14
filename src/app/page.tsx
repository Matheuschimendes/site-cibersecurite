import Globe from "./_components/globo";
import { About } from "./sections/about";
import { Navbar } from "./sections/navbar";
import FooterPage from "@/app/sections/footer";
import Gallery from "@/app/_components/gallery";
import { Treinamento } from "./sections/treinamento";


export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Globe />
      <About />
      <Gallery />
      <Treinamento />
      <FooterPage />
    </div>
  );
}
