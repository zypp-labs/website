import Link from "next/link";

/** Placeholder mark: an open ring (a link that isn't always there) around a solid dot. Replace with the real logo. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zypp Labs home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M27 11.5A12 12 0 1 0 28 16" />
        <circle cx="16" cy="16" r="3.2" fill="currentColor" stroke="none" />
      </svg>
      <span className="text-[1.4rem] leading-none tracking-[-0.04em]">
        Zypp Labs
      </span>
    </Link>
  );
}