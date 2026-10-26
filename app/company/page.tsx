import type { Metadata } from "next";
import Nav from "@/components/nav/Nav";
import Logo from "@/components/ui/Logo";
import Company from "@/components/sections/Company";
import { company } from "@/content/company";
import { team } from "@/content/people";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Zypp Labs is a research and engineering lab building offline-capable payment infrastructure, based in Benin City, Nigeria.",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL; // e.g. https://zypp.xyz

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  foundingDate: company.founded,
  ...(SITE_URL && { url: SITE_URL, logo: `${SITE_URL}/logo.svg` }),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Benin City",
    addressCountry: "NG",
  },
  founder: { "@type": "Person", name: team[0].name },
};

export default function CompanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <Nav /> */}
      <header className=" max-w-7xl px-6 pt-6 sm:px-10 sm:pt-8">
        <div className="flex h-[3.375rem] items-center">
          <Logo className="text-ink" />
        </div>
      </header>
      <main id="main" className="flex-1">
        <Company />
      </main>
      {/* Add your <Footer /> here */}
    </>
  );
}