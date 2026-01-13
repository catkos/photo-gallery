"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { images } from "./Gallery";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const IMAGE_WIDTH_VW = 0.45; // must match Gallery
const GAP_PX = 32;
const NUM_IMAGES = images.length;

export default function Navigation() {
  const navStyles =
    "z-50 pointer-events-auto fixed md:top-20 left-1/2 transform -translate-x-1/2 bg-black/10 w-lg backdrop-blur-sm shadow-md ring-2 ring-black/10 flex justify-around items-center md:gap-10 px-10 py-5 rounded";
  const buttonStyles =
    "min-w-[90px] cursor-pointer uppercase font-main tracking-wide transition-colors duration-200 hover:font-sub hover:text-black/70 focus:outline-none";

  const scrollToSection = (index: number) => {
    const trigger = ScrollTrigger.getAll()[0];
    if (!trigger) return;

    const vw = window.innerWidth;
    const homeWidth = vw;
    const galleryWidth =
      NUM_IMAGES * IMAGE_WIDTH_VW * vw + (NUM_IMAGES - 1) * GAP_PX;
    const aboutWidth = vw;
    const totalWidth = homeWidth + galleryWidth + aboutWidth;
    const scrollDistance = totalWidth - vw;

    let targetProgress = 0;
    switch (index) {
      case 0: // Home
        targetProgress = 0;
        break;
      case 1: // Gallery start
        targetProgress = homeWidth / scrollDistance - 0.09;
        break;
      case 2: // About
        targetProgress = (homeWidth + galleryWidth) / scrollDistance;
        break;
      default:
        targetProgress = 0;
    }

    const targetScroll =
      trigger.start + (trigger.end - trigger.start) * targetProgress;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <nav className={navStyles}>
      <button className={buttonStyles} onClick={() => scrollToSection(0)}>
        Home
      </button>
      <button className={buttonStyles} onClick={() => scrollToSection(1)}>
        Gallery
      </button>
      <button className={buttonStyles} onClick={() => scrollToSection(2)}>
        About
      </button>
    </nav>
  );
}
