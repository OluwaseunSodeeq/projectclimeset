"use client";
import { useEffect, useState } from "react";
import useOpenContext from "../contexts/useOpenContext";
import HerosecLeftCard from "./HerosecLeftCard";
import HerosecRightCard from "./HerosecRightCard";
import Wrapper from "./Wrapper";

export default function HeroScetion() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const { mobile } = useOpenContext();
  return (
    <div className="w-full relative z-10 top-[-2] ">
      <Wrapper bg={mobile ? "#ffffff" : "#012F25"}>
        <div className=" w-full h-auto flex flex-col md:flex-row md:justify-center md:gap-[1.3rem]  mt-0 mb-3 xl:mt-3 rounded-b-[2rem]">
          <HerosecLeftCard loaded={loaded} />
          <HerosecRightCard loaded={loaded} />
        </div>
      </Wrapper>
    </div>
  );
}
