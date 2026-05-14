"use client";
import Papa from "papaparse";
import { useState, useEffect } from "react";
import Image from "next/image";
import TeamImage from "./TeamImage";

export default function MeetTheTeamImages() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selected, setSelected] = useState(null);
  const [team, setTeam] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sheetURL =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTnu-jzKEnWbgElEg5iL7HTpdkyeuJBjCUCzeAYraqy-vKvU1-uFg8CCA_TkAuh9Jdp8F8xyIKtcvMM/pub?gid=0&single=true&output=csv";

    fetch(sheetURL)
      .then((res) => res.text())
      .then((csv) => {
        const parsed = Papa.parse(csv, { header: true });
        setTeam(parsed.data);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const visibleImages = isMobile ? (showAll ? team : team.slice(0, 5)) : team;
  const validImages = [
    "abdullateef",
    "abeedah",
    "amirah",
    "animashaun",
    "ayanfeoluwa",
    "blessing",
    "busola",
    "falilat",
    "hajaratoyinkansola",
    "joy",
    "maryam",
    "oluwasegun",
    "oluwaseun",
    "quam",
    "rahmotallah",
    "saidat",
    "sideeqoh",
    "sumayyah",
  ];
  console.log(team);
  return (
    <section
      className={`w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"} transition-all duration-700 delay-150 ease-in-out `}
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-dark-green">
          Meet The Team
        </h2>
        <div className="w-16 mx-auto mt-2 ">
          <Image
            className=""
            src="/right-design.png"
            alt="Right decoration"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 lg:gap-1">
        {visibleImages.map((person, index) => {
          const firstName = person["First Name"]
            .toLowerCase()
            .replace(" ", "")
            .trim();
          const imageName = firstName === "saidah" ? "animashaun" : firstName; // Assuming image names are just the first name in lowercase without space

          const imageSrc = validImages.includes(imageName)
            ? `/teams/${imageName}.png`
            : "/fallback01.svg";

          console.log(imageSrc);
          return (
            <div
              key={index}
              onClick={() => setSelected(person)}
              className="relative w-full bg-dark-green aspect-square overflow-hidden rounded-md cursor-pointer group"
            >
              <TeamImage imageName={imageSrc} firstName={firstName} />
              {/* <Image
                // src={`/teams/${imageName}.png`}
                src={`/teams/${imageName}.png | /white-logo.png`}
                alt={imageName}
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className={`object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-300 ${person["First Name"] === "Saidah" ? "object-top" : "object-center"}`}
              /> */}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white font-semibold text-sm">View Profile</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Button */}

      <div className="flex justify-center mt-6 md:hidden">
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="px-6 py-2 bg-dark-green text-white rounded-full text-sm font-medium shadow hover:bg-dark-gretext-dark-green transition"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>

      {/* Modal */}
      {selected && (
        <ProfileModal person={selected} close={() => setSelected(null)} />
      )}
    </section>
  );
}

function ProfileModal({ person, close }) {
  return (
    <div
      onClick={close}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-scaleIn"
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-4 lg:right-6 text-gray-500 hover:text-dark-green text-xl"
        >
          ✕
        </button>

        {/* Image */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <Image
              src={`/teams/${person["First Name"].toLowerCase().replace(" ", "").trim()}.png`}
              alt={person["First Name"]}
              fill
              className="rounded-full object-cover border-4 border-dark-gretext-dark-green shadow-md"
            />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-center text-gray-800">
          {`${person["First Name"]} ${person["Last Name"]}`}
        </h2>

        {/* Role */}
        <p className="text-center text-dark-green font-medium mt-2">
          {person.Role}
        </p>

        {/* Subtle divider */}
        <div className="w-10 h-1 bg-dark-gretext-dark-green mx-auto mt-3 rounded"></div>

        {/* Extra message */}
        <p className="text-gray-500 text-sm text-center mt-4">
          Passionate about delivering excellence and making impact.
        </p>
      </div>
    </div>
  );
}
