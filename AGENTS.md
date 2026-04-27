# AGENTS.md — Spec for Claude-Code-built agents

> Each agent below is a script that runs against the Spark database. They're for volume + consistency. Subhanu makes the final taste calls.

---

## Built agents

### 1. Audit Agent (Physical) — `scripts/audit-agent.py`

**Purpose:** Score every physical-product idea on 5 axes, recommend keep/cut/needs-review.

**Status:** DONE. 880 ideas audited. Results in `scripts/audit-results.json`.

**Results:** keep=464, cut=293, needs-review=123

**Rubric:**
- `hook_strength` (1-5): Does the hook explain WHY a beginner should pick this idea?
- `commodity_risk` (1-5): How saturated is this category?
- `regulatory_risk` (1-5): FDA/FCC/licensing required?
- `capital_honesty` (1-5): Is the listed capital realistic?
- `differentiation` (1-5): Specific angle (niche/cultural/personalization/bundling/seasonal)?

**Recommendation rules:**
- `keep`: passes 4+ axes >=3, no regulatory_risk=5, not a duplicate
- `cut`: fails 2+ axes <=2, OR commodity_risk=5, OR regulatory_risk=5, OR clear duplicate
- `needs-review`: mixed signals, human judgment needed

**When to re-run:** Only when adding new physical ideas in batches >20, or after fundamental rubric changes Subhanu approves.

---

### 2. Audit Agent (SaaS) — `scripts/audit-saas.py`

**Purpose:** Score SaaS ideas on a different rubric than physical (no maker bias).

**Status:** DONE. 150 ideas audited. Results in `scripts/audit-saas-results.json`.

**Results:** keep=121, cut=17, needs-review=12

**Rubric:**
- `revenue_potential` (1-5): Real revenue exists?
- `solopreneur_viability` (1-5): One person can build + maintain?
- `capital_realistic` (1-5): Under $50K to start?
- `no_regulatory_burden` (1-5): No HIPAA/SOC2/FDA?
- `hook_strength` (1-5): Clear ICP and angle?

**Important:** Do NOT apply maker-product bias here. SaaS ideas can be developer-focused, B2B, or technical.

---

### 3. Triage Agent — `scripts/triage-ideas.py` + `scripts/triage-strict.py`

**Purpose:** Classify all 1,000+ ideas into quality tiers (S/A/B/C) with sparkScore and competition level.

**Status:** DONE. 1,018 ideas triaged. Results in `scripts/triage-results.json` and `scripts/triage-summary.json`.

**Results:** S=12, B=553 (note: most B-tier have not been deeply audited), C=453. Triage also identified 70 upgrade-priority ideas and 8 C-tier cuts.

---

## Buildable agents (not yet built)

### 4. Breakdown Rewriter — `scripts/rewrite-breakdowns.ts`

**Purpose:** Given a confirmed-keep idea + real seller research data, produce a breakdown in coach tone.

**Status:** Not built. Will be built after Subhanu finishes hand-writing the first 50 example breakdowns to set the voice.

**Do NOT build this until:**
1. Subhanu has hand-written 30-50 breakdowns to set the voice template
2. Subhanu has approved the prompt structure
3. Real seller research data is gathered for at least 50 ideas

---

### 5. Supplier Matcher — `scripts/populate-skus.ts`

**Purpose:** For each confirmed-keep idea, fetch real Amazon + AliExpress + eBay SKUs.

**Status:** Not built. Needs real integration once Amazon Associates + AliExpress API credentials are approved.

**Steps:**
1. Pull search keywords from idea data
2. Call Amazon PA-API SearchItems -> top 3 results
3. Call AliExpress Affiliate API get_products -> top 3 results
4. Call eBay Browse API -> top 3 results (US region only)
5. Pick top 1 per source = 3 cards per idea per region
6. Write results with affiliate-tagged URLs

**Verification:** Open the app, swipe to "Soy Candles," see real Amazon ASIN with rating + review count + Prime badge in the Materials story.

---

### 6. SKU Verifier — `scripts/verify-skus.ts`

**Purpose:** Daily cron that re-checks the top 100 most-clicked SKUs for stock + price changes.

**Status:** Not built.

**Trigger:** Build only after Supplier Matcher has been live for 1 week with real clicks happening.

---

### 7. Where-To-Sell Generator — `scripts/where-to-sell.ts`

**Purpose:** For each confirmed idea, recommend 2-3 best platforms with one-line why.

**Status:** Not built.

---

## Agent build order

If Subhanu asks you to build agents, follow this sequence:

1. **Supplier Matcher** (after Amazon/AliExpress approvals) — biggest UX unlock
2. **Where-To-Sell Generator** — small but useful
3. **SKU Verifier** — only after Matcher has live data
4. **Breakdown Rewriter** — only after Subhanu finishes hand-writing voice template

Do not build out of order without asking.

---

## Anti-patterns to avoid

1. **Don't build a "do everything" master agent.** Each agent has one job.
2. **Don't auto-trigger agents on database changes.** All agent runs are manually triggered or cron'd. No surprise costs.
3. **Don't run agents on Subhanu-confirmed data.** Once an idea has a hand-written hook, agents don't touch it.
4. **Don't fabricate when an API returns nothing.** Empty result is a real result. Don't fill it with AI guesses.
5. **Don't combine multiple agent runs into a single chained pipeline without checkpointing.** Each agent writes results before next agent starts.

End of AGENTS.md.
