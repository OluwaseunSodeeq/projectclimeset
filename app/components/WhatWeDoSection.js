import React from "react";
// import Wrapper from "./Wrapper";
import Button from "./Button";
import CardCounter from "./CardCounter";
import Link from "next/link";
import Image from "next/image";

function Container({ children }) {
  <div
    base="w-full h-[20rem]"
    sm="h-[25rem]"
    md="h-[30rem]"
    lg="h-[35rem]"
    className="bg-blue-500 flex items-center justify-center text-white"
  >
    {children}
  </div>;
}

export default function WhatWeDoSection() {
  const cardArr = [
    { numb: "100", text: "students trained directly" },
    { numb: "2000", text: "young people engaged directly" },
    { numb: "12000", text: "reached online through digital campaigns" },
    { numb: "30", text: "youth volunteers in our network" },
  ];

  return (
    // <Wrapper>
    <div className="relative mt-[3rem] md:mt-[7rem] pb-[3.5rem] md:pb-[5rem] xl:px-[3.5rem] py-0">
      <div className="font-satoshi text-left ml-5 md:ml-0 md:text-center flex gap-0 flex-col">
        <span className="font-normal text-dark-green md:text-black text-[1.3rem] md:text-[2.3rem] p-0">
          What We Do
        </span>
        <div className="p-0">
          <span className="font-normal md:font-bold text-[15px] md:text-[2.2rem] ">
            Everything We Do Centers on
          </span>
          {/* <span className="text-[15px] md:text-[2.2rem] font-normal"></span> */}
        </div>
        <div className="font-normal md:font-medium text-[15px] md:text-[2.2rem] md:flex flex-col p-0 ">
          <span>Three Key Things</span>
        </div>
      </div>

      <div className="mt-[1.5rem] w-full md:mt-[4rem] ">
        <div className="flex items-center flex-col-reverse md:gap-x-8 xl:gap-[2.8rem]  md:justify-center md:flex-row md:px-4 xl:px-0">
          <div
            className="bg-cover bg-center bg-no-repeat gradient-border w-[90%] md:w-[50%] h-[300px] xl:w-[33.3rem] xl:h-[17rem] relative rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
              backgroundImage: "url('/whatwedo01.jpg')",
            }}
          >
            <div className="absolute xl:left-[2rem] bottom-0   xl:bottom-[7%] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-main-bg/80 xl:w-[25rem] rounded-md">
              <p className="font-satoshi font-normal text-sm p-4 ">
                <span className="font-bold">
                  We use technology to educate and innovate,{" "}
                </span>
                guiding young people to apply existing tools in protecting and
                connecting to the environment, while building solutions
                ourselves.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 w-[25rem] xl:w-[28rem] h-[20rem] justify-center items-center  ">
            {cardArr.map((card, i) => {
              const { numb, text } = card;
              return <CardCounter key={i} numb={numb} text={text} />;
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col md:flex-row  gap-y-5 md:gap-x-7 xl:gap-x-6 mt-5 xl:mt-0 mb-5 xl:mb-0 md:px-4 xl:px-0">
        <div className="flex items-center justify-center md:justify-start xl:gap-[2.8rem] w-[90%] xl:w-[33.3rem]">
          <div
            className="bg-cover bg-center bg-no-repeat  gradient-border w-full  h-[300px]  xl:h-[17rem] relative rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
              backgroundImage: "url('/whatwedo.png')",
            }}
          >
            <div className="absolute xl:left-[2rem] bottom-0  xl:bottom-[7%] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-main-bg/80 xl:w-[70%] rounded-md">
              <p className=" font-normal text-sm p-4 ">
                <span className="font-bold">We run digital campaigns </span>
                where we team up with creators to get young people fired up
                about protecting their communities.
              </p>
            </div>
          </div>
        </div>

        <div className=" w-[90%] gradient-border  h-[300px] xl:w-[21rem] xl:h-[17rem] relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <Image
            src="/hero22.png"
            alt="cover"
            fill
            className="object-cover scale-[1.01]"
            quality={75}
            priority
          />

          <div className="absolute xl:left-[1rem] bottom-0 xl:bottom-[7%] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-main-bg/80 xl:w-[90%] rounded-md">
            <p className="font-normal text-sm p-4">
              <span className="font-bold">We tell stories of climate </span>
              and environmental resilience, drawn from true-life cases and
              experiences to amplify voices and inspire environmental
              changemaking.
            </p>
          </div>
        </div>

        <div className="block md:hidden xl:block  xl:w-[17.8rem] xl:h-[12.8rem] shadow-sm mt-4 px-2 pt-2 rounded-sm relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <p className="font-satoshi font-medium text-center text-[19px] xl:text-4xl text-dark-green">
            Want to know where it all started?
          </p>

          <div className="w-[15rem] absolute top-14 left-1/2 -translate-x-1/2  md:bottom-2 xl:top-30 flex items-center justify-center gap-x-4 md:gap-x-2 ">
            <Link href="/about" className="inline-block">
              <Button btnBg="#012f25" textColor="#ffffff">
                About Us
              </Button>
            </Link>
            <Link href="/projects" className="inline-block">
              <button className="italic cursor-pointer underline font-montserrat text-[11px] font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                See our Projects
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
