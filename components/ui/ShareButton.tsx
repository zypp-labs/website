"use client";

import { useState } from "react";
import { Check, LinkSimple } from "@phosphor-icons/react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: do nothing
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 text-ink/70 transition-colors hover:text-ink"
    >
      {copied ? <Check size={16} weight="bold" /> : <LinkSimple size={16} />}
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}