# CLAUDE.md — Spark Project Context

> **Read this entire file before doing any work in this repo.**
> It tells you what Spark is, where we are, and what NOT to do.
> If anything here conflicts with a user request, ask before acting.
> Last updated: 2026-04-27 — update this date when you make changes.

---

## What is Spark

Spark is a phone-first PWA (eventually native iOS) for adults who want to start their first product or SaaS business but don't know what to start.

**Mechanism:** Tinder-style swipe through curated, audited business ideas. Save what clicks. Read coach-tone breakdowns. Buy materials with one tap (affiliate-tagged).

**Audience:** Global English-speaking adults, primarily women makers and solopreneur-curious people. Primary beta users: Subhanu's wife and her network.

**Region (v1):** USA only. Region picker shows other regions as "coming soon."

**Decks (v1):** Two decks only.
- **Physical Products** — ~464 audited keepers out of 808 total, makers/crafts focus
- **SaaS** — 121 audited keepers out of 205 total (especially Starter Story businesses with real revenue data)
- ~~Digital Products~~ — **CUT from v1.** 5 digital ideas exist in triage data but are not active. Do not bring it back without explicit user confirmation.

**Monetization:**
- Free tier with affiliate revenue (Amazon Associates US, AliExpress affiliate)
- Pro tier ($9-19/mo) for power features (unlimited macros, AI Q&A, analytics)

---

## Current state — what's built, what's not

### Built and working
- Onboarding flow (adaptive: physical gets channel question, others skip)
- Swipe deck (Framer Motion gestures, text-led card variants every 5th card)
- Stories breakdown (auto-advance 8s, paused on Materials story)
- Materials story (renamed from "Distributors") with 3 source cards (Amazon kit / supplier / bulk)
- Where to Sell story (after Materials)
- Todo list (grouped by saved idea, strikethrough on done)
- Region picker (US active, others "coming soon")
- USD-only pricing
- Admin panel: /admin, /admin/triage, /admin/audit-review with K/C/S/P keyboard shortcuts
- Visual polish pass (fade-up motion, "Easy weekend" effort labels, calm empty state)
- Supabase backend (profiles, saved_ideas, active_plans, plan_tasks, todos, swipe_history, all RLS)
- Google OAuth + email/password auth (useAuth hook)
- Background sync to Supabase (useSupabaseSync, localStorage stays primary)
- 5 category-specific 30-day launch plans (Physical Handmade, Physical Resell, SaaS, POD/Printables, Food & Beverage)
- 23 category-specific supplier groups with keyword matching (92% match rate)
- Profit calculator component
- Filter sheet component
- Trust strip component
- Deployed to Vercel (spark-tau-virid.vercel.app)

### Built but using mock/fake data
- **Supplier cards** — currently use 7 category templates serving all ideas. "Sample - Real suppliers loading" label is visible. Will go live when Amazon Associates and AliExpress are approved.
- **Inspire profiles** — mock IG-style profiles, not real scraped data yet.

### Audit results (most recent)
- **Physical audit** (scripts/audit-results.json): 880 audited — keep=464, cut=293, needs-review=123
- **SaaS audit** (scripts/audit-saas-results.json): 150 audited — keep=121, cut=17, needs-review=12
- **Triage file** (Downloads/spark-triage-audit-2026-04-27.json): 1,018 ideas, 989 scored (sparkScore 48-78, avg 61.2), 0 recommended, 0 with breakdownScore
- **Unaudited:** ~160 ideas (difference between triage total and audit totals) need re-run

### NOT built yet (don't claim these are done)
- `is_published=true` publishing gate (currently the deck shows everything — no filter in code)
- Real auth signup flow deployed cleanly (Supabase wired but not production-hardened)
- Click tracking with affiliate webhook conversion
- Daily SKU freshness verifier cron
- Beta user invitation system
- Native iOS app (Spark is a web PWA only)
- Privacy policy and terms of service
- App Store metadata, screenshots, preview video
- The hand-written copy by Subhanu (he's writing it; do not regenerate AI copy)
- The hand-rewritten idea hooks (he's rewriting them; do not regenerate)

---

## The vision (don't drift from this)

Spark is the **discovery + decision + first-purchase layer** that no other app owns. Every competitor (Minea, DSers, Alura, Etsy tools) starts at "you already have a store." Spark starts at "you don't know what to start."

**The 10-stage user journey** (build in order, only build later stages when earlier ones validate):
1. Onboarding (built)
2. Broad swipe (built)
3. Macro variation swipe (built)
4. Inspire profiles — see real sellers (built, mock data)
5. Stories breakdown (built)
6. Buy starter kit (built, mock supplier data)
7. Make first product — recipe mode (NOT built — wait until Stage 5 validates)
8. List first product — AI listing writer (NOT built)
9. Listing optimizer (NOT built — Pro tier)
10. Competitor spy (NOT built — Pro tier)
11. Scale up — multi-channel sync (NOT built — Pro tier)

**Do NOT skip ahead and build Stages 7-10 until 100+ users have completed Stage 6.**

---

## What NOT to do — hard rules

These have been violated before. Don't violate them again.

1. **Never generate fake content and present it as validated.** No "Quick check: real product category" badges on AI-generated ideas. If we don't have data, show no data.

2. **Never extrapolate scores or validation across categories.** A category-level benchmark is not a per-idea score. Don't fake precision.

3. **Never auto-publish.** Every `is_published=true` move requires Subhanu's explicit review in the admin panel.

4. **Never regenerate hand-written copy.** Subhanu is hand-writing hooks, breakdowns, and onboarding copy. Don't run an AI rewrite over his work.

5. **Never re-run an audit on Subhanu-confirmed ideas.** The needs-review items, once decided, stay decided.

6. **Never add new categories or expand the database without explicit approval.** The volume problem (1018 total, 430 keepers) was real. Don't recreate it.

7. **Never add Google Trends, Pinterest scrapers, or any new data source as a primary filter.** Trends is *secondary* signal layered on top of audit, not a replacement.

8. **Never integrate suppliers via scraping when an affiliate API exists.** Amazon, eBay, AliExpress all have free affiliate APIs — use them.

9. **Never build for India/UAE/Russia/Kazakhstan in v1.** Region infrastructure exists in types (US/IN/AE/RU/KZ) for v2 but v1 is USA only.

10. **Never bring back the Digital Products deck without explicit confirmation.** It was deliberately cut.

11. **Never claim mobile testing without testing on a real device.** If you can't test on iOS Safari + Android Chrome, say so.

12. **Never mix Type A audit (rules-based, can be automated) with Type B audit (taste, only Subhanu can do).** Agents do volume. Subhanu does taste.

---

## Pending blockers (these unlock everything else)

1. **Amazon Associates US approval** — needed for real Amazon supplier data in Materials story.
2. **AliExpress affiliate approval** — needed for real AliExpress supplier data.
3. **Subhanu's 135 needs-review decisions** — 123 physical + 12 SaaS. Until done, can't lock keep list.
4. **Re-run the ~160 unaudited ideas** — pending Subhanu's confirmation to run.
5. **Subhanu's hand-written copy** — pending. No AI text regeneration until he ships it.

---

## Tech stack (do not deviate)

- **Frontend:** React 19 + TypeScript 6 + Vite 8 + TailwindCSS 4 + Framer Motion 12
- **Backend:** Supabase (Postgres + Auth) — project ref: mzzuddgeicocictwtprc
- **Hosting:** Vercel (production: spark-tau-virid.vercel.app)
- **AI:** Anthropic Claude (Sonnet 4 for content quality, Haiku 4.5 for batch jobs); Gemini Flash acceptable for high-volume audit if quality is verified
- **Affiliate:** Amazon PA-API, AliExpress Affiliate API, eBay EPN (none active yet)
- **Scrapers:** Apify (only when no API exists) — Etsy scraper used for 30 validations so far
- **Email:** Resend (existing CreativeIntel account)
- **Analytics:** PostHog (not yet integrated)
- **Payments:** Stripe (Brandally LLC account, EIN ending 6209)

---

## File map

```
clients/spark/
  CLAUDE.md              <-- YOU ARE HERE
  SESSION_START.md       <-- Run this checklist every session
  PROGRESS.md            <-- What shipped each session
  AGENTS.md              <-- Agent specs and build order
  src/
    App.tsx              -- Router, main layout
    main.tsx             -- Entry point
    types/index.ts       -- All TypeScript interfaces
    data/
      index.ts           -- Merges hand-crafted + generated ideas
      ideas.ts           -- Hand-crafted ideas (richer data)
      generated-physical.ts  -- 800 generated physical ideas
      generated-saas.ts      -- 200 generated SaaS ideas
      macros.ts          -- Macro variations per idea
      inspire.ts         -- Mock inspire profiles
      sources.ts         -- Legacy source data
      supplier-directory.ts  -- 23 category supplier groups
      launch-plans.ts    -- 5 category-specific 30-day plans
    components/
      SwipeCard.tsx      -- Tinder-style swipe card
      StoriesPlayer.tsx  -- Stories breakdown player
      SourcingCards.tsx   -- Materials/supplier cards
      ProductPage.tsx    -- Full idea detail page
      Onboarding.tsx     -- Onboarding flow
      LaunchPlan.tsx     -- 30-day plan UI
      FilterSheet.tsx    -- Filter bottom sheet
      BottomNav.tsx      -- Navigation
      TodoList.tsx       -- User todos
      ValidationCard.tsx -- Real validation display
      ProfitCalculator.tsx
      RegionPicker.tsx
      InspireProfileFeed.tsx
      PhoneFrame.tsx, Topbar.tsx, TrustStrip.tsx, Toast.tsx
    hooks/
      useStore.ts        -- Zustand-style local state
      useDeck.ts         -- Deck filtering logic
      useAuth.ts         -- Supabase auth
      useSupabaseSync.ts -- Background sync
    lib/
      supabase.ts        -- Supabase client
      supplier-api.ts    -- Supplier API helpers
      badges.ts          -- Badge definitions
      constants.ts       -- App constants
      regions.ts         -- Region config
    pages/
      Admin.tsx           -- Admin panel
      AdminTriage.tsx     -- Triage view
      AdminAuditReview.tsx -- Audit review with K/C/S/P shortcuts
  scripts/
    generate-1000-ideas.py   -- Idea generator
    validate-ideas-apify.py  -- Apify Etsy validation
    merge-validation.py      -- Merge validation into TS
    fetch-unsplash-images.py -- Curated photos
    audit-agent.py           -- Physical audit agent
    audit-saas.py            -- SaaS audit agent
    triage-ideas.py          -- Triage classifier
    triage-strict.py         -- Strict triage
    validate-free.py         -- Free validation pipeline
    audit-results.json       -- 880 physical audit results
    audit-saas-results.json  -- 150 SaaS audit results
    triage-results.json      -- Triage output
    triage-summary.json      -- Triage summary stats
    validation-data.json     -- Etsy validation data
  supabase/
    config.toml          -- Supabase project config
    migrations/          -- SQL migrations
  research/              -- Research files
```

---

## Communication norms with Subhanu

1. **One task at a time.** When he asks for X, do X. Don't bundle Y and Z.
2. **Stop and report when blocked.** Don't pivot strategy mid-task without telling him.
3. **Send screenshots when claiming "done."** Visual proof for visible features. Counts/numbers for backend work.
4. **Don't fabricate progress.** If something didn't run, say so. If a model returned something weird, flag it.
5. **Push back when his ask conflicts with these rules** — better to ask once than break a rule.
6. **Use his tone preferences:** direct, concise, no corporate fluff. He wants honesty over politeness.
7. **He's running CreativeIntel in parallel.** Don't assume he has 40 hours/week for Spark — assume 10-20.

---

## Git rules

- **Git author:** Must use `roysubhanu@gmail.com` (Vercel Hobby blocks other authors)
- **Deploy flow:** git commit -> push -> verify Vercel -> tell user to refresh
- **Don't hardcode API keys in scripts** — GitHub push protection blocks them

---

## Files to keep updated

- `CLAUDE.md` (this file) — update on major scope changes
- `SESSION_START.md` — read at the start of every session
- `AGENTS.md` — spec for built/buildable agents
- `PROGRESS.md` — running log of what shipped each session

End of CLAUDE.md.
