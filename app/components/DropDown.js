"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Dropdown for array of strings
export default function DropDown({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [openDropDown, setOpenDropDown] = useState(false);

  const gotoMainPage = (option) => {
    setSelectedOption(option);
    setOpenDropDown(false);
  };

  return (
    <div className="relative z-50 inline-block font-satoshi">
      <button
        onClick={() => setOpenDropDown((prev) => !prev)}
        className="flex items-center gap-2 bg-navbar-bg text-green-800 font-medium px-4 py-2 rounded-full shadow-sm cursor-pointer"
      >
        {selectedOption}
        <Image
          src="/dropdown-icon.png"
          width={16}
          height={16}
          alt="dropdown icon"
          className={`transition-transform duration-200 ${
            openDropDown ? "rotate-180" : ""
          }`}
        />
      </button>

      {openDropDown && (
        <ul className="absolute top-full left-0 mt-2 w-44 bg-navbar-bg border border-gray-200 rounded-xl shadow-xl py-2 z-50">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => gotoMainPage(option)}
              className="px-4 py-2 hover:bg-gray-100 hover:text-dark-green active:text-dark-green cursor-pointer"
            >
              <Link
                href={`/${option === "More" ? "home" : option.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {option}{" "}
                {option === "Support " || option === "Join" ? "Us" : ""}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DropDownProject({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0].name);
  const [openDropDown, setOpenDropDown] = useState(false);

  const gotoMainPage = (optionName) => {
    setSelectedOption(optionName);
    setOpenDropDown(false);
  };

  return (
    <div className="relative z-50 inline-block ">
      <button
        onClick={() => setOpenDropDown((prev) => !prev)}
        className="flex items-center gap-2 bg-navbar-bg text-green-800 font-medium px-4 py-2 rounded-full shadow-sm cursor-pointer"
      >
        {selectedOption}
        <Image
          src="/dropdown-icon.png"
          width={16}
          height={16}
          alt="dropdown icon"
          className={`transition-transform duration-200 ${
            openDropDown ? "rotate-180" : ""
          }`}
        />
      </button>

      {openDropDown && (
        <ul className="absolute top-full left-0 mt-2 w-44 bg-navbar-bg border border-gray-200 rounded-xl shadow-xl py-2 z-50">
          {options.map((item, index) => (
            <li
              key={index}
              onClick={() => gotoMainPage(item.name)}
              className="px-4 py-2 hover:bg-gray-100 hover:text-dark-green active:text-dark-green cursor-pointer"
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
