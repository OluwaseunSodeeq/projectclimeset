import Image from "next/image";
import { Star } from "lucide-react";
import useOpenContext from "../contexts/useOpenContext";
import SubscribeButton from "./SubscribeButton";
import useSubscribeContext from "../contexts/useSubscribeContext";
import { useState } from "react";
import ImageOptimizer from "./ImageOptimizer";

export default function HerosecRightCard({ loaded }) {
  // Subcsribe form states
  const { email, setEmail, message, isSuccess, loading, handleSubscribe } =
    useSubscribeContext();

  const { showBgImage } = useOpenContext();
  const btnBg = "#fdcd31";
  const textColor = "#012f25";
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      rating: "5",
      text: "“The micro lessons, policy recommendations, and the discussion guide in The Stolen Breath made the book cover a larger demograph of people.”",
      name: "Magnus Imam",
      image: "/imam.png",
      bgImage: "/bgImage0.png",
    },
  ];

  // const leftClick = () => {
  //   setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  // };
  // const rightClick = () => {
  //   setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  // };
  const current = testimonials[index];

  return (
    <div
      className={`relative font-satoshi h-[400px] md:h-[40rem] xl:h-[40rem] w-full md:w-[45%] xl:w-[44rem] 2xl:w-[46rem] xl:rounded-b-[1.2rem]  ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} transition-all duration-700 delay-200 ease-in-out `}
    >
      {/* BACKGROUND LAYER (NON-INTERACTIVE) */}
      <div className="hidden md:block absolute inset-0 z-0 rounded-[1.2rem] overflow-hidden pointer-events-none">
        <ImageOptimizer
          src={current.bgImage}
          alt="background"
          fill
          priority
          sizes="(max-width:768px) 100vw, 50vw"
        />

        <div className="absolute inset-0 bg-dark-green/20 pointer-events-none" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-20 w-full h-full md:border-none md:rounded-[1.2rem] pointer-events-auto">
        {/* SUBSCRIBE SECTION */}
        <div className="absolute z-30 top-75 md:top-9 xl:top-10 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-1 lg:right-5 xl:right-[2rem] pointer-events-auto">
          <div className="flex gap-4 justify-between items-center pointer-events-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-3 bg-light-green py-2 rounded-full outline-none xl:w-[18rem] shadow-md text-sm focus:ring-2 focus:ring-green-500 pointer-events-auto"
            />

            <SubscribeButton
              btnBg={btnBg}
              textColor={textColor}
              handleSubscribe={handleSubscribe}
              loading={loading}
            />
          </div>

          {/* MESSAGE */}
          {message && (
            <p
              className={`text-lg font-bold mt-2 ${
                isSuccess ? "text-main-bg" : "text-red-500"
              } transition-opacity duration-300`}
            >
              {message}
            </p>
          )}
        </div>

        {/* CARD */}
        <div className="absolute z-20 top-12 md:top-[12rem] xl:top-[7rem] left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-6 bg-yellow px-3 py-3.5 rounded-xl w-[90%] md:w-[95%] xl:max-w-[19rem] shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center gap-2">
            <div className="relative w-[90%] h-[140px] md:w-[50%] xl:w-[130px] xl:h-[126px]">
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover rounded-md border-yellow"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 130px"
                priority
              />
            </div>

            <div className="w-full flex flex-col md:w-[121px] lg:w-[150px]">
              <div className="flex gap-x-2 text-dark-green">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      current.rating > i
                        ? "fill-dark-green text-dark-green"
                        : "fill-main-bg text-main-bg"
                    }`}
                  />
                ))}
              </div>

              <p className="text-[14.5px] xl:text-xs text-dark-green mt-1 ">
                {current.text}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute z-20 bg-white p-3 pl-9 text-center right-0 bottom-0 rounded-tl-[4rem] clip-slant">
          <p className="text-gray-700 font-satoshi font-light italic xl:max-w-[22rem] text-left text-sm">
            &quot; We’re not experts in suits, we’re students, storytellers,
            builders, and friends who decided to do something. And now we’re
            inviting you to do it with us. &quot;
          </p>
        </div>
      </div>
    </div>
  );
}
