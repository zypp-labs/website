"use client";

import { motion } from "motion/react";
import Logo from "@/components/ui/Logo";
import CtaButton from "@/components/ui/CtaButton";

const VIDEO = {
  landscape: "/video/hero-landscape.mp4",
  portrait: "/video/hero-portrait.mp4",
  posterLandscape: "/video/hero-poster.jpg",
  posterPortrait: "/video/hero-poster-portrait.jpg",
};

export default function Hero() {
  return (
    <section className="p-3 sm:p-4">
      <div className="relative isolate flex min-h-[calc(100svh-1.5rem)] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-night text-paper sm:min-h-[calc(100svh-2rem)] sm:rounded-[1.75rem]">
        {/* Media: poster is always underneath; video sits on top. The whole stack resolves from blur to focus on load. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 animate-focus-in"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={VIDEO.posterLandscape} />
            <img
              src={VIDEO.posterPortrait}
              alt=""
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </picture>

          <video
            className="hero-video absolute inset-0 h-full w-full object-cover md:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={VIDEO.posterPortrait}
          >
            <source src={VIDEO.portrait} type="video/mp4" />
          </video>
          <video
            className="hero-video absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={VIDEO.posterLandscape}
          >
            <source src={VIDEO.landscape} type="video/mp4" />
          </video>
        </div>

        {/* Legibility overlays: darker on the left where the text sits, and at the bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(4,18,10,0.82)_0%,rgba(4,18,10,0.4)_55%,rgba(4,18,10,0.1)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-transparent to-transparent"
        />

        <div>
          {/* Row height matches the nav pill so the logo lines up with it */}
          <div className="px-6 pt-3 sm:px-10 sm:pt-4">
            <div className="flex h-[3.375rem] items-center">
              <Logo />
            </div>
          </div>

          <div className="px-6 pt-10 sm:px-10 sm:pt-14">
            <motion.h1
              initial={{ filter: "blur(28px)", opacity: 0, scale: 1.04 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              className="display max-w-[11em] text-[clamp(2.9rem,7.9vw,8rem)] tracking-[-0.035em]"
            >
              Engineering payments beyond connectivity.
            </motion.h1>
          </div>
        </div>

        <div className="flex flex-col gap-8 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-10">
          <p className="max-w-2xl text-lg leading-snug text-paper/80 sm:text-xl">
            Zypp Labs is a research and engineering lab building offline-capable
            payment technology for consumers and institutions: banks, wallets and
            fintech.
          </p>
          <CtaButton href="#research" tone="light">
            Read the whitepaper
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
