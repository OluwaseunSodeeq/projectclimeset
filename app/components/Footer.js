// import { Mail, Facebook, Twitter, Instagram } from "lucide-react";
"use client";
import {
  Facebook,
  Instagram,
  InstagramIcon,
  Linkedin,
  Twitter,
} from "lucide-react";
import Button from "./Button";
import Image from "next/image";
import { MobileLogo } from "./Logo";
import Link from "next/link";
import useSubscribeContext from "../contexts/useSubscribeContext";

export default function Footer() {
  // Subcsribe form states
  const { email, setEmail, message, isSuccess, loading, handleSubscribe } =
    useSubscribeContext();

  return (
    <footer className="py-12 bg-dark-green text-main-bg px-6 md:px-16 font-satoshi ">
      <div className="2xl:max-w-[1400px] md:mx-auto">
        {/* Top message row */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-8">
          <div className=" flex gap-x-6 p-2">
            <div className="w-[3rem] h-[3.2rem] relative">
              <Image
                src="/white-logo.png"
                alt="logo"
                width={150}
                height={50}
                priority
                sizes="(max-width: 768px) 120px, 150px"
                className="w-[120px] md:w-[150px] h-auto object-contain"
              />
            </div>
            <p className="text-center md:text-left text-xl md:text-base xl:w-[22.2rem]">
              We’re only one call away. Literally! And just a few emails away
              too.
            </p>
          </div>
          <div className="hidden xl:block mr-7">
            <Link href="/contact" className="inline-block">
              <Button btnBg="#fdcd31" textColor="#012f25">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Middle section */}
        <div className="flex flex-col justify-center gap-5 md:gap-0 md:flex-row md:justify-between xl:mr-[4rem] mt-5 md:mt-10">
          {/* Newsletter */}
          <div className="md:col-span-2 ">
            <h3 className="font-semibold text-xl mb-3 w-[10.2rem] ">
              Subscribe to our newsletter
            </h3>
            <div className="">
              <div className="w-[15rem] md:w-[20rem]  xl:w-[25.6rem] flex mt-7 border-b border-t rounded-sm border-white/40">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent outline-none py-2 pl-2 text-sm flex-1 placeholder:text-white/60"
                />
                <button
                  onClick={handleSubscribe}
                  className="cursor-pointer bg-yellow text-black py-2 px-4 rounded-sm hover:bg-yellow"
                >
                  →
                </button>
              </div>
              <div>
                {message && (
                  <p
                    className={`text-lg font-bold ${
                      isSuccess ? "text-main-bg" : "text-red-500"
                    } transition-opacity duration-300`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-10 md:mt-0">
            <ul className="text-sm flex gap-7 md:gap-y-5 md:flex-col">
              <Link href="/">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Home
                </li>
              </Link>
              <Link href="/about">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  About
                </li>
              </Link>
              <Link href="/projects">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Projects
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="flex gap-7 md:gap-y-5 md:flex-col text-sm">
              <Link href="/join">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Join Us
                </li>
              </Link>
              <Link href="/contact">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Contact Us
                </li>
              </Link>
              <Link href="/gallery">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Project Gallery
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <ul className="flex gap-7 md:gap-y-5 md:flex-col text-sm">
              <Link href="/impact">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Impact
                </li>
              </Link>
              <Link href="/support">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  Support Us
                </li>
              </Link>
              <Link href="/the-stolen-breath">
                <li className="transition-transform duration-200 ease-out hover:scale-105">
                  The Stolen Breath
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Bottom section 4 Desktop */}
        <div className=" hidden mt-30 mb-5 md:flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-6">
          <p>Privacy Policy</p>
          <div className="flex gap-12">
            <p>+234 816 927 0029</p>
            <p>+234 816 734 6082</p>
            <Link href="mailto:projectclimeset@gmail.com">
              <p className="cursor-pointer"> projectclimeset@gmail.com</p>
            </Link>
            <div className="flex space-x-6">
              <Link
                href="https://www.linkedin.com/company/projectclimeset"
                target="_blank"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 cursor-pointer text-white fill-white stroke-white stroke-[2]" />
              </Link>
              <Link
                href="https://x.com/projectclimeset"
                target="_blank"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Twitter className="w-5 h-5 cursor-pointer text-white fill-white stroke-white stroke-[2]" />
              </Link>
              <Link
                href="https://www.instagram.com/project_climeset?igsh=MWU2NXp2NW55Y2piag=="
                target="_blank"
                className="transition-transform duration-200 hover:scale-110"
              >
                <InstagramIcon className="w-5 h-5 cursor-pointer text-white stroke-white stroke-[2]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section for Mobile */}
        <div className="flex mt-10 md:hidden flex-col flex-wrap justify-between text-sm text-white/70 gap-6">
          <div className="flex justify-between items-end">
            {/* <div className="w-[164px] h-70"> */}
            <div className="">
              <Link href="/">
                <MobileLogo />
              </Link>
            </div>
            <div className="flex space-x-4 mb-3">
              <Link
                href="https://www.linkedin.com/company/projectclimeset"
                target="_blank"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 cursor-pointer text-white fill-white stroke-white stroke-[2]" />
              </Link>
              <Link
                href="https://x.com/projectclimeset"
                target="_blank"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Twitter className="w-5 h-5 cursor-pointer text-white fill-white stroke-white stroke-[2]" />
              </Link>
              <Link
                href="https://www.instagram.com/project_climeset?igsh=MWU2NXp2NW55Y2piag=="
                target="_blank"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Instagram className="w-5 h-5 cursor-pointer text-white stroke-white stroke-[2]" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col-reverse md:items-center md:flex-row md:justify-between">
            <div className="flex gap-4 md:block">
              <p>+234 816 927 0029</p>
              <p>+234 816 734 6082</p>
            </div>
            <Link href="mailto:projectclimeset@gmail.com">
              <p className="cursor-pointer"> projectclimeset@gmail.com</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
