// import Image from "next/image";
"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import ImpactCard from "./ImpactCard";
import Link from "next/link";

const impactStats = [
  {
    title: "100+ Students Trained",
    text: "We have directly equipped over 100 students with practical knowledge, giving them hands-on knowledge that supports their academic and career growth.",
    icon: "📘",
  },
  {
    title: "10+ Schools Reached",
    text: "Our outreaches, including environmental-tech outreaches, have expanded to over 10 secondary schools across various communities in Lagos, Nigeria.",
    icon: "🏫",
  },
  {
    title: "2,000+ Youth Engaged",
    text: "More than 2,000 young people have actively participated in our peer-led sessions and storytelling projects collectively.",
    icon: "👥",
  },
  {
    title: "12K+ Digital Impressions",
    text: "Our digital campaigns have generated over 12,000 impressions, showing strong online visibility, awareness, and community interest.",
    icon: "📱",
  },
];
const lastImapactCard = {
  title: "30+ Youth Volunteers",
  text: "A dedicated team of 30+ volunteers consistently drives our impact, contributing their time, passion, and commitment to every project.",
  icon: "🤝",
};

export default function ImpactHeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <div
        className={`w-full  py-20 px-4 ${loaded ? "opacity-100" : "opacity-0"} transition-all duration-700 delay-200 ease-in-out`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="max-w-3xl 2xl:max-w-[1100px] mx-auto text-center text-black font-bold text-[24px] md:text-[40px] lg:text-[50px] 2xl:text-[70px]  leading-tight">
            We’re still learning. Still growing. But here’s what we’ve been able
            to do:
          </h2>
          {/* Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 2xl:gap-1.5 px-3 lg:px-0">
            {impactStats.map((impact, index) => (
              <ImpactCard key={index} index={index} impact={impact} />
            ))}
          </div>

          {/* Bottom content */}
          <div className=" flex mt-15 flex-col md:flex-row md:gap-x-2 lg:gap-x-22 min-h-[230px] items-center ">
            <div className="px-3 lg:px-0">
              <ImpactCard impact={lastImapactCard} index={0} />
            </div>
            <div className="block font-satoshi  md:w-[480px]  xl:h-auto  mt-8 md:mt-4 px-2 pt-2 pb-20 relative ">
              <p className="font-satoshi font-medium text-[22px] md:text-[30px] 2xl:text-[40px] text-dark-green">
                We track all our efforts from tech-driven outreaches to
                storytelling projects. Every small win counts.
              </p>

              <div className="w-full left-0 absolute pl-2 bottom-[-15px] md:bottom-[-50px] lg:bottom-3  flex items-center md:justify-center lg:justify-start flex-wrap gap-x-4 md:gap-y-4 py-2 md:pb-20 lg:py-2">
                <div className="block md:hidden lg:block">
                  <Link
                    href="https://drive.google.com/drive/folders/1NruAl4gUYkElKbivGsceG8G_4ur2M-sX?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button btnBg="#012f25" textColor="#ffffff">
                      Download Reports
                    </Button>
                  </Link>
                </div>
                <Link
                  href="https://www.instagram.com/project_climeset/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="italic text-dark-green underline font-montserrat  font-bold text-base md:text-[22px] 2xl:text-[28px] ">
                    Watch Stories
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
