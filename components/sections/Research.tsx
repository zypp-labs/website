"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightning,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { reports } from "@/content/research";

type ReportType = "Whitepaper" | "Protocol" | "Security";

type Report = {
  type: ReportType;
  /** First line of the title */
  title: string;
  /** Muted second line of the title */
  line: string;
  summary?: string;
  href: string;
  /** The first two featured reports get the large cards */
  featured?: boolean;
};

const FILTERS = ["All", "Whitepaper", "Protocol", "Security"] as const;
type Filter = (typeof FILTERS)[number];

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------
   Small pieces
------------------------------------------------------------------- */
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
      /* The clipped top-right corner is this section's one signature shape */
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

/* ------------------------------------------------------------------
   Section
------------------------------------------------------------------- */
export default function Research() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const featured = reports.filter((r) => r.featured).slice(0, 2);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (r) =>
        (filter === "All" || r.type === filter) &&
        (!q || `${r.title} ${r.line} ${r.summary}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <section id="research" className="bg-paper text-ink">
      <div className="mx-auto max-w-screen px-6 py-28 sm:px-20 sm:py-36 lg:py-44">
        {/* Header row */}
        <div className="mb-10 flex flex-col gap-4 border-t border-ink/35 pt-5 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-[1.875rem] font-normal tracking-[-0.03em]">
            Research
          </p>
          <p className="max-w-[28rem] text-md leading-snug text-ink/70">
            The whitepapers, protocols and threat models behind offline
            payments.
          </p>
        </div>


        {/* Controls: filter the index below */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter papers by type"
            className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1 ring-1 ring-ink/15"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-md transition-colors ${
                  filter === f ? "bg-ink text-paper" : "hover:bg-ink/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <label className="relative block sm:w-72">
            <span className="sr-only">Search papers</span>
            <MagnifyingGlass
              aria-hidden="true"
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="text-md w-full rounded-full bg-transparent py-3 pl-10 pr-4 ring-1 ring-ink/15 placeholder:text-ink/50 focus:ring-ink/40 focus:outline-none"
            />
          </label>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div
            className={`mt-6 grid gap-2.5 ${
              featured.length > 1 ? "lg:grid-cols-2" : ""
            }`}
          >
            <FeaturedLead report={featured[0]} />
            {featured[1] && <FeaturedSecondary report={featured[1]} />}
          </div>
        )}

        {/* Index */}
        <div className="mt-16 sm:mt-20">
          <p className="text-md mb-3 text-ink/70">
            All papers
          </p>

          {rows.length > 0 ? (
            <ul className="border-b border-ink/35">
              {rows.map((r, i) => (
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
          ) : (
            <div className="flex flex-col items-start gap-3 border-y border-ink/35 py-10">
              <p className="text-lg text-ink/70">
                No papers match that search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                className="mono-label rounded-full bg-ink px-5 py-3 text-[0.6875rem] text-paper transition-colors hover:bg-night"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}