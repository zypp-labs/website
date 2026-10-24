# SEO/AEO Implementation - Zypp Labs

## What was implemented
- [ ] Technical SEO (metadata, canonical, robots, sitemap, headers, security.txt)
- [ ] Structured data (JSON-LD)
- [ ] AEO/GEO (About section, FAQ, llms.txt)
- [ ] Trust elements (Privacy/Terms links, contact)
- [ ] Tracking/checks

## Branch
seo-aeo-implementation

## Canonical entity sentence (must remain identical)
"Zypp Labs is a research and engineering company building offline-capable payment infrastructure."

## Placeholders still to fill (env vars)
- NEXT_PUBLIC_BING_VERIFICATION_CODE (optional)
- NEXT_PUBLIC_GSC_VERIFICATION (do NOT add if already set elsewhere - preserve existing)

## Missing owner-supplied image files
Check public/og/ and public/icons/:
- /public/og/og-default.png (1200x630, <300KB) - **MISSING** (owner to supply)
- /public/icons/favicon.ico (48x48 multi-size) - **MISSING** (owner to supply)
- /public/icons/icon.svg - **MISSING** (owner to supply)
- /public/icons/apple-icon.png (180x180) - **MISSING** (owner to supply)
- /public/icons/icon-192.png - **MISSING** (owner to supply)
- /public/icons/icon-512.png - **MISSING** (owner to supply)
- /public/icons/icon-512-maskable.png (optional) - **MISSING**

Note: app/favicon.ico exists currently - will need to be replaced/wired properly per owner assets.

## Copy needing owner review
- About Zypp Labs section (40-80 words) - to be added
- FAQ section (6-8 items) - to be added
- llms.txt content
- Team display (Udoka, Ram) - pending confirmation
- SDK docs URL confirmation (https://idea.zypp.fun)
- Paper link confirmation
- Contact emails placement

## Removals (check for banned terms/routes)
- [ ] Scan for "Zypp Protocol", "Arcium", "DropFi" - none found in current scan
- [ ] Check for old routes to 301

## Post-deploy checklist
- [ ] Submit sitemap in Google Search Console (preserve existing verification)
- [ ] Submit sitemap in Bing Webmaster Tools
- [ ] Request indexing for key pages
- [ ] Set up IndexNow (if implemented)
- [ ] Re-scrape link previews on X and Telegram
- [ ] Monitor coverage in GSC
- [ ] Monitor AI-referral traffic (chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot.microsoft.com)
- [ ] Test social cards (Facebook Sharing Debugger, LinkedIn Post Inspector, Telegram)
- [ ] Run Lighthouse mobile audit
- [ ] Validate JSON-LD with Schema.org validator

## Owner Review Items
1. About Zypp Labs section text (components/sections/AboutZypp.tsx)
2. FAQ answers - verify all facts match exactly
3. Team display - decision needed on showing Udoka/Ram
4. SDK docs URL (https://idea.zypp.fun) - confirm
5. Paper link (Google Drive) - confirm accessibility
6. Social profile URLs - confirm @use_zypp on X
7. Contact emails - placement and usage
8. OG image and all icon files in public/og/ and public/icons/

## Technical Notes
- JSON-LD added to home page with Organization, WebSite, WebPage, MobileApplication, SoftwareApplication, SoftwareSourceCode, ScholarlyArticle
- llms.txt served at /llms.txt
- security.txt at /.well-known/security.txt
- robots.txt and sitemap.xml served via route handlers
- Canonical entity sentence used identically in metadata, JSON-LD, llms.txt, and About section
- All banned terms avoided
- No app store/download links added
- No licensing/regulation claims added
