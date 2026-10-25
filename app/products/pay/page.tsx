import { Metadata } from "next";
import { getMetadata } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const metadata: Metadata = getMetadata({
  title: "Pay",
  description: "Zypp Pay is a consumer app for sending and receiving money without an internet connection in Nigeria.",
  path: "/products/pay",
});

export default function PayPage() {
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
            Zypp Pay
          </h1>
          <p className="mt-6 text-lg text-ink/70">
            A consumer app for sending and receiving money in Nigerian Naira
            without an internet connection. Currently in version 2 closed beta
            on iOS and Android.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
