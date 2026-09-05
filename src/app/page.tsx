"use client";

import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { DepthRail } from "@/components/DepthRail";
import { Hero } from "@/components/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ProofBand } from "@/components/sections/ProofBand";
import { Approach } from "@/components/sections/Approach";
import { Faq } from "@/components/sections/Faq";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <SmoothScroll />
      <Nav />
      <div className="flex">
        <DepthRail />
        <main className="flex-1 min-w-0">
          <Hero />
          <WhatWeDo />
          <ProofBand />
          <Approach />
          <Faq />
          <CtaFooter />
        </main>
      </div>
    </>
  );
}
