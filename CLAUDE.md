# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo contains two things:

1. **`src/` — Legacy static site** (Parcel + Pug + UIkit + SCSS). This is the old site, archived for reference only. Do not develop against it. The deploy script in `package.json` is outdated and points to the wrong server.

2. **`wp-content/themes/hello-elementor-child/` — Active WordPress child theme** running at `https://anytime24hour.com` on Bluehost (`anytimk4@173.254.104.88`). This is the only code that matters for the live site.

3. **`docs/` — Project documentation** including design spec, implementation plans, and Rebecca's handoff guides.

## The Business

**A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC**
- Phone: 800-646-1307 | Email (public): operations@anytime24hour.com | Admin: anytime24hour@gmail.com
- Mobile service area business — techs dispatch from home to customer location
- Techs based in: College Park (Metro Atlanta), Forsyth (Middle Georgia), Macon (Middle Georgia)
- Vehicles served: tractor-trailers, box trucks, RVs, buses. **No passenger vehicles. No light trucks.**
- Owner: Richard "Dick" Holden — Vietnam veteran, U.S. Army Major (Ret.), Silver Star ×2, Purple Heart
- Site maintainer after handoff: Rebecca (granddaughter, law background, non-developer)

## Active WordPress Stack

- **Host:** Bluehost shared hosting, cPanel (`anytimk4@173.254.104.88`)
- **Theme:** Hello Elementor Child (this repo) → deployed to `public_html/wp-content/themes/hello-elementor-child/`
- **Page builder:** Elementor Pro — all pages built visually, content stored in WordPress database
- **SEO:** RankMath (free) — handles LocalBusiness schema, FAQPage schema, sitemap
- **Cache:** LiteSpeed Cache
- **Backups:** UpdraftPlus → Google Drive (weekly)
- **Security:** Wordfence

## Child Theme Files

`wp-content/themes/hello-elementor-child/style.css` — D1 design system. All CSS variables, component classes, and Elementor overrides. When editing, upload to server via cPanel File Manager or SCP:
```bash
scp -r wp-content/themes/hello-elementor-child/ anytimk4@173.254.104.88:public_html/wp-content/themes/
```

`wp-content/themes/hello-elementor-child/functions.php` — Two hooks:
1. Enqueues the child stylesheet
2. Injects LocalBusiness + ServiceArea JSON-LD schema into `<head>` on every page

## D1 Design System

Brand direction: Dark Highway + Veteran Badge

| Token | Value | Usage |
|---|---|---|
| `--d1-bg` | `#111111` | Page background |
| `--d1-bg-alt` | `#0d0d0d` | Alternate sections |
| `--d1-orange` | `#FF6B00` | Primary accent, CTAs |
| `--d1-gold` | `#C9A84C` | Veteran badge only |
| `--d1-white` | `#ffffff` | Headings |
| `--d1-mid` | `#aaaaaa` | Body text |
| `--d1-dark` | `#555555` | Muted text |

Global colors and fonts are also configured in Elementor Site Settings. Always use global tokens — never hardcode hex values in Elementor widgets.

Key CSS classes defined in `style.css` and Elementor Global CSS:
- `.veteran-badge` — gold bordered badge for "★ Veteran Owned"
- `.medal-badge` — gold tinted badge for military decorations
- `.panel-cell` — instrument panel service card with scan-line texture + hover
- `.gauge-ring` — circular indicator inside panel cells
- `.section-eyebrow` — orange uppercase label with leading line
- `.phone-cta-box` — orange-bordered phone number CTA container
- `.ghost-bg-text` — large faint background text (absolute positioned)
- `.area-list-item` — service area list item with orange dot
- `.vehicle-scope-note` — orange left-bordered callout box

## Elementor Build Rules

1. **Minimize HTML widgets** — use native Elementor widgets (Heading, Text Editor, Button, Image) for all editable content. HTML widgets only for structural/decorative elements Rebecca will never touch.
2. **Always use Global Colors and Fonts** — never hardcode hex values or font names in widget style settings.
3. **Use CSS classes for repeated styles** — define in Elementor → Custom CSS (global), apply via Advanced → CSS Classes field.
4. **Element-level custom CSS** requires `selector { }` wrapper — bare properties cause a parse error.
5. Rebecca must be able to update phone numbers, text content, and images without touching HTML or CSS.

## Site Architecture

```
/ (Home) — built in Elementor, all 8 sections complete
├── /services — landing page
│   ├── /services/brakes
│   ├── /services/electrical
│   ├── /services/engine
│   ├── /services/air-system
│   ├── /services/trailers
│   ├── /services/axle-suspension
│   ├── /services/cooling-system
│   ├── /services/fuel-system
│   ├── /services/driveline
│   ├── /services/wheels-tires
│   └── /services/dot-inspection
├── /service-areas — landing page
│   ├── /service-areas/metro-atlanta
│   ├── /service-areas/macon
│   ├── /service-areas/forsyth
│   └── /service-areas/middle-georgia
├── /about
├── /faq — FAQPage schema, critical for AEO
└── /contact
```

## Key Docs

- `docs/superpowers/specs/2026-05-09-website-rebuild-design.md` — approved design spec
- `docs/superpowers/plans/2026-05-09-wordpress-site-build.md` — implementation plan
- `docs/superpowers/plans/2026-05-09-gbp-optimization.md` — Google Business Profile plan (independent)
- `docs/post-launch-upgrades.md` — future improvements backlog
- `docs/handoff/` — Rebecca's maintenance guides (website, GBP, break-glass)
- `docs/legacy-backup/` — snapshot of old static site before WordPress install

## SEO Notes

- Schema: LocalBusiness + AutoRepair (`AutoRepair` is closest Schema.org type; no TruckRepair type exists). Description explicitly states "No passenger vehicles."
- All copy must say "commercial truck repair", "heavy-duty truck repair", or "tractor-trailer repair" — never "auto repair"
- FAQPage schema on `/faq` is the primary AEO lever (feeds Google AI Overview, ChatGPT, Perplexity)
- Service area pages are the primary local SEO lever — each city ranks independently
- Sitemap submitted to Google Search Console; key pages already requested for indexing
