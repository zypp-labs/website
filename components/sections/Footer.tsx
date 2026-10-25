"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import Logo from "@/components/ui/Logo";
import CtaButton from "@/components/ui/CtaButton";

/* Same posters the hero uses */
const POSTER = {
  landscape: "/video/hero-poster.jpg",
  portrait: "/video/hero-poster-portrait.jpg",
};

const explore = [
  { label: "Zypp Pay", href: "/products/pay" },
  { label: "Developers", href: "/product/sdk" },
  { label: "Research", href: "/research" },
  { label: "Architecture", href: "/#how-it-works" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "mailto:hello@zypp.fun" },
];

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

const social = [
  { label: "X ↗", href: "https://x.com/use_zypp" },
  { label: "GitHub ↗", href: "https://github.com/zypp-labs" },
];

/**
 * The hero's blur-to-focus moment, triggered when the footer scrolls into view.
 * Skipped entirely for people who prefer reduced motion.
 */
function useFocusIn() {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    initial: { filter: "blur(28px)", opacity: 0, scale: 1.04 },
    whileInView: { filter: "blur(0px)", opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 1.8, ease: [0.2, 0.7, 0.2, 1] as const },
  };
}

function Column({
  title,
  items,
  external = false,
}: {
  title: string;
  items: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <nav aria-label={title}>
      <p className="text-sm text-ink/55">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              target={external || l.href.startsWith("http") || l.href.startsWith("mailto:") ? "_blank" : undefined}
              rel={external || l.href.startsWith("http") || l.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1.5 text-base underline decoration-ink/0 underline-offset-4 transition-colors hover:decoration-ink"
            >
              {l.label}
              {(external || l.href.startsWith("http") || l.href.startsWith("mailto:")) && (
                <ArrowUpRight aria-hidden="true" size={14} weight="bold" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus("error");
      return;
    }
    // TODO: send `email` to your mailing list endpoint here.
    setStatus("done");
  }

  return (
    <div className="max-w-md lg:col-span-5">
      <h3 className="text-xl font-medium tracking-tight">
        Research updates
      </h3>
      <p className="mt-2 text-ink/70">
        New papers and notes, by email.
      </p>

      {status === "done" ? (
        <p role="status" className="mt-6 text-base">
          You’re on the list. We’ll be in touch.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <div className="flex items-center gap-1 rounded-full p-1 pl-5 ring-1 ring-ink/20 focus-within:ring-ink/50">
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="name@company.com"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "footer-email-error" : undefined}
              className="min-w-0 flex-1 focus:ring-none focus:border-none bg-transparent py-2 placeholder:text-ink/45 focus:outline-none"
            />
            <button
              type="submit"
              className=" shrink-0 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-night"
            >
              Subscribe
            </button>
          </div>
          {status === "error" && (
            <p
              id="footer-email-error"
              role="alert"
              className="mt-2 pl-5 text-sm text-ink/70"
            >
              Enter a valid email address.
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  const focus = useFocusIn();

  return (
    <footer className="p-3 sm:p-4">
      <div className="relative isolate flex min-h-[44rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-night text-paper sm:min-h-[52rem]">
        {/* Media: the hero poster, resolving from blur to focus on scroll-in */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-20"
          {...focus}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={POSTER.landscape} />
            <img
              src={POSTER.portrait}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </picture>
        </motion.div>

        {/* Legibility overlays: dark on the left where the text sits */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(4,18,10,0.82)_0%,rgba(4,18,10,0.4)_55%,rgba(4,18,10,0.1)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-night/70 via-transparent to-transparent"
        />

        {/* 1. Text, then 2. call to action */}
        <div>
          <div className="px-6 pt-3 sm:px-10 sm:pt-4">
            <div className="flex h-[3.375rem] items-center">
              <Logo />
            </div>
          </div>

          <div className="px-6 pt-10 sm:px-10 sm:pt-14">
            <motion.div
              className="max-w-[12em]"
              {...focus}
            >
              <svg
                viewBox="0 0 1200 200"
                className="w-full h-auto"
                aria-label="Zypp Labs"
                role="img"
              >
                <text
                  x="0"
                  y="150"
                  fontSize="180"
                  fontWeight="500"
                  letterSpacing="-0.08em"
                  fill="currentColor"
                >
                  Zypp Labs
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* 3. The white panel with the links */}
        <div className="p-3 pt-24 sm:p-4 sm:pt-32">
          <div className="rounded-[1.25rem] bg-paper p-6 text-ink sm:p-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
              <Newsletter />

              <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
                <Column title="Explore" items={explore} />
                <Column title="Legal" items={legal} />
                <div className="col-span-2 sm:col-span-1">
                  <Column title="Follow" items={social} external />
                </div>
              </div>
            </div>

            <div className="mono-label mt-12 flex flex-wrap justify-between gap-x-10 gap-y-2 border-t border-ink/15 pt-6 text-xs text-ink/60">
              <span>© 2026 Zypp Labs</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
