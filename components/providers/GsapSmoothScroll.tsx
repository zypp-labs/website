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
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    if (mediaQuery.matches) {
      return;
    }

    // Create wrapper structure if needed
    let wrapper = document.querySelector("#smooth-wrapper") as HTMLElement;
    let content = document.querySelector("#smooth-content") as HTMLElement;
    
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "smooth-wrapper";
      content = document.createElement("div");
      content.id = "smooth-content";
      
      // Move all body children into content except fixed elements
      const fixedElements: HTMLElement[] = [];
      Array.from(document.body.children).forEach((child) => {
        const el = child as HTMLElement;
        const style = window.getComputedStyle(el);
        if (style.position === "fixed" || style.position === "sticky") {
          fixedElements.push(el);
        }
      });
      
      // Remove fixed elements temporarily
      fixedElements.forEach((el) => document.body.removeChild(el));
      
      // Move remaining children
      while (document.body.firstChild) {
        content.appendChild(document.body.firstChild);
      }
      wrapper.appendChild(content);
      document.body.appendChild(wrapper);
      
      // Add fixed elements back to body
      fixedElements.forEach((el) => document.body.appendChild(el));
    }

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
