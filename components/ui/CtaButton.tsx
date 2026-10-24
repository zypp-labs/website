import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const tones = {
  light: "bg-paper text-night", // for dark backgrounds
  dark: "bg-ink text-paper", // for light backgrounds
} as const;

type Props = {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
};

/** Pill with a detached accent arrow tab. */
export default function CtaButton({
  href,
  children,
  tone = "dark",
  className = "",
}: Props) {
  return (
    <Link href={href} className={`group inline-flex items-stretch gap-1 ${className}`}>
      <span
        className={`text-md mono-label flex font-medium items-center rounded-l-2xl rounded-r-lg px-5 py-3 ${tones[tone]}`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="flex w-14 items-center justify-center rounded-l-lg rounded-r-2xl bg-accent text-night transition-[width] duration-300 group-hover:w-17"
      >
        <ArrowRight
          size={16}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}