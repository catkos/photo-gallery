import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { RefObject } from "react";

interface HeaderProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function Header({ containerRef }: HeaderProps) {
  const galleryRef = useRef<HTMLSpanElement | null>(null);
  const thingsRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!galleryRef.current || !thingsRef.current) return;

      const getCenterOffset = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        return {
          x: window.innerWidth / 2 - (rect.left + rect.width / 2),
          y: window.innerHeight / 2 - (rect.top + rect.height / 2),
        };
      };

      const g = getCenterOffset(galleryRef.current);

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // GALLERY
      tl.fromTo(
        galleryRef.current,
        {
          x: g.x + 300,
          y: g.y,
          scale: 2,
          opacity: 0,
        },
        {
          x: g.x,
          opacity: 1,
          duration: 1,
        }
      )
        .addLabel("galleryStep3")
        .to(galleryRef.current, {
          scale: 1,
          duration: 0.6,
        })
        .to(galleryRef.current, {
          y: 0,
          rotation: 2,
          duration: 0.6,
          ease: "elastic.out(1,0.8)",
        })
        .to(galleryRef.current, {
          x: 0,
          rotation: 0,
          duration: 0.6,
        })

        // THINGS
        .fromTo(
          thingsRef.current,
          {
            y: window.innerHeight + 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "galleryStep3"
        )

        // DOT
        .fromTo(
          dotRef.current,
          {
            y: window.innerHeight + 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1,1.5)",
          }
        );
    },
    { scope: containerRef }
  );
  return (
    <h1 className="w-full whitespace-nowrap absolute flex flex-col justify-center items-start px-10 md:px-40">
      <span
        ref={galleryRef}
        className="inline-block font-main text-4xl md:text-6xl"
      >
        Gallery Of
      </span>
      <span className="inline-block font-sub text-6xl md:text-9xl">
        <span ref={thingsRef} className="inline-block">
          fruits
        </span>
        <span ref={dotRef} className="inline-block">
          .
        </span>
      </span>
    </h1>
  );
}
