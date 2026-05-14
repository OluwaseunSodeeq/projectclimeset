"use client";

import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      {children}
    </div>
  );
}
