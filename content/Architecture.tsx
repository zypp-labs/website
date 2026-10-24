/**
 * Content for the "How settlement works" section.
 * Anything in [square brackets] is a placeholder to be confirmed against the whitepaper.
 */

export type Layer = {
  id: string;
  name: string;
  text: string;
};

export type Step = {
  id: string;
  n: string;
  title: string;
  text: string;
  /** Layer ids this step acts on (highlighted in the drawing) */
  layers: string[];
  /** Shown under the step text */
  actsOn: string;
  /** If set, an arrow leaves the drawing with this label */
  exit?: string;
};

/** Top to bottom, as drawn in the exploded view */
export const layers: Layer[] = [
  { id: "A", name: "Application", text: "Zypp Pay, or an app on the Zypp SDK" },
  { id: "B", name: "Offline protocol", text: "Passes signed transfers between devices" },
  { id: "C", name: "Local ledger", text: "Balances and pending entries, on the device" },
  { id: "D", name: "Key store", text: "Tamper-resistant, signs transfers" },
];

export const steps: Step[] = [
  {
    id: "sign",
    n: "1",
    title: "Sign",
    text: "The sender’s device signs the transfer with a key held in tamper-resistant storage.",
    layers: ["D"],
    actsOn: "D Key store",
  },
  {
    id: "exchange",
    n: "2",
    title: "Exchange",
    text: "The signed transfer is passed directly to the recipient’s device. [transport to confirm]",
    layers: ["B"],
    actsOn: "B Offline protocol",
  },
  {
    id: "verify",
    n: "3",
    title: "Verify",
    text: "The recipient’s device checks the signature and the balance against its local ledger.",
    layers: ["C"],
    actsOn: "C Local ledger",
  },
  {
    id: "reconcile",
    n: "4",
    title: "Reconcile",
    text: "When either device reconnects, the transfer is submitted and settles on Solana, in stablecoin. [to confirm]",
    layers: ["B"],
    actsOn: "B Offline protocol, then Solana",
    exit: "To Solana",
  },
];

export const specRows: { label: string; value: string }[] = [
  { label: "Signing", value: "On the sender’s device, with a key held in tamper-resistant storage" },
  { label: "Verification", value: "Against the local ledger on the recipient’s device" },
  { label: "Network", value: "Not required for stages 1 to 3" },
  { label: "Settlement", value: "Solana, on stablecoin rails" },
  { label: "Limits", value: "Up to 90 days of local ledger entries" },
];