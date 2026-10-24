import { Metadata } from "next";

export const SITE_URL = "https://zypp.fun";
export const SITE_NAME = "Zypp Labs";

export const CANONICAL_ENTITY_SENTENCE =
  "Zypp Labs is a research and engineering company building offline-capable payment infrastructure.";

export const DEFAULT_TITLE = "Zypp Labs - Engineering Offline-Capable Payments";
export const DEFAULT_DESCRIPTION = CANONICAL_ENTITY_SENTENCE;
export const DEFAULT_OG_ALT = "Zypp Labs - Engineering offline-capable payments";

export function getMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = new URL(path, SITE_URL).toString();
  const ogImageUrl = new URL("/og/og-default.png", SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: DEFAULT_OG_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: "/icons/icon.svg", type: "image/svg+xml" },
        { url: "/icons/favicon.ico", sizes: "48x48" },
      ],
      apple: [{ url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
  };
}
