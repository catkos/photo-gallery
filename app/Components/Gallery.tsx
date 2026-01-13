"use client";

import Image from "next/image";

export const images = [
  "/pexels-vanessa-loring-5966646.jpg",
  "/pexels-any-lane-5945906.jpg",
  "/pexels-jill-burrow-6069710.jpg",
  "/pexels-karola-g-4022138.jpg",
  "/pexels-laker-6157062.jpg",
  "/pexels-mikhail-nilov-7675954.jpg",
  "/pexels-mikhail-nilov-7675956.jpg",
  "/pexels-shvets-production-7195276.jpg",
];

const IMAGE_WIDTH_VW = 0.45; // 45vw
const GAP_PX = 32; // Tailwind gap-8

export default function Gallery() {
  return (
    <div className="h-full flex items-center">
      <div
        className="flex items-center"
        style={{
          width: `calc(${images.length} * ${IMAGE_WIDTH_VW * 100}vw + ${
            (images.length - 1) * GAP_PX
          }px)`,
          gap: `${GAP_PX}px`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden rounded-lg -left-20 md:-left-60 shadow-md"
            style={{ width: `${IMAGE_WIDTH_VW * 100}vw`, height: "50vh" }}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
