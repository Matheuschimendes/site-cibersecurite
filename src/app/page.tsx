import GlobeDemo from "./_components/globo";
import { About } from "./sections/about";
import { Navbar } from "./sections/navbar";
import Footer03Page from "@/app/sections/footer-03";
import { Introduction } from "./sections/introduction";
import { About2 } from "./sections/about2";
import StarCanvas from "./_components/star";
import Gallery from "@/app/sections/gallery";



export default function Home() {
  return (
    <div className="">
      <Navbar />
      <GlobeDemo />
      {/* <Introduction /> */}
      <About />
      {/* <About2 /> */}
      <Gallery />
      <Footer03Page />
    </div>
  );
}
