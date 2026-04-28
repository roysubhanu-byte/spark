#!/usr/bin/env python3
"""
Validates rewritten breakdowns for number contradictions and quality issues.
Flags: "great margin" + "$0 profit", missing numbers, contradicting claims.
"""

import json
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

def extract_numbers(text):
    """Extract all dollar amounts and percentages from text."""
    dollars = re.findall(r'\$[\d,]+(?:\.\d+)?(?:[-–]\$?[\d,]+(?:\.\d+)?)?', text)
    percents = re.findall(r'[\d.]+%', text)
    return dollars, percents

def check_contradictions(idea_id, sections):
    """Check for number contradictions in a breakdown."""
    issues = []

    # Collect all text
    profit_text = sections.get('profit', {}).get('body', '') + ' ' + str(sections.get('profit', {}).get('stats', ''))
    pricing_text = sections.get('pricing', {}).get('body', '') + ' ' + str(sections.get('pricing', {}).get('stats', ''))
    strategy_text = sections.get('strategy', {}).get('body', '')

    all_text = ' '.join(s.get('body', '') for s in sections.values())

    # Check 1: Claims of profit but shows $0 or 0%
    if any(w in profit_text.lower() for w in ['great margin', 'high margin', 'strong margin', 'excellent margin']):
        if '$0' in profit_text or '0%' in profit_text or 'zero profit' in profit_text.lower():
            issues.append('CONTRADICTION: Claims great margin but shows $0 or 0% profit')

    # Check 2: Cost higher than selling price
    cost_match = re.findall(r'cost[s]?\s*(?:you\s*)?\$?([\d.]+)', profit_text.lower())
    sell_match = re.findall(r'(?:sell|charge|price)\s*(?:at\s*)?\$?([\d.]+)', profit_text.lower() + ' ' + pricing_text.lower())
    if cost_match and sell_match:
        try:
            max_cost = max(float(c) for c in cost_match)
            min_sell = min(float(s) for s in sell_match)
            if max_cost > min_sell and min_sell > 0:
                issues.append(f'CONTRADICTION: Cost ${max_cost} > selling price ${min_sell}')
        except ValueError:
            pass

    # Check 3: Empty sections
    for key in ['strategy', 'value', 'profit', 'distributors', 'pricing', 'sellingPrice']:
        section = sections.get(key, {})
        body = section.get('body', '')
        action = section.get('action', '')
        if len(body) < 20:
            issues.append(f'EMPTY: {key} body too short ({len(body)} chars)')
        if len(action) < 10:
            issues.append(f'EMPTY: {key} action too short ({len(action)} chars)')

    # Check 4: No numbers in profit section (should always have numbers)
    dollars, percents = extract_numbers(profit_text)
    if not dollars and not percents:
        issues.append('MISSING: Profit section has no dollar amounts or percentages')

    # Check 5: Generic phrases that should be specific
    generic_phrases = ['many people', 'a lot of', 'significant demand', 'huge market', 'growing industry']
    for phrase in generic_phrases:
        if phrase in all_text.lower():
            issues.append(f'GENERIC: Found vague phrase "{phrase}" — should use specific numbers')

    # Check 6: Banned AI words
    banned = ['leverage', 'synergy', 'ecosystem', 'paradigm', 'utilize', 'facilitate']
    for word in banned:
        if word in all_text.lower():
            issues.append(f'AI-WORD: Found banned word "{word}"')

    return issues

def main():
    path = SCRIPT_DIR / 'breakdown-rewrites.json'
    if not path.exists():
        print("No breakdown-rewrites.json found")
        return

    with open(path) as f:
        data = json.load(f)

    print(f"Validating {len(data)} breakdowns...\n")

    clean = 0
    flagged = 0
    all_issues = {}

    for idea_id, sections in data.items():
        issues = check_contradictions(idea_id, sections)
        if issues:
            flagged += 1
            all_issues[idea_id] = issues
        else:
            clean += 1

    print(f"Clean: {clean}")
    print(f"Flagged: {flagged}")

    if all_issues:
        print(f"\n--- FLAGGED IDEAS ---")
        for idea_id, issues in sorted(all_issues.items()):
            print(f"\n  {idea_id}:")
            for issue in issues:
                print(f"    - {issue}")

    # Save flagged list
    with open(SCRIPT_DIR / 'breakdown-validation.json', 'w') as f:
        json.dump({
            'total': len(data),
            'clean': clean,
            'flagged': flagged,
            'issues': all_issues,
        }, f, indent=2)

    print(f"\nSaved to scripts/breakdown-validation.json")

if __name__ == '__main__':
    main()
