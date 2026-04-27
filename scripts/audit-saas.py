#!/usr/bin/env python3
"""
SaaS-specific audit agent for Spark ideas.
Uses solopreneur viability rubric — NOT the maker-product rubric.

Criteria:
1. Real revenue potential (plausible based on category benchmarks)
2. Solopreneur viability (one person can build + maintain)
3. Capital under $50K to start (broader bar than physical)
4. No regulated-industry requirement (no HIPAA/SOC2/FDA)
5. Hook strength (clear ICP and angle)

Usage:
  python3 scripts/audit-saas.py
"""

import json
import os
import sys
import time
import re
from urllib.request import Request, urlopen
from urllib.error import HTTPError

# Load API key
GEMINI_KEY = ''
env_path = os.path.expanduser('~/Documents/Subhanuproject/.env')
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            if line.startswith('GEMINI_API_KEY='):
                GEMINI_KEY = line.strip().split('=', 1)[1]

MAX_COST_USD = 2.0
COST_PER_CALL = 0.001
running_cost = 0.0

SAAS_AUDIT_PROMPT = """You are auditing a SaaS/software business idea for Spark, an app that helps solopreneurs start software businesses. This is NOT about handmade products — it's about building and selling software tools.

Idea data:
{idea_json}

Score on 5 axes (1 = worst, 5 = best):

1. **revenue_potential**: Is there real revenue in this category? Consider: do similar tools charge $10-100/mo? Are there successful indie competitors (on Indie Hackers, Product Hunt)? 5 = proven revenue category (email tools, CRMs, schedulers). 1 = no one pays for this.

2. **solopreneur_viability**: Can ONE person build and maintain this? 5 = a solo dev can ship an MVP in 2-4 weeks (Chrome extension, simple SaaS tool). 1 = needs a team of 5+ (marketplace, social network, language learning app).

3. **capital_realistic**: Can someone start this for under $500 using free tiers (Vercel, Supabase, Stripe)? 5 = yes, $0 to start. 3 = needs some paid APIs ($50-200/mo). 1 = needs significant infrastructure ($1000+/mo).

4. **no_regulatory_burden**: Does this avoid regulated industries? 5 = no compliance needed (productivity tools, content tools). 3 = light compliance (payment processing, basic data privacy). 1 = heavy compliance (healthcare/HIPAA, finance/SOC2, legal).

5. **hook_strength**: Does the hook give a clear ICP (ideal customer profile) and angle? 5 = specific problem for specific person ("AI meeting notes for sales teams"). 1 = vague ("a tool for people").

Recommend: 'keep' / 'cut' / 'needs-review'.
- 'keep': solopreneur_viability >= 3 AND revenue_potential >= 3 AND no_regulatory_burden >= 3
- 'cut': solopreneur_viability <= 2 OR revenue_potential <= 1 OR no_regulatory_burden <= 2
- 'needs-review': everything else

Return ONLY valid JSON:
{
  "idea_id": "the-id",
  "scores": { "revenue_potential": N, "solopreneur_viability": N, "capital_realistic": N, "no_regulatory_burden": N, "hook_strength": N },
  "recommendation": "keep",
  "reasoning": "2-3 sentences"
}"""


def call_gemini(prompt):
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
        running_cost += COST_PER_CALL
        candidate = data.get('candidates', [{}])[0]
        parts = candidate.get('content', {}).get('parts', [])
        for part in parts:
            if 'text' in part and not part.get('thought'):
                return part['text']
        if parts:
            return parts[-1].get('text', '')
        return None
    except HTTPError as e:
        print(f'  [gemini] HTTP {e.code}: {e.read().decode()[:100]}')
        return None
    except Exception as e:
        print(f'  [gemini] Error: {e}')
        return None


def audit_saas_idea(idea):
    idea_json = json.dumps({
        'id': idea['id'],
        'name': idea['name'],
        'deck': idea['deck'],
        'hook': idea.get('hook', ''),
        'capital': idea.get('capital', ''),
        'effort': idea.get('effort', 2),
        'interests': idea.get('interests', []),
    }, indent=2)

    prompt = SAAS_AUDIT_PROMPT.replace('{idea_json}', idea_json)
    response = call_gemini(prompt)
    if not response:
        return None

    cleaned = response.strip()
    if cleaned.startswith('```'):
        cleaned = re.sub(r'^```(?:json)?\s*', '', cleaned)
        cleaned = re.sub(r'\s*```$', '', cleaned)

    json_match = re.search(r'\{[\s\S]*\}', cleaned)
    if not json_match:
        return None

    try:
        result = json.loads(json_match.group())
        if 'scores' not in result or 'recommendation' not in result:
            return None
        result['idea_id'] = idea['id']
        result['audit_type'] = 'saas'
        return result
    except json.JSONDecodeError:
        return None


def main():
    global running_cost
    print('=== Spark SaaS Audit Agent ===')
    print(f'Rubric: solopreneur viability (NOT maker bias)')
    print(f'API key: {"set" if GEMINI_KEY else "MISSING"}')
    print(f'Cost cap: ${MAX_COST_USD:.2f}')

    if not GEMINI_KEY:
        print('ERROR: No Gemini API key')
        sys.exit(1)

    # Load all SaaS ideas
    saas_ideas = []
    for fname in ['src/data/generated-saas.ts', 'src/data/generated-physical.ts']:
        with open(fname) as f:
            lines = f.readlines()
        for idea in json.loads(''.join(lines[5:])):
            if idea['deck'] == 'saas':
                saas_ideas.append(idea)

    # Also check hand-crafted
    with open('src/data/ideas.ts') as f:
        content = f.read()
    hc_ids = set(re.findall(r"id:\s*'([a-z0-9-]+)'", content))

    saas_ideas = [i for i in saas_ideas if i['id'] not in hc_ids]
    print(f'SaaS ideas to audit: {len(saas_ideas)}')

    # Load existing SaaS audit results
    results = {}
    out_path = 'scripts/audit-saas-results.json'
    if os.path.exists(out_path):
        with open(out_path) as f:
            for r in json.load(f):
                results[r['idea_id']] = r
        print(f'Loaded {len(results)} existing results')

    to_audit = [i for i in saas_ideas if i['id'] not in results]
    print(f'Remaining: {len(to_audit)}')
    print(f'Estimated cost: ${len(to_audit) * COST_PER_CALL:.2f}')

    success = 0
    failed = 0

    for idx, idea in enumerate(to_audit):
        if running_cost >= MAX_COST_USD:
            print(f'\n*** COST CAP (${running_cost:.2f}) ***')
            break

        print(f'[{idx+1}/{len(to_audit)}] {idea["name"]}... (${running_cost:.3f})', end=' ')
        result = audit_saas_idea(idea)
        if result:
            results[idea['id']] = result
            s = result.get('scores', {})
            print(f'{result["recommendation"]} (rev={s.get("revenue_potential","?")}, solo={s.get("solopreneur_viability","?")})')
            success += 1
            with open(out_path, 'w') as f:
                json.dump(list(results.values()), f, indent=2)
        else:
            print('FAILED')
            failed += 1

        time.sleep(0.5)

    all_results = list(results.values())
    keeps = [r for r in all_results if r['recommendation'] == 'keep']
    cuts = [r for r in all_results if r['recommendation'] == 'cut']
    revs = [r for r in all_results if r['recommendation'] not in ('keep', 'cut')]

    print(f'\n=== SAAS AUDIT RESULTS ===')
    print(f'Audited: {len(all_results)}')
    print(f'Keep: {len(keeps)} ({len(keeps)/max(1,len(all_results))*100:.0f}%)')
    print(f'Cut: {len(cuts)} ({len(cuts)/max(1,len(all_results))*100:.0f}%)')
    print(f'Review: {len(revs)} ({len(revs)/max(1,len(all_results))*100:.0f}%)')
    print(f'Cost: ${running_cost:.2f}')
    print(f'Success: {success}, Failed: {failed}')

    # 5 random keeps with reasoning
    import random
    random.shuffle(keeps)
    print(f'\n--- 5 RANDOM KEEPS ---')
    for r in keeps[:5]:
        s = r.get('scores', {})
        print(f'  {r["idea_id"]}: rev={s.get("revenue_potential","?")}, solo={s.get("solopreneur_viability","?")}, hook={s.get("hook_strength","?")}')
        print(f'    {r.get("reasoning","")[:120]}')

    print(f'\n--- 5 WORST CUTS ---')
    all_results.sort(key=lambda r: sum(r.get('scores', {}).values()))
    for r in [x for x in all_results if x['recommendation'] == 'cut'][:5]:
        s = r.get('scores', {})
        print(f'  {r["idea_id"]}: rev={s.get("revenue_potential","?")}, solo={s.get("solopreneur_viability","?")}')
        print(f'    {r.get("reasoning","")[:120]}')


if __name__ == '__main__':
    main()
