/**
 * Facts and contact details for the Company page.
 * Anything in [square brackets] is a placeholder to be confirmed.
 */

export const company = {
  name: "Zypp Labs",
  founded: "2025",
  location: "Benin City, Nigeria",
  lead: "Zypp Labs is a research and engineering lab building offline-capable payment infrastructure.",
};

export const facts: { label: string; value: string }[] = [
  { label: "Founded", value: company.founded },
  { label: "Based in", value: company.location },
  { label: "Focus", value: "Offline-capable payment infrastructure" },
  { label: "Products", value: "Zypp Pay, Zypp SDK" },
  { label: "Settlement", value: "Solana, on stablecoin rails" },
];

export const researchAreas: { n: string; title: string; text: string; href: string }[] = [
  {
    n: "01",
    title: "Cryptography",
    text: "Device-level signing and tamper-resistant key storage.",
    href: "/research",
  },
  {
    n: "02",
    title: "Local ledger",
    text: "Checking balances and pending entries without a network.",
    href: "/research",
  },
  {
    n: "03",
    title: "Settlement",
    text: "Reconciling offline transfers on Solana and stablecoin rails.",
    href: "/research",
  },
];

/** Empty list shows "No open roles at the moment." */
export const openRoles: { title: string; type: string; href: string }[] = [];

export const contact: { label: string; value: string; note?: string; href?: string }[] = [
  {
    label: "General",
    // Supplied as the public contact. A domain address (hello@your-domain) is better before launch.
    value: "info@zypp.fun",
    href: "mailto:info@zypp.fun",
  },
  { label: "Partnerships", value: "partnership@zypp.fun", note: "Banks, fintechs and wallets" },
  { label: "Security", value: "security@zypp.fun", note: "Responsible disclosure" },
  { label: "Brand", value: "Logo (SVG)", href: "/logo.svg", note: "Download" },
];