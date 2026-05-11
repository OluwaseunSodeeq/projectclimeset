// "use client";
import React from "react";
import Wrapper from "../components/Wrapper";
import WhatWeDoSection from "../components/WhatWeDoSection";
import TestimonialSection from "../components/TestimonialSection";
import HowWeWorkSection from "../components/HowWeWorkSection";
import Partners from "../components/Partners";
import HeroScetion from "../components/HeroSection";

export default function Page() {
  return (
    <section>
      <section className="px-0 md:px-[1.5rem] xl:px-[3.5rem] font-satoshi">
        <HeroScetion />
      </section>
      <Wrapper bg={"#ffffff"}>
        <WhatWeDoSection />
        <TestimonialSection />
        <HowWeWorkSection />
        <Partners />
      </Wrapper>
    </section>
  );
}
