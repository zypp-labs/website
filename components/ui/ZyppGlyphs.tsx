import type { ComponentType } from "react";

type GlyphProps = { className?: string };

/**
 * Drawn on a 340 x 440 box. Every corner is filleted: ~22 on outer corners,
 * ~14 on inner corners, larger on the P bowl and the chamfers. Colour comes
 * from currentColor.
 */
function Glyph({ d, className }: GlyphProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="#fff"
      fillRule="evenodd"
    >
      <path d={d} />
    </svg>
  );
}

const Z =
  "M10 36 L36 10 A34 34 0 0 1 60.1 0 L318 0 A22 22 0 0 1 340 22 L340 68.5 A22 22 0 0 1 335.4 81.9 L137.9 338.2 A16 16 0 0 0 150.5 364 L325 364 A15 15 0 0 1 340 379 L340 379.9 A34 34 0 0 1 330 404 L304 430 A34 34 0 0 1 279.9 440 L22 440 A22 22 0 0 1 0 418 L0 371.5 A22 22 0 0 1 4.6 358.1 L202.1 101.8 A16 16 0 0 0 189.5 76 L15 76 A15 15 0 0 1 0 61 L0 60.1 A34 34 0 0 1 10 36 Z";
const Y =
  "M37 0 L75 0 A22 22 0 0 1 94.3 11.4 L152.5 117.9 A20 20 0 0 0 187.5 117.9 L245.7 11.4 A22 22 0 0 1 265 0 L303 0 A22 22 0 0 1 322.4 32.5 L213.9 232.4 A16 16 0 0 0 212 240.1 L212 418 A22 22 0 0 1 190 440 L150 440 A22 22 0 0 1 128 418 L128 240.1 A16 16 0 0 0 126.1 232.4 L17.6 32.5 A22 22 0 0 1 37 0 Z";
const P =
  "M22 0 L278 0 A62 62 0 0 1 340 62 L340 228 A62 62 0 0 1 278 290 L98 290 A14 14 0 0 0 84 304 L84 424 A16 16 0 0 1 68 440 L66.1 440 A34 34 0 0 1 42 430 L10 398 A34 34 0 0 1 0 373.9 L0 22 A22 22 0 0 1 22 0 Z M98 76 L230 76 A26 26 0 0 1 256 102 L256 188 A26 26 0 0 1 230 214 L98 214 A14 14 0 0 1 84 200 L84 90 A14 14 0 0 1 98 76 Z";

export const GlyphZ = ({ className }: GlyphProps) => (
  <Glyph d={Z} className={className} />
);
export const GlyphY = ({ className }: GlyphProps) => (
  <Glyph d={Y} className={className} />
);
export const GlyphP = ({ className }: GlyphProps) => (
  <Glyph d={P} className={className} />
);

/** In reading order: Z Y P P */
export const ZYPP_GLYPHS: ComponentType<GlyphProps>[] = [
  GlyphZ,
  GlyphY,
  GlyphP,
  GlyphP,
];