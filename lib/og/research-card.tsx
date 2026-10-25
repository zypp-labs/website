import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ResearchReport } from "@/content/research";

/**
 * Spec-sheet card for a research publication.
 *
 * Deliberately typographic: paper ground, one hairline rule, mono meta line,
 * the title in large type, authors below, Zypp Labs in the top-right corner.
 * No isometric drawing, no screenshots, no code — all of them dissolve at the
 * ~300px width a chat app actually renders.
 *
 * Everything sits inside a 72px inset because some clients crop the card.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#f4f5f1";
const INK = "#17221c";
const FOG = "#8f998f";

/** Safe area. Nothing important may sit closer to an edge than this. */
const INSET = 72;
const TITLE_MAX_WIDTH = OG_SIZE.width - INSET * 2;

const SANS = "Host Grotesk";
const MONO = "Geist Mono";

type LoadedFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal";
};

let fontPromise: Promise<LoadedFont[] | null> | null = null;

/**
 * Fonts are read from disk, never from the network and never from a path
 * built out of request data (Phase 3: no SSRF, no traversal via slug).
 * The paths are literals so Next's file tracer ships the assets.
 */
function loadFonts(): Promise<LoadedFont[] | null> {
  fontPromise ??= (async () => {
    try {
      const [regular, medium, mono] = await Promise.all([
        readFile(join(process.cwd(), "assets/fonts/HostGrotesk-Regular.ttf")),
        readFile(join(process.cwd(), "assets/fonts/HostGrotesk-Medium.ttf")),
        readFile(join(process.cwd(), "assets/fonts/GeistMono-Regular.ttf")),
      ]);
      return [
        { name: SANS, data: regular, weight: 400, style: "normal" },
        { name: SANS, data: medium, weight: 500, style: "normal" },
        { name: MONO, data: mono, weight: 400, style: "normal" },
      ];
    } catch {
      // Phase 2: a missing asset degrades to Satori's built-in face rather
      // than 500ing the card. The layout is flex/percentage based, so the
      // composition survives the font swap.
      return null;
    }
  })();

  return fontPromise;
}

function yearOf(report: ResearchReport | null) {
  if (!report) return null;
  if (report.datePublished) return report.datePublished.slice(0, 4);
  return report.dateLabel?.match(/\d{4}/)?.[0] ?? null;
}

/** Floor is 70px on purpose — below that the card stops reading at thumbnail size. */
function titleSize(combinedLength: number) {
  if (combinedLength <= 40) return 96;
  if (combinedLength <= 60) return 86;
  if (combinedLength <= 80) return 78;
  return 70;
}

function clamp(text: string, limit = 120) {
  return text.length > limit ? `${text.slice(0, limit - 3).trimEnd()}...` : text;
}

export async function renderResearchCard(
  report: ResearchReport | null,
): Promise<ImageResponse> {
  const fonts = await loadFonts();

  const fallbackTitle = "Research";
  const title = clamp(report?.title ?? fallbackTitle);
  const line = report ? clamp(report.line ?? "", 90) : "";
  const combinedLength = title.length + (line ? line.length + 1 : 0);
  const size = titleSize(combinedLength);

  const meta = report
    ? [report.type.toUpperCase(), `V${report.version ?? "1.0"}`, yearOf(report)]
        .filter(Boolean)
        .join("  /  ")
    : "ZYPP LABS  /  RESEARCH";

  const authors = report?.authors?.length ? report.authors.join(", ") : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          padding: INSET,
        }}
      >
        {/* Meta row: type / version / year, with the lab mark in the corner */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: 1,
            color: FOG,
          }}
        >
          <div style={{ display: "flex" }}>{meta}</div>
          <div style={{ display: "flex", color: INK, letterSpacing: 1.4 }}>
            ZYPP LABS
          </div>
        </div>

        {/* The single hairline rule */}
        <div
          style={{
            display: "flex",
            height: 1,
            marginTop: 22,
            background: "rgba(23,34,28,0.35)",
          }}
        />

        {/* Title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
            marginTop: 20,
            maxWidth: TITLE_MAX_WIDTH,
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: size,
              lineHeight: 1.04,
              letterSpacing: -size * 0.035,
            }}
          >
            {title}
          </div>
          {line ? (
            <div
              style={{
                display: "flex",
                fontFamily: SANS,
                fontWeight: 400,
                fontSize: size,
                lineHeight: 1.04,
                letterSpacing: -size * 0.035,
                color: FOG,
                marginTop: size * 0.06,
              }}
            >
              {line}
            </div>
          ) : null}
        </div>

        {/* Footer: authors left, where to read it right */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            fontFamily: MONO,
            fontSize: 20,
            letterSpacing: 0.6,
            color: FOG,
          }}
        >
          <div style={{ display: "flex", maxWidth: TITLE_MAX_WIDTH * 0.7 }}>
            {authors ?? ""}
          </div>
          <div style={{ display: "flex", color: INK }}>zypp.fun/research</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      // `undefined` is valid here: ImageResponse falls back to its default face.
      fonts: fonts ?? undefined,
    },
  );
}
