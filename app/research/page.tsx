"use client";

import { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightning,
  MagnifyingGlass,
} from "@phosphor-icons/react";

type ReportType = "Whitepaper" | "Protocol" | "Security";

type Report = {
  type: ReportType;
  title: string;
  line: string;
  summary: string;
  href: string;
  featured?: boolean;
};

const REPORTS: Report[] = [
  {
    type: "Whitepaper",
    title: "Delay Tolerant Networking and Solana Transaction Propagation",
    line: "for Offline-First Payments",
    summary:
      "Describes how two devices can exchange value with no network, and how the ledger stays consistent once they reconnect. Released March 2026 by Zypp Labs.",
    href: "/research/dtn-solana-offline-payments",
    featured: true,
  },
  {
    type: "Security",
    title: "Threat model for device-to-device payments",
    line: "and the controls that contain each",
    summary: "Maps the attacks that matter when no server is watching, and the on-device controls that contain each one.",
    href: "/research/threat-model-d2d-payments",
    featured: true,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

function Pill({ children, tone }: { children: string; tone: "dark" | "light" }) {
  return (
    <span
      aria-hidden="true"
      className={`text-md inline-flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors duration-300 group-hover:bg-accent group-hover:text-night ${
        tone === "dark" ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      {children}
      <ArrowUpRight size={14} weight="bold" />
    </span>
  );
}

function FeaturedLead({ report }: { report: Report }) {
  return (
    <article
      className="group relative flex min-h-[26rem] flex-col rounded-2xl bg-ink p-6 text-paper [clip-path:polygon(0_0,calc(100%-4rem)_0,100%_4rem,100%_100%,0_100%)] sm:min-h-[30rem] sm:p-7"
    >
      <Lightning aria-hidden="true" size={22} weight="fill" />

      <div className="mt-auto">
        <p className="text-sm text-fog">
          Featured / {report.type}
        </p>
        <h3 className="mt-3 max-w-[25rem] text-2xl leading-[1.2] tracking-tight sm:text-[1.75rem]">
          <Link
            href={report.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
          >
            {report.title}
          </Link>
          <span className="block text-paper/45">{report.line}</span>
        </h3>
        <p className="mt-4 max-w-[24rem] text-[0.9375rem] leading-snug text-paper/70">
          {report.summary}
        </p>
        <div className="mt-8">
          <Pill tone="light">Preview</Pill>
        </div>
      </div>
    </article>
  );
}

function FeaturedSecondary({ report }: { report: Report }) {
  return (
    <article className="group relative flex min-h-[20rem] flex-col rounded-2xl bg-mist p-6 sm:min-h-[30rem] sm:p-7">
      <span className="absolute right-5 top-5 sm:right-6 sm:top-6">
        <Pill tone="dark">Preview</Pill>
      </span>

      <div className="mt-auto">
        <p className="text-md text-fog">{report.type}</p>
        <h3 className="mt-3 max-w-[20rem] text-2xl leading-[1.2] tracking-tight">
          <Link
            href={report.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
          >
            {report.title}
          </Link>
          <span className="block text-fog">{report.line}</span>
        </h3>
      </div>
    </article>
  );
}

export default function ResearchPage() {
  const featured = REPORTS.filter((r) => r.featured).slice(0, 2);

  return (
    <>
      <Link
        href="#main"
        className="mono-label sr-only z-60 rounded-xl bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </Link>
      <main id="main" className="flex-1 bg-paper text-ink">
        <div className="mx-auto max-w-screen px-6 py-28 sm:px-20 sm:py-36 lg:py-44">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-[7rem] font-medium leading-[1] tracking-[-0.03em]">
              Foundational <br/> Research
            </p>
            <p className="max-w-[28rem] text-md leading-snug text-ink/70">
              The whitepapers, protocols and threat models behind offline
              payments.
            </p>
          </div>

          {featured.length > 0 && (
            <div
              className={`grid gap-2.5 ${
                featured.length > 1 ? "lg:grid-cols-2" : ""
              }`}
            >
              <FeaturedLead report={featured[0]} />
              {featured[1] && <FeaturedSecondary report={featured[1]} />}
            </div>
          )}

          <div className="mt-16 sm:mt-20">
            <p className="text-md mb-3 text-ink/70">
              All papers
            </p>

            <ul className="border-b border-ink/35">
              {REPORTS.map((r, i) => (
                <li
                  key={`${r.title}-${r.line}`}
                  className="border-t border-ink/35"
                >
                  <Link
                    href={r.href}
                    className="px-3 group grid gap-1 py-3.5 transition-colors hover:bg-ink/[0.04] sm:grid-cols-12 sm:items-center sm:gap-x-8"
                  >
                    <span className="mono-label text-[0.6875rem] text-ink/60 sm:col-span-1">
                      {pad(i + 1)}.
                    </span>
                    <span className="text-ink/60 sm:col-span-2">{r.type}</span>
                    <span className="sm:col-span-7">
                      {r.title} {r.line}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 sm:col-span-2 sm:mt-0 sm:justify-end">
                      Preview
                      <ArrowUpRight
                        aria-hidden="true"
                        size={14}
                        weight="bold"
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
