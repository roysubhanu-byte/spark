#!/usr/bin/env python3
"""
Fetches unique, relevant images from Unsplash API for every published idea.
Uses smart search queries to maximize relevance.
Rate limit: 50 req/hour. Strategy: search per idea name, get 1 result each.
Will batch across multiple hours if needed, with resume support.
"""

import json
import re
import time
import requests
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
UNSPLASH_KEY = 'mEDTMEQxVS5TszE3Wnasr2lD0RSEIWaRxqaUqLWFx7w'
HEADERS = {'Authorization': f'Client-ID {UNSPLASH_KEY}'}

def search_photo(query, orientation='squarish'):
    """Search Unsplash for a single photo matching the query."""
    try:
        resp = requests.get('https://api.unsplash.com/search/photos', params={
            'query': query,
            'per_page': 1,
            'orientation': orientation,
        }, headers=HEADERS, timeout=10)

        remaining = int(resp.headers.get('X-Ratelimit-Remaining', 50))

        if resp.status_code == 200:
            data = resp.json()
            if data['results']:
                photo = data['results'][0]
                return {
                    'id': photo['id'],
                    'url': photo['urls']['regular'],
                    'small': photo['urls']['small'],
                    'thumb': photo['urls']['thumb'],
                    'author': photo['user']['name'],
                    'remaining': remaining,
                }
        elif resp.status_code == 403:
            print(f"\n  RATE LIMITED. Remaining: {remaining}. Waiting 60 min...")
            return 'rate_limited'

        return None
    except Exception as e:
        print(f"  Error: {e}")
        return None

def build_search_query(name, deck):
    """Build an effective Unsplash search query from idea name."""
    # Clean up the name for better search results
    q = name.lower()
    q = q.replace('(', '').replace(')', '').replace('&', 'and')
    q = q.replace('pod ', '').replace('ai ', '')  # remove prefixes that confuse search

    # For SaaS/tech, use related visual concepts
    if deck == 'saas':
        tech_visuals = {
            'resume': 'laptop resume writing', 'email': 'email inbox laptop',
            'meeting': 'video meeting laptop', 'blog': 'blogging laptop coffee',
            'code': 'coding laptop screen', 'social': 'social media phone',
            'invoice': 'invoice business desk', 'logo': 'logo design creative',
            'video': 'video editing screen', 'podcast': 'podcast microphone',
            'newsletter': 'newsletter email', 'calendar': 'calendar planning desk',
            'crm': 'business dashboard', 'tracker': 'analytics dashboard',
            'builder': 'website building laptop', 'generator': 'creative tools desk',
        }
        for keyword, visual in tech_visuals.items():
            if keyword in q:
                return visual
        return 'saas software dashboard laptop'

    # For physical products, the name itself usually works great
    # But add "product" or "handmade" for better results
    if any(w in q for w in ['custom', 'personalized', 'engraved']):
        return q + ' handmade'

    return q + ' product'

def main():
    # Load published ideas
    with open(SCRIPT_DIR / 'final-publish-list.json') as f:
        publish = json.load(f)

    all_ids = set(publish['physical_keep_ids'] + publish['saas_keep_ids'])

    # Load idea names from triage
    with open(Path.home() / 'Downloads' / 'spark-triage-audit-2026-04-27.json') as f:
        triage = json.load(f)
    triage_map = {t['id']: t for t in triage}

    # Also get names from TS files
    for filename in ['generated-physical.ts', 'generated-saas.ts']:
        filepath = SCRIPT_DIR.parent / 'src' / 'data' / filename
        with open(filepath) as f:
            content = f.read()
        for match in re.finditer(r'"id":\s*"([^"]+)"[^}]*?"name":\s*"([^"]+)"', content):
            if match.group(1) not in triage_map:
                triage_map[match.group(1)] = {'id': match.group(1), 'name': match.group(2), 'deck': 'physical'}

    # Resume support
    output_path = SCRIPT_DIR / 'unsplash-images.json'
    results = {}
    if output_path.exists():
        with open(output_path) as f:
            results = json.load(f)
        print(f"Resuming: {len(results)} already fetched")

    # Build work list (only ideas we haven't fetched yet)
    work = []
    for idea_id in sorted(all_ids):
        if idea_id in results:
            continue
        t = triage_map.get(idea_id)
        if t:
            work.append({
                'id': idea_id,
                'name': t.get('name', idea_id),
                'deck': t.get('deck', 'physical'),
            })

    print(f"Need to fetch: {len(work)} images")
    print(f"At 50/hour rate limit, this will take ~{len(work) // 50 + 1} hour(s)")

    if not work:
        print("Nothing to do!")
        return

    fetched = 0
    errors = 0

    for i, idea in enumerate(work):
        query = build_search_query(idea['name'], idea['deck'])
        print(f"[{i+1}/{len(work)}] {idea['name']} -> \"{query}\"", end=' ', flush=True)

        result = search_photo(query)

        if result == 'rate_limited':
            # Save progress and exit
            with open(output_path, 'w') as f:
                json.dump(results, f, indent=2)
            print(f"\nSaved {len(results)} results. Run again in 1 hour to continue.")
            return

        if result:
            results[idea['id']] = {
                'url': result['url'],
                'small': result['small'],
                'photo_id': result['id'],
                'author': result['author'],
                'query': query,
            }
            fetched += 1
            remaining = result.get('remaining', '?')
            print(f"OK (remaining: {remaining})")
        else:
            errors += 1
            print("NO RESULTS")

        # Save every 10
        if (fetched + errors) % 10 == 0:
            with open(output_path, 'w') as f:
                json.dump(results, f, indent=2)

        # Rate limit: stay under 50/hour
        time.sleep(1.5)

    # Final save
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)

    print(f"\n=== DONE ===")
    print(f"Fetched: {fetched}")
    print(f"Errors: {errors}")
    print(f"Total in file: {len(results)}")
    print(f"Run again to continue if rate limited.")

if __name__ == '__main__':
    main()
