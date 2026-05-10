# WordPress Site Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild anytime24hour.com as a WordPress + Elementor Pro site with D1 branding, multi-page SEO architecture, and full schema markup — ready for non-technical maintenance by Rebecca Holden.

**Architecture:** WordPress self-hosted on Bluehost (existing cPanel account). Hello Elementor child theme provides the D1 CSS foundation. Elementor Pro builds all pages visually. RankMath handles all schema, meta, and sitemap. The current static Parcel/Pug site is backed up then replaced.

**Tech Stack:** WordPress 6.x, Elementor Pro, Hello Elementor theme + child theme, RankMath SEO (free), LiteSpeed Cache, UpdraftPlus, Wordfence, Google Maps API, Barlow Condensed + Inter (Google Fonts)

---

## Files Created / Modified

| File | Purpose |
|---|---|
| `wp-content/themes/hello-elementor-child/style.css` | D1 design system CSS variables, global overrides, instrument panel styles |
| `wp-content/themes/hello-elementor-child/functions.php` | Enqueue child theme stylesheet |
| `docs/handoff/website-update-guide.md` | Rebecca: how to edit content in Elementor |
| `docs/handoff/maintenance-checklist.md` | Rebecca: monthly WordPress upkeep |
| `docs/handoff/break-glass.md` | Rebecca: what to do if something breaks |
| `docs/handoff/gbp-guide.md` | Rebecca: how to respond to reviews, post updates |

---

## Phase 1 — Foundation

### Task 1: Back Up Current Static Site

**Files:**
- Archive: `docs/legacy-backup/` (static files from current build)

- [ ] **Step 1: Export current built site**

  SSH into Bluehost or use cPanel File Manager. Download the entire `public_html/` directory as a zip. Save it locally to `docs/legacy-backup/current-site.zip`.

  ```bash
  # From your local machine (uses existing deploy credentials)
  scp -r anytimk4@173.254.104.88:public_html/ docs/legacy-backup/
  ```

- [ ] **Step 2: Commit the backup**

  ```bash
  git add docs/legacy-backup/
  git commit -m "backup: archive current static site before WordPress install"
  ```

---

### Task 2: Install WordPress on Bluehost

- [ ] **Step 1: Log into Bluehost cPanel**

  Navigate to `cpanel.bluehost.com` → sign in → find **Softaculous Apps Installer** → click **WordPress**.

- [ ] **Step 2: Run the installer with these exact settings**

  | Field | Value |
  |---|---|
  | Choose Protocol | `https://` |
  | Choose Domain | `anytime24hour.com` |
  | In Directory | *(leave blank — install at root)* |
  | Site Name | `A Anytime Anywhere 24 Hour Mobile Truck Repair` |
  | Site Description | `Mobile heavy-duty truck and trailer repair — Metro Atlanta & Middle Georgia` |
  | Admin Username | *(choose a strong username — not "admin")* |
  | Admin Password | *(generate strong password — save in password manager)* |
  | Admin Email | `anytime24hour@gmail.com` |
  | Select Language | English |

- [ ] **Step 3: After install, enable maintenance mode immediately**

  Log into WordPress admin (`https://anytime24hour.com/wp-admin`). Go to **Plugins → Add New** → search "LightStart" → Install & Activate. Go to **Settings → LightStart** → enable **Maintenance Mode**. This shows a "Coming Soon" page to visitors while you build.

- [ ] **Step 4: Verify**

  Open a private/incognito browser window and navigate to `https://anytime24hour.com`. You should see the maintenance/coming soon page.

  Log into `https://anytime24hour.com/wp-admin` — you should reach the WordPress dashboard.

---

### Task 3: Install and Activate All Plugins

- [ ] **Step 1: Install plugins via Dashboard → Plugins → Add New**

  Search and install each of the following (do not activate yet):

  | Plugin | Search Term |
  |---|---|
  | Elementor | `Elementor Website Builder` |
  | Hello Elementor | *(installed with theme — skip)* |
  | RankMath SEO | `Rank Math SEO` |
  | LiteSpeed Cache | `LiteSpeed Cache` (already installed in Task 2) |
  | UpdraftPlus | `UpdraftPlus WordPress Backup Plugin` |
  | Wordfence Security | `Wordfence Security` |

- [ ] **Step 2: Activate all plugins**

  Dashboard → Plugins → Installed Plugins. Activate each plugin in this order: LiteSpeed Cache → UpdraftPlus → Wordfence → RankMath → Elementor.

- [ ] **Step 3: Install Elementor Pro**

  Purchase Elementor Pro at `elementor.com` if not already done. Download the `.zip` file. In WordPress admin: Plugins → Add New → Upload Plugin → choose the `.zip` → Install → Activate. Connect your license key when prompted.

- [ ] **Step 4: Install Hello Elementor theme**

  Dashboard → Appearance → Themes → Add New → search "Hello Elementor" → Install → Activate.

- [ ] **Step 5: Verify**

  Dashboard → Plugins. Confirm all plugins show "Active" status. Dashboard → Appearance → Themes. Confirm "Hello Elementor" shows as active theme.

---

### Task 4: Create Hello Elementor Child Theme

**Files:**
- Create: `wp-content/themes/hello-elementor-child/style.css`
- Create: `wp-content/themes/hello-elementor-child/functions.php`

- [ ] **Step 1: Create the child theme directory**

  Via Bluehost cPanel → File Manager → navigate to `public_html/wp-content/themes/` → New Folder → name it `hello-elementor-child`.

- [ ] **Step 2: Create `style.css`**

  Inside `hello-elementor-child/`, create `style.css` with this exact content:

  ```css
  /*
  Theme Name: Hello Elementor Child
  Template: hello-elementor
  Version: 1.0.0
  Description: D1 Dark Highway design system for A Anytime Anywhere
  */

  /* ── D1 Design System Variables ── */
  :root {
      --d1-bg:        #111111;
      --d1-bg-alt:    #0d0d0d;
      --d1-orange:    #FF6B00;
      --d1-gold:      #C9A84C;
      --d1-white:     #ffffff;
      --d1-mid:       #aaaaaa;
      --d1-dark:      #555555;
      --d1-border:    rgba(255, 255, 255, 0.07);
  }

  html, body {
      background-color: var(--d1-bg) !important;
      color: var(--d1-white);
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: var(--d1-orange); border-radius: 0; }

  /* ── Links ── */
  a { color: var(--d1-orange); }
  a:hover { color: #ff8c3a; text-decoration: none; }

  /* ── Elementor nav overrides ── */
  .elementor-nav-menu a,
  .elementor-nav-menu--main .elementor-item {
      color: var(--d1-mid) !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      font-size: 0.72rem !important;
  }
  .elementor-nav-menu a:hover,
  .elementor-nav-menu--main .elementor-item:hover {
      color: var(--d1-orange) !important;
  }

  /* ── Veteran badge ── */
  .veteran-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.58rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--d1-gold);
      border: 1px solid rgba(201, 168, 76, 0.4);
      padding: 0.15rem 0.45rem;
  }

  /* ── Military decoration badges ── */
  .medal-badge {
      display: inline-flex;
      font-size: 0.65rem;
      background: rgba(201, 168, 76, 0.08);
      border: 1px solid rgba(201, 168, 76, 0.28);
      color: var(--d1-gold);
      padding: 0.2rem 0.5rem;
      letter-spacing: 0.08em;
      margin: 0.15rem;
  }

  /* ── Trust bar dividers ── */
  .trust-bar-item {
      border-right: 1px solid var(--d1-border);
  }
  .trust-bar-item:last-child { border-right: none; }

  /* ── Instrument panel: scan-line texture ── */
  .panel-cell {
      background-color: #141414;
      position: relative;
      transition: background-color 0.15s, border-color 0.15s;
  }
  .panel-cell::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 3px,
          rgba(255, 255, 255, 0.012) 3px,
          rgba(255, 255, 255, 0.012) 4px
      );
      pointer-events: none;
      z-index: 0;
  }
  .panel-cell:hover { background-color: #1a1a1a; }
  .panel-cell > * { position: relative; z-index: 1; }

  /* ── Instrument panel: gauge ring ── */
  .gauge-ring {
      width: 40px;
      height: 40px;
      border: 2px solid #2d2d2d;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.65rem;
      transition: border-color 0.15s;
      font-size: 0.9rem;
      color: var(--d1-dark);
  }
  .panel-cell:hover .gauge-ring {
      border-color: var(--d1-orange);
      color: var(--d1-orange);
  }

  /* ── Instrument panel: status bar ── */
  .panel-statusbar {
      background: #0f0f0f;
      border-top: 1px solid #222222;
      padding: 0.65rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.62rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--d1-dark);
  }
  .panel-statusbar .status-indicator::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      background: var(--d1-orange);
      border-radius: 50%;
      margin-right: 0.4rem;
      vertical-align: middle;
  }
  .panel-statusbar .view-all {
      color: var(--d1-orange);
      cursor: pointer;
  }

  /* ── Ghost background text ── */
  .ghost-bg-text {
      position: absolute;
      font-size: 18vw;
      font-weight: 900;
      color: rgba(255, 107, 0, 0.04);
      white-space: nowrap;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      pointer-events: none;
      user-select: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
  }

  /* ── Phone CTA box ── */
  .phone-cta-box {
      border: 1px solid rgba(255, 107, 0, 0.3);
      background: rgba(255, 107, 0, 0.06);
      padding: 1.25rem 3rem;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
  }
  .phone-cta-box .cta-label {
      font-size: 0.55rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--d1-orange);
      margin-bottom: 0.3rem;
  }
  .phone-cta-box .cta-number {
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 900;
      color: var(--d1-orange);
      letter-spacing: -0.01em;
      line-height: 1;
  }

  /* ── Section eyebrow label ── */
  .section-eyebrow {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.6rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--d1-orange);
      margin-bottom: 0.5rem;
  }
  .section-eyebrow::before {
      content: '';
      width: 24px;
      height: 2px;
      background: var(--d1-orange);
      display: inline-block;
      flex-shrink: 0;
  }

  /* ── Featured panel cell (DOT Inspection) ── */
  .panel-cell-featured {
      border: 1px solid rgba(255, 107, 0, 0.25) !important;
  }
  .panel-cell-featured .gauge-ring {
      border-color: rgba(255, 107, 0, 0.4);
      color: var(--d1-orange);
  }

  /* ── Service area map section ── */
  .area-list-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 0;
      border-bottom: 1px solid var(--d1-border);
      font-size: 0.85rem;
      color: var(--d1-mid);
  }
  .area-list-item::before {
      content: '';
      width: 6px;
      height: 6px;
      background: var(--d1-orange);
      border-radius: 50%;
      flex-shrink: 0;
  }

  /* ── No-auto-repair callout ── */
  .vehicle-scope-note {
      background: rgba(255, 107, 0, 0.06);
      border-left: 3px solid var(--d1-orange);
      padding: 0.85rem 1rem;
      font-size: 0.8rem;
      color: var(--d1-mid);
      margin-top: 1rem;
  }
  ```

- [ ] **Step 3: Create `functions.php`**

  Inside `hello-elementor-child/`, create `functions.php`:

  ```php
  <?php
  add_action( 'wp_enqueue_scripts', function() {
      wp_enqueue_style(
          'hello-elementor-child-style',
          get_stylesheet_directory_uri() . '/style.css',
          [ 'hello-elementor-style' ],
          wp_get_theme()->get( 'Version' )
      );
  } );
  ```

- [ ] **Step 4: Activate the child theme**

  Dashboard → Appearance → Themes → find "Hello Elementor Child" → Activate.

- [ ] **Step 5: Verify**

  Dashboard → Appearance → Themes — confirm child theme is active. Navigate to `https://anytime24hour.com` (still shows maintenance page) — check browser dev tools → Sources → confirm `style.css` from `hello-elementor-child` is loaded.

- [ ] **Step 6: Commit child theme files to repo**

  ```bash
  git add wp-content/themes/hello-elementor-child/
  git commit -m "feat: add Hello Elementor child theme with D1 design system CSS"
  ```

---

### Task 5: Configure Elementor Global Design System

- [ ] **Step 1: Set global colors**

  Dashboard → Elementor → Settings → Style tab. Under **Global Colors**, add these (click "+" for each):

  | Label | Hex |
  |---|---|
  | Background Primary | `#111111` |
  | Background Alt | `#0d0d0d` |
  | Accent Orange | `#FF6B00` |
  | Military Gold | `#C9A84C` |
  | Text Primary | `#ffffff` |
  | Text Secondary | `#aaaaaa` |
  | Text Muted | `#555555` |

- [ ] **Step 2: Set global fonts**

  Same Settings → Style tab → **Global Fonts**:

  | Label | Font | Weights |
  |---|---|---|
  | Primary | Barlow Condensed | 700, 900 |
  | Secondary | Inter | 400, 500 |
  | Text | Inter | 400 |
  | Accent | Inter | 700 |

- [ ] **Step 3: Set default body settings**

  Settings → Style tab:
  - Body Font Family: Inter
  - Body Font Size: 16px
  - Body Font Weight: 400
  - Body Color: `#aaaaaa`
  - Link Color: `#FF6B00`
  - Link Hover Color: `#ff8c3a`

- [ ] **Step 4: Verify**

  Open any page in Elementor editor. In the left panel, confirm global colors and fonts appear in the Style dropdowns.

---

### Task 6: Configure UpdraftPlus Backups

- [ ] **Step 1: Connect Google Drive**

  Dashboard → Settings → UpdraftPlus Backups → Settings tab. Under **Files backup schedule**: Weekly. Under **Database backup schedule**: Weekly. Under **Choose your remote storage**: click Google Drive → Follow OAuth flow to connect your Google account.

- [ ] **Step 2: Run first manual backup**

  UpdraftPlus → Backup/Restore tab → click **Backup Now** (check both "Include your database" and "Include your files") → click **Backup Now**. Wait for completion.

- [ ] **Step 3: Verify**

  UpdraftPlus → Existing Backups tab — you should see a backup entry with today's date. Check Google Drive → a folder named `UpdraftPlus` should appear with zip files inside.

---

### Task 7: Configure Wordfence Security

- [ ] **Step 1: Run setup wizard**

  Dashboard → Wordfence → click **Manage Firewall** → run the Learning Mode setup (takes ~1 week to learn traffic patterns but protection is active immediately).

- [ ] **Step 2: Set alert email**

  Wordfence → All Options → Email Alert Preferences. Set **Alert email address** to `anytime24hour@gmail.com`. Enable: "Alert me when Wordfence is automatically updated", "Alert me if Wordfence is deactivated".

- [ ] **Step 3: Enable auto-updates for Wordfence**

  Wordfence → All Options → General Wordfence Options → enable **Update Wordfence automatically when a new version is released**.

- [ ] **Step 4: Verify**

  Wordfence → Dashboard → confirm Firewall Status shows "Enabled and Protecting".

---

### Task 8: Configure RankMath SEO (Global Settings)

- [ ] **Step 1: Run setup wizard**

  Dashboard → Rank Math → Setup Wizard → choose **Advanced** mode (gives full control). Connect to Google Search Console when prompted (requires Google account with Search Console access for `anytime24hour.com`).

- [ ] **Step 2: Configure Local SEO**

  Rank Math → Titles & Meta → Local SEO tab. Fill in:

  | Field | Value |
  |---|---|
  | Business Name | `A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC` |
  | Business Type | `AutoRepair` |
  | Business Description | `Mobile heavy-duty truck and trailer repair serving Metro Atlanta and Middle Georgia — tractor-trailers, box trucks, RVs, and buses. No passenger vehicles.` |
  | Phone Number | `800-646-1307` |
  | Email | `operations@anytime24hour.com` |
  | Street Address | *(leave blank — service area business)* |
  | City | `Macon` |
  | State | `Georgia` |
  | Zip | *(leave blank)* |
  | Country | `US` |
  | Open 24 Hours | ✓ Enable |
  | Price Range | `$$` |

- [ ] **Step 3: Enable the modules needed**

  Rank Math → Dashboard → Modules. Enable: **Local SEO**, **Schema Markup**, **Sitemap**, **404 Monitor**, **Redirections**.

- [ ] **Step 4: Configure Sitemap**

  Rank Math → Sitemap Settings. Enable sitemap for: Posts, Pages. Disable for: Media. Set **Ping Search Engines** to enabled.

- [ ] **Step 5: Set homepage meta**

  Rank Math → Titles & Meta → Homepage. Set:
  - Title: `24 Hour Mobile Truck Repair Georgia | A Anytime Anywhere`
  - Description: `Mobile heavy-duty truck & trailer repair serving Metro Atlanta and Middle Georgia. Available 24/7. Tractor-trailers, box trucks, RVs, buses. Call 800-646-1307.`

- [ ] **Step 6: Verify**

  Navigate to `https://anytime24hour.com/sitemap_index.xml` — should return an XML sitemap. Run `https://anytime24hour.com` through Google's Rich Results Test (`search.google.com/test/rich-results`) — should detect LocalBusiness schema.

---

## Phase 2 — Global Templates (Header & Footer)

### Task 9: Build Header Template

*Uses Elementor Theme Builder (Pro feature)*

- [ ] **Step 1: Create new header template**

  Dashboard → Templates → Theme Builder → Header → Add New. Name it "Global Header". Set **Display Conditions**: Entire Site.

- [ ] **Step 2: Build the header structure**

  In Elementor editor, create a **1-column section** with these Section settings:
  - Background: Color `#0a0a0a`
  - Border Bottom: 1px solid `rgba(255,107,0,0.2)`
  - Height: 56px
  - Position: Fixed (via Advanced → CSS → `position: sticky; top: 0; z-index: 999;`)
  - Padding: 0 2rem

- [ ] **Step 3: Add logo widget (left column)**

  Add an **Image** widget. Upload the existing `logo-full.svg` from `src/assets/images/`. Set link to Homepage URL. Width: 160px.

- [ ] **Step 4: Add nav menu widget (center column)**

  Add a **Nav Menu** widget. Select the primary menu (create it at Dashboard → Appearance → Menus with: Services, Service Areas, About, FAQ, Contact). In widget Style: apply class `elementor-nav-menu` (already styled in child theme CSS).

- [ ] **Step 5: Add right column (badge + phone button)**

  Add a **Text Editor** widget with this HTML:
  ```html
  <span class="veteran-badge">★ Veteran Owned</span>
  ```

  Add a **Button** widget:
  - Text: `☎ 800-646-1307`
  - Link: `tel:+18006461307`
  - Background: `#FF6B00`
  - Font: Inter 700, uppercase, 0.72rem
  - Padding: 0.45rem 1rem
  - Border Radius: 0px

- [ ] **Step 6: Verify**

  Save template. View site — sticky header should appear on all pages. Verify it stays fixed on scroll.

---

### Task 10: Build Footer Template

- [ ] **Step 1: Create new footer template**

  Templates → Theme Builder → Footer → Add New. Name it "Global Footer". Display Conditions: Entire Site.

- [ ] **Step 2: Build footer structure**

  Three-column section. Background: `#0a0a0a`. Border Top: 1px solid `rgba(255,255,255,0.06)`. Padding: 2rem 4rem.

  **Column 1 (left):** Company name text + copyright shortcode:
  ```html
  <div style="font-size:0.8rem; font-weight:900; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.4rem;">
    A Anytime <span style="color:#FF6B00;">Anywhere</span>
  </div>
  <div style="font-size:0.7rem; color:#444;">
    © [current_year] A Anytime Anywhere 24 Hour Truck Repair of Georgia, LLC.
  </div>
  ```

  Install the **Current Year** shortcode plugin (search "Current Year and Copyright Shortcode") to auto-update the year.

  **Column 2 (center):** Nav Menu widget — same menu as header.

  **Column 3 (right):** Text widget:
  ```html
  <span class="veteran-badge">★ Veteran Owned &amp; Operated Since 1981</span>
  ```

- [ ] **Step 3: Verify**

  Save template. Check footer appears on all pages with current year in copyright.

---

## Phase 3 — Homepage

### Task 11: Create Homepage — Hero Section

- [ ] **Step 1: Open homepage for editing**

  Dashboard → Pages → Home → Edit with Elementor.

- [ ] **Step 2: Create hero section**

  Add a new section. In Section settings:
  - Min Height: 100vh
  - Background: Color `#0a0a0a`
  - Overflow: Hidden
  - Padding: 56px 4rem 3rem (top = nav height)

- [ ] **Step 3: Add ghost "1981" background text**

  Add an **HTML** widget inside the section:
  ```html
  <div class="ghost-bg-text">1981</div>
  ```

- [ ] **Step 4: Add hero eyebrow row**

  Add a **Text Editor** widget:
  ```html
  <div class="section-eyebrow">
    24 Hour Emergency Mobile Service
    <span class="veteran-badge">★ Veteran Owned &amp; Operated</span>
  </div>
  ```

- [ ] **Step 5: Add hero headline**

  Add a **Heading** widget:
  - Text: `Make it home tonight.`
  - Tag: H1
  - Font: Barlow Condensed, 900 weight, size 4rem (desktop) / 2.5rem (mobile)
  - Color: `#ffffff`
  - Line Height: 1.05
  - Letter Spacing: -0.02em

- [ ] **Step 6: Add subheadline**

  Add a **Text Editor** widget:
  ```html
  <p style="font-size:1rem; color:#888888; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:0.75rem;">
    Mobile Truck &amp; Trailer Repair — Georgia
  </p>
  ```

- [ ] **Step 7: Add tagline**

  Add a **Text Editor** widget:
  ```html
  <div style="font-size:1.1rem; color:#cccccc; font-style:italic; border-left:3px solid #FF6B00; padding-left:1rem; margin-bottom:2rem; line-height:1.6;">
    "We come to you. Anytime. Anywhere. Metro Atlanta &amp; Middle Georgia."
  </div>
  ```

- [ ] **Step 8: Add CTA buttons**

  Add a **Button** widget:
  - Text: `☎ Call Now: 800-646-1307`
  - Link: `tel:+18006461307`
  - Background: `#FF6B00`
  - Font: Inter 800, uppercase, 0.9rem
  - Padding: 0.9rem 2rem
  - Border Radius: 0

  Add a second **Text Editor** for the secondary link:
  ```html
  <a href="/services" style="color:#888888; font-size:0.8rem; letter-spacing:0.08em; text-transform:uppercase; border-bottom:1px solid #444444; padding-bottom:2px;">View Our Services →</a>
  ```

- [ ] **Step 9: Add "Since 1981" ghost anchor (bottom-right)**

  Add a positioned **HTML** widget:
  ```html
  <div style="text-align:right; position:absolute; right:4rem; bottom:3rem;">
    <div style="font-size:5rem; font-weight:900; color:rgba(255,107,0,0.12); line-height:1;">1981</div>
    <div style="font-size:0.6rem; letter-spacing:0.2em; text-transform:uppercase; color:#444444;">Serving Georgia Since</div>
  </div>
  ```

- [ ] **Step 10: Verify on mobile**

  Use Elementor's responsive preview. Verify H1 scales down gracefully, CTA button is full-width on mobile, ghost text doesn't overflow. Save.

---

### Task 12: Create Homepage — Trust Bar

- [ ] **Step 1: Add trust bar section below hero**

  New 4-column section. Background: `#111111`. Border Top: 2px solid `#FF6B00`. Border Bottom: 1px solid `rgba(255,255,255,0.06)`. Padding: 0.

- [ ] **Step 2: Add four trust items**

  In each column, add an **HTML** widget. Column dividers are handled by the child theme `.trust-bar-item` class.

  Column 1:
  ```html
  <div class="trust-bar-item" style="padding:1.1rem 1.5rem; text-align:center;">
    <div style="font-size:0.85rem; font-weight:700; color:#FF6B00;">Since 1981</div>
    <div style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#555555; margin-top:0.2rem;">45+ Years of Service</div>
  </div>
  ```

  Column 2:
  ```html
  <div class="trust-bar-item" style="padding:1.1rem 1.5rem; text-align:center;">
    <div style="font-size:0.85rem; font-weight:700; color:#FF6B00;">★ Veteran Owned</div>
    <div style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#555555; margin-top:0.2rem;">U.S. Army, Ret. Major</div>
  </div>
  ```

  Column 3:
  ```html
  <div class="trust-bar-item" style="padding:1.1rem 1.5rem; text-align:center;">
    <div style="font-size:0.85rem; font-weight:700; color:#FF6B00;">24 / 7 / 365</div>
    <div style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#555555; margin-top:0.2rem;">Emergency Response</div>
  </div>
  ```

  Column 4:
  ```html
  <div style="padding:1.1rem 1.5rem; text-align:center;">
    <div style="font-size:0.85rem; font-weight:700; color:#FF6B00;">Metro Atlanta + Middle GA</div>
    <div style="font-size:0.6rem; letter-spacing:0.15em; text-transform:uppercase; color:#555555; margin-top:0.2rem;">We Come To You</div>
  </div>
  ```

- [ ] **Step 3: Verify**

  Four columns visible on desktop. Stacks to 2×2 grid on tablet, single column on mobile. Save.

---

### Task 13: Create Homepage — Services Instrument Panel

- [ ] **Step 1: Add services section**

  New section. Background: `#0d0d0d`. Padding: 4rem.

  Add section eyebrow:
  ```html
  <div class="section-eyebrow">What We Fix</div>
  ```

  Add H2 heading: `Heavy & Medium Duty <span style="color:#FF6B00;">Truck Repair</span>` (use HTML widget or Heading widget with HTML tag enabled).

- [ ] **Step 2: Add instrument panel grid**

  Add an 8-column inner section (or use a 4-column × 2-row layout). Set Column Gap: 2px. Background: `#1a1a1a`. Border: 1px solid `#2a2a2a`. Box Shadow: `0 0 0 3px #111, 0 0 0 4px #2a2a2a`.

  For each of the 8 service cells, add an **HTML** widget with class `panel-cell`:

  Cell 1 (Brakes):
  ```html
  <a href="/services/brakes" class="panel-cell" style="display:block; padding:1.4rem 1.2rem; text-decoration:none;">
    <div class="gauge-ring">B</div>
    <div style="font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#cccccc; margin-bottom:0.3rem;">Brakes</div>
    <div style="font-size:0.6rem; color:#444444;">5 services</div>
  </a>
  ```

  Repeat for: Electrical (E, 7 services), Engine (⚙, 5 services), Air System (~, 6 services), Trailers (T, 10 services), Axle & Suspension (A, 5 services), Cooling System (C, 4 services).

  Cell 8 (DOT Inspection — featured):
  ```html
  <a href="/services/dot-inspection" class="panel-cell panel-cell-featured" style="display:block; padding:1.4rem 1.2rem; text-decoration:none; position:relative;">
    <span style="position:absolute; top:0.5rem; right:0.6rem; font-size:0.5rem; letter-spacing:0.15em; color:#FF6B00; font-weight:700; text-transform:uppercase;">FEDERAL</span>
    <div class="gauge-ring">✓</div>
    <div style="font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#ffffff; margin-bottom:0.3rem;">DOT Inspection</div>
    <div style="font-size:0.6rem; color:#FF6B00;">State &amp; Federal</div>
  </a>
  ```

- [ ] **Step 3: Add panel status bar**

  Below the 8-cell grid, add an **HTML** widget spanning full width:
  ```html
  <div class="panel-statusbar">
    <span class="status-indicator">All services performed on-site · We come to you</span>
    <a href="/services" class="view-all">View all services →</a>
  </div>
  ```

- [ ] **Step 4: Verify hover states**

  Open site in browser (not Elementor preview). Hover over each panel cell — gauge ring should highlight orange, cell background should lighten. Save.

---

### Task 14: Create Homepage — About Snippet

- [ ] **Step 1: Add about section**

  New 2-column section. Background: `#111111`. Padding: 4rem. Column gap: 4rem. Align items: center.

- [ ] **Step 2: Left column — photo placeholder**

  Add an **Image** widget. Use a placeholder image for now (will be replaced with Dick's photo). Style: 4:3 aspect ratio, border: 1px solid `rgba(255,107,0,0.2)`.

  *(Note to builder: request a photo of Dick Holden from the family — ideally a professional or semi-professional shot. Military photo would work well.)*

- [ ] **Step 3: Right column — content**

  Add section eyebrow: `<div class="section-eyebrow">Our Story</div>`

  Add H2 Heading: `A <span style="color:#FF6B00;">Soldier's</span> Work Ethic.`

  Add paragraph text:
  ```
  Richard "Dick" Holden founded A Anytime Anywhere in 1981 after serving as a U.S. Army Infantry Officer — two tours in Vietnam, two Silver Stars, a Purple Heart, and a reputation for getting things done under pressure. That same standard applies to every job our techs take.
  ```

  Add military decoration badges HTML:
  ```html
  <div style="margin:1rem 0;">
    <span class="medal-badge">★★ Silver Star ×2</span>
    <span class="medal-badge">Bronze Star — Valor</span>
    <span class="medal-badge">Purple Heart</span>
    <span class="medal-badge">Air Medal</span>
    <span class="medal-badge">Vietnamese Cross of Gallantry</span>
  </div>
  ```

  Add pull quote:
  ```html
  <div style="font-size:1rem; font-style:italic; color:#cccccc; border-left:3px solid #FF6B00; padding-left:1rem; margin:1.25rem 0; line-height:1.6;">
    "We like to say that we are available 8 days a week, 30 hours a day — anytime, anywhere we are needed."
  </div>
  ```

  Add Button: "Our Full Story →" → link: `/about` → background: `#FF6B00`.

- [ ] **Step 4: Verify responsiveness**

  Two columns stack to single column on mobile. Photo appears above text on mobile. Save.

---

### Task 15: Create Homepage — Service Area Section

- [ ] **Step 1: Get a Google Maps API key**

  Go to `console.cloud.google.com` → Create project "Anytime24hour" → Enable **Maps JavaScript API** and **Maps Embed API** → Create API key → Restrict key to `anytime24hour.com` referrer.

  In WordPress: Dashboard → Elementor → Settings → Integrations → Google Maps → paste API key → Save.

- [ ] **Step 2: Add service area section**

  New 2-column section (2fr / 1fr ratio). Background: `#0d0d0d`. Padding: 4rem.

- [ ] **Step 3: Left column — map**

  Add a **Google Maps** widget. Address: `Macon, Georgia` (center point of service area). Zoom: 8 (shows both Atlanta and Macon). Height: 400px. Satellite: off.

- [ ] **Step 4: Right column — area list**

  Add section eyebrow: `<div class="section-eyebrow">Where We Serve</div>`

  Add H2: `North &amp; Central <span style="color:#FF6B00;">Georgia</span>`

  Add paragraph: `Mobile units dispatch directly to your location — roadside, truck stop, terminal, or job site.`

  Add area list:
  ```html
  <div style="margin:1.25rem 0;">
    <div class="area-list-item">Metro Atlanta Area (College Park)</div>
    <div class="area-list-item">Macon / Middle Georgia</div>
    <div class="area-list-item">Forsyth &amp; Surrounding Counties</div>
    <div class="area-list-item">McDonough to Dublin</div>
    <div class="area-list-item">Milledgeville to Perry</div>
  </div>
  ```

  Add callout note:
  ```html
  <div class="vehicle-scope-note">
    <strong>Commercial vehicles only.</strong> Tractor-trailers, box trucks, RVs, buses. No passenger vehicles or light trucks.
  </div>
  ```

- [ ] **Step 5: Verify**

  Google Map renders without API errors in browser console. Area list items show orange dot indicators. Save.

---

### Task 16: Create Homepage — Reviews Section

- [ ] **Step 1: Install Reviews Feed Pro**

  If using Reviews Feed Pro ($40/yr): purchase at `smashballoon.com/products/google-reviews-feed/` → install plugin → connect Google Business Profile account → select the `anytime24hour.com` listing.

  **If not using paid plugin (free alternative):** Skip this task and instead add a static reviews section with 2-3 manually entered testimonials. Update when new reviews come in. Add a note in Rebecca's handoff guide to update this section annually.

- [ ] **Step 2: Configure the feed**

  Reviews Feed → Customize → set: dark background (`#111111`), star color `#FF6B00`, card border `rgba(255,255,255,0.07)`, max reviews displayed: 3, minimum star rating: 4.

- [ ] **Step 3: Add reviews section to homepage**

  New section. Background: `#111111`. Padding: 4rem.

  Add section eyebrow: `<div class="section-eyebrow">What Drivers Say</div>`

  Add H2: `Trusted by <span style="color:#FF6B00;">Georgia Truckers</span>`

  Add the Reviews Feed shortcode widget (drag from Elementor widgets panel after plugin is installed).

  Add text below: `<a href="[Google review link]" style="color:#555555; font-size:0.75rem;">See all reviews on Google →</a>`

  *(Note: get the direct Google review link from Google Business Profile dashboard → Get more reviews → copy link.)*

- [ ] **Step 4: Verify**

  Reviews feed renders with dark styling. Stars show in orange. Save.

---

### Task 17: Create Homepage — Final CTA + Publish

- [ ] **Step 1: Add final CTA section**

  New section. Background: `#0d0d0d`. Border Top: 3px solid `#FF6B00`. Padding: 4rem. Position: relative. Overflow: hidden.

  Add ghost text:
  ```html
  <div class="ghost-bg-text">24HR</div>
  ```

  Add eyebrow text:
  ```html
  <div style="font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:#555555; margin-bottom:0.75rem; text-align:center;">Broken down? Don't wait.</div>
  ```

  Add H2 (centered): `We Come To You. Day or Night.`

  Add sub text:
  ```html
  <div style="font-size:0.85rem; color:#666666; text-align:center; margin-bottom:1.75rem;">Metro Atlanta &amp; Middle Georgia — 24 hours, 7 days a week</div>
  ```

  Add phone CTA box:
  ```html
  <div style="text-align:center;">
    <a href="tel:+18006461307" class="phone-cta-box" style="text-decoration:none; display:inline-flex; flex-direction:column; align-items:center;">
      <span class="cta-label">Central Dispatch — Georgia</span>
      <span class="cta-number">800-646-1307</span>
    </a>
  </div>
  ```

  Add availability text:
  ```html
  <div style="font-size:0.7rem; letter-spacing:0.12em; text-transform:uppercase; color:#444444; text-align:center; margin-top:1.5rem;">
    Available 8 Days a Week · 30 Hours a Day · Anytime. Anywhere.
  </div>
  ```

- [ ] **Step 2: Publish homepage and verify full page**

  Click Publish in Elementor. Open `https://anytime24hour.com` in a browser (still behind maintenance mode for visitors). Scroll through all 8 sections. Check: hero CTA is clickable, map loads, trust bar aligns, instrument panel hover works, CTA phone number is tappable on mobile.

- [ ] **Step 3: Mobile review**

  Resize browser to 375px width (iPhone). Verify: no horizontal scroll, text is readable, CTA button is full-width, trust bar stacks properly.

---

## Phase 4 — Inner Pages

### Task 18: Create Service Page Template

*One Elementor template used for all 11 service pages*

- [ ] **Step 1: Create service page template**

  Templates → Saved Templates → Add New → Page → name "Service Page Template".

  Build the template with:

  **Hero banner** (section, background `#0d0d0d`, padding 6rem 4rem 3rem):
  ```html
  <div class="section-eyebrow">Heavy Duty Truck Repair</div>
  ```
  H1 dynamic tag: Page Title (Elementor Dynamic Tags → Post → Title)
  Subtext: "Available 24/7 · Metro Atlanta & Middle Georgia"

  **Content section** (2-column, background `#111111`):
  - Left: services list (H3 "Services Include", then a list of specific services for that category)
  - Right: "Need service now?" sidebar with phone CTA box, hours note, vehicle scope note

  **Related service areas** (full-width section): links to all 4 service area pages

  **Bottom CTA**: same as homepage final CTA

- [ ] **Step 2: Export template as JSON for version control**

  Templates → Saved Templates → Service Page Template → Export. Save to `docs/elementor-exports/service-page-template.json`.

  ```bash
  git add docs/elementor-exports/service-page-template.json
  git commit -m "feat: add Elementor service page template"
  ```

---

### Task 19: Create All Service Pages

- [ ] **Step 1: Create WordPress pages for each service**

  Dashboard → Pages → Add New. Create 11 pages with these exact slugs:

  | Page Title | Slug | Parent |
  |---|---|---|
  | Services | `services` | (none) |
  | Brakes | `brakes` | Services |
  | Electrical System | `electrical` | Services |
  | Engine Repair | `engine` | Services |
  | Air System | `air-system` | Services |
  | Trailer Repair | `trailers` | Services |
  | Axle, Suspension & Steering | `axle-suspension` | Services |
  | Cooling System | `cooling-system` | Services |
  | Fuel System | `fuel-system` | Services |
  | Driveline | `driveline` | Services |
  | Wheels & Tires | `wheels-tires` | Services |
  | DOT Inspection | `dot-inspection` | Services |

- [ ] **Step 2: Apply template and add content to each page**

  For each page: Edit with Elementor → Import template (Service Page Template) → replace placeholder content with the specific services from `src/data/services.json`.

  **Brakes page services list** (from `services.json`):
  - Adjustment, Air Lines, Brake Chamber (Maxi, Pancake), Brake Shoes, Brake Valves

  **Electrical page services list:**
  - Alternator, Batteries, Computer Diagnostic, Lights, Sensors, Starter, Wiring & Fuses

  **Engine page services list:**
  - Belt Tensioner & Pulleys, Belts, Diesel Exhaust Fluid (DEF), Emissions/EGR/DPF/Regeneration, Turbo Hoses & Clamps

  **Air System page services list:**
  - Air Compressor, Air Dryer, Air Governor, Air Lines & Hoses, Gladhands, Air Valves

  **Trailer Repair page services list:**
  - 5th Wheel, Electrical 7-Way/Pigtail Wiring, Lights, Landing Gear Legs, Liftgate/Hydraulic Ramps, Reefer Engine, Rollup & Swing Doors, Door Hinges/Rollers/Hardware, Roof Leak, Tandems

  **Axle/Suspension page services list:**
  - Airbags, Axle, Leveling Valve, Power Steering Hoses, Springs

  **Cooling System page services list:**
  - Fan Clutch, Hoses & Fittings, Sensors, Water Pump

  **Fuel System page services list:**
  - Filters, Fuel Delivery, Fuel Prime, Fuel Injector Lines

  **Driveline page services list:**
  - Clutch Adjustment, Clutch Pedal Linkage

  **Wheels & Tires page services list:**
  - Bearings, Mud Flaps & Brackets, Tires, Wheel Seals

  **DOT Inspection page:** Add additional copy explaining what a DOT inspection covers and why it matters for compliance. Include "Federal and State inspections performed on-site" prominently.

- [ ] **Step 3: Set RankMath meta for each service page**

  For each page, in the RankMath panel (bottom of WordPress editor) set:

  | Page | Title Tag | Meta Description |
  |---|---|---|
  | /services | `Commercial Truck Repair Services Georgia \| A Anytime Anywhere` | `Full mobile truck and trailer repair services across Metro Atlanta and Middle Georgia. Available 24/7. Call 800-646-1307.` |
  | /services/brakes | `Mobile Truck Brake Repair Georgia \| 24 Hour Service` | `Mobile truck brake repair and adjustment — Metro Atlanta & Middle Georgia. Air lines, brake chambers, shoes, valves. Available 24/7.` |
  | /services/electrical | `Commercial Truck Electrical Repair Georgia \| 24 Hour Mobile` | `On-site truck electrical diagnostics and repair. Alternators, starters, wiring, computer diagnostic. Metro Atlanta & Middle Georgia.` |
  | /services/engine | `Mobile Truck Engine Repair Georgia \| A Anytime Anywhere` | `Mobile diesel engine repair — DPF/DEF/EGR, belts, turbo hoses. Heavy duty trucks & tractor-trailers. Call 800-646-1307.` |
  | /services/dot-inspection | `DOT Inspection Georgia — Mobile Commercial Truck Inspection` | `Federal and state DOT inspections performed on-site across Georgia. 24/7 availability. Tractor-trailers, box trucks, buses.` |
  | /services/trailers | `Mobile Trailer Repair Georgia \| 24 Hour Service` | `On-site trailer repair — liftgates, hydraulic ramps, lights, landing gear, reefer engine, rollup doors. Metro Atlanta & Middle Georgia.` |
  | (remaining pages) | Follow same pattern: `[Service] Georgia \| 24 Hour Mobile Truck Repair` | 1-2 sentences with primary service + area + phone |

- [ ] **Step 4: Add Service schema to each service page**

  For each service page: open the page in WordPress editor → RankMath panel (bottom) → Schema → Schema Generator → select **Service** schema type. Fill in:

  | Field | Value |
  |---|---|
  | Name | e.g., `Mobile Truck Brake Repair — Georgia` |
  | Description | Same text as the page's meta description |
  | Provider | A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC |
  | Provider URL | `https://anytime24hour.com` |
  | Area Served | Metro Atlanta, Middle Georgia |
  | Service Type | e.g., `Truck Brake Repair` |

  Save. Repeat for all 11 service pages.

- [ ] **Step 5: Verify**

  Navigate to `/services` → links to all sub-pages work. Each service page loads with correct content. No "auto repair" language anywhere. Run one service page through Google Rich Results Test — Service schema should be detected.

---

### Task 20: Create Service Area Pages

- [ ] **Step 1: Create service area page template**

  Templates → Saved Templates → Add New → name "Service Area Page Template". Build with:

  **Hero**: "Mobile Truck Repair in [City]" — H1 dynamic title. "24 hours a day, 7 days a week."

  **Coverage section**: Map centered on that city (zoom 10) + brief description of area covered.

  **Services available**: grid listing all service categories (links to service pages).

  **Tech dispatch note**: "Our [City] technician dispatches directly to your location. No tow, no shop wait."

  **CTA**: phone box + "service available throughout [region]"

  Export to `docs/elementor-exports/service-area-page-template.json`.

  ```bash
  git add docs/elementor-exports/service-area-page-template.json
  git commit -m "feat: add Elementor service area page template"
  ```

- [ ] **Step 2: Create 5 service area pages**

  | Page Title | Slug | H1 | Map Center | Tech Note |
  |---|---|---|---|---|
  | Service Areas | `service-areas` | Service Areas — Metro Atlanta & Middle Georgia | Macon, GA (shows full coverage) | Overview of all three dispatch cities |
  | Mobile Truck Repair — Metro Atlanta | `metro-atlanta` | Mobile Truck Repair in Metro Atlanta | College Park, GA | "Our College Park technician serves the greater Atlanta metro area" |
  | Mobile Truck Repair — Macon | `macon` | Mobile Truck Repair in Macon, Georgia | Macon, GA | "Our Macon technician serves Macon and surrounding Middle Georgia" |
  | Mobile Truck Repair — Forsyth, GA | `forsyth` | Mobile Truck Repair in Forsyth, Georgia | Forsyth, GA | "Our Forsyth technician serves Forsyth and Monroe County" |
  | Mobile Truck Repair — Middle Georgia | `middle-georgia` | Mobile Truck Repair — Middle Georgia | Macon, GA | "Middle Georgia coverage from our Forsyth and Macon technicians" |

- [ ] **Step 3: Set RankMath meta for each service area page**

  | Page | Title Tag | Meta Description |
  |---|---|---|
  | /service-areas | `Mobile Truck Repair — Metro Atlanta & Middle Georgia \| A Anytime Anywhere` | `24 hour mobile truck and trailer repair across Metro Atlanta and Middle Georgia. Three dispatching techs. Tractor-trailers, box trucks, buses.` |
  | /service-areas/metro-atlanta | `24 Hour Mobile Truck Repair Atlanta GA \| A Anytime Anywhere` | `Mobile heavy-duty truck repair in Metro Atlanta. On-site service — we come to your location. Tractor-trailers, box trucks, RVs. Call 800-646-1307.` |
  | /service-areas/macon | `24 Hour Truck Repair Macon Georgia \| Mobile Service` | `Mobile commercial truck and trailer repair in Macon, GA. Available 24/7. DOT inspections, roadside repair, diesel service. Call 800-646-1307.` |
  | /service-areas/forsyth | `Mobile Truck Repair Forsyth GA \| 24 Hour Service` | `On-site truck repair in Forsyth, Georgia. 24 hour emergency mobile service for tractor-trailers, box trucks, and buses. Call 800-646-1307.` |
  | /service-areas/middle-georgia | `Mobile Truck Repair Middle Georgia \| 24 Hour Emergency Service` | `Heavy-duty truck and trailer repair across Middle Georgia. Coverage from Forsyth and Macon. Available 24/7. Call 800-646-1307.` |

- [ ] **Step 4: Verify**

  All 5 pages load. Maps centered correctly. No horizontal scroll on mobile.

---

### Task 21: Create About Page

- [ ] **Step 1: Create page**

  Pages → Add New → Title: "About" → Slug: `about` → Edit with Elementor.

- [ ] **Step 2: Build page structure**

  **Hero section** (background `#0d0d0d`, padding 6rem 4rem):
  ```
  Eyebrow: "Our Story"
  H1: "A Soldier's Work Ethic."
  Sub: "Family-owned and operated since 1981."
  ```

  **Dick Holden section** (2 columns, background `#111111`):
  - Left: Photo of Dick (placeholder until photo provided)
  - Right: H2 "The Owner", then full biography text from `src/templates/section/about.pug` (the text inside `.uk-modal-body`) — copy the `THE OWNER:` section verbatim

  Add decoration badges below bio:
  ```html
  <div>
    <span class="medal-badge">★★ Silver Star ×2</span>
    <span class="medal-badge">Bronze Star — Valor &amp; Meritorious Service</span>
    <span class="medal-badge">Air Medal</span>
    <span class="medal-badge">Purple Heart</span>
    <span class="medal-badge">Vietnamese Cross of Gallantry with Palm</span>
  </div>
  ```

  **The Company section** (background `#0d0d0d`):
  H2: "The Company". Copy the `THE COMPANY:` text from the existing about modal.

  **The Team section** (background `#111111`):
  H2: "The Team". 3-column grid with:
  - Benny Heinzelmann — "Premier mechanic and troubleshooter, with the company since high school, 38 years ago."
  - Josh Presley — "Developing into a skilled mechanic and troubleshooter."
  - Julie Presley — "CFO and accountant, managing the business side since its earliest days."

  **Bottom CTA**: phone box.

- [ ] **Step 3: Set RankMath meta**

  Title: `About A Anytime Anywhere — Veteran-Owned Since 1981`
  Description: `A Anytime Anywhere was founded in 1981 by U.S. Army Major (Ret.) Richard "Dick" Holden, a decorated Vietnam veteran. Family-owned and operated in Georgia for 45+ years.`

- [ ] **Step 4: Verify**

  Biography text readable. Decoration badges render correctly. Photo placeholder visible (remind client to send photo). Save and publish.

---

### Task 22: Create FAQ Page

- [ ] **Step 1: Create page**

  Pages → Add New → Title: "FAQ" → Slug: `faq` → Edit with Elementor.

- [ ] **Step 2: Install RankMath FAQ widget in Elementor**

  RankMath integrates with Elementor — an "FAQ Schema" widget should appear in the Elementor widget panel after RankMath is active. If not visible: add FAQ content as an Accordion widget, then manually add FAQPage schema via RankMath → Schema → Add Schema → FAQ.

- [ ] **Step 3: Build FAQ page structure**

  **Hero** (background `#0d0d0d`, padding 5rem 4rem):
  ```
  Eyebrow: "Common Questions"
  H1: "Frequently Asked Questions"
  Sub: "Can't find your answer? Just call us — 800-646-1307."
  ```

  **FAQ accordion section** (background `#111111`, padding 4rem):

  Add each question as an Accordion item with the exact question text and answer below:

  | Question | Answer |
  |---|---|
  | How fast can you get to me? | Response times vary by location and time of day, but our goal is to be on-site as quickly as possible — typically within 1-2 hours for locations within our primary service area. Call us directly at 800-646-1307 for an honest ETA. |
  | What areas of Georgia do you cover? | We serve Metro Atlanta (dispatching from College Park) and Middle Georgia (dispatching from Macon and Forsyth). Coverage extends from McDonough to Dublin and Milledgeville to Perry. Call us if you're unsure whether we cover your location. |
  | Do you work on trailers? | Yes. We service all types of trailers including 5th wheel, reefer, flatbed, and dry van. Services include liftgates, hydraulic ramps, lighting, landing gear, rollup and swing doors, and more. |
  | Do you do DOT inspections? | Yes. We perform Federal and State DOT inspections on-site. No need to bring the truck to a shop — we come to your location. |
  | Do you work on RVs and buses? | Yes. We service RVs and buses in addition to tractor-trailers and box trucks. |
  | What kinds of trucks do you repair? | Tractor-trailers, semi-trucks, box trucks, RVs, and buses. Commercial medium and heavy-duty vehicles. |
  | Do you work on cars or light trucks? | No. We specialize in commercial, medium, and heavy-duty vehicles only. We do not service passenger cars, pickup trucks, or light-duty vehicles. |
  | Are you available on weekends and holidays? | Yes. We operate 24 hours a day, 7 days a week, 365 days a year — including all holidays. |
  | How do I request service? | Call our central dispatch at 800-646-1307. We don't use an online booking system — a real person answers to get you the right tech as fast as possible. |
  | Do you work on hydraulics — liftgates, ramps, and hydraulic systems? | Yes. Liftgate and hydraulic ramp repair is one of our trailer services. We service hydraulic systems on-site. |

- [ ] **Step 4: Configure FAQPage schema**

  RankMath → Schema (in the page editor's RankMath panel) → click "Schema Generator" → select "FAQ" schema type → it will auto-detect the FAQ accordion content and generate the schema.

  Verify by pasting the page URL into Google's Rich Results Test (`search.google.com/test/rich-results`) → should show **FAQ rich result detected**.

- [ ] **Step 5: Set RankMath meta**

  Title: `FAQ — 24 Hour Mobile Truck Repair Georgia \| A Anytime Anywhere`
  Description: `Common questions about our mobile truck and trailer repair service in Metro Atlanta and Middle Georgia. Available 24/7. Call 800-646-1307.`

- [ ] **Step 6: Verify**

  FAQ accordion expands/collapses. Rich Results Test shows FAQ schema detected. Save and publish.

---

### Task 23: Create Contact Page

- [ ] **Step 1: Create page**

  Pages → Add New → Title: "Contact" → Slug: `contact` → Edit with Elementor.

- [ ] **Step 2: Build page**

  **Hero** (background `#0d0d0d`, padding 5rem 4rem):
  H1: `Get Help Now.`
  Sub: `We don't use contact forms. Call us — a real person answers.`

  **Main CTA section** (background `#111111`, centered):
  Phone CTA box (same as homepage):
  ```html
  <div style="text-align:center; padding:3rem;">
    <div style="font-size:0.6rem; letter-spacing:0.2em; text-transform:uppercase; color:#555555; margin-bottom:0.5rem;">Central Dispatch — Georgia</div>
    <a href="tel:+18006461307" class="phone-cta-box" style="text-decoration:none; display:inline-flex; flex-direction:column; align-items:center;">
      <span class="cta-label">Call Now</span>
      <span class="cta-number">800-646-1307</span>
    </a>
    <div style="font-size:0.75rem; color:#555555; margin-top:1rem;">Available 24 hours a day · 7 days a week · 365 days a year</div>
  </div>
  ```

  **Email section** (if relevant):
  ```
  For non-emergency inquiries: operations@anytime24hour.com
  ```

  **Service area reminder**: link to `/service-areas`.

- [ ] **Step 3: Set RankMath meta**

  Title: `Contact — 24 Hour Mobile Truck Repair Georgia \| A Anytime Anywhere`
  Description: `Call A Anytime Anywhere 24 Hour Mobile Truck Repair at 800-646-1307. We dispatch to Metro Atlanta and Middle Georgia around the clock.`

---

## Phase 5 — SEO & Schema Finalization

### Task 24: Configure ServiceArea Schema

*RankMath Free handles LocalBusiness schema. ServiceArea requires either RankMath Pro's Schema Builder or a custom snippet.*

- [ ] **Step 1: Check RankMath's Schema Builder**

  In RankMath → Schema → click on the LocalBusiness schema entry that was auto-generated. Look for a **Service Area** field. If present, add:
  - Service Area Type: City
  - Cities: Atlanta, College Park, Macon, Forsyth, Middle Georgia

- [ ] **Step 2: If ServiceArea field is not in free version, add via functions.php**

  Add the following to `wp-content/themes/hello-elementor-child/functions.php`:

  ```php
  add_action( 'wp_head', function() {
      $schema = [
          '@context' => 'https://schema.org',
          '@type'    => [ 'LocalBusiness', 'AutoRepair' ],
          '@id'      => 'https://anytime24hour.com/#business',
          'name'     => 'A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC',
          'description' => 'Mobile heavy-duty truck and trailer repair serving Metro Atlanta and Middle Georgia — tractor-trailers, box trucks, RVs, and buses. No passenger vehicles.',
          'telephone'   => '800-646-1307',
          'email'       => 'operations@anytime24hour.com',
          'url'         => 'https://anytime24hour.com',
          'foundingDate' => '1981',
          'openingHoursSpecification' => [
              [
                  '@type'     => 'OpeningHoursSpecification',
                  'dayOfWeek' => [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday' ],
                  'opens'     => '00:00',
                  'closes'    => '23:59',
              ]
          ],
          'areaServed' => [
              [ '@type' => 'City', 'name' => 'Atlanta',       'addressRegion' => 'GA' ],
              [ '@type' => 'City', 'name' => 'College Park',  'addressRegion' => 'GA' ],
              [ '@type' => 'City', 'name' => 'Macon',         'addressRegion' => 'GA' ],
              [ '@type' => 'City', 'name' => 'Forsyth',       'addressRegion' => 'GA' ],
          ],
          'knowsAbout' => [
              'Heavy-duty truck repair',
              'Tractor-trailer repair',
              'Commercial truck DOT inspection',
              'Mobile truck repair Georgia',
              'Trailer repair',
              'Diesel engine repair',
          ],
      ];
      echo '<script type="application/ld+json">'
          . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT )
          . '</script>' . "\n";
  } );
  ```

- [ ] **Step 3: Commit functions.php update**

  ```bash
  git add wp-content/themes/hello-elementor-child/functions.php
  git commit -m "feat: add ServiceArea + LocalBusiness JSON-LD schema to site head"
  ```

- [ ] **Step 4: Verify schema**

  Paste `https://anytime24hour.com` into `search.google.com/test/rich-results`. Expected result: LocalBusiness entity detected with phone, area served, and opening hours. No errors.

---

### Task 25: Submit Sitemap to Google Search Console

- [ ] **Step 1: Verify Search Console access**

  Go to `search.google.com/search-console`. Confirm `anytime24hour.com` is a verified property. If not: add property → verify via HTML tag method (RankMath can insert the verification tag automatically under Settings → Webmaster Tools).

- [ ] **Step 2: Submit sitemap**

  In Search Console → Sitemaps → enter `sitemap_index.xml` → Submit.

- [ ] **Step 3: Request indexing for key pages**

  In Search Console → URL Inspection tool. Paste each of these URLs and click "Request Indexing":
  - `https://anytime24hour.com/`
  - `https://anytime24hour.com/service-areas/metro-atlanta`
  - `https://anytime24hour.com/service-areas/macon`
  - `https://anytime24hour.com/faq`
  - `https://anytime24hour.com/services/dot-inspection`

- [ ] **Step 4: Verify**

  Search Console → Sitemaps — status should show "Success" within a few minutes. Pages will be crawled within 1-7 days.

---

### Task 26: LiteSpeed Cache Configuration

- [ ] **Step 1: Configure cache settings**

  Dashboard → LiteSpeed Cache → Cache → General. Enable:
  - ✓ Enable Cache
  - ✓ Cache Logged-in Users: OFF (leave off — editors should see live changes)
  - ✓ Cache Mobile: ON

- [ ] **Step 2: Configure optimization**

  LiteSpeed Cache → Page Optimization:
  - CSS Minify: ON
  - CSS Combine: ON
  - JS Minify: ON
  - JS Combine: OFF (can break Elementor — leave off)
  - Lazy Load Images: ON

- [ ] **Step 3: Run PageSpeed test**

  Go to `pagespeed.web.dev`. Enter `https://anytime24hour.com`. Run analysis for both Mobile and Desktop. Record scores. Target: Mobile > 70, Desktop > 85.

  If Mobile score is below 60: LiteSpeed Cache → Image Optimization → enable QUIC.cloud image optimization (free tier available).

---

## Phase 6 — Launch

### Task 27: Pre-Launch QA Checklist

- [ ] **Step 1: Check all internal links**

  Install the **Broken Link Checker** plugin (search in WordPress). Run a scan — all links on all pages should return 200 OK. Fix any 404s.

  Uninstall Broken Link Checker after scan (it's resource-intensive to run continuously).

- [ ] **Step 2: Verify all pages at mobile (375px)**

  Open each of these URLs in a 375px-wide browser window and confirm no horizontal scroll, text is readable, CTAs are tappable:
  - Homepage
  - /services
  - /services/brakes (representative service page)
  - /service-areas/metro-atlanta
  - /about
  - /faq
  - /contact

- [ ] **Step 3: Confirm phone numbers are tappable**

  On a real mobile device (or Chrome DevTools device emulation), click every phone number on the site. Each should open the phone dialer with `800-646-1307` pre-filled.

- [ ] **Step 4: Verify SSL**

  Navigate to `https://anytime24hour.com`. Browser should show padlock icon with no warnings. Run `https://www.ssllabs.com/ssltest/` → grade should be A or A+.

- [ ] **Step 5: Check for "auto repair" / "auto" language**

  In WordPress admin → Tools → use a search plugin or manually search each page. Confirm "auto repair", "auto shop", and "automotive" do not appear in any page content. All references are "truck repair", "commercial vehicle", or "heavy-duty".

---

### Task 28: Disable Maintenance Mode and Launch

- [ ] **Step 1: Final backup before launch**

  UpdraftPlus → Backup Now → run a full backup. Label it "pre-launch".

- [ ] **Step 2: Disable maintenance mode**

  Settings → LightStart → disable Maintenance Mode. The site is now live to visitors.

- [ ] **Step 3: Verify live site**

  Open `https://anytime24hour.com` in a private/incognito window (not logged into WordPress). Confirm:
  - Homepage loads with D1 dark design
  - No "Coming Soon" or maintenance page
  - Header and footer render correctly
  - Phone number in nav is correct (800-646-1307)

- [ ] **Step 4: Check Google Search Console for crawl errors**

  Wait 24 hours after launch. Check Search Console → Coverage report for any crawl errors on the new pages.

---

## Phase 7 — Rebecca Handoff Package

### Task 29: Write Website Update Guide

**Files:**
- Create: `docs/handoff/website-update-guide.md`

- [ ] **Step 1: Write the guide**

  Create `docs/handoff/website-update-guide.md` with this content:

  ```markdown
  # How to Update the Website

  ## Logging In
  1. Go to: https://anytime24hour.com/wp-admin
  2. Enter your username and password
  3. You'll land on the WordPress Dashboard

  ## Editing Page Content (Text, Images, Phone Numbers)
  1. In the left menu, click **Pages**
  2. Find the page you want to edit — hover over it and click **Edit with Elementor**
  3. The Elementor editor opens. Click on any text to edit it directly
  4. To change a phone number: click on the number text, type the new number
  5. To change an image: click the image → click the image icon in the left panel → choose a new image from the Media Library or upload one
  6. When done: click the **Publish** or **Update** button (green, bottom-left)

  ## Adding a New Page (Advanced)
  1. Pages → Add New
  2. Give the page a Title
  3. Click **Edit with Elementor**
  4. To use an existing design as a starting point: click the folder icon → Saved Templates → choose a template

  ## Updating Plugins and WordPress (Monthly — 5 minutes)
  1. Log into wp-admin
  2. In the left menu, look for a red notification badge on **Dashboard** or **Updates**
  3. Click **Updates**
  4. Click **Update All Plugins**
  5. If a WordPress core update is available, click **Update to WordPress X.X** (safe to do — your backup runs automatically before updates)

  ## Verifying Backups
  1. Settings → UpdraftPlus Backups
  2. Click the **Existing Backups** tab
  3. Confirm there is a backup from within the last 7 days
  4. If not: click **Backup Now** on the Backup/Restore tab

  ## If Something Looks Broken
  See the Break-Glass guide.
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add docs/handoff/website-update-guide.md
  git commit -m "docs: add Rebecca website update guide"
  ```

---

### Task 30: Write Maintenance Checklist and Break-Glass Instructions

**Files:**
- Create: `docs/handoff/maintenance-checklist.md`
- Create: `docs/handoff/break-glass.md`

- [ ] **Step 1: Write maintenance checklist**

  Create `docs/handoff/maintenance-checklist.md`:

  ```markdown
  # Monthly Maintenance Checklist
  (Takes about 5 minutes)

  - [ ] Log into wp-admin → Dashboard → Updates → click **Update All Plugins**
  - [ ] If WordPress core update is shown → click **Update Now**
  - [ ] Settings → UpdraftPlus → Existing Backups → confirm a backup from this month exists
  - [ ] Visit https://anytime24hour.com and confirm the site loads correctly
  - [ ] Check that the phone number (800-646-1307) is visible in the top navigation

  That's it. Done.
  ```

- [ ] **Step 2: Write break-glass instructions**

  Create `docs/handoff/break-glass.md`:

  ```markdown
  # If Something Breaks — What To Do

  ## The site is down or showing a white screen
  1. Log into wp-admin (https://anytime24hour.com/wp-admin)
  2. Go to Settings → UpdraftPlus Backups
  3. Click **Existing Backups** → find the most recent backup
  4. Click **Restore** → check all boxes → click Restore
  5. Wait for restore to complete (5-10 minutes)
  6. Check the site again

  ## A page looks wrong after I edited it
  1. Open the page in Elementor
  2. In the bottom toolbar, click the clock icon (**Revision History**)
  3. Click a recent revision from before your edit
  4. Click **Apply** to restore it
  5. Click **Update**

  ## I accidentally deleted a page
  1. Pages → Trash (link at top of Pages list)
  2. Find the deleted page → click **Restore**

  ## None of the above worked
  Contact a WordPress developer. This site was built on standard WordPress with Elementor — any WordPress developer can help.
  A good place to find one: https://www.codeable.io (vetted WordPress freelancers)
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add docs/handoff/maintenance-checklist.md docs/handoff/break-glass.md
  git commit -m "docs: add maintenance checklist and break-glass instructions"
  ```

---

### Task 31: Write GBP Guide and Set Up Rebecca's Access

**Files:**
- Create: `docs/handoff/gbp-guide.md`

- [ ] **Step 1: Add Rebecca as GBP Manager**

  In Google Business Profile dashboard (`business.google.com`) → select the A Anytime Anywhere listing → Settings → Managers → Add Manager → enter Rebecca's Google account email → Role: Manager (not Owner).

  Rebecca will receive an email invitation. She must accept it.

- [ ] **Step 2: Add Rebecca as WordPress Editor**

  Dashboard → Users → Add New. Create an account for Rebecca:
  - Role: **Editor** (can edit pages and posts, cannot install plugins or change settings)
  - Send her the login credentials securely (password manager or encrypted message)

- [ ] **Step 3: Write GBP guide**

  Create `docs/handoff/gbp-guide.md`:

  ```markdown
  # Managing the Google Business Profile

  ## Logging In
  Go to: https://business.google.com
  Sign in with your Google account (you've been added as a Manager).

  ## Responding to Reviews
  Reviews matter — Google rewards businesses that respond to every review.

  1. In GBP dashboard → click **Reviews**
  2. For a positive review: thank them briefly and personally. Example:
     "Thank you [Name]! We're glad we could get you rolling again. Stay safe out there."
  3. For a negative review: respond calmly and factually. Don't argue. Example:
     "We're sorry to hear about your experience. Please call us at 800-646-1307 so we can make it right."
  4. Respond within 24-48 hours when possible

  ## Asking for Reviews (How to Get More)
  After completing a job, send this text message to the customer:
  > "Thanks for choosing A Anytime Anywhere! If we did a good job, we'd really appreciate a quick Google review: [REVIEW LINK]"

  Get your review link: GBP Dashboard → Get more reviews → copy the short link.

  ## Posting an Update
  Google rewards active profiles — aim for one post per month.

  1. GBP Dashboard → Add Update
  2. Write 1-2 sentences about the business (e.g., "Now serving Forsyth and the Monroe County area. Call 800-646-1307 for 24/7 mobile truck repair.")
  3. Add a photo if you have one
  4. Click Publish

  ## Updating Business Hours or Phone Number
  GBP Dashboard → Edit Profile → update the relevant field → Save.
  Note: also update the phone number on the website (see website-update-guide.md).
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add docs/handoff/gbp-guide.md
  git commit -m "docs: add GBP management guide for Rebecca"
  ```

---

## Phase 8 — Final Verification

### Task 32: End-to-End Verification

- [ ] **Step 1: Full Rich Results Test**

  Run each of these URLs through `search.google.com/test/rich-results`:
  - `https://anytime24hour.com` → LocalBusiness schema detected ✓
  - `https://anytime24hour.com/faq` → FAQPage schema detected ✓

- [ ] **Step 2: PageSpeed final scores**

  Run `pagespeed.web.dev` on the homepage. Record and note final Mobile and Desktop scores in a comment on this task.

  Target: Mobile ≥ 70 / Desktop ≥ 85. If below target, revisit LiteSpeed Cache image optimization settings.

- [ ] **Step 3: Search Console coverage check**

  Search Console → Coverage. All pages should be in "Valid" or "Submitted and indexed" state. No "Excluded" pages that should be indexed.

- [ ] **Step 4: Confirm Rebecca can log in and edit**

  Have Rebecca log in to both WordPress admin and Google Business Profile. Watch her make a small test edit (e.g., change a word on the contact page) and then revert it. Confirm she can do it without help.

- [ ] **Step 5: Final git commit**

  ```bash
  git status
  git add -A
  git commit -m "feat: complete website rebuild — WordPress + Elementor, D1 branding, full SEO"
  ```

---

*Plan B (Google Business Profile optimization) is a separate document: `docs/superpowers/plans/2026-05-09-gbp-optimization.md`*
