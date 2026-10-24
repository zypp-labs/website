import { Metadata } from "next";
import Link from "next/link";
import { getMetadata } from "@/lib/seo";

export const metadata: Metadata = getMetadata({
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">404</h1>
      <p className="mt-4 text-lg text-ink/70">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-paper transition-colors hover:bg-night"
      >
        Back to home
      </Link>
    </main>
  );
}
