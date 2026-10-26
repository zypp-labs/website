import Image from "next/image";
import type { ReactNode } from "react";
import {
  company,
  contact,
  facts,
  openRoles,
  researchAreas,
} from "@/content/company";
import { advisors, team, type Person } from "@/content/people";

/* ------------------------------------------------------------------
   Layout helpers
------------------------------------------------------------------- */
function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-24 grid gap-6 border-t border-ink/35 pt-5 sm:mt-32 md:grid-cols-12 md:gap-x-6">
      <p className="mono-label flex items-center gap-2 self-start text-[0.6875rem] text-ink/70 md:col-span-3 md:pt-1">
        <span
          aria-hidden="true"
          className="inline-block size-1.5 border border-ink/60"
        />
        {label}
      </p>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

function Rows({
  rows,
}: {
  rows: { label: string; value: ReactNode; note?: string }[];
}) {
  return (
    <dl>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid gap-1 py-3 sm:grid-cols-12 sm:gap-x-6 ${
            i === 0 ? "pt-0 sm:pt-0" : "border-t border-ink/20"
          }`}
        >
          <dt className="text-ink/60 sm:col-span-4">{r.label}</dt>
          <dd className="sm:col-span-8">
            {r.value}
            {r.note && <span className="ml-3 text-sm text-ink/55">{r.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function PersonCard({ p }: { p: Person }) {
  return (
    <li className="team-person-card">
      <div className="team-person-photo relative aspect-square overflow-hidden rounded-md bg-mist">
        {p.photo ? (
          <Image
            src={p.photo.src}
            alt={`Portrait of ${p.name}`}
            width={p.photo.width}
            height={p.photo.height}
            className="h-full w-full object-cover grayscale"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center text-[5rem] tracking-[-0.05em] text-ink/20"
          >
            {initials(p.name)}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-[1.375rem] leading-tight tracking-[-0.025em]">
        {p.name}
      </h3>
      <p className="mt-0.5 text-sm text-ink/55">{p.role}</p>
      <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-ink/70">
        {p.bio}
      </p>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {p.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label text-[0.6875rem] underline decoration-ink/35 underline-offset-4 transition-colors hover:decoration-ink"
          >
            {l.label} ↗
          </a>
        ))}
      </p>
    </li>
  );
}

/* ------------------------------------------------------------------
   Page body
------------------------------------------------------------------- */
export default function Company() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:px-10 sm:pb-32 sm:pt-24">
      <h1 className="display text-[clamp(3.5rem,11vw,7.5rem)]">Company</h1>
      <p className="mt-8 max-w-[38rem] text-xl leading-relaxed text-ink/75">
        {company.lead} Founded in {company.founded}, based in {company.location}.
      </p>

      <Block label="Facts">
        <Rows rows={facts.map((f) => ({ label: f.label, value: f.value }))} />
      </Block>

      <Block label="Research areas">
        <ul>
          {researchAreas.map((a, i) => (
            <li
              key={a.n}
              className={`grid items-baseline gap-x-5 gap-y-2 py-5 sm:grid-cols-[3rem_13rem_1fr_auto] ${
                i === 0 ? "pt-0" : "border-t border-ink/20"
              }`}
            >
              <span className="mono-label text-[0.6875rem] text-ink/55">{a.n}</span>
              <h3 className="text-[1.75rem] leading-tight tracking-[-0.03em]">
                {a.title}
              </h3>
              <p className="max-w-[22rem] text-ink/70">{a.text}</p>
              <a
                href={a.href}
                className="mono-label text-[0.6875rem] underline decoration-ink/35 underline-offset-4 transition-colors hover:decoration-ink sm:text-right"
              >
                Research ↗
              </a>
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Team">
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p) => (
            <PersonCard key={p.name} p={p} />
          ))}
        </ul>
      </Block>

      {advisors.length > 0 && (
        <Block label="Advisors">
          <Rows
            rows={advisors.map((a) => ({ label: a.name, value: a.affiliation }))}
          />
        </Block>
      )}

      <Block label="Work with us">
        {openRoles.length === 0 ? (
          <p className="text-ink/75">No open roles at the moment.</p>
        ) : (
          <ul>
            {openRoles.map((r, i) => (
              <li
                key={r.title}
                className={`grid gap-1 py-3 sm:grid-cols-12 sm:gap-x-6 ${
                  i === 0 ? "pt-0" : "border-t border-ink/20"
                }`}
              >
                <a href={r.href} className="underline decoration-ink/35 underline-offset-4 sm:col-span-8">
                  {r.title}
                </a>
                <span className="text-ink/55 sm:col-span-4">{r.type}</span>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <Block label="Contact">
        <Rows
          rows={contact.map((c) => ({
            label: c.label,
            note: c.note,
            value: c.href ? (
              <a
                href={c.href}
                {...(c.href.startsWith("/") ? { download: true } : {})}
                className="underline decoration-ink/35 underline-offset-4 transition-colors hover:decoration-ink"
              >
                {c.value}
              </a>
            ) : (
              c.value
            ),
          }))}
        />
      </Block>
    </div>
  );
}