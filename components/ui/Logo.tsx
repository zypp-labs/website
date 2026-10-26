import Link from "next/link";

/** Placeholder mark: an open ring (a link that isn't always there) around a solid dot. Replace with the real logo. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Zypp Labs home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <img
       alt="Zypp Logo"
       src="/logo.svg"
       className="size-10"
      />
      <span className="text-[1.4rem] leading-none tracking-[-0.04em]">
        Zypp Labs
      </span>
    </Link>
  );
}