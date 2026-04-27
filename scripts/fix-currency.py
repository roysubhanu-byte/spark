#!/usr/bin/env python3
"""
FIX 1: Remove all ₹/INR/Indian supplier references from the database.
Spark v1 is USA-only.
"""

import json
import re
import os

def fix_generated_file(fname):
    """Remove India references from generated TS data files."""
    with open(fname) as f:
        lines = f.readlines()

    header = ''.join(lines[:5])
    data = json.loads(''.join(lines[5:]))

    fixes = 0
    for idea in data:
        # Fix distributor breakdown text
        bd = idea.get('breakdown', {}).get('distributors', {})
        if 'body' in bd:
            old = bd['body']
            # Remove "In India: ... manufacturer/suppliers." patterns
            new = re.sub(r'\s*In India:?\s*<strong>[^<]*</strong>[^.]*\.?', '', old)
            new = re.sub(r'\s*In India,?\s*check\s*<strong>[^<]*</strong>[^.]*\.?', '', new)
            new = re.sub(r'\s*In India:?\s*[^.]*IndiaMART[^.]*\.?', '', new)
            new = re.sub(r'\s*In India:?\s*[^.]*Aromaaz[^.]*\.?', '', new)
            new = re.sub(r'\s*In India:?\s*<strong>Chor Bazaar</strong>[^.]*\.?', '', new)
            if new != old:
                bd['body'] = new.strip()
                fixes += 1

        # Fix action text
        if 'action' in bd:
            old = bd['action']
            new = old.replace('from CandleSci India', 'from CandleScience')
            new = new.replace('₹', '$')
            if new != old:
                bd['action'] = new
                fixes += 1

        # Remove regional distributors (IN, AE, RU, KZ entries)
        if 'distributors' in idea and isinstance(idea['distributors'], dict):
            for region in ['IN', 'AE', 'RU', 'KZ']:
                if region in idea['distributors']:
                    del idea['distributors'][region]
                    fixes += 1

        # Fix any ₹ in other breakdown sections
        for section_key in ['strategy', 'value', 'profit', 'pricing', 'sellingPrice']:
            section = idea.get('breakdown', {}).get(section_key, {})
            for field in ['body', 'action']:
                if field in section and '₹' in section[field]:
                    section[field] = re.sub(r'₹(\d+)', lambda m: f'${int(int(m.group(1))/83)}', section[field])
                    section[field] = re.sub(r'₹(\d+)K', lambda m: f'${int(int(m.group(1))*1000/83)}', section[field])
                    fixes += 1

    # Write back
    output = header + json.dumps(data, indent=2, ensure_ascii=False)
    with open(fname, 'w') as f:
        f.write(output)

    return fixes


def fix_ideas_ts():
    """Fix hand-crafted ideas.ts — remove IN/AE/RU/KZ region data, convert ₹ to $."""
    with open('src/data/ideas.ts') as f:
        content = f.read()

    original = content

    # Remove entire IN/AE/RU/KZ distributor entries
    # Pattern: IN: '...', or AE: '...', etc.
    content = re.sub(r"\s*IN: '[^']*',?\n?", '\n', content)
    content = re.sub(r"\s*AE: '[^']*',?\n?", '\n', content)
    content = re.sub(r"\s*RU: '[^']*',?\n?", '\n', content)
    content = re.sub(r"\s*KZ: '[^']*',?\n?", '\n', content)

    # Convert ₹ amounts to USD in breakdown text
    content = re.sub(r'₹(\d+),?(\d+)', lambda m: f'${int(int(m.group(1) + m.group(2))/83)}', content)
    content = re.sub(r'₹(\d+)K', lambda m: f'${int(int(m.group(1))*1000/83)}', content)
    content = re.sub(r'₹(\d+)', lambda m: f'${int(int(m.group(1))/83)}', content)

    # Replace Indian supplier names with US equivalents
    content = content.replace('CandleSci India', 'CandleScience')
    content = content.replace('Aromaaz', 'Bulk Apothecary')
    content = content.replace('VedaOils', 'Nature\'s Garden')
    content = content.replace('Wholesalebox', 'Faire')
    content = content.replace('Bulk MRO', 'Wholesale Central')
    content = content.replace('Tags4Pets', 'JRMTags')
    content = content.replace('Shiprocket', 'USPS/UPS')

    # Remove "Indian" references in hooks
    content = content.replace('Indian craft, global market', 'Block print craft, global market')
    content = content.replace('Indian ethnic wear, global shipping', 'Ethnic wear, global market')
    content = content.replace('Handcarved decor from India', 'Handcarved soapstone decor')

    fixes = len(original) - len(content)

    with open('src/data/ideas.ts', 'w') as f:
        f.write(content)

    return abs(fixes)


def fix_supplier_directory():
    """Remove IndiaMART from global platforms, keep as international option."""
    with open('src/data/supplier-directory.ts') as f:
        content = f.read()

    # Don't delete IndiaMART entirely — it's used internationally for sourcing
    # But remove "Indian manufacturers direct" phrasing
    content = content.replace(
        "bestFor: 'Indian manufacturers direct, lowest prices, negotiate MOQ'",
        "bestFor: 'International manufacturers, negotiate MOQ directly'"
    )
    content = content.replace(
        "shippingDays: '3-7 days (India), 14-21 days (international)'",
        "shippingDays: '14-21 days (international shipping)'"
    )

    with open('src/data/supplier-directory.ts', 'w') as f:
        f.write(content)


def fix_generator():
    """Remove India refs from the generator so future regenerations are clean."""
    with open('scripts/generate-1000-ideas.py') as f:
        content = f.read()

    # Remove all "In India: ..." tails from distributor templates
    content = re.sub(r' In India:?\s*<strong>[^<]*</strong>[^."]*\.?', '', content)
    content = re.sub(r" In India:?\s*<strong>[^<]*</strong>[^'\"]*", '', content)

    # Fix specific Indian references in seed data
    content = content.replace('Handcarved decor from India', 'Handcarved soapstone decor')
    content = content.replace('Indian craft, global market', 'Block print craft, global market')
    content = content.replace('Indian ethnic wear, global shipping', 'Ethnic wear, global market')

    with open('scripts/generate-1000-ideas.py', 'w') as f:
        f.write(content)


def verify():
    """Final audit — count remaining ₹/INR/India references."""
    files = [
        'src/data/ideas.ts',
        'src/data/generated-physical.ts',
        'src/data/generated-saas.ts',
        'src/data/supplier-directory.ts',
        'src/data/launch-plans.ts',
    ]

    total_rupee = 0
    total_inr = 0
    total_india_supplier = 0

    for fname in files:
        with open(fname) as f:
            content = f.read()
        rupee = content.count('₹')
        inr = len(re.findall(r'\bINR\b', content))
        india_sup = len(re.findall(r'IndiaMART|Aromaaz|Wholesalebox|Meesho|CandleSci India|BulkMRO', content))

        if rupee or inr or india_sup:
            print(f'  {fname}: ₹={rupee}, INR={inr}, IndianSuppliers={india_sup}')
        total_rupee += rupee
        total_inr += inr
        total_india_supplier += india_sup

    print(f'\n  TOTAL: ₹={total_rupee}, INR={total_inr}, IndianSuppliers={total_india_supplier}')
    return total_rupee + total_inr


if __name__ == '__main__':
    print('=== FIX 1: Currency Cleanup ===')

    print('\n1. Fixing generated-physical.ts...')
    f1 = fix_generated_file('src/data/generated-physical.ts')
    print(f'   {f1} fixes applied')

    print('\n2. Fixing generated-saas.ts...')
    f2 = fix_generated_file('src/data/generated-saas.ts')
    print(f'   {f2} fixes applied')

    print('\n3. Fixing ideas.ts (hand-crafted)...')
    f3 = fix_ideas_ts()
    print(f'   ~{f3} chars changed')

    print('\n4. Fixing supplier-directory.ts...')
    fix_supplier_directory()
    print('   Done')

    print('\n5. Fixing generator script...')
    fix_generator()
    print('   Done')

    print('\n6. VERIFICATION:')
    remaining = verify()

    if remaining == 0:
        print('\n   PASS: No ₹ or INR references remaining in data files.')
    else:
        print(f'\n   FAIL: {remaining} references still found. Needs manual review.')
