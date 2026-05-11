"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useOpenContext from "../contexts/useOpenContext";
import Image from "next/image";

function CurrentNav({ to, onClick, children }) {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <div className="w-full text-base lg:leading-6 lg:font-normal">
      <Link href={to} onClick={onClick}>
        {children(isActive)}
      </Link>
    </div>
  );
}

function Navbody({ bg, textColor }) {
  const { setOpen } = useOpenContext();

  const closeHandler = () => {
    setOpen(false);
  };
  const navs = [
    "home",
    "about",
    "impact",
    "gallery",
    "projects",
    "join",
    "support",
    "the stolen breath",
  ];

  return (
    <div
      className="w-[104%] left-1/2 transform -translate-x-1/2 h-screen px-6 absolute top-[-2px] md:top-[18px] z-30 lg:hidden pt-4"
      style={{ backgroundColor: textColor, color: bg }}
    >
      <div onClick={closeHandler} className=" pt-2 pb-3 ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <ul className=" flex h-auto flex-col xl:gap-1 items-center justify-start">
        {navs.map((nav, i) => (
          <CurrentNav
            onClick={closeHandler}
            to={`/${nav.replace(/\s+/g, "-")}`}
            key={i}
          >
            {(isActive) => (
              <li
                className={`flex items-center capitalize  pl-3 pr-1 md:pr-9 w-full h-[48px] font-satoshi leading-[32px] rounded-lg transition-all
        ${
          isActive
            ? "bg-[#0994754D]/60 text-main-bg font-bold flex justify-between"
            : "text-navbar-bg font-light hover:text-main-bg hover:bg-[#0994754D]"
        }`}
              >
                <span>
                  {nav} {nav === "join" || nav === "support" ? "US" : ""}
                </span>

                {isActive && (
                  <Image
                    width={30}
                    height={30}
                    src="/minilogo.svg"
                    alt="minilogo"
                    className="object-contain pr-2"
                    quality={75}
                  />
                )}
              </li>
            )}
          </CurrentNav>
        ))}
      </ul>
    </div>
  );
}

export default Navbody;
