# SESSION_START.md — Run this checklist at the start of every session

> Before you do ANY work, run through this orientation. It takes 60 seconds. Don't skip it.

---

## 1. Read CLAUDE.md fully

Yes, every session. The state changes weekly. Read the "Current state" and "Pending blockers" sections especially carefully — they tell you what NOT to assume is done.

## 2. Check PROGRESS.md

What was shipped in the last 1-3 sessions? What's the most recent decision Subhanu made? Don't repeat work or contradict recent decisions.

## 3. Check the 5 critical state checks

Before claiming any task is "easy" or "ready," verify:

- [ ] **Are Amazon Associates and AliExpress API credentials set in env vars yet?** Check `.env`. If not, supplier card work will be blocked. Many tasks depend on this.
- [ ] **What's the current keep/cut/needs-review count in the audit files?** Don't assume yesterday's numbers. Check `scripts/audit-results.json` and `scripts/audit-saas-results.json`.
- [ ] **Is there an `is_published` gate in the codebase?** Currently there is NOT — the deck shows everything. Check `src/data/index.ts`.
- [ ] **Are there pending tasks in TODO comments in the codebase that block what you're about to do?** Search `// TODO` and `// FIXME`.
- [ ] **Has Subhanu finished the 135 manual reviews yet?** (123 physical + 12 SaaS needs-review items)

## 4. Confirm the task with Subhanu before starting if any of these apply

- He asked for "everything" or "the whole thing" -> break it down, confirm scope before building
- He asked for new features that aren't on the roadmap -> confirm priority over pending blockers
- He asked you to undo or rebuild something recent -> confirm it's intentional
- His ask conflicts with a rule in CLAUDE.md "What NOT to do" -> flag and ask before acting
- The work touches more than 2 of: database schema, public UI, affiliate integration, content layer

## 5. Set up the work plan

Before writing code, write down (in chat or in a comment):

1. What's the goal of this task in one sentence?
2. What files will I touch?
3. What might break?
4. How will I verify it works (specific test, not "it should work")?
5. What's the success criteria Subhanu can see (screenshot, number, working flow)?

If you can't answer all 5, ask Subhanu to clarify before coding.

## 6. After the work is done

- Test on real mobile if visible to users (Safari iOS + Chrome Android). If you can't, say so explicitly.
- Send Subhanu: screenshot/numbers + one-paragraph summary + what broke or surprised you + what's next.
- Update `PROGRESS.md` with what shipped this session.
- Update `CLAUDE.md` "Current state" section if anything material changed.

## 7. STOP discipline

After completing the requested task, STOP. Do not:

- Pivot to a related task without asking
- Start a new feature because the current one is "almost done and you have time"
- Run optimizations that weren't requested
- Generate AI content if Subhanu is hand-writing it
- Re-audit anything Subhanu has already confirmed

If you finish early, ask: "Done with X. What's the next priority?"

End of SESSION_START.md.
