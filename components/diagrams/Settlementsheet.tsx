"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { Layer, Step } from "@/content/Architecture";

/* ------------------------------------------------------------------
   Isometric geometry. Constants are literal so server and client
   render identical markup (no trig at runtime).
------------------------------------------------------------------- */
const C = 0.8660254; // cos 30deg
const S = 0.5; // sin 30deg
const W = 250; // slab width
const D = 170; // slab depth
const T = 10; // slab thickness
const GAP = 120; // vertical gap between layers
const VBW = 520;
const VBH = 640;
const OX = VBW / 2 - ((W - D) * C) / 2;
const OY = 400;
const SVG_SHARE = VBW / 960; // the drawing takes this share of the figure width

type Pt = [number, number];
const P = (x: number, y: number, z: number): Pt => [
  OX + (x - y) * C,
  OY + (x + y) * S - z,
];
const f = (n: number) => n.toFixed(1);
const pts = (...p: Pt[]) => p.map(([a, b]) => `${f(a)},${f(b)}`).join(" ");

function Ln({
  a,
  b,
  w = 0.8,
  dash,
  o = 1,
}: {
  a: Pt;
  b: Pt;
  w?: number;
  dash?: string;
  o?: number;
}) {
  return (
    <line
      x1={f(a[0])}
      y1={f(a[1])}
      x2={f(b[0])}
      y2={f(b[1])}
      className="stroke-ink"
      strokeWidth={w}
      strokeDasharray={dash}
      opacity={o}
    />
  );
}

function Pg({
  p,
  w = 0.8,
  fill = "none",
}: {
  p: Pt[];
  w?: number;
  fill?: string;
}) {
  return (
    <polygon
      points={pts(...p)}
      className="stroke-ink"
      style={{ fill }}
      strokeWidth={w}
      strokeLinejoin="round"
    />
  );
}

const box = (Q: (x: number, y: number) => Pt, x0: number, y0: number, x1: number, y1: number): Pt[] => [
  Q(x0, y0),
  Q(x1, y0),
  Q(x1, y1),
  Q(x0, y1),
];

/** Surface detail drawn on top of each slab, keyed by layer id */
const detail: Record<string, (Q: (x: number, y: number) => Pt, on: boolean) => ReactNode> = {
  A: (Q) => (
    <>
      <Pg p={box(Q, 30, 24, W - 30, D - 24)} />
      <Ln a={Q(50, 48)} b={Q(W - 90, 48)} />
      <Ln a={Q(50, 64)} b={Q(W - 90, 64)} />
      <Ln a={Q(50, 80)} b={Q(W - 130, 80)} />
      <Pg p={box(Q, 50, D - 60, 110, D - 44)} />
    </>
  ),
  B: (Q) => (
    <>
      <Pg p={box(Q, 36, D / 2 - 17, 70, D / 2 + 17)} w={0.9} />
      <Pg p={box(Q, W - 70, D / 2 - 17, W - 36, D / 2 + 17)} w={0.9} />
      <Ln a={Q(76, D / 2)} b={Q(W - 76, D / 2)} w={0.9} dash="5 4" />
      <Pg
        p={[Q(W / 2 - 5, D / 2 - 5), Q(W / 2 + 5, D / 2), Q(W / 2 - 5, D / 2 + 5)]}
        fill="var(--color-ink)"
      />
    </>
  ),
  C: (Q, on) => {
    const x0 = 28, x1 = W - 28, y0 = 24, y1 = D - 24, rows = 6;
    const ry = (r: number) => y0 + ((y1 - y0) * r) / rows;
    return (
      <>
        <Pg
          p={box(Q, x0, ry(3), x1, ry(4))}
          fill={on ? "var(--color-ink)" : "color-mix(in oklab, var(--color-ink) 22%, transparent)"}
        />
        {Array.from({ length: rows + 1 }, (_, r) => (
          <Ln key={r} a={Q(x0, ry(r))} b={Q(x1, ry(r))} />
        ))}
        {[x0, x0 + 60, x1 - 60, x1].map((x) => (
          <Ln key={x} a={Q(x, y0)} b={Q(x, y1)} />
        ))}
      </>
    );
  },
  D: (Q) => {
    const cx = W / 2, cy = D / 2, s = 34;
    return (
      <>
        <Pg p={box(Q, cx - s, cy - s, cx + s, cy + s)} w={1} />
        <Pg p={box(Q, cx - 16, cy - 16, cx + 16, cy + 16)} />
        {[-2, -1, 0, 1, 2].map((k) => {
          const o = k * 14;
          return (
            <g key={k}>
              <Ln a={Q(cx + o, cy - s)} b={Q(cx + o, cy - s - 14)} />
              <Ln a={Q(cx + o, cy + s)} b={Q(cx + o, cy + s + 14)} />
              <Ln a={Q(cx - s, cy + o)} b={Q(cx - s - 14, cy + o)} />
              <Ln a={Q(cx + s, cy + o)} b={Q(cx + s + 14, cy + o)} />
            </g>
          );
        })}
      </>
    );
  },
};

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------- */
export default function SettlementSheet({
  layers,
  steps,
  interval = 2500,
}: {
  layers: Layer[];
  steps: Step[];
  /** How long each step stays active, in ms */
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  /** Bumped on every selection so the progress line restarts, even on the same step */
  const [cycle, setCycle] = useState(0);
  const [motionOk, setMotionOk] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const step = steps[active];
  const activeLayers = new Set(step.layers);
  const n = layers.length;

  /* Autoplay only when: the user allows motion, the figure is on screen,
     the pointer isn't over the step list, and nobody pressed Pause. */
  const running = motionOk && inView && !hovering && !userPaused;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };
  const advance = () => go((active + 1) % steps.length);

  const zb = (i: number) => (n - 1 - i) * GAP; // bottom of layer i
  const labelY = (i: number) => P(W, 0, zb(i) + T / 2)[1];

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % steps.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + steps.length) % steps.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = steps.length - 1;
    else return;
    e.preventDefault();
    go(next);
    buttons.current[next]?.focus();
  };

  return (
    <div
      ref={root}
      className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-12"
    >
      <style>{`@keyframes step-fill{from{transform:scaleY(0)}to{transform:scaleY(1)}}`}</style>

      {/* Drawing */}
      <div className="lg:col-span-8">
        <div
          className="relative aspect-[520/640] md:aspect-[960/640]"
          role="group"
          aria-label="Exploded view of the four layers of a Zypp device"
        >
          <svg
            viewBox={`0 0 ${VBW} ${VBH}`}
            className="h-full w-full md:w-[var(--share)]"
            style={{ ["--share" as string]: `${(SVG_SHARE * 100).toFixed(4)}%` }}
            aria-hidden="true"
          >
            {/* alignment lines, behind the slabs */}
            {layers.slice(0, -1).map((_, i) =>
              ([[0, D], [W, 0], [W, D]] as const).map(([x, y]) => (
                <Ln
                  key={`${i}-${x}-${y}`}
                  a={P(x, y, zb(i))}
                  b={P(x, y, zb(i + 1) + T)}
                  w={0.8}
                  dash="3 4"
                  o={0.55}
                />
              )),
            )}

            {/* slabs: bottom first so upper layers sit in front */}
            {[...layers].reverse().map((layer, r) => {
              const i = n - 1 - r;
              const on = activeLayers.has(layer.id);
              const z0 = zb(i);
              const z1 = z0 + T;
              const sw = on ? 1.6 : 1;
              const Q = (x: number, y: number) => P(x, y, z1);
              return (
                <g key={layer.id}>
                  <polygon
                    points={pts(P(W, 0, z1), P(W, D, z1), P(W, D, z0), P(W, 0, z0))}
                    className="stroke-ink fill-[#ebede6] transition-[stroke-width] duration-300"
                    style={{ strokeWidth: sw }}
                    strokeLinejoin="round"
                  />
                  <polygon
                    points={pts(P(0, D, z1), P(W, D, z1), P(W, D, z0), P(0, D, z0))}
                    className="stroke-ink fill-mist transition-[stroke-width] duration-300"
                    style={{ strokeWidth: sw }}
                    strokeLinejoin="round"
                  />
                  <polygon
                    points={pts(P(0, 0, z1), P(W, 0, z1), P(W, D, z1), P(0, D, z1))}
                    className="stroke-ink transition-[fill,stroke-width] duration-300"
                    style={{
                      strokeWidth: sw,
                      fill: on ? "var(--color-lime-soft, #8ffa6c)" : "var(--color-paper)",
                    }}
                    strokeLinejoin="round"
                  />
                  {detail[layer.id]?.(Q, on)}
                </g>
              );
            })}

            {/* leaders */}
            {layers.map((layer, i) => {
              const a = P(W, 0, zb(i) + T / 2);
              return (
                <g key={layer.id}>
                  <g className="max-md:hidden">
                    <Ln a={[a[0] + 6, a[1]]} b={[VBW, a[1]]} w={0.9} />
                  </g>
                  <circle cx={f(a[0])} cy={f(a[1])} r="3.2" className="fill-ink" />
                </g>
              );
            })}

            {/* exit arrow, when the step leaves the device */}
            {step.exit &&
              (() => {
                const idx = layers.findIndex((l) => activeLayers.has(l.id));
                const a = P(0, D, zb(idx) + T / 2);
                const y = a[1];
                return (
                  <g>
                    <Ln a={[a[0] - 8, y]} b={[26, y]} w={1} />
                    <polygon
                      points={`${f(26)},${f(y)} ${f(36)},${f(y - 5)} ${f(36)},${f(y + 5)}`}
                      className="fill-ink"
                    />
                    <text
                      x="10"
                      y={f(y - 12)}
                      className="fill-ink font-mono"
                      style={{ fontSize: 12, letterSpacing: "0.04em" }}
                    >
                      {step.exit}
                    </text>
                  </g>
                );
              })()}
          </svg>

          {/* Labels (md and up), aligned to the leaders */}
          <ul className="pointer-events-none absolute inset-0 hidden md:block">
            {layers.map((layer, i) => {
              const on = activeLayers.has(layer.id);
              return (
                <li
                  key={layer.id}
                  className="absolute -translate-y-1/2"
                  style={{
                    top: `${((labelY(i) / VBH) * 100).toFixed(2)}%`,
                    left: `calc(${(SVG_SHARE * 100).toFixed(4)}% + 0.5rem)`,
                  }}
                >
                  <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.04em]">
                    <span
                      aria-hidden="true"
                      className="inline-block size-2.5 border border-ink transition-colors duration-300"
                      style={{ backgroundColor: on ? "var(--color-lime-soft, #8ffa6c)" : "transparent" }}
                    />
                    {layer.id} {layer.name}
                  </p>
                  <p className="mt-1.5 pl-[1.125rem] text-sm leading-snug text-ink/70">
                    {layer.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Legend (below md) */}
        <ul className="mt-6 grid gap-4 md:hidden">
          {layers.map((layer) => {
            const on = activeLayers.has(layer.id);
            return (
              <li key={layer.id}>
                <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.04em]">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2.5 border border-ink transition-colors duration-300"
                    style={{ backgroundColor: on ? "var(--color-lime-soft, #8ffa6c)" : "transparent" }}
                  />
                  {layer.id} {layer.name}
                </p>
                <p className="mt-1 pl-[1.125rem] text-sm text-ink/70">{layer.text}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Step index */}
      <div
        className="lg:col-span-4 lg:pt-4"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <ol className="relative pl-9 before:absolute before:bottom-3 before:left-[5px] before:top-3 before:w-px before:bg-ink/25 before:content-['']">
          {steps.map((s, i) => {
            const on = i === active;
            const done = i < active;
            const isLast = i === steps.length - 1;
            const animate = on && motionOk;

            return (
              <li key={s.id} className="relative mb-8 last:mb-0">
                {/* Progress line: runs from this step's dot to the next one while this step is active */}
                <span
                  aria-hidden="true"
                  className="absolute -left-9 ml-[4.5px] w-0.5 overflow-hidden"
                  style={{
                    top: "calc(1.1rem + 5.5px)",
                    height: isLast
                      ? "calc(100% - 1.1rem - 5.5px - 0.75rem)"
                      : "calc(100% + 2rem)",
                  }}
                >
                  <span
                    key={animate ? `run-${i}-${cycle}` : "static"}
                    className="block h-full w-full origin-top bg-[#22c55e]"
                    style={
                      animate
                        ? {
                            animationName: "step-fill",
                            animationDuration: `${interval}ms`,
                            animationTimingFunction: "linear",
                            animationFillMode: "both",
                            animationPlayState: running ? "running" : "paused",
                          }
                        : { transform: done ? "scaleY(1)" : "scaleY(0)" }
                    }
                    onAnimationEnd={(e) => {
                      if (e.animationName === "step-fill") advance();
                    }}
                  />
                </span>

                <span
                  aria-hidden="true"
                  className={`absolute -left-9 top-[1.1rem] z-10 size-[11px] rounded-full border border-ink transition-colors duration-300 ${
                    i <= active ? "bg-[#22c55e]" : "bg-paper"
                  }`}
                />
                <button
                  ref={(el) => {
                    buttons.current[i] = el;
                  }}
                  type="button"
                  id={`step-${s.id}`}
                  aria-expanded={on}
                  aria-controls={`step-panel-${s.id}`}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`block w-full cursor-pointer text-left transition-colors duration-300 ${
                    on ? "text-ink" : "text-ink/40 hover:text-ink/70"
                  }`}
                >
                  <span className="block font-mono text-[0.6875rem] tracking-[0.04em]">{s.n}</span>
                  <span className="block text-[2.25rem] leading-[1.15] tracking-[-0.035em] sm:text-[2.5rem]">
                    {s.title}
                  </span>
                </button>

                <div
                  id={`step-panel-${s.id}`}
                  role="region"
                  aria-labelledby={`step-${s.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 max-w-[22rem] text-[1.0625rem] leading-relaxed text-ink/80">
                      {s.text}
                    </p>
                    <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.04em] text-ink/55">
                      Acts on: {s.actsOn}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* {motionOk && (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            className="mt-10 cursor-pointer pl-9 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-ink/55 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {userPaused ? "Resume sequence" : "Pause sequence"}
          </button>
        )} */}
      </div>
    </div>
  );
}