import { Nav } from "@/components/Nav";
import { SectionRail } from "@/components/SectionRail";
import { Hero } from "@/components/Hero";
import { Problems } from "@/components/sections/Problems";
import { Method } from "@/components/sections/Method";
import { Standards } from "@/components/sections/Standards";
import { ProofBand } from "@/components/sections/ProofBand";
import { Principles } from "@/components/sections/Principles";
import { About } from "@/components/sections/About";
import { Interlude } from "@/components/sections/Interlude";
import { Faq } from "@/components/sections/Faq";
import { CtaFooter } from "@/components/sections/CtaFooter";
import { SmoothScroll } from "@/components/SmoothScroll";
import { heroSources } from "@/lib/videoAssets";

export default function Home() {
  const sources = heroSources();

  return (
    <>
      <SmoothScroll />
      <Nav />
      <SectionRail />
      <main>
        <Hero sources={sources} />
        <Problems />
        <Method />
        <Standards />
        <ProofBand />
        <Principles />
        <About />
        <Interlude sources={sources} />
        <Faq />
        <CtaFooter />
      </main>
    </>
  );
}
