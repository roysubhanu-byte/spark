#!/usr/bin/env python3
"""
Instagram Profile Scraper for Spark
Uses Apify Instagram Profile Scraper to get real seller profiles per category.

Strategy: For each of 20 product categories, search for 5-8 real Instagram
accounts that sell those products. Extract: handle, bio, followers, grid images.

Cost: ~$0.25 per run x 20 categories = ~$5 total

Usage: python3 scripts/scrape-instagram-profiles.py
"""

import json
import time
import os
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
APIFY_TOKEN = os.environ.get('APIFY_API_TOKEN', '')

if not APIFY_TOKEN:
    # Try loading from credentials file
    cred_path = Path(__file__).parent.parent.parent / 'integrations' / 'credentials' / '.env'
    if cred_path.exists():
        for line in cred_path.read_text().splitlines():
            if line.startswith('APIFY_API_TOKEN='):
                APIFY_TOKEN = line.split('=', 1)[1].strip()

if not APIFY_TOKEN:
    print("ERROR: No APIFY_API_TOKEN found")
    sys.exit(1)

try:
    import requests
except ImportError:
    print("pip install requests")
    sys.exit(1)

# Categories and search usernames
# These are REAL Instagram accounts that sell these products (manually researched)
CATEGORY_PROFILES = {
    'candles': [
        'brooklyncandle', 'voluspa', 'chesapeakebay', 'bathbodyworks',
        'paddy_wax', 'diptyque', 'yankeecandleofficial'
    ],
    'jewelry': [
        'mejuri', 'analuisany', 'gorjana', 'baublebar',
        'kendrascott', 'missomajewellery', 'catbirdnyc'
    ],
    'pets': [
        'barkbox', 'chewy', 'wilddogcompany', 'zee.dog',
        'modernbeast', 'maxbone', 'foundmyanimal'
    ],
    'beauty': [
        'glossier', 'herbivore', 'biaboricuaskincare', 'cocokind',
        'osealifestyle', 'supergoop', 'tatcha'
    ],
    'food': [
        'traderjoes', 'sietefoods', 'maboroshi.soy', 'grudbrothers',
        'mikshakes', 'drinkolipop', 'sirkensingtons'
    ],
    'home': [
        'westelm', 'thesill', 'burloakcandles', 'justinablakeney',
        'mcgeeandco', 'cascinasrl', 'serenaandlily'
    ],
    'fitness': [
        'gymshark', 'lululemon', 'myprotein', 'bfrbbands',
        'theragun', 'mandukayoga', 'hydrojug'
    ],
    'crafts': [
        'cricut', 'joann_stores', 'michaelsstores', 'sewcialists',
        'makingithappen_diy', 'weallsew', 'craftsbyamanda'
    ],
    'leather': [
        'saddlebackleather', 'portlandleathergoods', 'teranishi',
        'tannergoods', 'ugmonk', 'bellroy', 'makr'
    ],
    'kids': [
        'lovevery', 'primary', 'monicaandandy', 'maisonette',
        'goumi_kids', 'tinylove_official', 'mikihouse_official'
    ],
    'woodwork': [
        'woodcraft_official', 'festool_usa', 'mywoodworking',
        'makeville', 'sawdustsavvy', 'woodworkersjournal'
    ],
    'fashion': [
        'everlane', 'thereformation', 'sframeofficial', 'aritzia',
        'madewell', 'frankandoak', 'kotn'
    ],
    'garden': [
        'bloomscape', 'thesill', 'pistilsnursery', 'gardeners',
        'monrovia_plants', 'seedsavers', 'plant.one.on.me'
    ],
    'wellness': [
        'ritualaura', 'seedhealth', 'moonjuice', 'foursigmatic',
        'athleticgreens', 'calm', 'headspace'
    ],
    'eco': [
        'packagefreeshop', 'earthhero_', 'publicgoods',
        'by.humankind', 'plaine_products', 'etee.ca', 'meliora.cleaning'
    ],
    'vintage': [
        'whatgoesaroundnyc', 'therealreal', 'vestiairecollective',
        'shopcursive', 'goodfairshop', 'thriftedltd'
    ],
    'stationery': [
        'rifrufpaper', 'riflepaperco', 'maboroshisoy', 'papersource',
        'letterfolk', 'moglea', 'confettiandcream'
    ],
    'tech': [
        'vercel', 'linearapp', 'figma', 'notion', 'rayaboricuas',
        'supabase', 'stripe'
    ],
    'party': [
        'partycity', 'orientaltrading', 'merimeriparty', 'ofrframeofficial',
        'studiodiy', 'balloonbar', 'caspariinc'
    ],
    'supplements': [
        'athletic_greens', 'vitalproteins', 'olly', 'naturemade',
        'gardenoflife', 'ritual', 'thorne_research'
    ],
}

def scrape_profile(username):
    """Scrape a single Instagram profile using Apify."""
    url = 'https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items'
    params = {'token': APIFY_TOKEN}
    payload = {
        'usernames': [username],
        'resultsLimit': 1,
    }

    try:
        resp = requests.post(url, params=params, json=payload, timeout=60)
        if resp.status_code == 200:
            data = resp.json()
            if data and len(data) > 0:
                return data[0]
        return None
    except Exception as e:
        print(f"  Error scraping {username}: {e}")
        return None

def extract_profile_data(raw):
    """Extract clean profile data from Apify response."""
    if not raw:
        return None

    return {
        'handle': raw.get('username', ''),
        'name': raw.get('fullName', ''),
        'verified': raw.get('verified', False),
        'followers': format_followers(raw.get('followersCount', 0)),
        'bio': (raw.get('biography', '') or '')[:120],
        'profilePic': raw.get('profilePicUrl', ''),
        'posts': raw.get('postsCount', 0),
        'tiles': [
            p.get('displayUrl', '') or p.get('url', '')
            for p in (raw.get('latestPosts', []) or [])[:6]
            if p.get('displayUrl') or p.get('url')
        ],
    }

def format_followers(count):
    if count >= 1_000_000:
        return f"{count/1_000_000:.1f}M"
    if count >= 1_000:
        return f"{count/1_000:.0f}K"
    return str(count)

def main():
    print("=== Instagram Profile Scraper ===\n")

    output_path = SCRIPT_DIR / 'instagram-profiles.json'
    results = {}
    if output_path.exists():
        with open(output_path) as f:
            results = json.load(f)
        print(f"Resuming: {sum(len(v) for v in results.values())} profiles in {len(results)} categories")

    total_categories = len(CATEGORY_PROFILES)

    for cat_idx, (category, usernames) in enumerate(CATEGORY_PROFILES.items()):
        if category in results and len(results[category]) >= 3:
            print(f"[{cat_idx+1}/{total_categories}] {category}: already done ({len(results[category])} profiles)")
            continue

        print(f"[{cat_idx+1}/{total_categories}] {category}: scraping {len(usernames)} profiles...")
        profiles = results.get(category, [])
        existing_handles = set(p['handle'] for p in profiles)

        for username in usernames:
            if username in existing_handles:
                continue

            print(f"  @{username}...", end=' ', flush=True)
            raw = scrape_profile(username)
            clean = extract_profile_data(raw)

            if clean and clean['handle']:
                profiles.append(clean)
                print(f"OK ({clean['followers']} followers)")
            else:
                print("SKIP (not found or private)")

            time.sleep(1)  # Rate limit

        results[category] = profiles

        # Save after each category
        with open(output_path, 'w') as f:
            json.dump(results, f, indent=2)

    # Summary
    print(f"\n=== DONE ===")
    total_profiles = sum(len(v) for v in results.values())
    print(f"Categories: {len(results)}")
    print(f"Total profiles: {total_profiles}")
    for cat, profs in results.items():
        print(f"  {cat}: {len(profs)} profiles")
    print(f"Saved to {output_path}")

if __name__ == '__main__':
    main()
