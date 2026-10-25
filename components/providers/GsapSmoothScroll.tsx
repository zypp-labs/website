"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function GsapSmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="min-h-full flex-1">
      <div id="smooth-content" className="min-h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
