# Antigravity IDE — Project Onboarding & Collaboration Guide

> **Purpose:** This file contains the complete context, architectural decisions, and workflows for Root's Family Salon. 
> **Instructions for AI:** If you are a new Antigravity IDE instance or agent joining this project, **read this entire file** to synchronize your context with the existing team.

---

## 🏗️ Project Overview
**Client:** Root's The Family Salon (Hyderabad-based premium salon with branches in Uppal & Tarnaka).
**Goal:** Build a highly dynamic, performant, and premium web experience with booking/callback lead generation and real-time reviews.

### Tech Stack
- **Framework:** Next.js 16.2.2 (App Router)
- **React:** 19.2.4
- **Styling:** Tailwind CSS v4 (using `@theme` in `globals.css` — NO `tailwind.config.ts`)
- **Animations:** GSAP 3.14 + Framer Motion 12 (Heavy use of GSAP ScrollTrigger for parallax and sticky headers)
- **CMS:** Sanity v5 (**Currently Dormant** — we bypassed it to build UI faster. It must be rebuilt and wired at final delivery)
- **Database/Storage:** Google Sheets API + Google Calendar API (via Service Account)

---

## 🔗 Architecture & Key Decisions

### 1. Database (Google Sheets)
To avoid database hosting costs and provide the client with an easy interface, we use **Google Sheets as our backend**.
- **Reviews:** Fetched live from the Google Places API (cached 1hr via ISR) combined with a pinned fallback list in `src/data/reviews.json`.
- **Bookings & Callbacks:** Forms submit to Next.js API Routes (`/api/bookings`, `/api/callbacks`). These routes write directly to **branch-specific tabs** (e.g., `Bookings - Uppal`, `Callbacks - Tarnaka`). 
- *Note on Serverless:* We use standard `await` (not `after()`) in API routes to prevent Vercel from freezing the execution context before Google Sheets finishes writing.

### 2. Styling & GSAP
- **Colors:** Defined in `src/app/globals.css`. Primary background is `--color-parchment` (`#FEFCF8`), text is `--color-obsidian` (`#1A1008`). Accent is `--color-roots-orange`. 
- **Fonts:** Cormorant Garamond (Serif/Headings) and Outfit (Sans/Body) managed via `next/font`.
- **GSAP:** All GSAP imports MUST go through `@/lib/gsap-config` to ensure plugins are registered correctly and bundle size is kept minimal.

### 3. CMS (Sanity)
- The `/studio` route exists, but all frontend pages currently use **hardcoded fallback data**.
- **Final Task:** A major pending task is to rebuild the Sanity schemas (e.g., for the new Service Category Cards) and wire the UI components back to Sanity GROQ queries.

---

## 📜 AI Workflow & Rules of Engagement

Since this project is now being developed by a multi-developer team (with multiple AI agents), strict adherence to the following files is mandatory to prevent code collisions:

1. **`NORTHSTAR.md` (The Roadmap):**
   - This is the single source of truth for all tasks, priorities, and project status.
   - **Do not start a task** without checking its status here.
   - **Update it** immediately when a task is completed or blocked.

2. **`CODEBASE_LOG.md` (The Ledger):**
   - A historical tracker of all architectural changes, file deletions, and major refactors. 
   - Before modifying core layouts or components, read the log to understand *why* it was built that way.
   - Append to the Change Log table whenever you make significant structural changes.

3. **`CODE_REVIEW.md` (The Quality Gate):**
   - Used to track peer reviews between developers (and AI instances) before pushing complex changes to the `main` branch.

4. **Environment Variables:**
   - Production requires `GOOGLE_SERVICE_ACCOUNT_KEY` (ensure `\n` characters are handled correctly in Vercel), `GOOGLE_SHEETS_SPREADSHEET_ID`, and `GOOGLE_CALENDAR_ID`.

---

## 🎯 Current Status (As of Session Handoff)

We are in the **Final Polish & Delivery Phase**. The UI is 95% complete. 
**Pending Tasks for the team:**
1. **Brand Partners Strip (Task #17):** UI is built (`BrandStrip.tsx`), but we are waiting on the client to provide the actual logos.
2. **Sanity CMS Integration (Task #21 & #25):** Rebuild schemas to match the finalized UI and wire the data.
3. **Blogs & SEO:** Build the blog UI, integrate with Sanity, and ensure technical SEO is perfect.
