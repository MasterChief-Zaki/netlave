"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);

  // Lenis follows GSAP's ticker, so smooth scrolling and GSAP animations share one frame loop.
  useEffect(() => {
    function advanceLenis(timeInSeconds: number) {
      lenisRef.current?.lenis?.raf(timeInSeconds * 1000);
    }

    gsap.ticker.add(advanceLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(advanceLenis);
    };
  }, []);

  // ScrollTrigger reads the scroll position, so update it on every Lenis scroll.
  useLenis(() => {
    ScrollTrigger.update();
  });

  return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />;
}
