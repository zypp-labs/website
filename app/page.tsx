import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/Howitworks";
import Platform from "@/components/sections/Platform";
import Products from "@/components/sections/Products";
import Research from "@/components/sections/Research";
import AboutZypp from "@/components/sections/AboutZypp";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Link
        href="#main"
        className="mono-label sr-only z-60 rounded-xl bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </Link>
      <main id="main" className="flex-1">
        <Hero />
        <Platform />
        <HowItWorks />
        <Products />
        <Research />
        <AboutZypp />
        <Footer /> 
      </main>
    </>
  );
}
