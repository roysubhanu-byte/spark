#!/usr/bin/env python3
"""
Triage all 1,000 Spark ideas into quality tiers.

Reality check: there are NOT 700 garbage ideas. All ideas come from
curated seed lists. The real issue is content depth, not plausibility.

Tiers:
  S = 30 hand-crafted (already real research)
  A = none yet (goal: upgrade 70 B-tier ideas with real data)
  B = plausible product, has market, worth upgrading
  C = cut (too ambitious capital, too niche, or SaaS that needs $600+)

Process (no paid APIs):
  1. Check capital range (>$500 = C for physical, >$600 = C for SaaS)
  2. Check if product name is a real product type (manual category audit)
  3. Rate breakdown uniqueness (does it use category-specific language?)
  4. Score = capital_fit + category_reality + breakdown_quality
  5. Top 70 B-tier → upgrade_priority=true

Cost: $0 (no API calls — just data analysis)
"""

import json
import os
import re

def load_all_ideas():
    """Load hand-crafted + generated ideas separately."""
    handcrafted_ids = set()

    # Get hand-crafted idea IDs
    with open('src/data/ideas.ts') as f:
        content = f.read()
    hc_ids = re.findall(r"id:\s*'([a-z0-9-]+)'", content)
    handcrafted_ids = set(hc_ids)

    # Load generated
    generated = []
    for fname in ['src/data/generated-physical.ts', 'src/data/generated-saas.ts']:
        with open(fname) as f:
            lines = f.readlines()
        generated.extend(json.loads(''.join(lines[5:])))

    return handcrafted_ids, generated


def rate_breakdown_quality(idea):
    """
    Rate how specific vs generic the breakdown is. 1-5 scale.
    Checks for category-specific language vs template phrases.
    """
    breakdown = idea.get('breakdown', {})
    score = 0

    strategy = breakdown.get('strategy', {}).get('body', '')
    value = breakdown.get('value', {}).get('body', '')
    distributors = breakdown.get('distributors', {}).get('body', '')

    # Check strategy — does it mention the specific product?
    if idea['name'].lower() in strategy.lower() or f"<strong>{idea['name']}</strong>" in strategy:
        score += 1

    # Check if strategy has category-specific advice (not just "own that one angle")
    category_markers = [
        'jewelry', 'candle', 'soap', 'leather', 'wood', 'food', 'pet', 'baby',
        'fitness', 'garden', 'eco', 'vintage', 'travel', 'craft', 'print',
        'SaaS', 'extension', 'API', 'tool', 'platform', 'app'
    ]
    if any(m.lower() in strategy.lower() for m in category_markers):
        score += 1

    # Check distributors — does it mention REAL supplier names?
    real_suppliers = [
        'aliexpress', 'alibaba', 'indiamart', 'faire', 'tandy', 'candlescience',
        'printful', 'printify', 'gelato', 'rockler', 'vercel', 'supabase',
        'stripe', 'bulksupplements', 'beautysourcing', 'pandahall', 'sticker mule'
    ]
    supplier_mentions = sum(1 for s in real_suppliers if s.lower() in distributors.lower())
    if supplier_mentions >= 3:
        score += 2
    elif supplier_mentions >= 1:
        score += 1

    # Check value prop — does it describe a SPECIFIC buyer?
    buyer_markers = ['22-35', '25-40', 'woman', 'parent', 'maker', 'developer',
                     'marketer', 'freelancer', 'pet parent', 'student']
    if any(m.lower() in value.lower() for m in buyer_markers):
        score += 1

    return min(5, max(1, score))


def triage(idea, handcrafted_ids):
    """Classify a single idea into S/B/C tier."""

    # S-tier: hand-crafted
    if idea['id'] in handcrafted_ids:
        return 'S', 5, 'Hand-crafted with real research'

    cap_high = idea.get('capital_usd', {}).get('high', 0)
    deck = idea.get('deck', 'physical')

    # C-tier: too expensive for beginners
    if deck == 'physical' and cap_high > 500:
        return 'C', 1, f'Capital too high (${cap_high}) for beginner audience'
    if deck == 'saas' and cap_high > 600:
        return 'C', 1, f'SaaS capital too high (${cap_high}) — needs dev team'

    # Rate breakdown quality
    bq = rate_breakdown_quality(idea)

    # Check if product name sounds real vs AI-weird
    name = idea['name'].lower()
    ai_weird = ['quantum', 'blockchain', 'metaverse', 'nft', 'crypto', 'web3']
    if any(w in name for w in ai_weird):
        return 'C', bq, 'AI hallucination keyword detected'

    # SaaS ideas that are too ambitious for solo founders
    ambitious_saas = ['marketplace builder', 'tutoring marketplace', 'language learning app',
                      'code learning platform', 'online retreat platform', 'ci/cd pipeline builder',
                      'log aggregator']
    if name in ambitious_saas:
        return 'C', bq, 'Too ambitious for solo founder (needs team + funding)'

    # Everything else is B-tier (plausible, needs upgrading)
    # Score determines upgrade priority
    priority_score = bq

    # Boost ideas in trending categories
    trending_cats = ['eco', 'fitness', 'pets', 'garden', 'woodwork', 'vintage', 'leather']
    if any(i in idea.get('interests', []) for i in trending_cats):
        priority_score += 1

    # Boost ideas with lower competition
    validation = idea.get('validation', {})
    competition = validation.get('competition', {}).get('saturationLevel', 'high')
    if competition in ['low', 'medium']:
        priority_score += 1

    # Boost ideas with lower capital (more accessible)
    cap_low = idea.get('capital_usd', {}).get('low', 100)
    if cap_low <= 50:
        priority_score += 1

    return 'B', priority_score, f'Plausible product, breakdown quality {bq}/5'


def main():
    print('=== Spark Idea Triage ===')
    print('Cost: $0 (no API calls)')
    print()

    handcrafted_ids, generated = load_all_ideas()
    print(f'Hand-crafted ideas (S-tier): {len(handcrafted_ids)}')
    print(f'Generated ideas to triage: {len(generated)}')

    results = []
    tier_counts = {'S': 0, 'A': 0, 'B': 0, 'C': 0}

    for idea in generated:
        tier, score, reason = triage(idea, handcrafted_ids)
        tier_counts[tier] += 1
        results.append({
            'id': idea['id'],
            'name': idea['name'],
            'deck': idea['deck'],
            'capital': idea.get('capital', ''),
            'interests': idea.get('interests', []),
            'quality_tier': tier,
            'priority_score': score,
            'reason': reason,
        })

    # Sort B-tier by priority score (highest first)
    b_tier = [r for r in results if r['quality_tier'] == 'B']
    b_tier.sort(key=lambda x: x['priority_score'], reverse=True)

    # Mark top 70 B-tier for upgrade — spread across categories (3 per category min)
    # First: pick top 3 from each category
    from collections import defaultdict
    by_cat = defaultdict(list)
    for item in b_tier:
        cat_key = ','.join(item['interests'])
        by_cat[cat_key].append(item)

    upgrade_ids = set()
    # Round 1: top 3 from each category
    for cat, items in by_cat.items():
        for item in items[:3]:
            upgrade_ids.add(item['id'])
            if len(upgrade_ids) >= 70:
                break

    # Round 2: fill remaining from overall top scores
    if len(upgrade_ids) < 70:
        for item in b_tier:
            if item['id'] not in upgrade_ids:
                upgrade_ids.add(item['id'])
            if len(upgrade_ids) >= 70:
                break

    for r in results:
        if r['id'] in upgrade_ids:
            r['upgrade_priority'] = True

    # Add upgrade_priority=False to the rest
    for r in results:
        if 'upgrade_priority' not in r:
            r['upgrade_priority'] = False

    print(f'\n=== RESULTS ===')
    print(f'S-tier (hand-crafted): {tier_counts["S"]}')
    print(f'B-tier (plausible, keep): {tier_counts["B"]}')
    print(f'C-tier (cut): {tier_counts["C"]}')
    print(f'Upgrade priority (top 70): {len([r for r in results if r.get("upgrade_priority")])}')

    # Show C-tier reasons
    c_tier = [r for r in results if r['quality_tier'] == 'C']
    print(f'\n=== C-TIER IDEAS ({len(c_tier)}) ===')
    for r in c_tier:
        print(f'  [{r["deck"]}] {r["name"]} — {r["reason"]}')

    # Show top 10 B-tier (upgrade candidates)
    print(f'\n=== TOP 10 UPGRADE CANDIDATES ===')
    for r in b_tier[:10]:
        print(f'  Score {r["priority_score"]} | {r["name"]} | {r["deck"]} | {r["capital"]} | {", ".join(r["interests"])}')

    # Show bottom 10 B-tier
    print(f'\n=== BOTTOM 10 B-TIER (borderline) ===')
    for r in b_tier[-10:]:
        print(f'  Score {r["priority_score"]} | {r["name"]} | {r["deck"]} | {r["capital"]}')

    # Save triage results
    with open('scripts/triage-results.json', 'w') as f:
        json.dump(results, f, indent=2)
    print(f'\nSaved to scripts/triage-results.json')

    # Save summary
    summary = {
        'total': len(generated),
        'tier_counts': tier_counts,
        'upgrade_priority_count': len([r for r in results if r.get('upgrade_priority')]),
        'c_tier_reasons': {r['name']: r['reason'] for r in c_tier},
        'top_70_ids': [r['id'] for r in b_tier[:70]],
    }
    with open('scripts/triage-summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print('Saved summary to scripts/triage-summary.json')


if __name__ == '__main__':
    main()
