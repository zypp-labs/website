"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightning,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import type { ResearchReport } from "@/content/research";

const FILTERS = ["All", "Whitepaper", "Protocol", "Security"] as const;
type Filter = (typeof FILTERS)[number];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Threat: XSS via href (Phase 3). Content is authored in-repo, but a bad edit
 * could put a `javascript:` or `data:` URL into `href` and React renders it
 * verbatim. Allow-list the scheme; anything else is rendered as inert text.
 */
function isSafeExternalHref(href: string) {
  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}

/** Internal reports resolve to their own detail route; external ones to the paper. */
function reportHref(report: ResearchReport) {
  return report.external
    ? report.href
    : `/research/${encodeURIComponent(report.slug)}`;
}

/**
 * Fail-closed (Phase 2): a report is only rendered as a link when it is either
 * external or explicitly published. Everything else is inert "Coming soon".
 */
function isLinkable(report: ResearchReport) {
  if (report.external) return isSafeExternalHref(report.href);
  return report.status === "published";
}

/**
 * Single place where a report title becomes an anchor, so the scheme
 * allow-list and the not-published gate cannot be bypassed by a card that
 * renders its own `<Link>` (Phase 3: XSS via href).
 */
function ReportTitle({
  report,
  className,
  children,
}: {
  report: ResearchReport;
  className?: string;
  children: ReactNode;
}) {
  if (!isLinkable(report)) {
    return <span className={`block ${className ?? ""}`}>{children}</span>;
  }

  return (
    <Link
      href={reportHref(report)}
      target={report.external ? "_blank" : undefined}
      // Threat: reverse tabnabbing (Phase 3)
      rel={report.external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

function searchableText(report: ResearchReport) {
  return [report.title, report.line, report.abstract ?? "", report.summary ?? ""]
    .join(" ")
    .toLowerCase();
}

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

function FeaturedLead({ report }: { report: ResearchReport }) {
  const summary = report.abstract ?? report.summary ?? report.line;

  return (
    <article
      /* The clipped top-right corner is this section's one signature shape */
      className="group relative flex min-h-[26rem] flex-col rounded-2xl bg-ink p-6 text-paper [clip-path:polygon(0_0,calc(100%-4rem)_0,100%_4rem,100%_100%,0_100%)] sm:min-h-[30rem] sm:p-7"
    >
      <Lightning aria-hidden="true" size={22} weight="fill" />

      <div className="mt-auto">
        <p className="text-sm text-fog">Featured / {report.type}</p>
        <h2 className="mt-3 max-w-[25rem] text-2xl leading-[1.2] tracking-tight sm:text-[1.75rem]">
          <ReportTitle
            report={report}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
          >
            {report.title}
          </ReportTitle>
          <span className="block text-paper/45">{report.line}</span>
        </h2>
        <p className="mt-4 max-w-[26rem] text-[0.9375rem] leading-snug text-paper/70">
          {summary}
        </p>
        <div className="mt-8">
          <Pill tone="light">
            {isLinkable(report) ? "Preview" : "Coming soon"}
          </Pill>
        </div>
      </div>
    </article>
  );
}

function FeaturedSecondary({ report }: { report: ResearchReport }) {
  const linkable = isLinkable(report);

  return (
    <article className="group relative flex min-h-[20rem] flex-col rounded-2xl bg-mist p-6 sm:min-h-[30rem] sm:p-7">
      <span className="absolute right-5 top-5 sm:right-6 sm:top-6">
        <Pill tone="dark">{linkable ? "Preview" : "Coming soon"}</Pill>
      </span>

      <div className="mt-auto">
        <p className="text-md text-fog">{report.type}</p>
        <h2 className="mt-3 max-w-[20rem] text-2xl leading-[1.2] tracking-tight">
          <ReportTitle
            report={report}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
          >
            {report.title}
          </ReportTitle>
          <span className="block text-fog">{report.line}</span>
        </h2>
      </div>
    </article>
  );
}

function ReportRow({ report, index }: { report: ResearchReport; index: number }) {
  const label = isLinkable(report)
    ? report.external
      ? "Preview"
      : "Read"
    : "Coming soon";

  const cellClass =
    "px-3 grid gap-1 py-3.5 sm:grid-cols-12 sm:items-center sm:gap-x-8";
  const body = (
    <>
      <span className="mono-label text-[0.6875rem] text-ink/60 sm:col-span-1">
        {pad(index + 1)}.
      </span>
      <span className="text-ink/60 sm:col-span-2">{report.type}</span>
      <span className="sm:col-span-7">
        {report.title} {report.line}
      </span>
      <span className="mt-1 inline-flex items-center gap-1.5 sm:col-span-2 sm:mt-0 sm:justify-end">
        {label}
        {isLinkable(report) && (
          <ArrowUpRight
            aria-hidden="true"
            size={14}
            weight="bold"
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        )}
      </span>
    </>
  );

  return (
    <li className="border-t border-ink/35">
      {isLinkable(report) ? (
        <Link
          href={reportHref(report)}
          target={report.external ? "_blank" : undefined}
          // Threat: reverse tabnabbing (Phase 3)
          rel={report.external ? "noopener noreferrer" : undefined}
          className={`${cellClass} group transition-colors hover:bg-ink/[0.04]`}
        >
          {body}
        </Link>
      ) : (
        <div className={`${cellClass} text-ink/50`}>{body}</div>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------
   Browser
------------------------------------------------------------------- */
export default function ResearchBrowser({
  reports,
}: {
  reports: ResearchReport[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () => reports.filter((r) => r.featured).slice(0, 2),
    [reports],
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (r) =>
        (filter === "All" || r.type === filter) &&
        (!q || searchableText(r).includes(q)),
    );
  }, [reports, filter, query]);

  // Featured cards are unfiltered, so hiding them while narrowing avoids
  // showing a "result" that the filter excludes.
  const showFeatured = filter === "All" && query.trim() === "";

  return (
    <div className="mt-14">
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

      {showFeatured && featured.length > 0 && (
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
        <p className="text-md mb-3 text-ink/70" aria-live="polite">
          {rows.length} {rows.length === 1 ? "paper" : "papers"}
        </p>

        {rows.length > 0 ? (
          <ul className="border-b border-ink/35">
            {rows.map((r, i) => (
              <ReportRow key={r.slug} report={r} index={i} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-3 border-y border-ink/35 py-10">
            <p className="text-lg text-ink/70">No papers match that search.</p>
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
  );
}
