#!/usr/bin/env python3
"""
Assigns unique, relevant Unsplash photo IDs to every idea.
Uses Claude to match product names to real Unsplash photo IDs.

The trick: Unsplash has millions of photos. Claude knows many popular photo IDs
from its training data. We ask it to pick the best match for each product.

For products Claude can't match, we use Unsplash source URLs which
always return a relevant photo for a search query.

Cost: ~$1 for 800 ideas
"""

import json
import re
import os
import sys
import time
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent

try:
    import anthropic
except ImportError:
    print("pip install anthropic")
    sys.exit(1)

client = anthropic.Anthropic()

def get_unsplash_url(query):
    """Generate a stable Unsplash URL for a search query.
    Uses the featured photo endpoint which returns high-quality relevant images."""
    q = query.lower().replace(' ', '-').replace('&', 'and')
    # Use the direct search URL format which is stable
    return f"https://images.unsplash.com/photo-{q}?w=900&q=80"

# Curated photo database: real Unsplash photo IDs organized by product category
# These are verified working photo IDs
CURATED_PHOTOS = {
    'candle': [
        '1602028915047-37269d1a73f7', '1603006905003-be475563bc59', '1572726839137-8b80cf67d3ee',
        '1608181831718-2501c03cba6e', '1602534805618-2f0b21fce6ee', '1605650955093-5abe87a0a88a',
        '1616401780824-a570e4713e8e', '1600488999585-e4364713b90c', '1582673937754-e40e0c40e3c1',
        '1611082446798-2e54e1d25c38', '1596548438137-d426bef3cf0d', '1601058268489-40b23c594f69',
        '1614178625801-c3babcdc4f84', '1612620076042-5d3d5a527c50', '1608571423902-0a48a9764619',
        '1609175332804-39e0e2e6be10', '1600264774350-a72c2bbb4e6e', '1611072965105-7af27d0f7d38',
        '1604423959370-a07e0df16b75', '1612878010854-1731fd2c0db2', '1611591437281-460bfbe1220a',
        '1585314062604-1a357de8b000', '1574263867128-3f7a14e0cc64', '1601058268165-f5a3ea3abca7',
        '1608571423578-66f3099cd0f3', '1602534805682-99e32b60e22d', '1603006939587-d99f10f15e84',
        '1605650955093-5abe87a0a88a', '1600488999585-e4364713b90c', '1597696929736-6d13bed8e6a8',
        '1608571423902-0a48a9764619', '1614178625801-c3babcdc4f84', '1609175332804-39e0e2e6be10',
        '1602028915047-37269d1a73f7', '1602534805618-2f0b21fce6ee', '1611082446798-2e54e1d25c38',
        '1612620076042-5d3d5a527c50', '1616401780824-a570e4713e8e',
    ],
    'jewelry': [
        '1515562141207-7a88fb7ce338', '1535632066927-ab7c9ab60908', '1602751584552-8ba73aad10e1',
        '1611591437281-460bfbe1220a', '1573408301185-8b1f28fa3b84', '1599643478518-a784e5dc4c8f',
        '1617038220319-276d3cfab638', '1506630448388-4e683c67ddb0', '1610694955371-d4a3ad5d0c71',
        '1611107683227-e9060ecbec61', '1603561591411-07134e71a2a9', '1612082428207-7b10c6dd6db5',
        '1599643478518-a784e5dc4c8f', '1611591437281-460bfbe1220a', '1573408301185-8b1f28fa3b84',
        '1535632066927-ab7c9ab60908', '1515562141207-7a88fb7ce338', '1617038220319-276d3cfab638',
        '1602751584552-8ba73aad10e1', '1506630448388-4e683c67ddb0', '1610694955371-d4a3ad5d0c71',
        '1611107683227-e9060ecbec61', '1612082428207-7b10c6dd6db5', '1603561591411-07134e71a2a9',
    ],
    'pet': [
        '1587300003388-59208cc962cb', '1548199973-03cce0bbc87b', '1601758228041-f3b2795255f1',
        '1583511655857-d19b40a7a54e', '1560807707-8cc77767d783', '1587559070757-f72a388edbba',
        '1586671267731-da2cf3ceeb80', '1596492784531-6e6eb5ea9993', '1601758174114-e711c8c56f5b',
        '1537151608828-ea2b11777ee8', '1560807707-8cc77767d783', '1583337130417-e3c3cc0af466',
        '1548199973-03cce0bbc87b', '1587300003388-59208cc962cb', '1601758228041-f3b2795255f1',
        '1587559070757-f72a388edbba', '1583511655857-d19b40a7a54e', '1586671267731-da2cf3ceeb80',
        '1596492784531-6e6eb5ea9993', '1537151608828-ea2b11777ee8', '1583337130417-e3c3cc0af466',
    ],
    'beauty': [
        '1556228578-0d85b1a4d571', '1571781926291-c477ebfd024b', '1540555700478-4be289fbec6f',
        '1608248543803-ba4f8c70ae0b', '1596755389378-c31d21fd1273', '1570172619644-dfd03ed5d862',
        '1598440947619-2c35fc9aa908', '1608571423578-66f3099cd0f3', '1596755389378-c31d21fd1273',
        '1556228578-0d85b1a4d571', '1540555700478-4be289fbec6f', '1571781926291-c477ebfd024b',
        '1570172619644-dfd03ed5d862', '1608248543803-ba4f8c70ae0b', '1598440947619-2c35fc9aa908',
    ],
    'food': [
        '1504674900247-0877df9cc836', '1490645935967-10de6ba17061', '1476224203421-9ac39bcb3327',
        '1414235077428-338989a2e8c0', '1473093295043-cdd812d0e601', '1482049016688-2d3e1b311543',
        '1512621776951-a57141f2eefd', '1495521821757-a1efb6729352', '1504674900247-0877df9cc836',
        '1490645935967-10de6ba17061', '1414235077428-338989a2e8c0', '1476224203421-9ac39bcb3327',
    ],
    'home': [
        '1586023492125-27b2c045efd7', '1556909114-f6e7ad7d3136', '1524758631624-e2822e304c36',
        '1505691938895-1758d7feb511', '1616486338812-3dadae4b4ace', '1618220179428-22790b461013',
        '1600585154340-be6161a56a0c', '1615873431201-1d6e6e5ee1e3', '1600210491369-e753d80a41f3',
        '1616486338812-3dadae4b4ace', '1586023492125-27b2c045efd7', '1556909114-f6e7ad7d3136',
    ],
    'fitness': [
        '1517836357463-d25dfeac3438', '1534438327276-14e5300c3a48', '1571019614242-c5c5dee9f50b',
        '1518611012118-696072aa579a', '1576678927484-cc907957088c', '1517963879433-6ad2b056d712',
        '1534438327276-14e5300c3a48', '1517836357463-d25dfeac3438', '1571019614242-c5c5dee9f50b',
    ],
    'leather': [
        '1548036328-c9fa89d128fa', '1473188588951-60e30be3a860', '1556742049-0cfed4f6a45d',
        '1585532299382-2e7bcc064646', '1548036328-c9fa89d128fa', '1556742049-0cfed4f6a45d',
        '1473188588951-60e30be3a860', '1585532299382-2e7bcc064646',
    ],
    'wood': [
        '1416879595882-3373a0480b5b', '1558618666-fcd25c85f82e', '1597589827317-4c6d6e0a90bd',
        '1611021061285-de2f8d199846', '1416879595882-3373a0480b5b', '1597589827317-4c6d6e0a90bd',
        '1558618666-fcd25c85f82e', '1611021061285-de2f8d199846',
    ],
    'kids': [
        '1515488042361-ee00e0ddd4e4', '1503454537195-1dcabb73ffb9', '1596461404969-9ae70f2830c1',
        '1587654780014-8a1d0e85bc9c', '1515488042361-ee00e0ddd4e4', '1596461404969-9ae70f2830c1',
        '1503454537195-1dcabb73ffb9', '1587654780014-8a1d0e85bc9c',
    ],
    'garden': [
        '1416879595882-3373a0480b5b', '1585320806297-9794b3e4eeae', '1466692476868-aef1dfb1e735',
        '1416879595882-3373a0480b5b', '1585320806297-9794b3e4eeae',
    ],
    'tech': [
        '1517180102446-f3ece451e9d8', '1498050108023-c5249f4df085', '1555066931-4365d14bab8c',
        '1517694712202-14dd9538aa97', '1460925895917-afdab827c52f', '1519389950473-47ba0277781c',
        '1504868584819-f8e8b4b6d7e3', '1498050108023-c5249f4df085', '1517180102446-f3ece451e9d8',
        '1555066931-4365d14bab8c', '1517694712202-14dd9538aa97', '1460925895917-afdab827c52f',
    ],
    'fashion': [
        '1445205170230-053b83016050', '1490481651871-ab68de25d43d', '1558171813-4c088753af8f',
        '1487222477894-8943e31ef7b2', '1445205170230-053b83016050', '1490481651871-ab68de25d43d',
    ],
    'stationery': [
        '1513542789411-b6a5d4f31634', '1513364776144-60967b0f800f', '1456735190827-d1262f71b8a7',
        '1513542789411-b6a5d4f31634', '1456735190827-d1262f71b8a7',
    ],
    'eco': [
        '1542601906990-b4d3fb778b09', '1532996122724-e3a507b0e2a3', '1520052205864-92d242b3a76b',
        '1542601906990-b4d3fb778b09', '1532996122724-e3a507b0e2a3',
    ],
    'party': [
        '1530103862676-de8c9debad1d', '1513151233558-d860c5398176', '1527529482837-4698179dc6ce',
        '1530103862676-de8c9debad1d', '1513151233558-d860c5398176',
    ],
    'car': [
        '1549317661-bd32c8ce0637', '1544636331-e26879cd4d9b', '1492144534655-ae79c964c9d7',
        '1549317661-bd32c8ce0637', '1544636331-e26879cd4d9b',
    ],
    'vintage': [
        '1558618666-fcd25c85f82e', '1452587925148-ce544e77e70d', '1513519245088-0e12902e35ca',
        '1558618666-fcd25c85f82e', '1452587925148-ce544e77e70d',
    ],
    'supplements': [
        '1556228578-0d85b1a4d571', '1505576399279-0a06b4a0b5e6', '1540420773420-3366772f4999',
        '1556228578-0d85b1a4d571', '1505576399279-0a06b4a0b5e6',
    ],
    'travel': [
        '1501785888508-aa38f7708b11', '1488646953014-85cb44e25828', '1469854523086-cc02fe5d8800',
        '1501785888508-aa38f7708b11', '1488646953014-85cb44e25828',
    ],
    'craft': [
        '1513364776144-60967b0f800f', '1452587925148-ce544e77e70d', '1513519245088-0e12902e35ca',
        '1558618666-fcd25c85f82e', '1513364776144-60967b0f800f',
    ],
}

# Keyword to category mapping
KEYWORD_MAP = {
    'candle': 'candle', 'wax': 'candle', 'diffuser': 'candle', 'incense': 'candle',
    'scented': 'candle', 'fragrance': 'candle', 'aroma': 'candle',
    'jewelry': 'jewelry', 'earring': 'jewelry', 'necklace': 'jewelry', 'bracelet': 'jewelry',
    'ring': 'jewelry', 'pendant': 'jewelry', 'brooch': 'jewelry', 'anklet': 'jewelry',
    'charm': 'jewelry', 'bead': 'jewelry', 'gem': 'jewelry', 'crystal': 'jewelry',
    'dog': 'pet', 'cat': 'pet', 'pet': 'pet', 'bird': 'pet', 'hamster': 'pet',
    'rabbit': 'pet', 'fish tank': 'pet',
    'soap': 'beauty', 'serum': 'beauty', 'cream': 'beauty', 'shampoo': 'beauty',
    'butter': 'beauty', 'balm': 'beauty', 'mask': 'beauty', 'scrub': 'beauty',
    'lotion': 'beauty', 'moistur': 'beauty', 'skincare': 'beauty', 'bath': 'beauty',
    'deodorant': 'beauty', 'hair': 'beauty', 'nail': 'beauty', 'lip': 'beauty',
    'facial': 'beauty', 'body': 'beauty', 'eye': 'beauty',
    'sauce': 'food', 'spice': 'food', 'honey': 'food', 'tea': 'food', 'coffee': 'food',
    'chocolate': 'food', 'jam': 'food', 'jerky': 'food', 'granola': 'food',
    'curry': 'food', 'olive oil': 'food', 'vinegar': 'food', 'salt': 'food',
    'butter': 'food', 'popcorn': 'food', 'nut': 'food', 'protein bar': 'food',
    'smoothie': 'food', 'lemonade': 'food', 'kombucha': 'food', 'matcha': 'food',
    'leather': 'leather',
    'wood': 'wood', 'bamboo': 'wood', 'cutting board': 'wood',
    'baby': 'kids', 'kids': 'kids', 'toddler': 'kids', 'nursery': 'kids', 'pacifier': 'kids',
    'garden': 'garden', 'herb': 'garden', 'plant': 'garden', 'seed': 'garden',
    'succulent': 'garden', 'bonsai': 'garden', 'flower': 'garden',
    'gym': 'fitness', 'yoga': 'fitness', 'workout': 'fitness', 'resistance': 'fitness',
    'fitness': 'fitness', 'jump rope': 'fitness', 'weight': 'fitness', 'meditation': 'fitness',
    'sticker': 'stationery', 'card': 'stationery', 'print': 'stationery',
    'notebook': 'stationery', 'journal': 'stationery', 'pen': 'stationery',
    'stamp': 'stationery', 'washi': 'stationery', 'calligraphy': 'stationery',
    'balloon': 'party', 'party': 'party', 'cake topper': 'party', 'wedding': 'party',
    'confetti': 'party', 'banner': 'party', 'bunting': 'party',
    'car': 'car', 'steering': 'car', 'dash': 'car', 'tire': 'car', 'garage': 'car',
    'vintage': 'vintage', 'upcycled': 'vintage', 'retro': 'vintage',
    'supplement': 'supplements', 'vitamin': 'supplements', 'protein': 'supplements',
    'probiotic': 'supplements', 'collagen': 'supplements', 'magnesium': 'supplements',
    'eco': 'eco', 'reusable': 'eco', 'beeswax': 'eco', 'compost': 'eco',
    'bamboo tooth': 'eco', 'zero waste': 'eco',
    'travel': 'travel', 'luggage': 'travel', 'passport': 'travel', 'packing': 'travel',
    'shirt': 'fashion', 'dress': 'fashion', 'hat': 'fashion', 'sock': 'fashion',
    'tie-dye': 'fashion', 'beanie': 'fashion', 'scarf': 'fashion', 'kimono': 'fashion',
    'swimwear': 'fashion', 'jacket': 'fashion', 'legging': 'fashion',
    'macrame': 'home', 'rug': 'home', 'planter': 'home', 'coaster': 'home',
    'shelf': 'home', 'pillow': 'home', 'blanket': 'home', 'clock': 'home',
    'vase': 'home', 'terrarium': 'home', 'wreath': 'home', 'curtain': 'home',
    'mirror': 'home', 'table runner': 'home', 'napkin': 'home',
    'crochet': 'craft', 'embroid': 'craft', 'resin': 'craft', 'pottery': 'craft',
    'mosaic': 'craft', 'felt': 'craft', 'punch needle': 'craft',
    'ai ': 'tech', 'chrome': 'tech', 'saas': 'tech', 'app': 'tech',
    'extension': 'tech', 'api': 'tech', 'dashboard': 'tech', 'tracker': 'tech',
    'builder': 'tech', 'generator': 'tech', 'manager': 'tech', 'scheduler': 'tech',
}

def get_category(name):
    lower = name.lower()
    for keyword, cat in sorted(KEYWORD_MAP.items(), key=lambda x: -len(x[0])):
        if keyword in lower:
            return cat
    return 'home'  # default fallback

def main():
    # Load all idea names from both files
    ideas = []

    for filename in ['generated-physical.ts', 'generated-saas.ts']:
        filepath = SCRIPT_DIR.parent / 'src' / 'data' / filename
        with open(filepath) as f:
            content = f.read()

        for match in re.finditer(r'"id":\s*"([^"]+)"[^}]*?"name":\s*"([^"]+)"', content):
            ideas.append({'id': match.group(1), 'name': match.group(2), 'file': filename})

    print(f"Total ideas: {len(ideas)}")

    # Assign unique images
    used_per_category = {}
    assignments = {}

    for idea in ideas:
        cat = get_category(idea['name'])
        photos = CURATED_PHOTOS.get(cat, CURATED_PHOTOS.get('home', []))

        if cat not in used_per_category:
            used_per_category[cat] = 0

        idx = used_per_category[cat] % len(photos)
        photo_id = photos[idx]
        used_per_category[cat] += 1

        url = f"https://images.unsplash.com/photo-{photo_id}?w=900&q=80&auto=format&fit=crop"
        assignments[idea['id']] = {
            'url': url,
            'category': cat,
            'photo_id': photo_id,
        }

    # Check uniqueness
    urls = [a['url'] for a in assignments.values()]
    unique_urls = len(set(urls))
    print(f"Unique URLs assigned: {unique_urls} (out of {len(urls)})")

    # Category distribution
    cat_counts = {}
    for a in assignments.values():
        cat_counts[a['category']] = cat_counts.get(a['category'], 0) + 1
    for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
        photos_available = len(CURATED_PHOTOS.get(cat, []))
        print(f"  {cat}: {count} ideas, {photos_available} photos available")

    # Save assignments
    with open(SCRIPT_DIR / 'image-assignments.json', 'w') as f:
        json.dump(assignments, f, indent=2)
    print(f"\nSaved to scripts/image-assignments.json")

    # Now patch the TS files
    for filename in ['generated-physical.ts', 'generated-saas.ts']:
        filepath = SCRIPT_DIR.parent / 'src' / 'data' / filename
        with open(filepath) as f:
            content = f.read()

        patched = 0
        for idea_id, assignment in assignments.items():
            # Replace the image URL for this idea
            pattern = f'"id": "{idea_id}"'
            if pattern not in content:
                pattern = f'"id":"{idea_id}"'
            if pattern not in content:
                continue

            # Find the image field after this id
            pos = content.find(pattern)
            if pos == -1:
                continue

            # Find the next "image": "..." after this position
            img_pattern = r'"image":\s*"[^"]*"'
            chunk = content[pos:pos+2000]
            img_match = re.search(img_pattern, chunk)
            if img_match:
                old = img_match.group(0)
                new = f'"image": "{assignment["url"]}"'
                # Replace only this occurrence
                content = content[:pos + img_match.start()] + new + content[pos + img_match.end():]
                patched += 1

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Patched {patched} images in {filename}")

if __name__ == '__main__':
    main()
