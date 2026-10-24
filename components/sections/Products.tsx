import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  placeholderScreens,
  productsIntro,
  whitepaper,
  zyppPay,
  zyppSdk,
} from "@/content/products";

const LIME = "bg-[var(--color-lime-soft,#8ffa6c)]";

/* ------------------------------------------------------------------
   Small pieces
------------------------------------------------------------------- */
function Pill({ children, tone }: { children: string; tone: "dark" | "light" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute right-5 top-5 rounded-full px-4 py-2.5 font-mono text-xs uppercase tracking-[0.04em] transition-colors duration-300 group-hover:bg-accent group-hover:text-night sm:right-6 sm:top-6 ${
        tone === "dark" ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      {children}
    </span>
  );
}

/** Title + muted second line, as in the reference. The link stretches over the whole card. */
function CardTitle({
  name,
  line,
  href,
  muted,
}: {
  name: string;
  line: string;
  href: string;
  muted: string;
}) {
  return (
    <h3 className="absolute left-6 right-32 top-5 text-2xl leading-[1.2] tracking-tight sm:left-7 sm:top-6">
      <Link
        href={href}
        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
      >
        {name}
      </Link>
      <span className={`block ${muted}`}>{line}</span>
    </h3>
  );
}

/** Only used until real app screens are supplied in content/products.ts */
function PlaceholderPhone({
  label,
  amount,
  buttons,
  className = "",
}: {
  label: string;
  amount: string;
  buttons: string[];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[250/470] w-[min(15.5rem,40%)] shrink-0 overflow-hidden rounded-[2.4rem] border border-ink bg-paper p-5 pt-12 ${className}`}
    >
      <span className="absolute left-1/2 top-3 h-5 w-[4.4rem] -translate-x-1/2 rounded-xl bg-ink" />
      <div className="flex items-center justify-between gap-2">
        <span className="inline-block rounded-full border border-ink px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.04em]">
          Offline
        </span>
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.04em] text-ink/40 max-sm:hidden">
          Placeholder
        </span>
      </div>
      <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.04em] text-ink/55">
        {label}
      </p>
      <p className="mb-5 mt-0.5 whitespace-nowrap text-[clamp(1.25rem,3.2vw,2.5rem)] leading-none tracking-[-0.04em]">
        {amount}
      </p>
      <div className="flex gap-2">
        {buttons.map((b, i) => (
          <span
            key={b}
            className={`flex-1 rounded-xl py-2.5 text-center text-[0.8125rem] ${
              i === 0 ? "bg-ink text-paper" : "bg-mist text-ink"
            }`}
          >
            {b}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-3.5">
        <span className="block h-2.5 rounded-full bg-mist" />
        <span className="block h-2.5 w-3/5 rounded-full bg-mist" />
        <span className="block h-2.5 rounded-full bg-mist" />
      </div>
    </div>
  );
}

/** Minimal syntax colouring: keywords and // comments only */
const KEYWORDS = new Set(["import", "from", "const", "await", "async", "return", "new"]);

function CodeLine({ text }: { text: string }) {
  const ci = text.indexOf("//");
  const code = ci === -1 ? text : text.slice(0, ci);
  const comment = ci === -1 ? "" : text.slice(ci);
  const parts = code.split(/\b(import|from|const|await|async|return|new)\b/);
  return (
    <>
      {parts.map((p, i) =>
        KEYWORDS.has(p) ? (
          <span key={i} className="text-[var(--color-lime-soft,#8ffa6c)]">
            {p}
          </span>
        ) : (
          p
        ),
      )}
      {comment && <span className="text-paper/40">{comment}</span>}
    </>
  );
}

/* ------------------------------------------------------------------
   Section
------------------------------------------------------------------- */
export default function Products() {
  const hasScreens = zyppPay.screens.length > 0;

  return (
    <section id="products" className="bg-paper text-ink">
      <div className="mx-auto max-w-screen px-6 py-28 sm:px-20 sm:py-36 lg:py-44">
        {/* Header */}
        <div className="flex flex-col gap-4 border-t border-ink/35 pt-5 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-[1.875rem] font-normal tracking-[-0.03em]">Products</h2>
          <p className="max-w-[30rem] text-md leading-snug text-ink/70">
            {productsIntro}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-2.5 sm:mt-20 lg:grid-cols-[1.62fr_1fr] lg:items-start">
          {/* Zypp Pay */}
          <article className="group relative h-[30rem] overflow-hidden rounded-2xl bg-mist sm:h-[36rem] lg:h-[40rem]">
            <CardTitle {...zyppPay} muted="text-fog" />
            <Pill tone="dark">{zyppPay.cta}</Pill>

            <div className="absolute inset-x-0 bottom-0 flex translate-y-[14%] items-end justify-center gap-4 transition-transform duration-500 group-hover:translate-y-[11%] sm:gap-6">
              {hasScreens
                ? zyppPay.screens.map((s, i) => (
                    <Image
                      key={s.src}
                      src={s.src}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      className={`h-auto w-[min(15.5rem,40%)] shrink-0 ${i % 2 ? "translate-y-14" : ""}`}
                    />
                  ))
                : placeholderScreens.map((s, i) => (
                    <PlaceholderPhone
                      key={s.label}
                      {...s}
                      className={i % 2 ? "translate-y-14" : ""}
                    />
                  ))}
            </div>
          </article>

          {/* Whitepaper */}
          <article
            className={`group relative flex min-h-[13.75rem] flex-col justify-between rounded-2xl p-6 text-night sm:p-7 ${LIME}`}
          >
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] opacity-60">
                {whitepaper.label}
              </p>
              <h3 className="mt-3 max-w-[20rem] text-2xl leading-[1.2] tracking-[-0.025em]">
                <Link
                  href={whitepaper.href}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]"
                >
                  {whitepaper.title}
                </Link>
              </h3>
            </div>
            <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.04em] opacity-60">
              {whitepaper.meta}
            </p>
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-paper sm:right-6 sm:top-6"
            >
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </article>

          {/* Zypp SDK */}
          <article className="group relative flex min-h-[28rem] flex-col overflow-hidden rounded-2xl bg-ink text-paper sm:min-h-[32rem] lg:col-span-2">
            <CardTitle {...zyppSdk} muted="text-paper/45" />
            <Pill tone="light">{zyppSdk.cta}</Pill>

            <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-32 sm:px-10">
              <pre
                tabIndex={0}
                aria-label="Example SDK usage"
                className="max-w-full overflow-x-auto font-mono text-[0.8125rem] leading-[1.85] transition-transform duration-500 group-hover:-translate-y-1 sm:text-[0.9375rem]"
              >
                <code className="grid gap-x-5 [grid-template-columns:auto_1fr]">
                  {zyppSdk.snippet.map((line, i) => (
                    <span key={i} className="contents">
                      <span aria-hidden="true" className="select-none text-right text-paper/25">
                        {i + 1}
                      </span>
                      <span className="whitespace-pre">
                        <CodeLine text={line} />
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}