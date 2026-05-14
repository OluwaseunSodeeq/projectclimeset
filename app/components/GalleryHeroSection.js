"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";
import WorkshopCard from "./WorkshopCard";
import { useEffect, useState } from "react";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

const images = [
  "/gallery/gallery1.png",
  "/gallery/gallery2.png",
  "/gallery/gallery3a.png",
  "/gallery/gallery4.jpg",
  "/gallery/gallery6.png",
  "/gallery/gallery5a.png",
  "/gallery/gallery7a.png",
  "/gallery/gallery8.png",
  "/gallery/gallery9.png",
  "/gallery/gallery10.png",
  "/gallery/gallery11.png",
  "/gallery/gallery13.png",
  "/gallery/gallery12.png",
  "/gallery/gallery14.png",
];

export default function GalleryHeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="px-4 md:px-10 pb-12 lg:mx-[2.5rem] font-satoshi ">
      {/* Header */}
      <div
        className={`relative font-satoshi text-center lg:w-[1000px] 2xl:w-[1200px] mx-auto mt-5 md:mt-10 lg:mb-5 pb-15 md:pb-20 flex md:flex-col flex-wrap justify-center lg:gap-0  ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} transition-opacity duration-700`}
      >
        <span className="text-[33px] md:text-[40px] lg:text-[55px] 2xl:text-[70px] font-bold text-black mb-2">
          Browse through snapshots from
        </span>
        <span className="text-[33px] md:text-[50px] 2xl:text-[90px] lg:text-[70px] md:text-4xl font-extrabold text-dark-green">
          Our Programmes
        </span>
        <Image
          className="hidden lg:block absolute left-58 top-38 2xl:left-64 2xl:top-48 "
          src="/left-design.png"
          alt="Left decoration"
          width={50}
          height={50}
        />
        <Image
          className="absolute -translate-x-1/2 left-1/2 top-43 md:top-38 lg:right-90 lg:top-45 2xl:top-58"
          src="/right-design.png"
          alt="Right decoration"
          width={100}
          height={100}
        />
      </div>

      {/* Masonry Grid */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-6"
        columnClassName="masonry-column"
      >
        {images.map((src, index) => (
          <WorkshopCard key={index} image={src} />
        ))}
      </Masonry>
    </section>
  );
}
