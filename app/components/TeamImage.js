"use client";

import { useState } from "react";
import Image from "next/image";

export default function TeamImage({ imageName, firstName }) {
  //   const [imgSrc, setImgSrc] = useState(`/teams/${imageName}.png`);
  //   const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={imageName}
      alt={firstName}
      fill
      sizes="(max-width: 768px) 100vw, 20vw"
      className={`object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-300 ${
        firstName === "saidah" ? "object-top" : "object-center"
      }`}
    />
  );
}
