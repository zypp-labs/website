import { Metadata } from "next";

const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "https://zypp.fun";
};

export const SITE_URL = getSiteUrl();

export const SITE_NAME = "Zypp Labs";

export const CANONICAL_ENTITY_SENTENCE =
  "Zypp Labs is a research and engineering company building offline-capable payment infrastructure.";

export const DEFAULT_TITLE = "Zypp Labs - Engineering Offline-Capable Payments";
export const DEFAULT_DESCRIPTION = CANONICAL_ENTITY_SENTENCE;
export const DEFAULT_OG_ALT = "Zypp Labs - Engineering offline-capable payments";

export type OgImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  type?: string;
};

const DEFAULT_OG_IMAGE: OgImage = {
  url: "/og/og-default.png",
  alt: DEFAULT_OG_ALT,
  width: 1200,
  height: 630,
  type: "image/png",
};

export function getMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  /**
   * Override the shared OG/Twitter image, e.g. a route-generated card.
   * Omit to keep the site-wide default. Pass `false` to emit no image tags at
   * all and let the `opengraph-image` file convention supply them.
   */
  image?: OgImage | false;
}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonicalUrl = new URL(path, SITE_URL).toString();

  // Fail-closed default: anything other than an explicit override resolves to
  // the shared image, so a page can't accidentally ship without an OG tag.
  const ogImage = image === undefined ? DEFAULT_OG_IMAGE : image;
  const ogImageUrl = ogImage
    ? new URL(ogImage.url, SITE_URL).toString()
    : undefined;

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
      ...(ogImage && ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                secureUrl: ogImageUrl,
                width: ogImage.width ?? 1200,
                height: ogImage.height ?? 630,
                type: ogImage.type ?? "image/png",
                alt: ogImage.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@use_zypp",
      creator: "@use_zypp",
      title: pageTitle,
      description: pageDescription,
      ...(ogImage && ogImageUrl
        ? { images: [{ url: ogImageUrl, alt: ogImage.alt }] }
        : {}),
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
