"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageOptimizer({
  src,
  alt,
  fill,
  className = "",
  priority = false,
  sizes,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-dark-green animate-pulse" />
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}

// "use client";
// import Image from "next/image";
// import { useState } from "react";

// export default function ImageOptimizer({
//   src,
//   alt,
//   fill,
//   className = "",
//   priority = false,
//   sizes,
// }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div className="relative w-full h-full overflow-hidden pointer-events-none">
//       {/* Skeleton */}
//       {!loaded && (
//         <div className="absolute inset-0 bg-dark-green animate-pulse" />
//       )}

//       <Image
//         src={src}
//         alt={alt}
//         fill={fill}
//         priority={priority}
//         sizes={sizes}
//         onLoadingComplete={() => setLoaded(true)}
//         className={`object-cover transition-opacity duration-300 ${
//           loaded ? "opacity-100" : "opacity-0"
//         } ${className}`}
//       />
//     </div>
//   );
// }
