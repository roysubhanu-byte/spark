#!/usr/bin/env python3
"""
Needs-Review Resolution Agent
Resolves 135 needs-review ideas using:
1. Existing audit scores (hook, commodity, regulatory, capital, differentiation)
2. Existing triage data (sparkScore, competition, tier)
3. Google Trends (free, no API key needed)

Output: scripts/needs-review-resolved.json
"""

import json
import time
import sys
from pathlib import Path

# Try Google Trends
try:
    from pytrends.request import TrendReq
    HAS_TRENDS = True
except ImportError:
    HAS_TRENDS = False
    print("WARNING: pytrends not installed, skipping Google Trends data")

SCRIPT_DIR = Path(__file__).parent

def load_data():
    """Load audit results and triage data."""
    with open(SCRIPT_DIR / 'audit-results.json') as f:
        physical = json.load(f)
    with open(SCRIPT_DIR / 'audit-saas-results.json') as f:
        saas = json.load(f)

    # Try Downloads triage first, then local
    triage_path = Path.home() / 'Downloads' / 'spark-triage-audit-2026-04-27.json'
    if not triage_path.exists():
        triage_path = SCRIPT_DIR / 'triage-results.json'

    with open(triage_path) as f:
        triage = json.load(f)

    return physical, saas, {t['id']: t for t in triage}

def get_trends_batch(keywords, retries=2):
    """Get Google Trends interest for a batch of keywords (max 5)."""
    if not HAS_TRENDS:
        return {}

    pytrends = TrendReq(hl='en-US', tz=360)
    results = {}

    for attempt in range(retries):
        try:
            pytrends.build_payload(keywords, cat=0, timeframe='today 12-m', geo='US')
            data = pytrends.interest_over_time()

            if data.empty:
                for kw in keywords:
                    results[kw] = {'avg': 0, 'trend': 'no-data'}
                return results

            for kw in keywords:
                if kw in data.columns:
                    values = data[kw].tolist()
                    avg = sum(values) / len(values) if values else 0
                    # Compare last 3 months vs first 3 months
                    recent = values[-13:] if len(values) >= 13 else values
                    early = values[:13] if len(values) >= 13 else values
                    recent_avg = sum(recent) / len(recent) if recent else 0
                    early_avg = sum(early) / len(early) if early else 0

                    if early_avg == 0:
                        trend = 'stable'
                    elif recent_avg / early_avg > 1.2:
                        trend = 'rising'
                    elif recent_avg / early_avg < 0.8:
                        trend = 'declining'
                    else:
                        trend = 'stable'

                    results[kw] = {'avg': round(avg, 1), 'trend': trend}
                else:
                    results[kw] = {'avg': 0, 'trend': 'no-data'}

            return results

        except Exception as e:
            if attempt < retries - 1:
                print(f"  Trends retry {attempt+1}: {e}")
                time.sleep(5)
            else:
                print(f"  Trends failed for batch: {e}")
                for kw in keywords:
                    results[kw] = {'avg': 0, 'trend': 'no-data'}

    return results

def resolve_idea(idea_audit, triage_data, trends_data):
    """Make keep/cut decision for a single needs-review idea."""
    idea_id = idea_audit['idea_id']
    scores = idea_audit['scores']
    t = triage_data.get(idea_id, {})

    spark = t.get('sparkScore', 0)
    comp = t.get('competition', 'unknown')
    tier = t.get('tier', '?')

    # Get audit scores (physical vs saas have different keys)
    reg_risk = scores.get('regulatory_risk', scores.get('no_regulatory_burden', 3))
    commodity = scores.get('commodity_risk', 3)
    diff = scores.get('differentiation', scores.get('hook_strength', 3))
    hook = scores.get('hook_strength', 3)

    # Search term for trends
    search_term = idea_id.replace('-', ' ')
    trend_info = trends_data.get(search_term, {'avg': 0, 'trend': 'no-data'})

    # Scoring system
    keep_score = 0
    cut_score = 0
    reasons = []

    # --- Spark Score ---
    if spark >= 68:
        keep_score += 1.5
        reasons.append(f'sparkScore {spark} (strong)')
    elif spark >= 62:
        keep_score += 0.5
        reasons.append(f'sparkScore {spark} (decent)')
    elif spark < 55:
        cut_score += 0.5
        reasons.append(f'sparkScore {spark} (weak)')

    # --- Competition ---
    if comp == 'medium':
        keep_score += 1.5
        reasons.append('medium competition (good)')
    elif comp == 'low':
        keep_score += 2
        reasons.append('low competition (great)')
    elif comp == 'high':
        keep_score += 0.3
        reasons.append('high competition')
    elif comp == 'very-high':
        cut_score += 1.5
        reasons.append('very-high competition')

    # --- Google Trends ---
    if trend_info['trend'] == 'rising':
        keep_score += 1.5
        reasons.append(f"Google Trends RISING (avg {trend_info['avg']})")
    elif trend_info['trend'] == 'stable':
        keep_score += 0.3
        reasons.append(f"Google Trends stable (avg {trend_info['avg']})")
    elif trend_info['trend'] == 'declining':
        cut_score += 1
        reasons.append(f"Google Trends declining (avg {trend_info['avg']})")

    # --- Regulatory risk ---
    if reg_risk >= 5:
        cut_score += 2
        reasons.append('HIGH regulatory risk (5/5)')
    elif reg_risk >= 4:
        cut_score += 1
        reasons.append(f'regulatory risk {reg_risk}/5')

    # --- Commodity risk ---
    if commodity >= 5:
        cut_score += 1.5
        reasons.append('pure commodity (5/5)')
    elif commodity >= 4:
        cut_score += 0.5
        reasons.append(f'commodity risk {commodity}/5')

    # --- Differentiation ---
    if diff >= 4:
        keep_score += 1
        reasons.append(f'differentiation {diff}/5')
    elif diff <= 2:
        cut_score += 0.5
        reasons.append(f'low differentiation {diff}/5')

    # --- Hook strength ---
    if hook >= 4:
        keep_score += 0.5
        reasons.append(f'hook {hook}/5')

    # --- Tier ---
    if tier == 'S':
        keep_score += 1
    elif tier == 'C':
        cut_score += 0.3

    # Decision
    net = keep_score - cut_score

    if net >= 1.5:
        decision = 'keep'
        confidence = 'high'
    elif net >= 0.5:
        decision = 'keep'
        confidence = 'medium'
    elif net >= -0.5:
        decision = 'keep'  # bias toward keeping
        confidence = 'low (borderline, kept with inclusion bias)'
    else:
        decision = 'cut'
        confidence = 'high' if net <= -1.5 else 'medium'

    return {
        'idea_id': idea_id,
        'decision': decision,
        'confidence': confidence,
        'net_score': round(net, 1),
        'keep_score': round(keep_score, 1),
        'cut_score': round(cut_score, 1),
        'sparkScore': spark,
        'competition': comp,
        'tier': tier,
        'google_trends': trend_info,
        'reasons': reasons,
        'original_reasoning': idea_audit.get('reasoning', '')
    }

def main():
    print("=== Needs-Review Resolution Agent ===\n")

    physical, saas, triage_map = load_data()

    phys_review = [r for r in physical if r['recommendation'] == 'needs-review']
    saas_review = [r for r in saas if r['recommendation'] == 'needs-review']

    all_review = [(r, 'physical') for r in phys_review] + [(r, 'saas') for r in saas_review]
    print(f"Total needs-review: {len(all_review)} ({len(phys_review)} physical, {len(saas_review)} SaaS)\n")

    # Fetch Google Trends in batches of 5
    trends_data = {}
    if HAS_TRENDS:
        keywords = [r[0]['idea_id'].replace('-', ' ') for r in all_review]
        print(f"Fetching Google Trends for {len(keywords)} keywords (batches of 5)...")

        for i in range(0, len(keywords), 5):
            batch = keywords[i:i+5]
            print(f"  Batch {i//5 + 1}/{(len(keywords)+4)//5}: {batch}")
            batch_results = get_trends_batch(batch)
            trends_data.update(batch_results)
            if i + 5 < len(keywords):
                time.sleep(2)  # Rate limit

        print(f"Got trends for {len(trends_data)} keywords\n")

    # Resolve each idea
    results = []
    for audit_item, audit_type in all_review:
        result = resolve_idea(audit_item, triage_map, trends_data)
        result['audit_type'] = audit_type
        results.append(result)

    # Summary
    keeps = [r for r in results if r['decision'] == 'keep']
    cuts = [r for r in results if r['decision'] == 'cut']

    print(f"=== RESULTS ===")
    print(f"KEEP: {len(keeps)}")
    print(f"CUT: {len(cuts)}")

    # Sort by confidence
    high_conf_keeps = [r for r in keeps if 'high' in r['confidence']]
    med_conf_keeps = [r for r in keeps if 'medium' in r['confidence']]
    low_conf_keeps = [r for r in keeps if 'low' in r['confidence']]

    print(f"\nKEEP breakdown: {len(high_conf_keeps)} high confidence, {len(med_conf_keeps)} medium, {len(low_conf_keeps)} borderline")

    print(f"\n--- TOP KEEPS (highest net score) ---")
    for r in sorted(keeps, key=lambda x: -x['net_score'])[:10]:
        print(f"  {r['idea_id']}: net={r['net_score']}, spark={r['sparkScore']}, comp={r['competition']}, trends={r['google_trends']['trend']}")

    print(f"\n--- TOP CUTS (lowest net score) ---")
    for r in sorted(cuts, key=lambda x: x['net_score'])[:10]:
        print(f"  {r['idea_id']}: net={r['net_score']}, spark={r['sparkScore']}, comp={r['competition']}, trends={r['google_trends']['trend']}")

    # Save results
    output_path = SCRIPT_DIR / 'needs-review-resolved.json'
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\nResults saved to {output_path}")

    # Save summary
    summary = {
        'total': len(results),
        'keep': len(keeps),
        'cut': len(cuts),
        'keep_high_confidence': len(high_conf_keeps),
        'keep_medium_confidence': len(med_conf_keeps),
        'keep_borderline': len(low_conf_keeps),
        'trends_fetched': len([r for r in results if r['google_trends']['trend'] != 'no-data']),
        'keep_ids': [r['idea_id'] for r in keeps],
        'cut_ids': [r['idea_id'] for r in cuts]
    }
    summary_path = SCRIPT_DIR / 'needs-review-summary.json'
    with open(summary_path, 'w') as f:
        json.dump(summary, f, indent=2)
    print(f"Summary saved to {summary_path}")

if __name__ == '__main__':
    main()
