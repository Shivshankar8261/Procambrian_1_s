import { Nav } from "@/components/Nav";
import { SectionRail } from "@/components/SectionRail";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Problems } from "@/components/sections/Problems";
import { Solution } from "@/components/sections/Solution";
import { Offerings } from "@/components/sections/Offerings";
import { Standards } from "@/components/sections/Standards";
import { Principles } from "@/components/sections/Principles";
import { About } from "@/components/sections/About";
import { Mission } from "@/components/sections/Mission";
import { Interlude } from "@/components/sections/Interlude";
import { Team } from "@/components/sections/Team";
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
        <ValueProps />
        <Problems />
        <Solution />
        <Offerings />
        <Standards />
        <Principles />
        <About />
        <Mission />
        <Interlude sources={sources} />
        <Team />
        <Faq />
        <CtaFooter />
      </main>
    </>
  );
}
