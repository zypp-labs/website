import { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = getMetadata({
  title: "Research",
  description: "Research and whitepapers from Zypp Labs on offline-capable payments.",
  path: "/research",
});

type Report = {
  type: string;
  title: string;
  subtitle: string;
  href: string;
};

const reports: Report[] = [
  {
    type: "Whitepaper",
    title: "Delay Tolerant Networking and Solana Transaction Propagation",
    subtitle: "for Offline-First Payments",
    href: "https://drive.google.com/file/d/1USGGqEICwqUAfm-by6JwF4vrbQPbVdvU/view",
  },
  {
    type: "Security",
    title: "Threat model for device-to-device payments",
    subtitle: "and the controls that contain each",
    href: "#",
  },
];

export default function ResearchPage() {
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
          <div className="flex flex-col gap-4 border-t border-ink/35 pt-5 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-[1.875rem] font-normal tracking-[-0.03em]">
              Research
            </h1>
            <p className="max-w-[28rem] text-md leading-snug text-ink/70">
              The whitepapers, protocols and threat models behind offline
              payments.
            </p>
          </div>

          <div className="mt-14 space-y-2.5 sm:mt-20">
            {reports.map((report, index) => (
              <article
                key={`${report.title}-${index}`}
                className="group relative rounded-2xl bg-mist transition-colors hover:bg-ink hover:text-paper"
              >
                <Link
                  href={report.href}
                  className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                    <span className="mono-label text-[0.6875rem] uppercase tracking-[0.04em] text-ink/60 transition-colors group-hover:text-paper/60">
                      {report.type}
                    </span>
                    <h2 className="text-xl tracking-tight sm:text-2xl">
                      {report.title}
                      <span className="block text-ink/60 transition-colors group-hover:text-paper/60">
                        {report.subtitle}
                      </span>
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-md">
                    View
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
