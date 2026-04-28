#!/usr/bin/env python3
"""
Breakdown Rewriter — rewrites all 6 breakdown sections for each published idea
using Claude Sonnet with per-idea specifics. Coach tone + real numbers.

Usage: ANTHROPIC_API_KEY=sk-... python3 scripts/rewrite-breakdowns.py [--limit 10] [--dry-run]

Cost estimate: ~500 ideas x 6 sections x ~200 tokens each = ~600K tokens out
  Sonnet input: ~500 ideas x ~300 tokens = 150K tokens in
  Total: ~$3-5
"""

import json
import time
import sys
import os
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
SRC_DIR = SCRIPT_DIR.parent / 'src' / 'data'

# Parse args
limit = None
dry_run = False
for i, arg in enumerate(sys.argv[1:]):
    if arg == '--limit' and i + 1 < len(sys.argv) - 1:
        limit = int(sys.argv[i + 2])
    if arg == '--dry-run':
        dry_run = True
    if arg.isdigit() and sys.argv[i] == '--limit':
        pass

try:
    import anthropic
except ImportError:
    print("pip install anthropic")
    sys.exit(1)

client = anthropic.Anthropic()

SYSTEM_PROMPT = """You write engaging business idea breakdowns for a mobile app called Spark.
Your audience: adults who want to start a small business but don't know what to start.

VOICE RULES:
- Coach tone. Direct. Like a smart friend explaining over coffee.
- Use contractions (you're, it's, don't, won't).
- Short sentences. Then a longer one. Then short again.
- Include at least one specific number or real example per section.
- No marketing jargon. No "leverage", "ecosystem", "synergy".
- No em dashes. Use commas, periods, or parentheses.
- Start with the insight, not background.
- If you don't know a real number, use a realistic range based on the category.

OUTPUT FORMAT: Return valid JSON with exactly 6 keys. Each key has "body" (2-3 sentences, the insight), "action" (1 sentence, what to do next), and optionally "stats" (array of {label, value} pairs, max 3).

The 6 keys are: strategy, value, profit, distributors, pricing, sellingPrice"""

def build_prompt(idea_name: str, idea_deck: str, idea_hook: str, idea_capital: str, idea_interests: list) -> str:
    return f"""Write a 6-section breakdown for this business idea:

Name: {idea_name}
Type: {idea_deck}
Hook: {idea_hook}
Starting capital: {idea_capital}
Category: {', '.join(idea_interests[:3]) if idea_interests else 'general'}

Return JSON:
{{
  "strategy": {{"body": "...", "action": "...", "stats": [{{"label": "...", "value": "..."}}]}},
  "value": {{"body": "...", "action": "...", "stats": [...]}},
  "profit": {{"body": "...", "action": "...", "stats": [...]}},
  "distributors": {{"body": "...", "action": "...", "stats": [...]}},
  "pricing": {{"body": "...", "action": "...", "stats": [...]}},
  "sellingPrice": {{"body": "...", "action": "...", "stats": [...]}}
}}

strategy = Why this works (the angle, what makes this idea viable NOW)
value = Who buys this (the specific buyer, their pain, what they'll pay)
profit = Your profit math (cost to make, sell price, margin, monthly potential)
distributors = What you need (materials, tools, where to source them)
pricing = How to price it (pricing strategy, tiers, anchor pricing)
sellingPrice = Where to sell (best platforms for THIS specific product)

Be SPECIFIC to {idea_name}. Not generic. Real numbers."""

def rewrite_idea(idea):
    prompt = build_prompt(
        idea.get('name', ''),
        idea.get('deck', 'physical'),
        idea.get('hook', ''),
        idea.get('capital', '$0-500'),
        idea.get('interests', [])
    )

    try:
        resp = client.messages.create(
            model='claude-sonnet-4-20250514',
            max_tokens=1200,
            system=SYSTEM_PROMPT,
            messages=[{'role': 'user', 'content': prompt}]
        )
        text = resp.content[0].text.strip()

        # Extract JSON from response
        if text.startswith('{'):
            data = json.loads(text)
        elif '```json' in text:
            json_str = text.split('```json')[1].split('```')[0].strip()
            data = json.loads(json_str)
        elif '```' in text:
            json_str = text.split('```')[1].split('```')[0].strip()
            data = json.loads(json_str)
        else:
            data = json.loads(text)

        # Validate structure
        required_keys = ['strategy', 'value', 'profit', 'distributors', 'pricing', 'sellingPrice']
        for k in required_keys:
            if k not in data:
                print(f"  WARN: Missing key {k} for {idea['id']}")
                return None
            if 'body' not in data[k] or 'action' not in data[k]:
                print(f"  WARN: Missing body/action in {k} for {idea['id']}")
                return None

        return data

    except json.JSONDecodeError as e:
        print(f"  JSON parse error for {idea['id']}: {e}")
        return None
    except Exception as e:
        print(f"  API error for {idea['id']}: {e}")
        return None

def load_ideas():
    """Load all published ideas from the TS files."""
    with open(SCRIPT_DIR / 'final-publish-list.json') as f:
        publish = json.load(f)
    keep_ids = set(publish['physical_keep_ids'] + publish['saas_keep_ids'])

    # Parse ideas from generated files (extract JSON-like data)
    ideas = []

    # Load the triage data for extra info
    triage_path = Path.home() / 'Downloads' / 'spark-triage-audit-2026-04-27.json'
    if triage_path.exists():
        with open(triage_path) as f:
            triage = json.load(f)
        for t in triage:
            if t['id'] in keep_ids:
                ideas.append({
                    'id': t['id'],
                    'name': t['name'],
                    'deck': t['deck'],
                    'hook': t.get('note', ''),
                    'capital': '$0-500',
                    'interests': [],
                })

    # Also try to get hooks from the actual TS data
    for ts_file in ['generated-physical.ts', 'generated-saas.ts']:
        fpath = SRC_DIR / ts_file
        if fpath.exists():
            content = fpath.read_text()
            # Quick and dirty: extract id and hook from the TS
            import re
            # Find all idea blocks
            for match in re.finditer(r'"id":\s*"([^"]+)"', content):
                idea_id = match.group(1)
                if idea_id in keep_ids:
                    # Find the hook near this id
                    pos = match.start()
                    chunk = content[pos:pos+500]
                    hook_match = re.search(r'"hook":\s*"([^"]*)"', chunk)
                    name_match = re.search(r'"name":\s*"([^"]*)"', chunk)
                    deck_match = re.search(r'"deck":\s*"([^"]*)"', chunk)
                    cap_match = re.search(r'"capital":\s*"([^"]*)"', chunk)
                    interest_match = re.search(r'"interests":\s*\[([^\]]*)\]', chunk)

                    # Update existing or add
                    existing = next((i for i in ideas if i['id'] == idea_id), None)
                    if existing:
                        if hook_match and not existing['hook']:
                            existing['hook'] = hook_match.group(1)
                        if name_match:
                            existing['name'] = name_match.group(1)
                        if deck_match:
                            existing['deck'] = deck_match.group(1)
                        if cap_match:
                            existing['capital'] = cap_match.group(1)
                        if interest_match:
                            existing['interests'] = [s.strip().strip('"') for s in interest_match.group(1).split(',') if s.strip()]
                    elif name_match:
                        ideas.append({
                            'id': idea_id,
                            'name': name_match.group(1),
                            'deck': deck_match.group(1) if deck_match else 'physical',
                            'hook': hook_match.group(1) if hook_match else '',
                            'capital': cap_match.group(1) if cap_match else '$0-500',
                            'interests': [s.strip().strip('"') for s in interest_match.group(1).split(',') if s.strip()] if interest_match else [],
                        })

    # Deduplicate by id
    seen = set()
    unique = []
    for i in ideas:
        if i['id'] not in seen:
            seen.add(i['id'])
            unique.append(i)

    return unique

def main():
    print("=== Breakdown Rewriter ===\n")

    ideas = load_ideas()
    print(f"Loaded {len(ideas)} published ideas")

    if limit:
        ideas = ideas[:limit]
        print(f"Limited to {limit} ideas")

    if dry_run:
        print(f"\nDRY RUN: would rewrite {len(ideas)} ideas")
        for i in ideas[:5]:
            print(f"  {i['id']}: {i['name']} ({i['deck']})")
        return

    # Load existing results to resume
    output_path = SCRIPT_DIR / 'breakdown-rewrites.json'
    results = {}
    if output_path.exists():
        with open(output_path) as f:
            results = json.load(f)
        print(f"Resuming: {len(results)} already done")

    # Process
    total = len(ideas)
    done = 0
    errors = 0
    skipped = 0

    for i, idea in enumerate(ideas):
        if idea['id'] in results:
            skipped += 1
            continue

        print(f"[{i+1}/{total}] {idea['name']}...", end=' ', flush=True)
        data = rewrite_idea(idea)

        if data:
            results[idea['id']] = data
            done += 1
            print("OK")
        else:
            errors += 1
            print("FAILED")

        # Save every 20 ideas
        if (done + errors) % 20 == 0:
            with open(output_path, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"  [Checkpoint: {len(results)} saved]")

        # Rate limit: ~50 req/min for Sonnet
        time.sleep(0.5)

    # Final save
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)

    print(f"\n=== DONE ===")
    print(f"Rewritten: {done}")
    print(f"Skipped (already done): {skipped}")
    print(f"Errors: {errors}")
    print(f"Total in file: {len(results)}")
    print(f"Saved to {output_path}")

if __name__ == '__main__':
    main()
