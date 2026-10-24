# SEO/AEO Audit (Phase 0)

## Stack detection
- Framework: Next.js 16.4.2 (App Router)
- Styling: Tailwind CSS v4
- Animation: Motion v14, GSAP v3
- Hosting: Vercel (based on config)
- React: 19.3.0

## Routes (current)
- / (home) - app/page.tsx

## Current metadata (app/layout.tsx)
- title.default: "Zypp Labs − Payments that work offline"
- title.template: "%s − Zypp Labs"
- description: "Zypp Labs is a research and engineering lab building offline-capable payment infrastructure for banks, fintechs and wallets."
- Issues:
  - Description differs from required exact default: "Zypp Labs is a research and engineering company building offline-capable payment infrastructure." (says "lab" not "research and engineering company", adds "for banks, fintechs and wallets")
  - Title differs from required: "Zypp Labs - Engineering Offline-Capable Payments"
  - Missing metadataBase, canonical, OG/Twitter, icons, manifest
  - Missing lang enforcement, locale, etc.

## Motion/animation concerns
- Hero uses motion/react animations
- Footer uses motion animations
- Need to check if animations hide/delay text on server HTML (initial opacity:0/transform on H1/hero/LCP)
- "use client" boundaries exist but content should still be server-renderable where possible

## Existing assets
- public/favicon.ico exists
- No public/og/, no public/icons/ (need to create structure)
- No robots.ts, sitemap.ts, manifest
- No llms.txt, security.txt

## Banned terms check
- Scanned app/, components/ - no "Zypp Protocol", "Arcium", "DropFi" found
- "startup" etc not found

## Social links in footer
- X/Twitter: "#" (placeholder)
- LinkedIn: "#" (placeholder)
- GitHub: "#" (placeholder)
- Legal: Privacy policy "#", Cookie policy "#", Terms of service "#"

## Paper links
- Research section has href="#" for both papers
