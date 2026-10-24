import { layers, specRows, steps } from "@/content/Architecture";
import SettlementSheet from "../diagrams/Settlementsheet";


export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper text-ink">
      <div className="mx-auto max-w-screen px-6 py-28 sm:px-20 sm:py-36 lg:py-44">
        {/* <div className="border-t border-ink" /> */}

        <h2 className="display mb-10 mt-8 text-[clamp(2.75rem,8.5vw,6rem)] sm:mb-14">
          Architecture
        </h2>

        {/* <div className="mono-label grid gap-1 border-t border-ink/35 pt-3 text-[0.6875rem] sm:grid-cols-3">
          <span>Zypp Labs</span>
          <span>Architecture</span>
          <span>Whitepaper §[x]</span>
        </div> */}

        <SettlementSheet layers={layers} steps={steps} />

        <dl className="mt-16 border-b border-ink/35 sm:mt-20">
          {specRows.map((r) => (
            <div
              key={r.label}
              className="grid gap-1 border-t border-ink/35 py-3 sm:grid-cols-12 sm:gap-x-8"
            >
              <dt className="text-ink/60 sm:col-span-4">{r.label}</dt>
              <dd className="sm:col-span-8">{r.value}</dd>
            </div>
          ))}
          <div className="grid gap-1 border-t border-ink/35 py-3 sm:grid-cols-12 sm:gap-x-8">
            <dt className="text-ink/60 sm:col-span-4">Specification</dt>
            <dd className="sm:col-span-8">
              <a
                href="#research"
                className="underline decoration-ink/40 underline-offset-4 transition-colors hover:decoration-ink"
              >
                Whitepaper, Section [3] ↗
              </a>
            </dd>
          </div>
        </dl>

        {/* <div className="mono-label mt-16 flex justify-between text-[0.6875rem]">
          <span>Zypp Labs&nbsp;&nbsp;Architecture</span>
          <span>©2026</span>
        </div> */}
      </div>
    </section>
  );
}