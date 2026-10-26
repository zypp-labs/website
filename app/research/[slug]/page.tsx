import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "@phosphor-icons/react/dist/ssr";
import { getMetadata, SITE_URL } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import ShareButton from "@/components/ui/ShareButton";
import { reports as REPORTS } from "@/content/research";

function readMinutes(report: (typeof REPORTS)[number]) {
  if (!report.sections?.length) return null;
  const words = [
    report.abstract || report.summary || "",
    ...report.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function generateStaticParams() {
  return REPORTS.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const report = REPORTS.find((r) => r.slug === slug);
  if (!report) return getMetadata({ title: "Research", path: "/research" });

  const base = getMetadata({
    title: `${report.title} ${report.line}`,
    description: report.abstract,
    path: `/research/${report.slug}`,
    // The card next to this file is generated from the same report data, so a
    // shared link shows the paper's own title instead of the generic site
    // image. `opengraph-image.tsx` is the source of truth for the artwork;
    // this is only how we point at it and describe it.
    image: {
      url: `/research/${encodeURIComponent(report.slug)}/opengraph-image`,
      alt: `${report.title} ${report.line} - Zypp Labs`,
      width: 1200,
      height: 630,
      type: "image/png",
    },
  });

  // Unpublished pages should not be indexed
  return report.status === "published"
    ? base
    : { ...base, robots: { index: false, follow: true } };
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = REPORTS.find((r) => r.slug === slug);
  if (!report) notFound();

  const isPublished = report.status === "published";
  const minutes = readMinutes(report);
  const fullTitle = `${report.title} ${report.line}`;
  const url = `${SITE_URL}/research/${report.slug}`;
  const others = REPORTS.filter((r) => r.slug !== report.slug);
  const year = report.datePublished?.slice(0, 4);

  const jsonLd = isPublished
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "TechArticle",
            headline: fullTitle,
            description: report.abstract,
            url,
            datePublished: report.datePublished,
            inLanguage: "en",
            isAccessibleForFree: true,
            author: { "@type": "Organization", name: "Zypp Labs", url: SITE_URL },
            publisher: { "@type": "Organization", name: "Zypp Labs", url: SITE_URL },
            mainEntityOfPage: url,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Zypp Labs", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Research", item: `${SITE_URL}/research` },
              { "@type": "ListItem", position: 3, name: fullTitle, item: url },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      <Link
        href="#main"
        className="mono-label sr-only z-60 rounded-xl bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </Link>

      <main id="main" className="flex-1 bg-paper text-ink">
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        )}

        <div className="mx-auto max-w-screen px-6 py-28 sm:px-20 sm:py-36 lg:py-30">
          <Link
            href="/research"
            className="mono-label inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.04em] text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} weight="bold" />
            Research
          </Link>

          {/* Header */}
          <header className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 text-center">
            <div className="mono-label flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.04em]">
              {report.dateLabel && (
                <time dateTime={report.datePublished} className="text-ink/50">
                  {report.dateLabel}
                </time>
              )}
              <span className="text-ink">{report.type}</span>
            </div>

            <h1 className="text-balance text-[2.25rem] font-normal leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {report.title}{" "}
              <span className="text-ink/50">{report.line}</span>
            </h1>

            <p className="text-md text-ink/60">
              {report.authors?.length ? `By ${report.authors.join(", ")}` : null}
            </p>
          </header>

          {/* Meta bar */}
          <div className="mx-auto mt-12 flex max-w-[38rem] items-center justify-between border-b border-ink/15 pb-3 text-sm text-ink/70">
            {minutes ? (
              <span className="inline-flex items-center gap-2">
                <Clock size={16} />
                Read time: {minutes} {minutes === 1 ? "minute" : "minutes"}
              </span>
            ) : (
              <span />
            )}
            <ShareButton />
          </div>

          {/* Body */}
          <article className="mx-auto mt-10 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-ink/85">
            <p className="first-letter:float-left first-letter:pr-3 first-letter:pt-1.5 first-letter:text-[5rem] first-letter:font-normal first-letter:leading-[0.75] first-letter:text-ink">
              {report.abstract || report.summary || report.line}
            </p>

            {/* <div className="mt-8">
              {isPublished ? (
                <Link
                  href={report.href}
                  target={report.external ? "_blank" : undefined}
                  rel={report.external ? "noopener noreferrer" : undefined}
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-paper transition-colors hover:bg-night"
                >
                  View paper
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink/10 px-6 py-3 text-ink/60">
                  Coming soon
                </span>
              )}
            </div> */}

            {report.sections?.map((section) => (
              <section key={section.id} id={section.id} className="mt-12 scroll-mt-28">
                <h2 className="text-2xl font-normal tracking-[-0.02em] text-ink">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-5">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            {isPublished && (
              <section aria-labelledby="cite" className="mt-14 border-t border-ink/15 pt-6">
                <h2
                  id="cite"
                  className="text-md text-ink/60"
                >
                  Cite this
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/70">
                  Zypp Labs. ({year}). {fullTitle}. Zypp Labs. {url}
                </p>
              </section>
            )}

            {others.length > 0 && (
              <section aria-labelledby="more" className="mt-14 border-t border-ink/15 pt-6">
                <h2
                  id="more"
                  className="text-md text-ink/60"
                >
                  More research
                </h2>
                <ul className="mt-3 divide-y divide-ink/10">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/research/${o.slug}`}
                        className="flex items-baseline justify-between gap-6 py-3 text-ink transition-colors hover:text-ink/60"
                      >
                        <span>{o.title}</span>
                        <span className="mono-label shrink-0 text-[0.6875rem] uppercase tracking-[0.04em] text-ink/50">
                          {(o.status === "published" || o.external) ? o.type : "Coming soon"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}