import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";
import Link from "next/link";
import {
  LeftGradientDashedFadeLine,
  RightGradientDashedFadeLine,
} from "./GradientLines";
import DonationCard from "./DonationCard";

export default function HerosecLeftCard({ loaded }) {
  const [showDonation, setShowDonation] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("8105810398");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const btnBg = "#fdcd31";
  const textColor = "#012f25";

  return (
    <div
      className={`relative font-satoshi w-full 2xl:max-w-[36rem] xl:w-[33rem] xl:h-[40rem] md:h-[40rem] md:w-[45%] bg-dark-green text-main-bg pt-[4.2rem] md:pt-[3rem] xl:pt-[7rem] px-[1rem]  xl:px-[3.5rem] pb-0 xl:pb-[2rem] md:rounded-[1.2rem]  ${
        loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      } transition-all duration-500 ease-in-out `}
    >
      <h1 className="font-satoshi text-[48px] lg:text-[40px] text-main-bg mb-4 md:font-medium leading-[1] lg:text-nowrap">
        <span className=""> Building Green </span>
        <span className="text-[84px] lg:text-[40px] text-yellow md:text-main-bg md:text-[48px] xl:[40px] font-bold md:font-medium">
          Dreams
        </span>
      </h1>
      <div className=" w-full text-[32px] xl:text-4xl text-main-bg font-light mb-4 p-0 text-nowrap">
        <div className=" flex gap-x-1  mt-[1rem] md:mt-0 ">
          <div className="border-b-2 flex gap-x-[10px] pb-1 ">
            <Image src="/white-arrows.svg" alt="arrow" width={32} height={32} />
            <span className="mr-1 lg:pb-2"> From</span>
          </div>

          <p className=" md:pl-8 lg:pl-0 lg:pb-3">the Ground Up</p>
        </div>
      </div>
      <div className="font-satoshi mt-4.5 md:mt-0">
        <h4 className="font-bold hidden md:block">Hi there. </h4>
        <p className="hidden md:block text-base text-main-bg font-light leading-6 italic">
          We’re a group of young Nigerians who’ve been knee-deep (literally) in
          flooded streets, trying to figure out how to stop climate change from
          wrecking our homes, schools, and futures.
        </p>
        <p className="text-base  text-main-bg font-light leading-6 mt-6 italic ">
          Project Climeset is a climate literacy organization that uses
          storytelling and technology to advance climate education, build
          resilience, and reduce climate apathy.
        </p>
      </div>

      <div className="font-montserrat flex font-medium gap-4 items-center mt-[2.5rem]  xl:mt-[1.2rem] pb-6 md:pb-0 pt-2 md:pt-0">
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSeSDq9c0lHfmWGWAnK5oHID6UgZAZQzosnWMfHCJc-ItjV5AA/viewform?usp=header"
          target="_blank"
        >
          <Button btnBg={btnBg} textColor={textColor}>
            Get Involved
          </Button>
        </Link>

        <button
          onClick={() => setShowDonation(true)}
          className="underline text-light-green text-[14px] cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Support a Project
        </button>
      </div>

      <div className="w-full transition  md:hidden mt-2.5">
        <RightGradientDashedFadeLine />
      </div>
      {/* ✅ Backdrop lives here — direct child of outermost div, renders last */}
      {showDonation && (
        <DonationCard
          setShowDonation={setShowDonation}
          handleCopy={handleCopy}
          copied={copied}
        />
      )}
    </div>
  );
}
