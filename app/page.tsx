"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Background from "./Components/Background";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";
import Gallery, { images } from "./Components/Gallery";
import About from "./Components/About";

const IMAGE_WIDTH_VW = 0.45; // must match Gallery
const GAP_PX = 32;
const NUM_IMAGES = images.length;

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  /* HORIZONTAL SCROLL */
  useGSAP(() => {
    const wrapper = horizontalRef.current;
    if (!wrapper) return;

    const vw = window.innerWidth;
    const homeWidth = vw;
    const galleryWidth =
      NUM_IMAGES * IMAGE_WIDTH_VW * vw + (NUM_IMAGES - 1) * GAP_PX;
    const aboutWidth = vw;

    console.log(galleryWidth);

    const totalWidth = homeWidth + galleryWidth + aboutWidth;
    const scrollDistance = totalWidth - vw;

    gsap.to(wrapper, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollDistance}`,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="overflow-hidden relative">
      <Background />
      <Navigation />

      <div ref={horizontalRef} className="flex h-screen relative z-10">
        <section
          data-section="home"
          ref={container}
          className="panel shrink-0 w-screen h-screen flex justify-center items-center"
        >
          <Header containerRef={container} />
        </section>

        <section
          data-section="gallery"
          className="panel shrink-0 h-screen flex items-center relative"
        >
          <Gallery />
          <div className="absolute top-0 left-0 h-full w-1500 bg-linear-to-r from-indigo-500/0 via-green-500/60 to-pink-500/0 -z-10" />
        </section>

        <section
          data-section="about"
          className="panel shrink-0 w-screen h-screen flex items-center justify-center"
        >
          <About />
        </section>
      </div>
    </main>
  );
}
