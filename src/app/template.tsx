"use client"

import { useEffect } from "react";
import { animatePageIn } from "../utils/animations";
// import { LoadingPage } from "./_components/loadingPage";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div className="">
      {/* <div className="top-0 left-0 w-full h-full z-50 flex items-center justify-center">
        <div className="position-absolute t-0 l-0 bg-gradient-to-r from-[#E80D0D] to-[#E32320] w-full h-full
        ">
          <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
            <LoadingPage />
          </div>
        </div>
      </div> */}

      <div id="banner-1" className="min-h-screen bg-[#E80D0D] z-40 fixed top-0 left-0 w-1/4" />
      <div id="banner-2" className="min-h-screen bg-[#E80D0D] z-40 fixed top-0 left-1/4 w-1/4" />
      <div id="banner-3" className="min-h-screen bg-[#E80D0D] z-40 fixed top-0 left-2/4 w-1/4" />
      <div id="banner-4" className="min-h-screen bg-[#E80D0D] z-40 fixed top-0 left-3/4 w-1/4" />
      {children}
    </div>
  )
}