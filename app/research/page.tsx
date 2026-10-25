import type { Metadata } from "next";
import Link from "next/link";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import ResearchBrowser from "@/components/research/ResearchBrowser";
import { reports } from "@/content/research";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zypp.fun";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata({
    title: "Research",
    description:
      "Whitepapers, protocols and threat models from Zypp Labs on offline-capable payments.",
    path: "/research",
  });
}

export default function ResearchPage() {
  // Every report has a detail route, so the collection lists those URLs
  // rather than the raw `href` (which is "#" for on-site reports and an
  // external document for the rest).
  const listed = reports;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Research",
    url: `${SITE_URL}/research`,
    isPartOf: { "@type": "WebSite", name: "Zypp Labs", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Zypp Labs", url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listed.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/research/${encodeURIComponent(r.slug)}`,
        name: `${r.title} ${r.line}`,
      })),
    },
  };

  return (
    <>
      <Link
        href="#main"
        className="mono-label sr-only z-60 rounded-xl bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </Link>
      <main id="main" className="flex-1 bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="mx-auto max-w-screen px-6 py-28 sm:px-20 sm:py-36 lg:py-44">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              Foundational
              <br />
              Research
            </h1>
            <p className="max-w-[26rem] text-md leading-snug text-ink/70">
              The whitepapers, protocols and threat models behind offline
              payments.
            </p>
          </header>

          <ResearchBrowser reports={reports} />
        </div>
      </main>
      <Footer />
    </>
  );
}