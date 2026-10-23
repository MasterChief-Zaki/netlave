"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children }: { children: ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-reveal]", {
          y: 28,
          opacity: 0,
          duration: 1,
          stagger: 0.13,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
            clearProps: "all",
          });
        });
      });
      return () => {
        media.revert();
      };
    },
    { scope: pageRef },
  );

  return <div ref={pageRef}>{children}</div>;
}
