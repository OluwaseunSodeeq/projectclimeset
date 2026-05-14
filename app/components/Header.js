"use client";
import React, { use, useState } from "react";
import Nav from "./Nav";
import { MobileLogo, Logo } from "./Logo";
import DropDown, { DropDownProject } from "./DropDown";
import Button from "./Button";
import useOpenContext from "../contexts/useOpenContext";
import Hamburger from "./Hamburger";
import Navbody from "./NavBody";
import Link from "next/link";

export default function Header() {
  const { open } = useOpenContext();
  const { mobile } = useOpenContext();

  const navs = [
    { name: "Home", href: "/home", activesStatus: false },
    { name: "About", href: "/about", activesStatus: false },
    { name: "Impact", href: "/impact", activesStatus: false },
  ];
  const dropDown1 = [
    { name: "Projects", href: "/projects" },
    { name: "GDFT", href: "/projects/gdft" },
    { name: "GDS", href: "/projects/gds" },
    { name: "GDC", href: "/projects/gdc" },
  ];
  const dropDown2 = ["More", "Gallery", "Support", "Join", "The-Stolen-Breath"];

  const bg = "#ffffff";
  const btnBg = "#012f25";

  return (
    <div
      className={`
    w-full
    sticky
    top-[-1]
    z-20
    p-0
    m-0
    box-border
    md:shadow-md
    bg-dark-green
    lg:bg-main-bg
    transition-colors
    duration-300

    ${mobile ? "" : ""}
  `}
    >
      <div className="w-full 2xl:max-w-[1400px] md:mx-auto">
        <div className="flex justify-between items-center px-[1rem] md:px-[3rem] xl:px-[5rem] py-3.5 xl:py-3  2xl:px-[7rem]">
          <div className="block xl:hidden w-[115px] h-[49px] relative">
            <Link href="/">
              <MobileLogo />
            </Link>
          </div>
          <Nav nav={navs} />
          <div className="hidden xl:block xl:mr-[1.5rem]">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="hidden relative xl:flex gap-[3rem] ">
            <DropDownProject options={dropDown1} />
            <DropDown options={dropDown2} />

            <Link href="/contact" className="self-center">
              <Button btnBg={btnBg} textColor={bg}>
                Contact Us
              </Button>
            </Link>
          </div>
          <div className=" xl:hidden">
            <Hamburger />
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-screen w-[95%]  bg-white shadow-lg z-20 transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-[200%] "
          }`}
        >
          <Navbody bg="#ffffff" textColor="#012f25" />
        </div>
      </div>
    </div>
  );
}
