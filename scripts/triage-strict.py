#!/usr/bin/env python3
"""
Strict triage for Spark ideas — beginner-business viability only.

An idea stays B-tier ONLY if ALL of these pass:
1. Hook has a specific angle (not just product description)
2. Not commoditized (Amazon Basics / mass dropship territory)
3. No regulatory complexity (FDA food, supplements, FCC electronics)
4. Capital genuinely under $500 including real hidden costs
5. Distinct from other ideas (no redundancies)

Target: ~150-300 B, ~700+ C
"""

import json
import re
from collections import defaultdict

# ============================================================
# COMMODITIZED PRODUCTS — Amazon Basics / mass market dominated
# ============================================================
COMMODITIZED_KEYWORDS = [
    'ab roller', 'aloe vera', 'ankle weight', 'grip strength', 'jump rope',
    'foam roller', 'resistance band', 'yoga block', 'protein shaker',
    'fitness tracker', 'sweatband', 'cooling towel', 'agility ladder',
    'stretching strap', 'water bottle', 'gym towel', 'workout glove',
    'lifting strap', 'swim cap', 'phone case', 'phone mount', 'phone grip',
    'usb hub', 'webcam cover', 'desk fan', 'cable organizer', 'screen cleaning',
    'car charger', 'car trash', 'car floor mat', 'sunshade', 'car seat',
    'tire pressure', 'license plate', 'phone tripod', 'portable power bank',
    'bluetooth adapter', 'bluetooth earbuds', 'ring light', 'laptop sleeve',
    'travel adapter', 'compression sock', 'travel bottle', 'travel first aid',
    'eye mask', 'insulated lunch', 'shoe bag', 'headphone case', 'money belt',
    'travel clothesline', 'packing cube', 'waterproof phone', 'luggage tag',
    'passport holder', 'fanny pack', 'garden knee pad', 'hose nozzle',
    'rain gauge', 'outdoor thermometer', 'watering can', 'plant support',
    'tape dispenser', 'index card', 'erasable marker', 'pencil case',
    'clipboard', 'desk organizer', 'cork board', 'drawing pencil',
    'gift wrap', 'tissue paper', 'number balloon', 'party hat',
    'confetti', 'paper fan', 'photo booth prop', 'led party light',
    'car air freshener', 'car gap filler', 'car back seat mirror',
    'car visor', 'windshield repair', 'tire inflator', 'car key signal',
    'parking sensor', 'steering wheel desk',
]

# ============================================================
# REGULATED PRODUCTS — FDA / FCC / licensing required
# ============================================================
REGULATED_KEYWORDS = [
    # Food (FDA regulated)
    'hot sauce', 'spice blend', 'granola', 'honey', 'cookie mix', 'beef jerky',
    'nut butter', 'cold brew', 'kombucha', 'popcorn', 'dried fruit', 'olive oil',
    'chocolate', 'jam', 'matcha', 'flavored salt', 'energy ball', 'protein bar',
    'pickle', 'bbq sauce', 'pasta sauce', 'tea blend', 'flavored butter',
    'mushroom', 'caramel', 'vinegar', 'candied nut', 'bone broth', 'smoothie powder',
    'chili crisp', 'cocktail mixer', 'salad dressing', 'cake pop', 'lemonade',
    'baby food', 'mushroom coffee', 'dried herb', 'curry paste', 'flavored syrup',
    'seaweed snack',
    # Supplements (FDA regulated)
    'supplement', 'vitamin', 'protein powder', 'collagen', 'probiotics',
    'melatonin', 'gummies', 'electrolyte', 'greens powder', 'magnesium',
    'turmeric capsule', 'omega', 'biotin', 'zinc', 'elderberry', 'spirulina',
    'mushroom complex', 'fiber supplement', 'iron supplement', 'ashwagandha',
    'creatine', 'mct oil', 'digestive enzyme', 'sleep gummies', 'pre-workout',
    'calcium supplement', 'joint support', 'herbal tea supplement',
    'apple cider vinegar gummies', 'vitamin d',
    # Electronics (FCC)
    'smart home sensor', 'smart plug', 'smart thermometer', 'dash cam',
    'bluetooth speaker', 'wireless charger', 'monitor light', 'mechanical keyboard kit',
    'led strip', 'led interior',
    # CBD / regulated
    'cbd balm',
    # Nail polish (cosmetic regulation)
    'nail polish',
]

# ============================================================
# WEAK HOOKS — just product descriptions, no angle
# ============================================================
WEAK_HOOK_PATTERNS = [
    r'^[A-Z][a-z]+ [a-z]+, import$',  # "Adjustable weight, import"
    r'^[A-Z][a-z]+ [a-z]+ [a-z]+$',  # three generic words
    r'import and brand',
    r'bulk import',
    r'branded$',
    r'import$',
    r'^[A-Z][a-z]+ [a-z]+ for ',  # "Portable bowl for..."
]

# ============================================================
# REDUNDANCY GROUPS — keep only the best from each group
# ============================================================
REDUNDANCY_GROUPS = {
    'ankle_jewelry': ['anklets', 'ankle-bracelets-set', 'ankle-bracelet'],
    'bangle_rings': ['bangle-sets', 'boho-ring-sets', 'stacking-rings-set'],
    'chain_bracelets': ['chain-link-bracelets', 'braided-leather-cords', 'leather-bracelets'],
    'earring_types': ['tassel-earrings', 'threader-earrings', 'glass-bead-earrings', 'macrame-earrings', 'wooden-earrings'],
    'necklace_types': ['coin-necklaces', 'bar-necklaces', 'initial-necklaces', 'name-plate-necklaces', 'layered-necklace-sets'],
    'candle_variants': ['coconut-wax-candles', 'wooden-wick-candles', 'beeswax-candles', 'pillar-candles',
                        'taper-candles', 'floating-candles', 'gel-candles', 'birthday-cake-candles', 'flameless-led-candles', 'candle-tins'],
    'soap_variants': ['charcoal-soap', 'goat-milk-soap', 'whipped-soap', 'hand-soap-bars'],
    'scrub_variants': ['sugar-scrubs', 'body-scrub-bars', 'scalp-scrub', 'lip-scrub'],
    'pet_clothing': ['pet-clothing', 'dog-raincoat', 'dog-anxiety-vest'],
    'pet_treats': ['dog-treats', 'dog-training-treats', 'freeze-dried-treats', 'pet-dental-chews'],
    'car_organizer': ['car-seat-organizer', 'trunk-organizer', 'car-seat-cushion'],
    'leather_wallet': ['leather-wallets', 'leather-card-holder'],
    'leather_bag': ['leather-tote-bags', 'leather-belt-bag', 'leather-pouch-bag'],
    'wooden_holder': ['wooden-key-holder', 'wooden-candle-holder-set', 'wooden-napkin-holder', 'wooden-business-card-holder'],
    'pod_basic': ['pod-magnets', 'pod-keychains', 'pod-socks', 'pod-face-masks', 'pod-coasters',
                  'pod-yard-signs', 'pod-ornaments', 'pod-aprons', 'pod-pet-bandanas'],
    'vintage_resale': ['vintage-denim-resale', 'vintage-jewelry-resale', 'vintage-camera-resale',
                       'vintage-clothing-resale', 'vintage-watch-resale', 'vintage-hat-resale',
                       'vintage-brooch-resale', 'vintage-board-game-resale', 'vintage-typewriter-resale',
                       'vintage-kitchenware', 'vintage-toy-resale', 'vintage-book-resale',
                       'vintage-vinyl-records', 'vintage-poster-prints', 'vintage-sign-replicas'],
    'upcycled': ['upcycled-furniture', 'upcycled-pallet-furniture', 'upcycled-suitcase-tables',
                 'upcycled-ladder-shelves', 'upcycled-window-frames', 'upcycled-tire-products',
                 'upcycled-glass-bottles', 'upcycled-book-safes', 'upcycled-sweater-mittens',
                 'upcycled-jean-bags', 'upcycled-t-shirt-quilts', 'upcycled-tin-can-planters',
                 'upcycled-wine-cork-crafts', 'upcycled-map-art', 'upcycled-fabric-scraps',
                 'upcycled-denim-bags'],
}

# Keep only the FIRST item from each redundancy group
REDUNDANT_CUT = set()
for group_name, ids in REDUNDANCY_GROUPS.items():
    for dup_id in ids[1:]:  # keep first, cut rest
        REDUNDANT_CUT.add(dup_id)


def is_commoditized(name):
    lower = name.lower()
    return any(kw in lower for kw in COMMODITIZED_KEYWORDS)


def is_regulated(name):
    lower = name.lower()
    return any(kw in lower for kw in REGULATED_KEYWORDS)


def has_weak_hook(hook):
    for pattern in WEAK_HOOK_PATTERNS:
        if re.match(pattern, hook):
            return True
    # Additional checks
    hook_lower = hook.lower()
    weak_endings = ['import', 'branded', 'bulk', 'wholesale']
    if any(hook_lower.endswith(w) for w in weak_endings):
        return True
    # Too short hooks (< 3 words) with no angle words
    angle_words = ['tiktok', 'trending', 'niche', 'custom', 'handmade', 'unique', 'sell', 'profit',
                   'margin', 'etsy', 'kitchen', 'home', 'gift', 'easy', 'zero', 'eco', 'premium',
                   'hack', 'simple', 'cheap', 'fast', 'viral', 'diy', 'starter', 'beginner',
                   'autopilot', 'passive', 'low', 'high', 'demand', 'growing', 'comeback']
    if len(hook.split()) <= 2 and not any(w in hook_lower for w in angle_words):
        return True
    return False


def is_redundant(idea_id):
    return idea_id in REDUNDANT_CUT


def triage_strict(idea, all_ideas_by_name):
    """Returns (tier, reasons_failed)"""
    name = idea['name']
    hook = idea.get('hook', '')
    idea_id = idea['id']
    cap_high = idea.get('capital_usd', {}).get('high', 0)
    deck = idea.get('deck', 'physical')
    reasons = []

    # Rule 1: Specific hook
    if has_weak_hook(hook):
        reasons.append(f'Weak hook: "{hook}" — no specific angle')

    # Rule 2: Not commoditized
    if is_commoditized(name):
        reasons.append(f'Commoditized — Amazon Basics / mass dropship territory')

    # Rule 3: No regulatory complexity
    if is_regulated(name):
        reasons.append(f'Regulatory complexity — FDA/FCC/licensing required for beginners')

    # Rule 4: Capital genuinely under $500
    # Add hidden costs: tools ($50-100), photography ($30), packaging ($20-50), platform fees ($20-40)
    real_cost = cap_high + 120  # rough hidden cost buffer
    if real_cost > 500 and deck == 'physical':
        reasons.append(f'Real start cost ~${real_cost} (${cap_high} listed + ~$120 hidden costs)')

    # SaaS with high capital
    if deck == 'saas' and cap_high > 400:
        reasons.append(f'SaaS capital ${cap_high} too high for solo beginner')

    # Rule 5: Distinct (not redundant)
    if is_redundant(idea_id):
        reasons.append(f'Redundant — similar idea already kept in database')

    return ('B' if len(reasons) == 0 else 'C', reasons)


def main():
    print('=== Spark Strict Triage ===')

    # Load all ideas
    ideas = []
    with open('src/data/ideas.ts') as f:
        content = f.read()
    hc_ids = set(re.findall(r"id:\s*'([a-z0-9-]+)'", content))

    for fname in ['src/data/generated-physical.ts', 'src/data/generated-saas.ts']:
        with open(fname) as f:
            lines = f.readlines()
        ideas.extend(json.loads(''.join(lines[5:])))

    # Also need hand-crafted ideas for completeness
    # (they're always S-tier, but we track them)

    all_by_name = {i['name'].lower(): i for i in ideas}

    results = []
    old_triage = {}
    if __import__('os').path.exists('scripts/triage-results.json'):
        with open('scripts/triage-results.json') as f:
            for entry in json.load(f):
                old_triage[entry['id']] = entry.get('quality_tier', 'B')

    tier_counts = {'S': 0, 'B': 0, 'C': 0}
    demotions = []  # ideas that went from B to C

    for idea in ideas:
        if idea['id'] in hc_ids:
            tier = 'S'
            reasons = []
        else:
            tier, reasons = triage_strict(idea, all_by_name)

        tier_counts[tier] += 1

        old_tier = old_triage.get(idea['id'], 'B')
        was_demoted = (old_tier in ['S', 'B']) and tier == 'C'
        if was_demoted:
            demotions.append({
                'id': idea['id'],
                'name': idea['name'],
                'deck': idea['deck'],
                'hook': idea.get('hook', ''),
                'capital': idea.get('capital', ''),
                'old_tier': old_tier,
                'new_tier': 'C',
                'reasons': reasons,
            })

        results.append({
            'id': idea['id'],
            'name': idea['name'],
            'deck': idea['deck'],
            'capital': idea.get('capital', ''),
            'hook': idea.get('hook', ''),
            'interests': idea.get('interests', []),
            'quality_tier': tier,
            'reasons': reasons,
            'old_tier': old_tier,
            'was_demoted': was_demoted,
        })

    print(f'\nResults:')
    print(f'  S-tier (hand-crafted): {tier_counts["S"]}')
    print(f'  B-tier (keep): {tier_counts["B"]}')
    print(f'  C-tier (cut): {tier_counts["C"]}')
    print(f'  Demotions (B→C): {len(demotions)}')

    # Reason breakdown
    reason_counts = defaultdict(int)
    for r in results:
        for reason in r['reasons']:
            # Simplify to category
            if 'Commoditized' in reason: reason_counts['Commoditized'] += 1
            elif 'Regulatory' in reason: reason_counts['Regulatory'] += 1
            elif 'Weak hook' in reason: reason_counts['Weak hook'] += 1
            elif 'Redundant' in reason: reason_counts['Redundant'] += 1
            elif 'Real start cost' in reason or 'capital' in reason.lower(): reason_counts['Capital too high'] += 1

    print(f'\nCut reasons:')
    for reason, count in sorted(reason_counts.items(), key=lambda x: -x[1]):
        print(f'  {reason}: {count}')

    # Save
    with open('scripts/triage-results.json', 'w') as f:
        json.dump(results, f, indent=2)

    with open('scripts/triage-demotions.json', 'w') as f:
        json.dump(demotions, f, indent=2)

    print(f'\nSaved triage-results.json and triage-demotions.json')

    # Sample B-tier survivors
    b_tier = [r for r in results if r['quality_tier'] == 'B']
    print(f'\nSample B-tier survivors (first 15):')
    for r in b_tier[:15]:
        print(f'  {r["name"]} — "{r["hook"]}"')


if __name__ == '__main__':
    main()
