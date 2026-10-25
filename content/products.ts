/**
 * Content for the Products section.
 * Anything in [square brackets] is a placeholder to be confirmed.
 */

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const productsIntro =
  "At Zypp Labs, we build different ways for people to send and receive money offline.";

export const zyppPay = {
  name: "Zypp Pay",
  line: "Send and receive money offline.",
  href: "/products/zypp-pay",
  cta: "Explore",
  /**
   * Real app screens go here, e.g.
   *   { src: "/images/zypp-pay-1.png", alt: "Zypp Pay balance screen", width: 500, height: 940 }
   * While this is empty, the card shows the placeholder screens below.
   */
  screens: [] as Screen[],
};

/** Shown only until real screens are added above. */
export const placeholderScreens = [
  { label: "Balance", amount: "₦ 12,500", buttons: ["Send", "Receive"] },
  { label: "Received", amount: "₦ 3,200", buttons: ["Done", "Share"] },
];

export const whitepaper = {
  label: "Research",
  title: "Delay Tolerant Networking and Solana Transaction Propagation for Offline-First Payments",
  meta: "Paper · March 2026",
  href: "#research",
};

export const zyppSdk = {
  name: "Zypp SDK",
  line: "Offline settlement for banks, fintechs and wallets.",
  href: "/products/sdk",
  cta: "Read the docs",
  /** Replace with a real snippet from the SDK docs. */
  snippet: [
    'import { Zypp } from "@zypp/sdk"',
    "",
    "// placeholder: replace with a real SDK call",
    "const tx = await zypp.sign({ to, amount })",
    "await zypp.settle(tx) // when online",
  ],
};