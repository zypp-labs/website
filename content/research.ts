export type ResearchReport = {
  slug: string;
  type: "Whitepaper" | "Protocol" | "Security";
  title: string;
  line: string;
  abstract?: string;
  summary?: string;
  status?: string;
  datePublished?: string;
  dateLabel?: string;
  authors?: string[];
  href: string;
  external?: boolean;
  featured?: boolean;
  sections?: Array<{
    id: string;
    heading: string;
    paragraphs: string[];
  }>;
};

export const reports: ResearchReport[] = [
  {
    slug: "dtn-solana-offline-payments",
    type: "Whitepaper",
    title: "Delay Tolerant Networking and Solana Transaction Propagation",
    line: "for Offline-First Payments",
    abstract:
      "Describes how two devices can exchange value with no network, and how the ledger stays consistent once they reconnect. Released March 2026 by Zypp Labs.",
    summary:
      "Describes how two devices can exchange value with no network, and how the ledger stays consistent once they reconnect. Released March 2026 by Zypp Labs.",
    dateLabel: "March 2026",
    authors: ["Zypp Labs"],
    href: "https://drive.google.com/file/d/1USGGqEICwqUAfm-by6JwF4vrbQPbVdvU/view",
    external: true,
    featured: true,
  },
  {
    slug: "threat-model-d2d-payments",
    type: "Security",
    title: "Threat model for device-to-device payments",
    line: "and the controls that contain each",
    abstract:
      "This paper sets out how an offline payment between two devices can be attacked and which controls contain each attack. It covers double spending, replay, forgery, key theft, ledger tampering, relay attacks and settlement conflicts, and it states plainly what offline payments cannot prevent and can only limit.",
    summary:
      "Maps the attacks that matter when no server is watching, and the on-device controls that contain each one.",
    status: "published",
    datePublished: "2026-10",
    dateLabel: "October 2026",
    authors: ["Zypp Labs"],
    href: "#",
    external: false,
    featured: true,
    sections: [
      {
        id: "scope",
        heading: "Scope and approach",
        paragraphs: [
          "Offline payments move the moment of trust. In an online system, a server checks every payment before the receiver is told it worked. In an offline system, the receiver's device decides on its own, and the check against shared state happens later. Every threat in this paper follows from that one change.",
          "This paper describes the threat model and control objectives for device-to-device payments of the kind Zypp Pay and the Zypp SDK are designed for. It is a statement of design requirements. It is not a security audit, a certification, or a guarantee that any deployment is free of the weaknesses described here.",
          "The structure is simple. We describe the system, name the adversaries, list what must be protected, then walk through each threat with the control that contains it. We end with the risks that remain and the questions still open. Controls are written as requirements: what a sound design must enforce, so that readers can judge any implementation against them.",
        ],
      },
      {
        id: "system-model",
        heading: "System model",
        paragraphs: [
          "We model four components. The application, either Zypp Pay or an app built on the Zypp SDK, drives the user experience. The offline protocol carries signed transfers between devices. The local ledger holds balances and pending entries on each device. The key store holds the signing key in tamper-resistant storage and signs transfers on request.",
          "A payment has four stages. First, the sender's device signs the transfer. Second, the signed transfer is passed directly to the recipient's device. Third, the recipient's device checks the signature and the balance against its local ledger. Fourth, when either device reconnects, the transfer is submitted and settles on Solana in stablecoin. Stages one to three need no network. Only stage four does.",
          "Two terms matter for the rest of the paper. A transfer is pending when the recipient's device has accepted it but settlement has not happened. It is settled when it is final on the network. The gap between these states is the offline window, and it is where nearly every threat lives.",
          "The model does not depend on which short-range channel carries the exchange. We assume that channel can be observed, delayed, replayed and modified by anyone nearby, and we place no trust in it.",
        ],
      },
      {
        id: "adversaries",
        heading: "Adversaries",
        paragraphs: [
          "The dishonest sender holds a legitimate key and a real balance. They want to spend the same value more than once, or spend value they do not have.",
          "The dishonest recipient wants to claim a payment twice, claim more than was sent, or dispute a payment that was valid.",
          "The nearby attacker can observe, record, delay, replay and alter messages on the exchange channel, and can sit between two devices. They cannot break standard cryptographic primitives.",
          "The device thief or finder has physical possession of a device and time to work on it. The malicious software runs on the device alongside the application, possibly with elevated privileges, and may try to call the signing function or read the ledger. The network-side attacker acts at reconnection, by flooding submissions, reordering them, or submitting stale ones.",
          "We do not model a compromised settlement network or a break in the underlying signature scheme. Those are outside the scope of this document.",
        ],
      },
      {
        id: "security-goals",
        heading: "What must be protected",
        paragraphs: [
          "Six properties matter. Integrity of funds means value is not created, duplicated or redirected. Correct balances means each device's ledger matches what the user is actually entitled to. Key secrecy means the signing key never leaves its protected store. Availability means a legitimate payment can complete with no network, and a failed one fails clearly. Privacy means the exchange reveals no more than it must to nearby observers. Auditability means that after the fact, every transfer can be traced to a signed, verifiable record.",
        ],
      },
      {
        id: "value-threats",
        heading: "Threats to the value of a transfer",
        paragraphs: [
          "Double spending. This is the central threat. A sender with a balance of 100 signs two transfers of 100 to two different recipients while both are offline. Each recipient checks their own ledger, sees nothing in conflict, and accepts. Neither can know about the other until reconnection. This cannot be fully prevented without a shared source of truth, which is exactly what is absent offline, so the controls aim to bound and detect it rather than claim it away.",
          "The controls are layered. Exposure caps limit how much value a device can spend or receive while offline, so the worst case has a known ceiling. Local spend accounting makes the sender's own device track and refuse to exceed its offline balance, which stops honest mistakes and unsophisticated attackers. Where the platform allows it, the spend counter is kept in protected hardware so that rolling it back is hard. A fixed, public rule decides which of two conflicting transfers settles, so outcomes are predictable. Finally, where the product allows, tying a sender's identity to their offline balance gives a proven double spend a cost.",
          "Replay. A nearby attacker records a valid signed transfer and sends it again, either to the same recipient or to a different one. Every transfer must carry a unique identifier and the identity of the recipient it was signed for, all covered by the signature. Receivers keep a record of accepted identifiers and reject repeats, a transfer signed for one recipient is invalid for any other, and at settlement each identifier can be used only once.",
          "Forgery and modification. An attacker alters the amount or recipient in transit, or invents a transfer outright. The signature must cover every field that has meaning: amount, recipient, identifier and ordering data. Verification happens on the recipient's device before acceptance, and anything that fails is dropped without changing state. The system uses well-reviewed signature schemes and does not invent its own cryptography.",
        ],
      },
      {
        id: "key-and-device-threats",
        heading: "Threats to keys and devices",
        paragraphs: [
          "Key extraction. If the signing key leaves the device, anyone can spend the user's funds. The key must be generated and stored in tamper-resistant storage and never exported, and signing must happen inside that boundary. Use of the key requires user authentication, so a thief holding an unlocked screen still faces a gate at the moment of signing. Keys are bound to the device, so a copy of the app's data on another phone is useless. Where a device offers weak or no tamper-resistant storage, the system treats it as lower trust and lowers its limits.",
          "Ledger tampering and rollback. The local ledger is the receiver's only basis for accepting a payment, so changing it matters. A user might edit their own balance upward, or restore an older backup to undo a spend. Ledger entries must be authenticated so edits are detected, and a monotonic counter, or an equivalent protected value, must make rollback detectable. When the integrity check fails, the device stops accepting and spending offline and prompts the user to reconnect and reconcile. Because settlement is the final authority, a tampered local ledger can cause a rejected transfer but cannot create real value.",
          "Malicious software. Malware that can call the signing function can sign what the user never approved. Signing requires explicit, per-transfer confirmation that shows the amount and recipient, using a trusted display path where the platform offers one, rather than a long-lived unlock. Signing is rate limited, and rooted or tampered environments get reduced limits or no offline use. A fully compromised device can lie to its user, so the aim here is to contain loss through caps, not to make compromise impossible.",
          "Clock manipulation. An offline device cannot trust the network clock. A user might set the clock back to extend an expiry, or forward to disturb ordering. Security decisions must not rely on wall-clock time. Ordering uses monotonic counters and sequence numbers, time is treated as advisory, and any expiry is based on counters or the last trusted sync. When sync is stale, the allowed offline duration shrinks.",
        ],
      },
      {
        id: "exchange-threats",
        heading: "Threats to the exchange",
        paragraphs: [
          "Relay and wrong recipient. A relay attack forwards messages between two honest devices that are far apart, so a payment seems to happen in one place while the funds go elsewhere. A nearby attacker may also present themselves as the intended recipient. The transfer must be bound to a specific recipient chosen by the sender and shown to them before signing, by name or verified identifier and not only a device handle. The recipient confirms what it received, and a transfer to an unconfirmed recipient is not signed.",
          "Eavesdropping and tracking. Nearby observers can see messages and may later link them to people. The exchange channel must be encrypted between the two devices, messages carry only the data they need, and long-lived identifiers that would let a passer-by track a device from place to place are avoided. Settlement on a public network exposes more than the exchange does, and this paper treats that as a separate privacy question.",
          "Flooding at the exchange. An attacker sends a device many fake transfers to drain its battery, fill its storage, or block a real payment. Cheap checks run first, so malformed messages are dropped before expensive work. Queues and the number of pending entries per peer are bounded, and a failure is reported clearly so the user can retry.",
        ],
      },
      {
        id: "settlement-threats",
        heading: "Threats at settlement",
        paragraphs: [
          "Pending treated as final. A recipient hands over goods after seeing a received screen, then the transfer fails at settlement because it was a double spend. The loss falls on the recipient, and this is the practical face of the double-spend risk. The interface must show pending clearly and never as final. Recipients, especially merchants, need guidance and limits on what to accept offline at a given amount, and higher-value acceptance can require a connection first. The exposure caps described earlier bound the loss on any single transaction.",
          "Flooding and reordering at reconnection. When many devices reconnect, an attacker can submit stale transfers, reorder them, or flood the submission path. Submissions must be idempotent, so sending the same transfer twice is harmless. Each transfer is validated on its own signed content, independent of arrival order, and conflicts follow the fixed rule described earlier. Submission is queued and rate limited so a flood does not block honest users.",
          "Partial reconciliation. A device that reconnects briefly, or fails midway, can leave entries in an unclear state. Every entry must have a defined state, such as pending, submitted, settled or rejected, with only the allowed transitions between them, so the device can safely resume from any point. A rejected transfer produces a clear reason and a path to resolve it.",
        ],
      },
      {
        id: "residual-risk",
        heading: "Residual risk",
        paragraphs: [
          "Some risks cannot be removed. The first is the one this paper keeps returning to: without a shared source of truth, a determined sender can double spend within the offline window. The controls bound the damage, make the attack detectable, and give it a cost, but they do not make it impossible. Any claim to the contrary should be treated with suspicion, for this system or any other.",
          "The second is device trust. Controls built on tamper-resistant storage are only as strong as the storage on the actual device. Phones differ widely in hardware, so the model assumes that weaker devices get lower limits rather than the same privileges as stronger ones.",
          "The third is human. Users can be tricked into signing a payment, or into accepting a screen that only looks like a received payment. Clear confirmation and a visible pending state reduce this, but social engineering is never fully designed away.",
          "Finally, availability is a trade. Every control that restricts offline spending protects funds and also reduces how useful offline payments are. Setting limits is a judgement between those two, and the right values depend on the market and on what we learn as usage grows.",
        ],
      },
      {
        id: "open-questions",
        heading: "Open questions",
        paragraphs: [
          "Several questions remain open. How should exposure caps adapt to device trust and a user's history? How can the system establish which of two conflicting transfers came first when clocks cannot be trusted? How can a recipient get stronger assurance for a higher-value offline payment without a network? What recovery path works for a user who loses a device that holds pending transfers? How can the exchange resist tracking without losing the ability to settle disputes? We expect to refine this model as the system and its evaluation develop.",
        ],
      },
      {
        id: "summary",
        heading: "Summary",
        paragraphs: [
          "Offline payments do not remove the need for trust. They move it. The recipient trusts a signature, a local ledger and a bounded risk instead of a live server. This model lists the ways that trust can be attacked and the controls that keep each failure small, detectable and recoverable.",
          "The honest summary is that a well-built offline payment system cannot promise that no one will ever try to double spend. It can promise that the attempt has a ceiling on its payoff, leaves evidence, and is settled by a rule everyone can read in advance.",
        ],
      },
    ],
  },
];

export function getReportBySlug(slug: string) {
  return reports.find((r) => r.slug === slug);
}

export function getFeaturedReports() {
  return reports.filter((r) => r.featured);
}
