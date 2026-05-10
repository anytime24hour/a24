# Website Rebuild Design Spec
**A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC**
Date: 2026-05-09
Status: Approved for implementation planning

---

## 1. Project Overview

### Business
- **Company:** A Anytime Anywhere 24 Hour Mobile Truck & Trailer Repair of Georgia, LLC
- **URL:** https://anytime24hour.com
- **Phone:** 478-994-8554
- **Email:** operations@anytime24hour.com
- **Founded:** 1981, Macon, Georgia
- **Owner:** Richard "Dick" Holden — U.S. Army Ret. Major, Vietnam veteran, Silver Star (×2), Bronze Star (Valor), Purple Heart, Vietnamese Cross of Gallantry
- **Service type:** Mobile service area business — techs dispatch from home directly to customer location
- **Service area:** Metro Atlanta and Middle Georgia (McDonough to Dublin, Milledgeville to Perry, Forsyth and surrounding counties)
- **Vehicles served:** Tractor-trailers, box trucks, RVs, buses. **No passenger vehicles. No light trucks.**

### Goals
1. Convert to a platform Rebecca (granddaughter) can maintain without developer help
2. Radically improve local SEO, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization)
3. Modernize branding while honoring Dick's military background and company legacy

### Constraints
- Must run on existing Bluehost shared hosting (cPanel)
- Maintainer (Rebecca) is computer-comfortable, law background, not a developer
- No hard timeline — quality over speed

---

## 2. Platform Decision

**WordPress (self-hosted on Bluehost) + Elementor Pro**

Rationale:
- Stays on existing Bluehost hosting — no migration cost or hosting change
- Elementor Pro gives Rebecca true drag-and-drop editing with no code required
- Best-in-class SEO plugin ecosystem (RankMath) handles all schema markup automatically
- Massive community — YouTube tutorial exists for every common task
- Full control over page structure, schema, and local SEO landing pages (not possible on Squarespace/Wix)

### Theme
**Hello Elementor (free)** — blank canvas theme built by the Elementor team. No pre-baked design to fight; everything built from scratch in the D1 palette.

### Plugin Stack

| Plugin | Purpose | Cost |
|---|---|---|
| Elementor Pro | Page builder — drag-and-drop editing for Rebecca | ~$59/yr |
| RankMath SEO | Meta tags, schema markup, sitemap, local SEO | Free (Pro optional) |
| LiteSpeed Cache | Server-level caching on Bluehost — Core Web Vitals improvement | Free |
| UpdraftPlus | Automatic weekly backups to Google Drive | Free |
| Wordfence Security | Firewall, malware scanner — runs silently | Free |
| Reviews Feed Pro | Auto-pulls Google Business Profile reviews onto site | ~$40/yr (optional) |

**Annual plugin cost: ~$59–$99/yr**

### Rebecca's Maintenance Routine
- Monthly: Update WordPress core (1 click), update plugins (1 click), verify backup ran
- As needed: Edit text/images/phone numbers in Elementor visual editor
- Break-glass: restore from UpdraftPlus backup; escalate to WordPress developer if needed

---

## 3. Brand Identity

### Direction: D1 — Dark Highway + Veteran Badge

**Palette:**
- Background: Near-black (`#111` / `#0d0d0d`)
- Primary accent: Amber orange (`#FF6B00`)
- Secondary accent: Military gold (`#C9A84C`) — used sparingly for veteran badge only
- Text: White (`#fff`) / Mid-gray (`#aaa`) / Dark-gray (`#555`)

**Typography:** Bold, condensed sans-serif. Heavy weight headings. All-caps labels with wide letter-spacing.

**Tone:** Direct. Commanding. No marketing fluff. Dick tells it like it is — the copy should too.

**Key brand elements (always present):**
- `★ Veteran Owned & Operated` — tasteful badge, not a patriotic banner
- `Since 1981` — positioned as authority, not nostalgia
- `"Make it home tonight."` — hero tagline; works standalone, no song reference needed
- `8 Days a Week, 30 Hours a Day` — availability tagline

**What's dropped from current site:**
- "Six Days On The Road" song quote and artist credits in footer
- The emotional thread (road, urgency, getting home) stays in the copy tone; the explicit literary reference goes
- "Philosophy" section (was "Under Construction!" — replaced by About page content)

---

## 4. Site Architecture

Multi-page structure. Each page is an independent SEO target.

```
/ (Home)
├── /services
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
├── /service-areas
│   ├── /service-areas/atlanta
│   ├── /service-areas/macon
│   ├── /service-areas/middle-georgia
│   └── /service-areas/[additional cities TBD]
├── /about
├── /faq
├── /contact
└── /blog (Phase 2 — optional)
```

### Homepage Sections (in order)
1. **Hero** — Full viewport, dark background, "Make it home tonight." headline, phone CTA button, veteran badge eyebrow, ghost "1981" background element
2. **Trust Bar** — Since 1981 | ★ Veteran Owned | 24/7/365 | Metro Atlanta + Middle GA
3. **Services** — Instrument panel aesthetic (dark cells with gauge indicators, scan-line texture, status bar). 8 category cards linking to service pages.
4. **About Snippet** — Dick's story, military decoration badges (tasteful), pull quote, link to full About page
5. **Service Area** — Google Map + city list, "We come to you" framing
6. **Reviews** — Auto-updating Google Business Profile reviews via Reviews Feed plugin
7. **Final CTA** — Dark background, orange-bordered phone number box, ghost "24HR" background text. **Not solid orange.**
8. **Footer** — Nav links, copyright (current year — auto-updating), `★ Veteran Owned & Operated Since 1981` badge

### Navigation
- Sticky top nav, dark background
- Logo left, nav links center, `★ Veteran Owned` badge + phone CTA button right
- Phone number always visible in nav

---

## 5. SEO / GEO / AEO Strategy

### Layer 1 — On-Page SEO
- Every page has a unique `<title>` and `<meta description>` targeting a specific keyword
- Service area pages are the primary local SEO lever — each city gets its own page
- "Auto repair" is scrubbed from all copy. All references are "commercial truck repair," "heavy-duty truck repair," or "tractor-trailer repair"
- The explicit "No passenger vehicles. No light trucks." statement appears on the site to set expectations and improve search relevance

**Target keyword examples:**
- `/service-areas/atlanta` → "mobile truck repair Atlanta GA"
- `/service-areas/macon` → "24 hour truck repair Macon Georgia"
- `/services/dot-inspection` → "DOT inspection commercial truck Georgia"
- `/faq` → long-tail question-based keywords

### Layer 2 — Schema Markup (via RankMath)

| Schema Type | Applied To | Purpose |
|---|---|---|
| `LocalBusiness` + `AutoRepair`* | All pages | Identifies business type, location, phone, hours |
| `ServiceArea` | Homepage + service area pages | Defines coverage as mobile SAB, not fixed location |
| `FAQPage` | `/faq` | Feeds AI answer engines (ChatGPT, Perplexity, Google AI Overview) |
| `Service` | Individual service pages | Links specific services to the business entity |

*`AutoRepair` is the closest Schema.org type; no `TruckRepair` type exists. The `description` field explicitly states: *"Mobile heavy-duty truck and trailer repair serving Metro Atlanta and Middle Georgia — tractor-trailers, box trucks, RVs, and buses. No passenger vehicles."*

### Layer 3 — Google Business Profile (separate work stream)

**Current state:** Listing exists but shows only main office address; not configured as Service Area Business; service areas incomplete; likely outdated.

**Required changes:**
1. Set up as **Service Area Business** — hide physical address, define service areas by city/region
2. Add all applicable Google Business categories (Primary: Truck Repair Shop; Secondary: Mobile Mechanic, Diesel Engine Repair Service, etc.)
3. Add photos: truck/equipment, Dick, the family team, service in action
4. Define business hours accurately (24/7)
5. Build review acquisition workflow: after each job, send customer a direct Google review link via text
6. Set up regular GBP posts (monthly minimum) — Google rewards active profiles

---

## 6. Content Notes

### About Page
- Dick's full biography (already written — move from modal to dedicated page)
- Military service and decorations displayed as styled badges, not wall of text
- Family team section: Benny Heinzelmann, Josh Presley, Julie Presley (CFO), Mrs. Holden
- Company history timeline from 1981

### FAQ Page (AEO Priority)
Seed questions to write with FAQ schema:
- "How fast can you get to me?"
- "What areas of Georgia do you cover?"
- "Do you work on trailers?"
- "Do you do DOT inspections?"
- "Do you work on RVs and buses?"
- "What kinds of trucks do you repair?"
- "Do you work on cars or light trucks?" (Answer: No — explicit)
- "Are you available on weekends and holidays?"
- "How do I request service?"

### Dropped Content
- Song quote ("Oh well, my hometown's a comin' in sight...") — removed
- Footer music credits (Dave Dudley, Charlie Pride, Sawyer Brown) — removed
- Philosophy section (was "Under Construction!") — removed; content absorbed into About

---

## 7. Rebecca Handoff Package

Deliverables to produce alongside the site build:

1. **"How to Update the Website" guide** — Google Doc with screenshots covering: WordPress login, editing text in Elementor, updating phone numbers, adding/replacing photos
2. **Monthly maintenance checklist** — One-page doc: update WordPress, update plugins, verify backup
3. **Break-glass instructions** — Restore from UpdraftPlus backup; escalate path if that fails
4. **Google Business Profile access** — Rebecca added as Manager (not Owner) on GBP
5. **GBP guide** — How to respond to reviews, how to post an update

---

## 8. Out of Scope (Phase 2)

- Blog/content marketing (`/blog`) — high SEO value but high effort; not required for launch
- Online booking / service request form — could be added later via WPForms
- SMS/text-based dispatch integration
- Paid advertising (Google Local Services Ads)
