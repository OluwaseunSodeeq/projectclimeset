"use client";
import Link from "next/link";
import Button from "./Button";
import { RightGradientDashedFadeLine } from "./GradientLines";
import ProjectCard from "./ProjectCard";
import { ProjectSliderContainer } from "./ProjectSliderContainer";
import { PROJECTS } from "../../lib/projectsData";
import { useState, useEffect } from "react";

export default function ProjectsSection() {
  const projectsDetails = Object.values(PROJECTS);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" pb-15">
      <div
        className={`flex flex-col gap-y-3.5 pb-5 ${loaded ? "opacity-100" : "opacity-0"} transition-all duration-700 delay-200 ease-in-out`}
      >
        {projectsDetails.map((eachProject, index) => {
          return <ProjectCard key={index} eachProject={eachProject} />;
        })}
      </div>
      <div className=" mt-[2rem] pb-10 xl:pb-0 relative">
        <RightGradientDashedFadeLine />
      </div>
      <ProjectSliderContainer />
      <div className="font-satoshi xl:mt-10 px-[1.5rem]">
        <h2 className="font-bold text-black  md:text-[40px] xl:text-[50px] 2xl:text-[60px]">
          AIyika by Climeset{" "}
        </h2>
        <p className=" md:text-[24px] xl:text-[26px] 2xl:text-[30px] text-black mt-3 xl:pr-[10rem]">
          Our biggest dream yet: an AI-powered app that gives everyday people
          from students to teachers to traders access to local climate data,
          guides, and project templates to take action right where they live.
        </p>
        <div className="md:w-[15rem] mt-[65px] flex items-center justify-start gap-x-4 md:gap-x-2">
          <Link href="/about">
            <Button btnBg="#012f25" textColor="#ffffff">
              About Us
            </Button>
          </Link>
          {/* <span className="italic text-dark-green cursor-pointer underline font-montserrat text-[14px] font-medium">
            See our Projects
          </span> */}
        </div>
      </div>
    </div>
  );
}
