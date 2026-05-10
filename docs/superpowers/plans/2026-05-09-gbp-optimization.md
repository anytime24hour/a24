# Google Business Profile Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the A Anytime Anywhere Google Business Profile from an incomplete, fixed-location listing into a fully optimized Service Area Business that surfaces in local pack and Maps results for commercial truck repair searches across Metro Atlanta and Middle Georgia.

**Architecture:** All work is done directly in Google Business Profile (`business.google.com`) and Google Search Console. No code changes required. This plan is independent of the WordPress site build and can run in parallel.

**Tech Stack:** Google Business Profile, Google Maps, Google Search Console

---

## Task 1: Audit the Current Listing

- [ ] **Step 1: Log into GBP**

  Go to `business.google.com`. Sign in with the Google account that owns the A Anytime Anywhere listing. Select the listing.

- [ ] **Step 2: Document current state**

  Open a notes doc and record the current values for:
  - Business name (exact spelling)
  - Address shown publicly (should be hidden for SAB)
  - Phone number shown
  - Business categories (primary + secondary)
  - Service areas listed (if any)
  - Hours shown
  - Number of existing photos
  - Number of existing reviews and average star rating
  - Whether "Get Directions" shows a fixed address (problem) or a service area

  Take a screenshot of the current listing as it appears on Google Maps search.

---

## Task 2: Convert to Service Area Business (SAB)

*The single most important fix — this tells Google the business comes to customers, not the other way around.*

- [ ] **Step 1: Edit the address**

  GBP Dashboard → Edit Profile → Business Location section.

  - Uncheck / remove the street address from public display
  - Google will ask: "Do you serve customers at your business address?" → select **No, I serve customers at their locations**

- [ ] **Step 2: Define service areas**

  In the same edit flow, under **Service Area**:

  Add each of the following:
  - `College Park, Georgia`
  - `Atlanta, Georgia`
  - `Macon, Georgia`
  - `Forsyth, Georgia`
  - `Middle Georgia`
  - `Monroe County, Georgia`
  - `Bibb County, Georgia`
  - `Henry County, Georgia`
  - `McDonough, Georgia`
  - `Dublin, Georgia`
  - `Milledgeville, Georgia`
  - `Perry, Georgia`

  Google allows up to 20 service areas. Add any additional counties or cities within the known coverage radius.

- [ ] **Step 3: Save and verify on Maps**

  After saving, wait 5-10 minutes and search Google Maps for `anytime24hour.com` or "A Anytime Anywhere truck repair". The listing should now show service areas instead of a street address pinpoint.

---

## Task 3: Update Business Information

- [ ] **Step 1: Verify and update business name**

  GBP → Edit Profile → Business Name. Confirm exact name:
  `A Anytime Anywhere 24 Hour Mobile Truck Repair of Georgia, LLC`

  Do not abbreviate or keyword-stuff the business name — Google penalizes this.

- [ ] **Step 2: Update phone number**

  Edit Profile → Phone Number. Set primary phone: `800-646-1307`. Remove any outdated secondary numbers.

- [ ] **Step 3: Update website URL**

  Edit Profile → Website: `https://anytime24hour.com`

- [ ] **Step 4: Update business description**

  Edit Profile → Business Description (max 750 characters). Use this exact text:

  > Mobile heavy-duty truck and trailer repair serving Metro Atlanta and Middle Georgia since 1981. Veteran-owned and operated by U.S. Army Major (Ret.) Richard "Dick" Holden. We dispatch directly to your location — roadside, truck stop, terminal, or job site. Available 24 hours a day, 7 days a week, 365 days a year. Services include brakes, electrical, engine, air systems, trailer repair, DOT inspections, and more. Tractor-trailers, box trucks, RVs, and buses. No passenger vehicles. Call 800-646-1307.

- [ ] **Step 5: Set hours to 24/7**

  Edit Profile → Hours:
  - Set all 7 days to Open 24 Hours
  - Under **Special Hours**: add "Open on all holidays"

- [ ] **Step 6: Verify all changes saved**

  View the listing on Google Maps in a private browser window. Confirm: correct phone, correct hours (Open 24 hours), service area cities visible, no street address shown publicly.

---

## Task 4: Update Business Categories

*Categories are one of the strongest ranking signals in Google local search.*

- [ ] **Step 1: Set primary category**

  Edit Profile → Business Category → Primary Category: **Truck Repair Shop**

  (If "Truck Repair Shop" does not appear as an option, use "Auto Repair Shop" as a fallback — it is the closest available.)

- [ ] **Step 2: Add secondary categories**

  Add as many of these as Google allows (typically up to 9 additional):
  - Mobile Mechanic
  - Diesel Engine Repair Service
  - Truck Parts & Accessories Store *(remove if not accurate)*
  - Transportation Service *(optional)*
  - Commercial Vehicle Inspection Station *(if available)*

- [ ] **Step 3: Add services**

  GBP → Edit Profile → Services section. Add service items:

  | Service Category | Services to Add |
  |---|---|
  | Brake Repair | Air brake repair, brake adjustment, brake chamber replacement |
  | Electrical Repair | Alternator repair, battery replacement, electrical diagnostics |
  | Engine Repair | Diesel engine repair, DPF/EGR service, belt replacement |
  | Trailer Repair | Liftgate repair, trailer lighting, landing gear repair |
  | Inspections | DOT inspection, Federal inspection, State inspection |
  | Air System | Air compressor repair, air dryer service, air line repair |
  | Emergency Service | 24-hour roadside repair, roadside assistance |

---

## Task 5: Add Photos

*Listings with photos get significantly more clicks and calls than those without.*

- [ ] **Step 1: Gather photos to upload**

  Request the following from the Holden family:
  - Photo of Dick Holden (professional or semi-professional — military photo is ideal)
  - Photo of the service truck(s) / mobile repair unit
  - Photo of a tech working on a truck in the field
  - Photo of the equipment/tools in the truck
  - Company logo (the existing `logo-full.svg` — convert to PNG at 720×720px)

  Minimum target: 10 photos. More is better.

- [ ] **Step 2: Upload photos with correct categories**

  GBP → Photos → Add Photos:

  | Photo | Category |
  |---|---|
  | Logo | Logo |
  | Service truck exterior | Exterior |
  | Dick Holden | Team |
  | Tech working on truck | At work |
  | Tools/equipment | Interior |
  | Any additional field photos | At work |

- [ ] **Step 3: Set cover photo**

  After uploading, set the cover photo to the most compelling image — ideally the service truck or a tech in the field (not the logo).

---

## Task 6: Build Review Acquisition Workflow

*Reviews are the #1 local ranking factor for Google. The listing currently has few reviews.*

- [ ] **Step 1: Get the review link**

  GBP Dashboard → Home → click **Get more reviews** → copy the short review link (format: `g.page/r/[id]/review`).

  Save this link somewhere accessible to Dick and the techs.

- [ ] **Step 2: Create the review request text message template**

  Write this template for techs to send after completing a job:

  > Hi [customer name], this is [tech name] with A Anytime Anywhere. Thanks for the work today — glad we could get you rolling. If you have 30 seconds, a Google review really helps us out: [REVIEW LINK]

  Keep it short. Send it within a few hours of completing the job while the customer is still grateful.

- [ ] **Step 3: Brief Dick and the techs**

  Explain: reviews are how new customers find them on Google. Ask every satisfied customer for a review via text after the job. The goal is 1-2 new reviews per week.

- [ ] **Step 4: Respond to all existing reviews**

  Go through every existing review on the listing. Respond to each one — positive or negative — with a brief, professional, personal response. Unanswered reviews signal an inactive business to Google.

  For positive reviews: `"Thanks [Name] — glad we could get you home. Stay safe out there!"`

  For negative reviews: `"We're sorry to hear this. Please call us at 800-646-1307 so we can make it right."`

---

## Task 7: Set Up Monthly GBP Posts

*Google weights active profiles. A post per month keeps the listing fresh.*

- [ ] **Step 1: Publish first GBP post**

  GBP Dashboard → Add Update → type: What's New.

  First post text:
  > We've been serving Georgia truckers since 1981 — veteran-owned, family-operated, and available 24 hours a day. Whether you're broken down on I-75 or parked at a terminal in Macon, we come to you. Call 800-646-1307.

  Add the service truck photo. Publish.

- [ ] **Step 2: Add the monthly post to Rebecca's maintenance checklist**

  Remind Rebecca (in `docs/handoff/gbp-guide.md` and her checklist) to publish one GBP post per month. It can be short — 2-3 sentences about a service, a seasonal reminder, or just a check-in.

---

## Task 8: Verify and Monitor

- [ ] **Step 1: Search for the listing and confirm appearance**

  In a private browser window, search Google for:
  - `mobile truck repair Atlanta` → listing should appear in Maps results
  - `24 hour truck repair Macon Georgia` → listing should appear
  - `truck repair near me` (with location set to Atlanta or Macon)

  Note: full ranking improvement takes 2-6 weeks after profile changes. Check again in 30 days.

- [ ] **Step 2: Set up GBP notifications**

  GBP Settings → Notifications → enable email notifications for:
  - New reviews
  - New messages (if Messages is enabled)
  - Profile updates by Google

- [ ] **Step 3: Record baseline metrics**

  GBP → Performance tab → record current monthly metrics:
  - Search views (how many times the listing appeared in search)
  - Map views
  - Calls
  - Direction requests
  - Website clicks

  Check again in 30 days and 90 days to measure improvement.

---

*This plan is independent of the WordPress site build. See `docs/superpowers/plans/2026-05-09-wordpress-site-build.md` for the site build plan.*
