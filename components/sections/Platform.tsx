import type { ReactNode } from "react";
import CtaButton from "../ui/CtaButton";

/* ------------------------------------------------------------------
   Line icons for the three frames (hairline, drawn in currentColor)
------------------------------------------------------------------- */
const svgProps = {
  viewBox: "0 0 80 80",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 0.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Radial burst: a key space */
function CryptographyIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      {Array.from({ length: 36 }, (_, i) => {
        const a = (i * 10 * Math.PI) / 180;
        const r1 = 13;
        const r2 = i % 2 === 0 ? 36 : 28;
        return (
          <line
            key={i}
            x1={(40 + r1 * Math.cos(a)).toFixed(2)}
            y1={(40 + r1 * Math.sin(a)).toFixed(2)}
            x2={(40 + r2 * Math.cos(a)).toFixed(2)}
            y2={(40 + r2 * Math.sin(a)).toFixed(2)}
          />
        );
      })}
    </svg>
  );
}

/** Nested diamonds: blocks in a ledger */
function LedgerIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      {[36, 28, 20, 12].map((s) => (
        <polygon
          key={s}
          points={`40,${40 - s} ${40 + s},40 40,${40 + s} ${40 - s},40`}
        />
      ))}
      <line x1="4" y1="40" x2="76" y2="40" />
      <line x1="40" y1="4" x2="40" y2="76" />
    </svg>
  );
}

/** Stacked slabs: settlement layers */
function SettlementIcon({ className }: { className?: string }) {
  return (
    <svg {...svgProps} className={className}>
      <polygon points="40,6 68,20 40,34 12,20" />
      {[34, 48, 62].map((y) => (
        <polyline key={y} points={`12,${y - 14} 40,${y} 68,${y - 14}`} />
      ))}
      <line x1="12" y1="20" x2="12" y2="48" />
      <line x1="68" y1="20" x2="68" y2="48" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Content
------------------------------------------------------------------- */
type Frame = {
  n: string;
  title: string;
  text: string;
  tone: string;
  Icon: (props: { className?: string }) => ReactNode;
};

const frames: Frame[] = [
  {
    n: "01",
    title: "Cryptography",
    text: "Each transfer is securely signed on the device, with keys held in tamper-resistant storage.",
    tone: "bg-mist text-ink",
    Icon: CryptographyIcon,
  },
  {
    n: "02",
    title: "Local ledger",
    text: "Payments are checked against a ledger on the device at the moment of sale, with no network.",
    tone: "bg-ink text-paper",
    Icon: LedgerIcon,
  },
  {
    n: "03",
    title: "Settlement",
    text: "Transfers reconcile on Solana and stablecoin rails once connectivity returns.",
    tone: "bg-accent text-ink",
    Icon: SettlementIcon,
  },
];

export default function Platform() {
  return (
    <section id="platform" className="bg-paper text-ink">
      {/* Intro (your layout) */}
      <div className="mx-auto max-w-screen px-6 pt-28 pb-36 sm:px-10 sm:pt-36 sm:pb-44 lg:pt-44 lg:pb-52">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:gap-8">
          {/* Section label: small square marker + mono text */}
          <div className="md:col-span-3 md:pt-[0.9em]">
            <p className="mono-label flex items-center gap-2 text-[0.6875rem] text-ink/70">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 border border-ink/60"
              />
              The thesis
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-8">
            <h2 className="display max-w-[25em] text-[2.2rem] md:text-[3rem] lg:text-[4rem] leading-10 md:leading-12 lg:leading-16 font-medium tracking-tighter">
              Combining cryptography and ledger design into{" "}
              <span className="text-fog">a payment rail that never sleeps.</span>
            </h2>

            <p className="mt-10 max-w-[52rem] text-lg leading-relaxed text-ink/70 sm:text-lg">
              Our platform lets two devices settle a payment directly, with no
              connection to a bank or network at the moment of sale. Every
              transfer is signed on the device, checked against a local ledger,
              and reconciled automatically when connectivity returns. At its
              core are our offline-first protocol and tamper-resistant key
              storage, which give banks, fintechs and wallets a dependable
              foundation for cash-like digital payments.
            </p>

            <CtaButton href="#research" tone="dark" className="mt-7">
              Read the whitepaper
            </CtaButton>
          </div>
        </div>
      </div>

      {/* Three frames: flush, full-bleed, no gaps */}
      <div className="grid md:grid-cols-3">
        {frames.map(({ n, title, text, tone, Icon }) => (
          <article
            key={n}
            className={`flex min-h-80 flex-col justify-between p-6 sm:p-8 md:min-h-[26rem] lg:min-h-[30rem] ${tone}`}
          >
            <div className="flex items-start justify-between">
              <Icon className="size-16 sm:size-20" />
              <span className="mono-label text-[0.6875rem] opacity-70">
                {n}.
              </span>
            </div>

            <div>
              <h3 className="text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-2 max-w-[24rem] text-[0.9375rem] leading-snug opacity-75">
                {text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}