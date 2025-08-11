import GlobeDemo from "./_components/globo";
import { About } from "./sections/about";
import { Navbar } from "./sections/navbar";
import Footer03Page from "@/app/sections/footer-03";
import Gallery from "@/app/sections/gallery";



export default function Home() {
  return (
    <div className="">
      <Navbar />
      <GlobeDemo />
      <About />
      <Gallery />
      <Footer03Page title={""} description={""} />
    </div>
  );
}
