"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DonationCard from "./DonationCard";
import StatsCards from "./BookStatsCards";
import GrowthCard from "./GrowthCard";
import { BoldButton } from "./Button";

export default function BookHerosection({ bookStats }) {
  const { sold_copies, a_copy_amount } = bookStats;

  const [copied, setCopied] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  // CONSTANTS
  const raisedTarget = 1500000;
  const goalCopies = 600;

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Card animation state
  const [cardSoldCopies, setCardSoldCopies] = useState(0);
  const [cardSoldPercent, setCardSoldPercent] = useState(0);

  // Section animation state
  const [sectionSoldCopies, setSectionSoldCopies] = useState(0);
  const [sectionSoldPercent, setSectionSoldPercent] = useState(0);

  const [moneyRaised, setMoneyRaised] = useState(0);
  const [moneyRaisedInPercent, setMoneyRaisedInPercent] = useState(0);
  const [graphValue, setGraphValue] = useState(0);

  // =========================
  // CARD ANIMATION
  // =========================
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let progress = 0;
        const duration = 60;

        const animate = () => {
          progress++;
          const percentage = progress / duration;

          const currentSold = Math.floor(sold_copies * percentage);

          setCardSoldCopies(currentSold);
          setCardSoldPercent(Math.floor((currentSold / goalCopies) * 100));

          if (progress < duration) {
            requestAnimationFrame(animate);
          }
        };

        animate();
        observer.disconnect();
      },
      { threshold: 0 },
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [sold_copies]);

  // =========================
  // STATS SECTION ANIMATION
  // =========================
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;

        let progress = 0;
        const duration = 60;

        const animate = () => {
          progress++;
          const percentage = progress / duration;

          const currentSold = Math.floor(sold_copies * percentage);
          const currentMoney = currentSold * a_copy_amount;

          setSectionSoldCopies(currentSold);
          setSectionSoldPercent(Math.floor((currentSold / goalCopies) * 100));

          setMoneyRaised(currentMoney);
          setMoneyRaisedInPercent(
            Math.floor((currentMoney / raisedTarget) * 100),
          );

          setGraphValue(
            Math.floor((currentMoney / raisedTarget) * 100) * percentage,
          );

          if (progress < duration) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      },
      {
        threshold: 0,
        rootMargin: "150px",
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [sold_copies, a_copy_amount]);

  // =========================
  const handleCopy = () => {
    navigator.clipboard.writeText("8105810398");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnBg = "#fdcd31";
  const textColor = "#012f25";

  return (
    <div className="relative bg-dark-green min-h-screen pb-5 md:pb-[80px] lg:pb-[50px]">
      <div className="relative top-[-15px]">
        <Image
          src="/stolenbig.png"
          alt="The Story Break"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-contain object-center"
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="relative w-full flex justify-end mt-[-250px] md:mt-[-760px] xl:mt-[-1300px] px-4">
        <div className="w-full md:w-[380px] lg:w-[430px] flex flex-col gap-10">
          {/* TEXT BLOCK */}
          <div className="relative font-satoshi">
            <h1 className="w-full pl-[200px] md:pl-[50px] lg:px-3 text-[20px] md:text-[40px] 2xl:text-[45px] text-center font-bold text-main-bg">
              Nana’s Story isn’t Over. Let’s Build Her a Stronghold
            </h1>

            <div className="mt-6 md:mt-10">
              <p className="text-sm md:text-[16px] xl:text-[18px] 2xl:text-[22px] text-main-bg text-right leading-relaxed pl-2 pr-2">
                &quot;The Stolen Breath&quot; is a 99-page novel based on true
                happenings, centered around climate education and resilience
                that chronicles the struggle of 11-year-old Nana to save her
                flood-threatened school in Itowolo. To provide the story the
                happy ending it needs, we are raising ₦1,500,000 to fund
                eco-resilient classroom renovation projects at Community Primary
                School, Itowolo.
              </p>

              <div className="flex flex-col-reverse md:flex-row gap-4 items-center mt-6 px-3">
                <div onClick={() => setShowDonation(true)}>
                  <BoldButton btnBg={btnBg} textColor={textColor}>
                    DONATE TO THE PROJECT
                  </BoldButton>
                </div>

                <Link href="https://selar.com/thestolenbreath" target="_blank">
                  <button className="underline text-light-green text-[14px] cursor-pointer">
                    Buy An E-Copy
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* SOLD BOOKS CARD */}
          <div className="block md:flex md:gap-3 items-center lg:block">
            <SoldBooksCounts
              soldCopies={cardSoldCopies}
              soldCopiesInPercent={cardSoldPercent}
              cardRef={cardRef}
            />
            <div className=" hidden md:block lg:hidden">
              <GrowthCard value={graphValue} />
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div ref={sectionRef} className="w-full px-4 pt-10 md:pt-16">
        <StatsCards
          soldCopies={sectionSoldCopies}
          soldCopiesInPercent={sectionSoldPercent}
          moneyRaised={moneyRaised}
          moneyRaisedInPercent={moneyRaisedInPercent}
          raisedTarget={raisedTarget}
          goalCopies={goalCopies}
          graphValue={graphValue}
        />
      </div>
      <div className=" w-full 2xl:max-w-[1400px] lg:px-[2.7rem] bg-yellow  mt-15 py-3">
        <div className="font-montserrat flex font-medium gap-3 flex-col-reverse md:flex-row justify-center items-center">
          <Link
            href="https://www.youtube.com/watch?feature=shared&v=Xb348ZCMDSc"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <button className="underline text-dark-green text-[16px] cursor-pointer px-4 ">
              Learn More About Community Primary School Itowolo Here
            </button>
          </Link>
        </div>
      </div>

      {showDonation && (
        <DonationCard
          setShowDonation={setShowDonation}
          copied={copied}
          handleCopy={handleCopy}
        />
      )}
    </div>
  );
}

// =========================
function SoldBooksCounts({ soldCopies, soldCopiesInPercent, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="font-satoshi bg-white backdrop-blur-md rounded-2xl py-6 px-6 flex flex-col items-center gap-4 w-full md:w-[300px] xl:w-[400px] mx-auto shadow-lg transition-all duration-300 hover:scale-105"
    >
      <h1 className="text-dark-green font-bold text-[40px] xl:text-[100px] 2xl:text-[120px]">
        {soldCopies}+
      </h1>

      <div className="w-[80%] bg-[#F3F3F3] rounded-full h-3 overflow-hidden">
        <div
          className="bg-[#00D648] h-3 rounded-full"
          style={{ width: `${soldCopiesInPercent}%` }}
        />
      </div>

      <p className="font-normal text-sm mt-2 text-center text-dark-green xl:px-6">
        Your support turns a story into shelter. Every donation brings us closer
        to building climate-resilient infrastructure that protects the children
        of Community Primary School, Itowolo.
      </p>
    </div>
  );
}
