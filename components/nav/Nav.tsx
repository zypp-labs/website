"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const links = [
  { label: "Pay", href: "/products/pay" },
  { label: "Developers", href: "/product/sdk" },
  { label: "Research", href: "/research" },
  { label: "Company", href: "/company" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const menuVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.01 } },
        exit: { opacity: 0, transition: { duration: 0.01 } },
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.2,
            ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
          },
        },
        exit: {
          opacity: 0,
          scale: 0.95,
          transition: {
            duration: 0.15,
            ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <header className="fixed right-6 top-6 z-50 sm:right-8 sm:top-8 [padding-right:env(safe-area-inset-right)] [padding-top:env(safe-area-inset-top)]">
      <nav
        ref={navRef}
        aria-label="Primary"
        className="relative rounded-2xl bg-paper/75 p-1.5 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.005)] ring-1 ring-ink/10 backdrop-blur-xl"
      >
        <div className="flex items-center">
          {/* Desktop links */}
          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="mono-label font-medium text-md block rounded-xl px-4 py-3 transition-colors md:hover:bg-ink/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#sdk"
            className="mono-label rounded-xl bg-ink px-5 py-3 text-paper transition-colors md:hover:bg-night md:ml-1"
          >
            Get in touch
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-[2.625rem] w-[2.625rem] items-center justify-center rounded-xl transition-colors active:scale-[0.97] active:bg-ink/10 md:hidden md:hover:bg-ink/10"
            style={{ touchAction: "manipulation" }}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-menu"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={menuVariants}
              style={{ transformOrigin: "top right" }}
              className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-paper p-2 shadow-[0_8px_30px_rgba(0,0,0,0.48)] ring-1 ring-ink/10 md:hidden"
            >
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="mono-label block rounded-xl px-4 py-3 active:bg-ink/10 md:hover:bg-ink/10"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}