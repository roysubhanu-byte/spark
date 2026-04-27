#!/usr/bin/env python3
"""
Per-idea audit using GPT-4o. One API call per idea. No batching.
No category averaging. Each idea scored on its own merits.

Cost: ~1018 ideas × $0.005 = ~$5
"""

import json
import os
import sys
import time
import re
from urllib.request import Request, urlopen
from urllib.error import HTTPError

OPENAI_KEY = ''
env_path = os.path.expanduser('~/Documents/Subhanuproject/.env')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            if line.startswith('OPENAI_API_KEY='):
                OPENAI_KEY = line.strip().split('=', 1)[1]

MAX_COST = 8.0
COST_PER_CALL = 0.005
running_cost = 0.0

PROMPT = """You are auditing one specific business idea for Spark, an app for first-time entrepreneurs in the USA with $0-500 capital. Your job is to decide if this SPECIFIC IDEA — not its category — is structurally viable for a beginner.

Idea name: {name}
Hook: {hook}
Deck: {deck}
Capital range (USD): {capital}

Score this specific idea on 5 axes (each 1-5, integers only):

1. hook_strength: Does THIS hook explain why a beginner should pick THIS idea over similar ones? Score the actual hook text, not the category. Score 5 = clear specific angle. Score 1 = generic product description.

2. commodity_risk: How saturated is THIS specific product (not its category)? 'Soy Candles' is more crowded than 'Goat Milk Soap' even though both are in 'soap/candles'. Score 5 = dominated by big brands and dropshippers. Score 1 = real differentiation room.

3. regulatory_risk: Does THIS specific idea need FDA/FCC/license? Score 5 = serious compliance. Score 1 = none.

4. capital_honesty: Is the capital range realistic for THIS product? Score 5 = honest beginner can start. Score 1 = ignores real costs.

5. differentiation: Does THIS specific hook show a niche/cultural/personalization/seasonal angle? Score 5 = clear angle in the hook itself. Score 1 = generic.

Recommendation: 'keep' / 'cut' / 'needs-review'.

Output JSON only. No category averaging. No batched thinking. Score this one idea on its own.

{
  "idea_id": "",
  "scores": { "hook_strength": 0, "commodity_risk": 0, "regulatory_risk": 0, "capital_honesty": 0, "differentiation": 0 },
  "recommendation": "keep",
  "reasoning": "2-3 sentences"
}"""


def call_gpt4o(idea):
    global running_cost

    prompt = PROMPT.replace('{name}', idea['name']).replace('{hook}', idea.get('hook', '')).replace('{deck}', idea['deck']).replace('{capital}', idea.get('capital', ''))

    body = {
        'model': 'gpt-4o-mini',
        'messages': [{'role': 'user', 'content': prompt}],
        'temperature': 0.2,
        'max_tokens': 300,
    }

    req = Request('https://api.openai.com/v1/chat/completions', method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('Authorization', f'Bearer {OPENAI_KEY}')

    try:
        resp = urlopen(req, data=json.dumps(body).encode(), timeout=30)
        data = json.loads(resp.read().decode())
        running_cost += COST_PER_CALL
        text = data['choices'][0]['message']['content']

        # Parse JSON
        cleaned = text.strip()
        if cleaned.startswith('```'):
            cleaned = re.sub(r'^```(?:json)?\s*', '', cleaned)
            cleaned = re.sub(r'\s*```$', '', cleaned)

        match = re.search(r'\{[\s\S]*\}', cleaned)
        if not match:
            return None

        result = json.loads(match.group())
        if 'scores' not in result or 'recommendation' not in result:
            return None
        result['idea_id'] = idea['id']
        return result

    except HTTPError as e:
        print(f'  HTTP {e.code}: {e.read().decode()[:100]}')
        return None
    except Exception as e:
        print(f'  Error: {e}')
        return None


def main():
    global running_cost

    print('=== Spark Audit — GPT-4o (per-idea, no batching) ===')
    print(f'API key: {"set" if OPENAI_KEY else "MISSING"}')
    print(f'Cost cap: ${MAX_COST:.0f}')

    if not OPENAI_KEY:
        print('ERROR: No OpenAI API key')
        sys.exit(1)

    # Load all ideas
    ideas = []
    hc_ids = set()
    with open('src/data/ideas.ts') as f:
        hc_ids = set(re.findall(r"id:\s*'([a-z0-9-]+)'", f.read()))

    for fname in ['src/data/generated-physical.ts', 'src/data/generated-saas.ts']:
        with open(fname) as f:
            lines = f.readlines()
        ideas.extend(json.loads(''.join(lines[5:])))

    all_ideas = [i for i in ideas if i['id'] not in hc_ids]
    print(f'Total ideas: {len(all_ideas)} (excluding {len(hc_ids)} hand-crafted)')

    # Load existing to resume
    out_path = 'scripts/audit-gpt4o-results.json'
    results = {}
    if os.path.exists(out_path):
        with open(out_path) as f:
            for r in json.load(f):
                results[r['idea_id']] = r
        print(f'Loaded {len(results)} existing (resuming)')

    remaining = [i for i in all_ideas if i['id'] not in results]
    print(f'Remaining: {len(remaining)}')
    print(f'Est cost: ${len(remaining) * COST_PER_CALL:.2f}')

    success = 0
    failed = 0

    for idx, idea in enumerate(remaining):
        if running_cost >= MAX_COST:
            print(f'\n*** COST CAP ${running_cost:.2f} ***')
            break

        print(f'[{idx+1}/{len(remaining)}] {idea["name"]}... (${running_cost:.2f})', end=' ')

        result = call_gpt4o(idea)
        if result:
            results[idea['id']] = result
            s = result['scores']
            total = sum(s.values())
            print(f'{result["recommendation"]} (total={total} h={s["hook_strength"]} c={s["commodity_risk"]} d={s["differentiation"]})')
            success += 1

            # Save incrementally
            if success % 10 == 0:
                with open(out_path, 'w') as f:
                    json.dump(list(results.values()), f, indent=2)
        else:
            print('FAILED')
            failed += 1

        time.sleep(0.3)

    # Final save
    all_results = list(results.values())
    with open(out_path, 'w') as f:
        json.dump(all_results, f, indent=2)

    keeps = [r for r in all_results if r['recommendation'] == 'keep']
    cuts = [r for r in all_results if r['recommendation'] == 'cut']
    revs = [r for r in all_results if r['recommendation'] not in ('keep', 'cut')]

    print(f'\n=== RESULTS ===')
    print(f'Audited: {len(all_results)}')
    print(f'Keep: {len(keeps)} ({len(keeps)/max(1,len(all_results))*100:.0f}%)')
    print(f'Cut: {len(cuts)} ({len(cuts)/max(1,len(all_results))*100:.0f}%)')
    print(f'Review: {len(revs)} ({len(revs)/max(1,len(all_results))*100:.0f}%)')
    print(f'Cost: ${running_cost:.2f}')
    print(f'Success: {success}, Failed: {failed}')

    # Score dispersion check
    totals = [sum(r.get('scores', {}).values()) for r in all_results if r.get('scores')]
    if totals:
        from collections import Counter
        c = Counter(totals)
        print(f'\nScore dispersion: {len(set(totals))} unique values across {len(totals)} ideas')
        print(f'Range: {min(totals)}-{max(totals)}')
        print(f'Top 5 most common: {c.most_common(5)}')

    # Top 10
    all_results.sort(key=lambda r: sum(r.get('scores', {}).values()), reverse=True)
    print(f'\n--- TOP 10 ---')
    for r in all_results[:10]:
        s = r.get('scores', {})
        print(f'  {sum(s.values())} | {r["idea_id"]} | {r["recommendation"]} | {r.get("reasoning","")[:80]}')

    # Bottom 10
    all_results.sort(key=lambda r: sum(r.get('scores', {}).values()))
    print(f'\n--- BOTTOM 10 ---')
    for r in all_results[:10]:
        s = r.get('scores', {})
        print(f'  {sum(s.values())} | {r["idea_id"]} | {r["recommendation"]} | {r.get("reasoning","")[:80]}')


if __name__ == '__main__':
    main()
