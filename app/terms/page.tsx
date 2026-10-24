import { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata: Metadata = getMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Zypp Labs.",
  path: "/terms",
});

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="mt-6 text-lg text-ink/70">
            This page is provided for crawlability. The full Terms of Service are
            maintained separately and remains in effect.
          </p>
          <p className="mt-4 text-ink/70">
            For questions, contact:{" "}
            <a href="mailto:codewithjoshh@gmail.com" className="underline">
              codewithjoshh@gmail.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
