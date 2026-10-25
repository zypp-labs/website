import {
  renderResearchCard,
  OG_CONTENT_TYPE,
  OG_SIZE,
} from "@/lib/og/research-card";
import { reports } from "@/content/research";

/**
 * One card per publication, generated from the same data the page renders.
 * Adding a paper to `content/research.ts` produces its image with no extra
 * work: `generateStaticParams` on the page is what gives Next the slugs.
 */
export const alt = "Zypp Labs research publication";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Control (Phase 1 B1): the untrusted slug is only ever compared against
  // this static list. It is never joined into a path or a URL, so it cannot
  // reach the filesystem or make us fetch anything.
  const report = reports.find((r) => r.slug === slug) ?? null;

  // Phase 2: an unknown slug renders the plain card instead of throwing, so a
  // stale shared link degrades to a readable preview rather than no preview.
  return renderResearchCard(report);
}
