import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const REPORTS = [
  {
    slug: "dtn-solana-offline-payments",
    type: "Whitepaper",
    title: "Delay Tolerant Networking and Solana Transaction Propagation",
    line: "for Offline-First Payments",
    href: "https://drive.google.com/file/d/1USGGqEICwqUAfm-by6JwF4vrbQPbVdvU/view",
    external: true,
  },
  {
    slug: "threat-model-d2d-payments",
    type: "Security",
    title: "Threat model for device-to-device payments",
    line: "and the controls that contain each",
    href: "#",
    external: false,
  },
];

export function generateStaticParams() {
  return REPORTS.map((report) => ({ slug: report.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const report = REPORTS.find((r) => r.slug === slug);
  if (!report) return getMetadata({ title: "Research", path: "/research" });
  return getMetadata({
    title: report.title,
    description: report.line,
    path: `/research/${report.slug}`,
  });
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = REPORTS.find((r) => r.slug === slug);
  if (!report) notFound();

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
          <div className="flex flex-col gap-6 border-t border-ink/35 pt-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-2">
                <span className="mono-label text-[0.6875rem] uppercase tracking-[0.04em] text-ink/60">
                  {report.type}
                </span>
                <h1 className="max-w-4xl text-[2rem] font-normal tracking-[-0.03em] sm:text-[2.5rem] lg:text-[3rem]">
                  {report.title}
                </h1>
                <p className="text-xl text-ink/60 sm:text-2xl">{report.line}</p>
              </div>
            </div>

            {report.external ? (
              <Link
                href={report.href}
                target="_blank"
                rel="noopener noreferrer"
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

            <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-ink/80">
              <p>
                Research from Zypp Labs on building resilient offline-capable
                payments.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
