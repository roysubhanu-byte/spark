#!/usr/bin/env python3
"""
Merge validation data from Apify into generated TS idea files.
Reads validation-data.json and injects validation objects into
generated-physical.ts and generated-saas.ts.
"""

import json
import os

def main():
    # Load validation data
    with open('scripts/validation-data.json') as f:
        validations = json.load(f)

    print(f'Loaded {len(validations)} validations')

    for fname, var_name in [
        ('src/data/generated-physical.ts', 'PHYSICAL_IDEAS'),
        ('src/data/generated-saas.ts', 'SAAS_IDEAS'),
    ]:
        with open(fname) as f:
            lines = f.readlines()

        header = ''.join(lines[:5])
        json_text = ''.join(lines[5:])
        ideas = json.loads(json_text)

        matched = 0
        for idea in ideas:
            if idea['id'] in validations:
                idea['validation'] = validations[idea['id']]
                matched += 1

        # Re-write the file
        output = header + json.dumps(ideas, indent=2, ensure_ascii=False)
        with open(fname, 'w') as f:
            f.write(output)

        print(f'{fname}: {matched} ideas enriched with validation data')

    print('Done!')


if __name__ == '__main__':
    main()
