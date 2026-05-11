"use client";
import React, { useState } from "react";
import HowWeWorkCard from "./HowWeWorkCard";
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import DonationCard from "./DonationCard";

export default function HowWeWorkSection() {
  const [showDonation, setShowDonation] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("8105810398");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const howWeWorkArray = [
    {
      heading: "GDFT",
      text: "Building digital skills and solutions that help young people use and create tech for climate action.",
      link: "/projects/gdft",
    },
    {
      heading: "GDS",
      text: "Building awareness through stories of climate resilience, told in ways everyone can understand.",
      link: "/projects/gds",
    },
    {
      heading: "GDC",
      text: "Building digital campaigns and community actions that spread awareness and inspire change.",
      link: "/projects/gdc",
    },
  ];

  return (
    <div className="px-[1rem] xl:px-[3.5rem] bg-dark-green relative font-satoshi">
      <div className="flex flex-col md:flex-row md:justify-between xl:px-4 pb-3 pt-[3rem] md:pt-[5rem]">
        <div className="font-satoshi text-main-bg text-[25px] xl:text-4xl">
          <h4 className="font-bold">Wanna see how we work?</h4>
          <span className="font-light block">Our projects are sectioned </span>
          <span className="font-light">into the following:</span>
        </div>

        <div className="flex gap-x-6 items-center mt-[3.4rem] md:mt-[5.4rem] relative z-20">
          <Link href="/projects" className="inline-block">
            <Button btnBg="#ffffff" textColor="#012f25">
              See Our Projects
            </Button>
          </Link>
          <button
            onClick={() => setShowDonation(true)}
            className="italic underline cursor-pointer font-montserrat text-[11px] font-medium text-main-bg mt-3.5 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Support Us
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center pt-[4.6rem] xl:pt-[5.6rem] pb-[5rem] xl:pb-[9rem] gap-6">
        {howWeWorkArray.map((item, i) => (
          <HowWeWorkCard key={i} index={i} item={item} />
        ))}
      </div>

      <div className="absolute opacity-100 w-[24rem] md:w-[34rem] h-[22rem] md:h-[32rem] top-[1rem] xl:top-[6rem] right-[-6rem] rotate-[34deg] pointer-events-none z-0">
        <Image src="/logo-bg.png" alt="logo" fill className="object-contain" />
      </div>

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
