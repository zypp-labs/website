import { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata: Metadata = getMetadata({
  title: "Research",
  description: "Research and whitepapers from Zypp Labs on offline-capable payments.",
  path: "/research",
});

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
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
            Research
          </h1>
          <p className="mt-6 text-lg text-ink/70">
            Whitepapers and research from Zypp Labs.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
