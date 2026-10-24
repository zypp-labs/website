import { CANONICAL_ENTITY_SENTENCE, SITE_URL } from "@/lib/seo";

function escapeJsonLd(str: string) {
  return str.replace(/</g, "\\u003c");
}

export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Zypp Labs",
    slogan: "Engineering payments that work offline.",
    description: CANONICAL_ENTITY_SENTENCE,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    foundingDate: "2025",
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Joshua Idele",
      jobTitle: "Founder and CEO",
      sameAs: ["https://x.com/josh_scriptz", "https://github.com/Codig-With-Josh"],
    },
    sameAs: ["https://x.com/use_zypp", "https://github.com/zypp-labs"],
    knowsAbout: [
      "offline payments",
      "delay-tolerant networking",
      "payments infrastructure",
      "Solana",
      "stablecoin payments",
    ],
    disambiguatingDescription:
      "Not affiliated with Zypp Electric or the ZYpp/libzypp package manager",
    contactPoint: {
      "@type": "ContactPoint",
      email: "codewithjoshh@gmail.com",
      contactType: "customer support",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Zypp Labs",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en",
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Zypp Labs - Engineering Offline-Capable Payments",
    description: CANONICAL_ENTITY_SENTENCE,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og/og-default.png`,
      width: 1200,
      height: 630,
    },
    inLanguage: "en",
  };

  const mobileApp = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Zypp Pay",
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
    description:
      "A consumer app for sending and receiving money in the user's local currency without an internet connection.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zypp SDK",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "React Native (Expo), Rust, Unity",
    description:
      "Open SDK that lets fintechs, wallets, and banks add offline-payment technology to their existing apps.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const softwareSourceCode = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Zypp SDK",
    codeRepository: "https://github.com/zypp-labs",
    runtimePlatform: ["React Native", "Expo", "Rust", "Unity"],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline:
      "Delay-Tolerant Networking and Solana Transaction Propagation for Offline-First Payments",
    datePublished: "2026-03-01",
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    url: "https://drive.google.com/file/d/1USGGqEICwqUAfm-by6JwF4vrbQPbVdvU/view",
    isAccessibleForFree: true,
  };

  const schemas = [
    organization,
    website,
    webpage,
    mobileApp,
    softwareApp,
    softwareSourceCode,
    article,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(schema)) }}
        />
      ))}
    </>
  );
}
