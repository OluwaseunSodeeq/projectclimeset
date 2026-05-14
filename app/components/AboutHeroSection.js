"use client";
import Image from "next/image";
import ButtonText from "./ButtonText";
import { RightGradientDashedFadeLine } from "./GradientLines";
import { useState, useEffect } from "react";

export default function AboutHeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  const paragraphs = [
    "It all started with the rain. The kind that floods roads gets people walking in pools of water above ankle-level. It nearly caused one of our team members to miss an important exam at school.",
    "That day, our founder, Abeedah, realised that climate change wasn’t a distant threat; it was a personal reality affecting her and her community’s access to education.",
    'What began in 2022 as "Project Climeset", a capstone project for her STEM scholarship through AFS and the University of Pennsylvania, was intended to be a one-off initiative for local secondary students.',
    "But today, Climeset has expanded far beyond its original scope, evolving into a dedicated 18-member team of creatives, techies, and managers.",
  ];
  return (
    <div
      className={`w-full flex flex-col gap-16 px-4 lg:px-6 py-8.5 font-satoshi ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} transition-all duration-700 delay-200 ease-in-out `}
    >
      <div className="w-full bg-white overflow-hidden ">
        {/* <div className="relative 80-full h-72 md:h-[420px] xl:h-[650px] 2xl:h-[860px]"> */}
        <div className="relative w-full h-80 md:h-[420px] xl:h-[650px] 2xl:h-[860px] ">
          <Image
            src="/aboutBg.jpg"
            alt="Team working"
            fill
            priority
            placeholder="empty"
            className="object-cover w-full h-full rounded-md md:rounded-3xl 2xl:rounded-[40px]"
          />
          <div className="absolute bottom-[40px] md:bottom-[70px] left-[10px] md:left-[50px]">
            <ButtonText text="Discover Our Roots" />
          </div>
        </div>

        {/* <div className="hidden relative mt-5 py-2 md:flex justify-center items-center gap-9"> */}
        <div className="relative mt-5 py-2 md:flex justify-center items-center gap-9">
          <div className=" hidden h-full relative text-3xl font-semibold md:flex items-center justify-center mt-2 ml-2 xl:ml-2.5">
            <span className="absolute top-0 w-3 h-3 bg-dark-green"></span>
            <div className="md:h-[265px] xl:h-[400px] w-[1px] text-center bg-gray-300"></div>
            <span className="absolute bottom-0  w-3 h-3 bg-yellow"></span>
          </div>

          <div className="font-satoshi">
            <h1 className="font-bold xl:text-[50px] 2xl:text-[55px]">
              Our Story
            </h1>
            <div className=" mt-5 font-normal  xl:text-[22px] 2xl:text-[25px] leading-relaxed">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-3.5">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className=" md:hidden mt-[3rem]">
          <RightGradientDashedFadeLine />
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-10 md:px-3 xl:px-0 xl:pl-10 xl:pb-[3rem]">
          <div>
            <h3 className="text-gradient md:hidden text-xl mb-3 font-semibold">
              Our Mission
            </h3>
            <h3 className="hidden md:block text-xl font-semibold text-dark-green mb-3  xl:text-[32px] 2xl:text-[40px]">
              Our Mission
            </h3>
            <p className=" xl:text-[22px] 2xl:text-[25px] leading-relaxed">
              To combat climate apathy and build community resilience among
              Nigerian youth by merging creative storytelling with innovative
              technology to deliver transformative climate education.
            </p>
          </div>

          <div>
            <h3 className="text-gradient md:hidden text-xl mb-3 font-semibold">
              Our Vision
            </h3>
            <h3 className="hidden md:block xl:text-2xl font-semibold text-yellow mb-3 xl:text-[32px] 2xl:text-[40px]">
              Our Vision
            </h3>
            <p className=" xl:text-[22px] 2xl:text-[25px] leading-relaxed">
              To become Nigeria’s premier hub for climate storytelling and
              innovation, by establishing physical and digital centres and
              solutions that turn &apos;Green Dreams&apos; into reality for
              young people and communities in every region of the country.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
