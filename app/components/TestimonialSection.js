/* TestimonialSection.jsx */
"use client";
import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialSection() {
  const testimonialArray = [
    {
      rating: "5",
      text: "“The micro lessons, policy recommendations, and the discussion guide in The Stolen Breath made the book cover a larger demograph of people. So now teachers can use it, and policy makers can reference it.”",
      name: "Magnus Imam",
      image: "/imam.png",
      title: "Founder ZeroUp Initiative",
    },
    {
      rating: "5",
      text: "“Stolen Breath is it, and so much more! The storytelling, the imagery, the suspense, the flow, and the way Climeset subtly entwined it with advocacy is simply beautiful.”",
      name: "Unique",
      image: "/unique.png",
      title: "Ashoka Young Changemaker",
    },
    {
      rating: "5",
      text: "“l had no idea when I reached page 50 of The Stolen Breath! The writing is clear, vivid, and easy to understand, perfectly capturing every moment.”",
      name: "Abdulbasit",
      image: "/abdulbasit.png",
      title: "HultPrize KWASU Campus Lead",
    },
    {
      rating: "5",
      text: "“My teammates and I have now created a club for environmental awareness in my school, where we carry out weekly activities using visuals like cardboards and markers”",
      name: "Godswill",
      image: "/godswill.png",
      title: "GDFT Student",
    },
  ];
  const getCardPreview = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardPreview);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      setCardsPerView(getCardPreview());
    };
    // update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonialArray.length - cardsPerView);
  const slideWidthPercent = 100 / cardsPerView;

  useEffect(() => {
    setCurrentIndex((ci) => Math.min(ci, maxIndex));
  }, [cardsPerView, maxIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(id);
  }, [maxIndex]);

  // const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  // const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative w-full pt-8 pb-12 overflow-hidden px-4 xl:px-14">
      <div className="relative">
        {/* Prev (hidden on small screens) */}
        {/* <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hidden md:inline-flex"
          aria-label="previous"
        >
          ◀
        </button> */}

        {/* Track container */}
        <div className="overflow-hidden">
          {/* Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              // translate by currentIndex * single slide width
              transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
            }}
          >
            {testimonialArray.map((t, i) => (
              // box-border so padding doesn't push the width beyond the percent
              <div
                key={i}
                className="flex-shrink-0 box-border py-2.5"
                style={{
                  width: `${slideWidthPercent}%`,
                }}
              >
                {/* internal spacing (included in width because of box-border) */}
                <div className="px-3">
                  <TestimonialCard testimonial={t} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next (hidden on small screens) */}
        {/* <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hidden md:inline-flex"
          aria-label="next"
        >
          ▶
        </button> */}
      </div>

      {/* Pagination: number of possible positions = maxIndex + 1 */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-transform ${
              idx === currentIndex ? "bg-dark-green scale-110" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
