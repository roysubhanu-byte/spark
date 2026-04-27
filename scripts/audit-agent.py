#!/usr/bin/env python3
"""
Claude/Gemini-powered audit agent for Spark idea triage.
Processes ideas in batches, scores on 5 axes, recommends keep/cut/review.

Uses Gemini Flash (cheapest option we have a key for).
Cost estimate: 1018 ideas × ~800 tokens each ≈ $0.50-1.00 total.

Usage:
  python3 scripts/audit-agent.py
  python3 scripts/audit-agent.py --batch 50    # process 50 ideas
  python3 scripts/audit-agent.py --dry-run     # show prompt, don't call API
"""

import json
import os
import sys
import time
import re
from urllib.request import Request, urlopen
from urllib.error import HTTPError

# Load API keys
GEMINI_KEY = os.getenv('GEMINI_API_KEY', '')
if not GEMINI_KEY:
    env_path = os.path.expanduser('~/Documents/Subhanuproject/.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith('GEMINI_API_KEY='):
                    GEMINI_KEY = line.strip().split('=', 1)[1]

OPENAI_KEY = os.getenv('OPENAI_API_KEY', '')
if not OPENAI_KEY:
    env_path = os.path.expanduser('~/Documents/Subhanuproject/.env')
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith('OPENAI_API_KEY='):
                    OPENAI_KEY = line.strip().split('=', 1)[1]

# Cost tracking
MAX_COST_USD = 3.0
COST_PER_CALL_EST = 0.001  # Gemini Flash is very cheap
running_cost = 0.0

AUDIT_PROMPT = """You are auditing a business idea for Spark, an app that helps beginners start handmade/creative product businesses sold on Etsy, TikTok Shop, Instagram Shop, Shopify, Amazon Handmade, or local markets in the USA. Budget: $0-500 to start.

CRITICAL: Spark is about MAKING and SELLING creative/handmade products — NOT Amazon dropshipping or reselling commodity goods. A "Leather Bracelet" idea means hand-stamping leather and selling on Etsy/TikTok Shop — NOT buying bracelets from China to flip on Amazon. Judge through the lens of a MAKER selling on multiple platforms.

Priority categories (be GENEROUS — these are core to our audience):
- Fashion & accessories (handmade jewelry, custom clothing — sells great on TikTok Shop, Instagram)
- Kids & baby products (handmade toys, organic baby items, educational kits — gift market)
- Gift-able products (personalized, custom, seasonal items — huge Etsy/Shopify category)
- Home decor (handmade, unique, craft-based items — Instagram aesthetic sells these)

Idea data:
{idea_json}

Score on 5 axes (1 = worst, 5 = best):

1. **hook_strength**: Does the hook give a beginner a clear REASON to pick this? 5 = specific angle/niche. 1 = just a product name.

2. **commodity_risk**: Would THIS product compete with Amazon Basics or mass dropshippers? 5 = pure commodity (ab roller, phone charger, aloe vera gel). 1 = inherently handmade/custom (hand-stamped leather, custom portraits, crochet bags). IMPORTANT: handmade jewelry, custom kids items, and personalized gifts should score 1-2 (low risk) because the handmade angle IS the differentiation.

3. **regulatory_risk**: 5 = FDA supplements, FCC electronics, serious licensing. 3 = food (cottage food laws exist but add friction). 1 = no regulation (crafts, decor, fashion, stationery).

4. **capital_honesty**: Can someone genuinely start making and selling this for the listed amount? 5 = yes. 1 = no.

5. **differentiation**: Can a maker add a unique spin on Etsy/TikTok/Instagram? 5 = many angles (personalization, custom colors, niche audience, seasonal). 1 = no room.

Recommend: 'keep' / 'cut' / 'needs-review'.
- 'keep': commodity_risk <= 3 AND regulatory_risk <= 3 AND differentiation >= 3
- 'cut': commodity_risk >= 5 OR regulatory_risk >= 5 OR (hook_strength <= 1 AND differentiation <= 1)
- 'needs-review': everything else

Return ONLY valid JSON:
{
  "idea_id": "the-id",
  "scores": { "hook_strength": N, "commodity_risk": N, "regulatory_risk": N, "capital_honesty": N, "differentiation": N },
  "duplicate_of": null,
  "recommendation": "keep",
  "reasoning": "2-3 sentences"
}"""


def call_gemini(prompt):
    """Call Gemini Flash API."""
    global running_cost
    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_KEY}'
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.1, "maxOutputTokens": 2048}
    }
    req = Request(url, method='POST')
    req.add_header('Content-Type', 'application/json')

    try:
        resp = urlopen(req, data=json.dumps(body).encode(), timeout=60)
        data = json.loads(resp.read().decode())
        running_cost += COST_PER_CALL_EST
        # Extract text from candidates — handle thinking models
        candidate = data.get('candidates', [{}])[0]
        content = candidate.get('content', {})
        parts = content.get('parts', [])
        # Find the text part (skip thought parts)
        for part in parts:
            if 'text' in part and not part.get('thought'):
                return part['text']
        # Fallback: return last part's text
        if parts:
            return parts[-1].get('text', '')
        return None
    except HTTPError as e:
        err = e.read().decode()[:200]
        print(f'  [gemini] HTTP {e.code}: {err}')
        return None
    except Exception as e:
        print(f'  [gemini] Error: {e}')
        return None


def audit_idea(idea):
    """Audit a single idea via Gemini."""
    idea_json = json.dumps({
        'id': idea['id'],
        'name': idea['name'],
        'deck': idea['deck'],
        'hook': idea.get('hook', ''),
        'capital': idea.get('capital', ''),
        'effort': idea.get('effort', 2),
        'interests': idea.get('interests', []),
    }, indent=2)

    prompt = AUDIT_PROMPT.replace('{idea_json}', idea_json)
    response = call_gemini(prompt)

    if not response:
        return None

    # Strip markdown code fences if present
    cleaned = response.strip()
    if cleaned.startswith('```'):
        cleaned = re.sub(r'^```(?:json)?\s*', '', cleaned)
        cleaned = re.sub(r'\s*```$', '', cleaned)

    # Parse JSON
    json_match = re.search(r'\{[\s\S]*\}', cleaned)
    if not json_match:
        return None

    try:
        result = json.loads(json_match.group())
        if 'scores' not in result or 'recommendation' not in result:
            return None
        # Ensure idea_id is set
        result['idea_id'] = idea['id']
        return result
    except json.JSONDecodeError:
        return None


def main():
    global running_cost

    batch_size = 1018
    dry_run = '--dry-run' in sys.argv
    if '--batch' in sys.argv:
        idx = sys.argv.index('--batch')
        batch_size = int(sys.argv[idx + 1])

    print('=== Spark Audit Agent ===')
    print(f'Model: Gemini Flash 2.0')
    print(f'API key: {"set" if GEMINI_KEY else "MISSING"}')
    print(f'Cost cap: ${MAX_COST_USD:.2f}')
    print(f'Dry run: {dry_run}')

    if not GEMINI_KEY:
        print('ERROR: No Gemini API key found. Set GEMINI_API_KEY or add to .env')
        sys.exit(1)

    # Load ideas
    ideas = []
    with open('src/data/ideas.ts') as f:
        content = f.read()
    hc_ids = set(re.findall(r"id:\s*'([a-z0-9-]+)'", content))

    for fname in ['src/data/generated-physical.ts', 'src/data/generated-saas.ts']:
        with open(fname) as f:
            lines = f.readlines()
        ideas.extend(json.loads(''.join(lines[5:])))

    # Skip hand-crafted (always S-tier)
    to_audit = [i for i in ideas if i['id'] not in hc_ids][:batch_size]
    print(f'Ideas to audit: {len(to_audit)} (skipping {len(hc_ids)} hand-crafted)')

    # Load existing results to resume
    results = {}
    if os.path.exists('scripts/audit-results.json'):
        with open('scripts/audit-results.json') as f:
            existing = json.load(f)
        results = {r['idea_id']: r for r in existing}
        print(f'Loaded {len(results)} existing results (will skip)')

    to_audit = [i for i in to_audit if i['id'] not in results]
    print(f'Remaining to process: {len(to_audit)}')
    est_cost = len(to_audit) * COST_PER_CALL_EST
    print(f'Estimated cost: ${est_cost:.2f}')

    if dry_run:
        print('\n--- DRY RUN: showing prompt for first idea ---')
        idea_json = json.dumps({k: to_audit[0][k] for k in ['id', 'name', 'deck', 'hook', 'capital', 'effort', 'interests']}, indent=2)
        print(AUDIT_PROMPT.replace('{idea_json}', idea_json))
        return

    success = 0
    failed = 0

    for idx, idea in enumerate(to_audit):
        if running_cost >= MAX_COST_USD:
            print(f'\n*** COST CAP reached (${running_cost:.2f}). Stopping. ***')
            break

        print(f'[{idx+1}/{len(to_audit)}] {idea["name"]}... (${running_cost:.3f})', end=' ')

        result = audit_idea(idea)
        if result:
            results[idea['id']] = result
            rec = result['recommendation']
            scores = result.get('scores', {})
            total = sum(scores.values())
            print(f'{rec} (total={total}, hook={scores.get("hook_strength","?")})')
            success += 1

            # Save incrementally
            with open('scripts/audit-results.json', 'w') as f:
                json.dump(list(results.values()), f, indent=2)
        else:
            print('FAILED')
            failed += 1

        # Rate limit
        time.sleep(0.5)

    # Final stats
    all_results = list(results.values())
    keeps = [r for r in all_results if r['recommendation'] == 'keep']
    cuts = [r for r in all_results if r['recommendation'] == 'cut']
    reviews = [r for r in all_results if r['recommendation'] == 'needs-review']

    print(f'\n=== RESULTS ===')
    print(f'Processed: {success} success, {failed} failed')
    print(f'Cost: ${running_cost:.2f}')
    print(f'Keep: {len(keeps)} | Cut: {len(cuts)} | Needs review: {len(reviews)}')

    # Top 10 worst
    all_results.sort(key=lambda r: sum(r.get('scores', {}).values()))
    print(f'\n--- 10 WORST scored ---')
    for r in all_results[:10]:
        s = r.get('scores', {})
        print(f'  {r["idea_id"]}: {r["recommendation"]} — hook={s.get("hook_strength","?")}, commodity={s.get("commodity_risk","?")}, reg={s.get("regulatory_risk","?")} — {r.get("reasoning","")[:80]}')

    # Top 10 best
    all_results.sort(key=lambda r: sum(r.get('scores', {}).values()), reverse=True)
    print(f'\n--- 10 BEST scored ---')
    for r in all_results[:10]:
        s = r.get('scores', {})
        print(f'  {r["idea_id"]}: {r["recommendation"]} — hook={s.get("hook_strength","?")}, diff={s.get("differentiation","?")} — {r.get("reasoning","")[:80]}')

    with open('scripts/audit-results.json', 'w') as f:
        json.dump(all_results, f, indent=2)
    print(f'\nSaved to scripts/audit-results.json')


if __name__ == '__main__':
    main()
