"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import CtaButton from "@/components/ui/CtaButton";
import type { FaqItem } from "@/content/faq";

type Props = {
  items: FaqItem[];
  heading?: string;
  blurb?: string;
  contactHref?: string;
  contactLabel?: string;
};

export default function Faq({
  items,
  heading = "Questions",
  blurb = "Can’t find what you need? Talk to our team.",
  contactHref = "/company",
  contactLabel = "Contact us",
}: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:py-40">
        <div className="grid gap-10 border-t border-ink/35 pt-5 md:grid-cols-12 md:gap-x-6">
          {/* Heading and contact */}
          <div className="md:col-span-4">
            <h2 className="text-[clamp(2.25rem,4.2vw,3.5rem)] font-normal leading-none tracking-[-0.04em]">
              {heading}
            </h2>
            <p className="mt-5 max-w-[16rem] text-[0.9375rem] leading-relaxed text-ink/65">
              {blurb}
            </p>
            <CtaButton href={contactHref} tone="dark" className="mt-7">
              {contactLabel}
            </CtaButton>
          </div>

          {/* Ruled list */}
          <ul className="md:col-span-8">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={item.q}
                  className="border-t border-ink/20 first:border-t-0 last:border-b last:border-ink/20"
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => toggle(i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.25rem] leading-snug tracking-[-0.015em] transition-colors hover:text-ink/70 sm:text-[1.375rem]"
                    >
                      {item.q}
                      <Plus
                        aria-hidden="true"
                        size={20}
                        className={`shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-[40rem] space-y-3 pb-6 leading-relaxed text-ink/70">
                        {item.a.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}