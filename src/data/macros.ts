import type { MacroVariation } from '../types'

export const MACRO_VARIATIONS: Record<string, MacroVariation[]> = {
  'silver-jewelry': [
    { id: 'silver-minimal-studs', name: 'Minimal Silver Studs', hook: 'Tiny everyday earrings \u2014 clean, modern', image: 'photo-1535632787350-4e68ef0ac584', bg: '#c9c5be', priceHint: '\u20b9399 \u2013 899' },
    { id: 'silver-oxidized', name: 'Oxidized Silver', hook: 'Antique blackened finish \u2014 boho, ethnic', image: 'photo-1573408301185-9146fe634ad0', bg: '#5a5148', priceHint: '\u20b9499 \u2013 1,299' },
    { id: 'silver-statement', name: 'Statement Silver', hook: 'Bold chunky pieces \u2014 Instagram-ready', image: 'photo-1599643477877-530eb83abc8e', bg: '#8a7f72', priceHint: '\u20b9999 \u2013 2,499' },
    { id: 'silver-chains', name: 'Silver Chains', hook: 'Layered necklaces \u2014 daily wear', image: 'photo-1611591437281-460bfbe1220a', bg: '#aaa098', priceHint: '\u20b9699 \u2013 1,499' },
    { id: 'silver-charms', name: 'Charm Pendants', hook: 'Symbolic, evil-eye, alphabet \u2014 gift market', image: 'photo-1602173574767-37ac01994b2a', bg: '#9a8e7e', priceHint: '\u20b9399 \u2013 999' },
    { id: 'silver-junk', name: 'Junk / Costume Silver', hook: 'Trendy + cheap \u2014 fast fashion girls', image: 'photo-1515562141207-7a88fb7ce338', bg: '#7a7068', priceHint: '\u20b9199 \u2013 499' },
    { id: 'silver-toe-rings', name: 'Silver Toe Rings & Anklets', hook: 'Indian wedding & festival staple', image: 'photo-1617038220319-276d3cfab638', bg: '#b5a98e', priceHint: '\u20b9599 \u2013 1,499' },
    { id: 'silver-bracelets', name: 'Silver Bracelets & Bangles', hook: 'Stackable, cuffs, charm bracelets', image: 'photo-1605100804763-247f67b3557e', bg: '#a89c89', priceHint: '\u20b9699 \u2013 1,799' },
    { id: 'silver-bridal', name: 'Bridal / Wedding Silver', hook: 'Heavy ornate sets \u2014 premium pricing', image: 'photo-1624206112918-f140f087f9b5', bg: '#8e7c5f', priceHint: '\u20b92,999 \u2013 9,999' }
  ],
  'soy-candles': [
    { id: 'candle-jar', name: 'Classic Glass Jar Candles', hook: 'The everyday vibe candle \u2014 easy to start', image: 'photo-1602874801007-aa24b7551751', bg: '#C99A4B', priceHint: '\u20b9399 \u2013 699' },
    { id: 'candle-tin', name: 'Travel Tin Candles', hook: 'Portable + giftable \u2014 wedding favors', image: 'photo-1603006905003-be475563bc59', bg: '#9c7a4a', priceHint: '\u20b9249 \u2013 499' },
    { id: 'candle-pillar', name: 'Pillar & Sculpted Candles', hook: 'Decor-first \u2014 high-margin aesthetic', image: 'photo-1601295567681-9bcd1a9c97ea', bg: '#d4a373', priceHint: '\u20b9599 \u2013 1,299' },
    { id: 'candle-massage', name: 'Massage Oil Candles', hook: 'Self-care niche \u2014 premium positioning', image: 'photo-1574263867128-eea05f8ae1d3', bg: '#a17c50', priceHint: '\u20b9899 \u2013 1,499' },
    { id: 'candle-festive', name: 'Festive / Diwali Candles', hook: 'Diyas, decorative, gift box bundles', image: 'photo-1572726729207-a78d6feb18d7', bg: '#B85C3C', priceHint: '\u20b9699 \u2013 1,999' },
    { id: 'candle-soy-cup', name: 'Reusable Cup Candles', hook: 'Pour into ceramic cups \u2014 keepsake', image: 'photo-1601000938259-9e92002320b4', bg: '#8e6e4a', priceHint: '\u20b9599 \u2013 999' },
    { id: 'candle-gift-set', name: 'Mini Gift Sets (3-pack)', hook: 'Bundles outsell singles 3:1', image: 'photo-1606293459236-90e5e9ed4e74', bg: '#a8845a', priceHint: '\u20b9999 \u2013 1,799' },
    { id: 'candle-aromatherapy', name: 'Aromatherapy / Wellness', hook: 'Lavender, eucalyptus \u2014 wellness shops', image: 'photo-1599689019338-3b8ee5345020', bg: '#7a8a6e', priceHint: '\u20b9499 \u2013 999' }
  ],
  'pet-tags': [
    { id: 'tag-engraved-bone', name: 'Engraved Bone Tags', hook: 'Classic dog ID \u2014 entry product', image: 'photo-1601758228041-f3b2795255f1', bg: '#5C7A5C', priceHint: '\u20b9299 \u2013 599' },
    { id: 'tag-aesthetic-round', name: 'Aesthetic Round Tags', hook: 'Boho minimal \u2014 Instagram pet parents', image: 'photo-1543466835-00a7907e9de1', bg: '#8e9d7a', priceHint: '\u20b9399 \u2013 799' },
    { id: 'tag-personalized-art', name: 'Personalized Art Tags', hook: 'Custom dog portrait engraved', image: 'photo-1583511655826-05700d52f4d9', bg: '#a08e6a', priceHint: '\u20b9699 \u2013 1,499' },
    { id: 'tag-leather', name: 'Leather Charm Tags', hook: 'Stitched leather \u2014 premium feel', image: 'photo-1587300003388-59208cc962cb', bg: '#7a5a3e', priceHint: '\u20b9599 \u2013 1,099' },
    { id: 'tag-cat-bell', name: 'Cat Tags with Bell', hook: 'Cat-specific niche \u2014 less competition', image: 'photo-1450778869180-41d0601e046e', bg: '#9a7a6e', priceHint: '\u20b9299 \u2013 599' },
    { id: 'tag-collar-set', name: 'Tag + Collar Bundle', hook: 'Higher AOV \u2014 same effort', image: 'photo-1517849845537-4d257902454a', bg: '#5e7766', priceHint: '\u20b9899 \u2013 1,799' },
    { id: 'tag-glow-dark', name: 'Glow-in-Dark Safety Tags', hook: 'Functional sell \u2014 night walks', image: 'photo-1601758125946-6ec2ef64daf8', bg: '#3a4f3a', priceHint: '\u20b9399 \u2013 699' },
    { id: 'tag-multi-pet', name: 'Multi-Pet Family Sets', hook: 'Pack of 2-4 tags \u2014 gift sets', image: 'photo-1561037404-61cd46aa615b', bg: '#6e7a5e', priceHint: '\u20b9699 \u2013 1,299' }
  ],
  'lip-balm': [
    { id: 'balm-tinted', name: 'Tinted Lip Balms', hook: 'Lip + light color \u2014 daily use', image: 'photo-1586495777744-4413f21062fa', bg: '#B85C3C', priceHint: '\u20b9249 \u2013 399' },
    { id: 'balm-clear', name: 'Clear Repair Balms', hook: 'Healing, dry-lip fix \u2014 winter focus', image: 'photo-1571781926291-c477ebfd024b', bg: '#d4a896', priceHint: '\u20b9199 \u2013 349' },
    { id: 'balm-flavor', name: 'Flavored Balms', hook: 'Fruity, dessert flavors \u2014 kid + teen market', image: 'photo-1556228720-195a672e8a03', bg: '#e89a7a', priceHint: '\u20b9199 \u2013 299' },
    { id: 'balm-natural', name: 'Pure Beeswax Balms', hook: 'No chemicals \u2014 wellness mom buyers', image: 'photo-1631214540242-7d63aac82c4f', bg: '#c99a4b', priceHint: '\u20b9299 \u2013 499' },
    { id: 'balm-gift-set', name: 'Gift Box Sets (3-pack)', hook: 'Festive + corporate gift season', image: 'photo-1608248543803-ba4f8c70ae0b', bg: '#a87a5a', priceHint: '\u20b9599 \u2013 999' },
    { id: 'balm-roll-on', name: 'Roll-On Lip Oils', hook: 'Trending format \u2014 premium pricing', image: 'photo-1612817288484-6f916006741a', bg: '#c98e6e', priceHint: '\u20b9399 \u2013 699' },
    { id: 'balm-sunscreen', name: 'SPF Lip Balms', hook: 'Sun protection niche \u2014 high margin', image: 'photo-1599733589046-9bd86b9e5c64', bg: '#e8b87a', priceHint: '\u20b9349 \u2013 549' },
    { id: 'balm-vegan', name: 'Vegan / Plant-Based', hook: 'No beeswax \u2014 Gen-Z conscious buyer', image: 'photo-1599733589051-bea1a3a1d7a9', bg: '#7a8a6e', priceHint: '\u20b9299 \u2013 499' }
  ],
  'tiffin-service': [
    { id: 'tiffin-office', name: 'Office Lunch Tiffin', hook: 'Daily lunch for IT employees', image: 'photo-1546069901-ba9599a7e63c', bg: '#B85C3C', priceHint: '\u20b9120 \u2013 180/box' },
    { id: 'tiffin-diet', name: 'Diet / Healthy Meals', hook: 'Calorie-counted \u2014 fitness niche', image: 'photo-1490645935967-10de6ba17061', bg: '#5C7A5C', priceHint: '\u20b9180 \u2013 280/box' },
    { id: 'tiffin-jain', name: 'Jain / No-Onion Tiffin', hook: 'Underserved \u2014 premium loyalty', image: 'photo-1567337710282-00832b415979', bg: '#a8845a', priceHint: '\u20b9150 \u2013 220/box' },
    { id: 'tiffin-regional', name: 'Regional Cuisine Tiffin', hook: 'Bengali, South Indian \u2014 homesick demo', image: 'photo-1567337710282-00832b415979', bg: '#c99a4b', priceHint: '\u20b9150 \u2013 220/box' },
    { id: 'tiffin-keto', name: 'Keto / Low-Carb Tiffin', hook: 'Premium niche \u2014 2x price', image: 'photo-1490645935967-10de6ba17061', bg: '#3e5e3e', priceHint: '\u20b9250 \u2013 380/box' },
    { id: 'tiffin-postpartum', name: 'Postpartum Mom Tiffin', hook: 'Lactating-mom meals \u2014 high LTV', image: 'photo-1546069901-ba9599a7e63c', bg: '#a87a5a', priceHint: '\u20b9250 \u2013 350/box' },
    { id: 'tiffin-elderly', name: 'Senior Citizen Tiffin', hook: 'Soft food, low-spice \u2014 recurring', image: 'photo-1567337710282-00832b415979', bg: '#8a7a5e', priceHint: '\u20b9150 \u2013 220/box' },
    { id: 'tiffin-meal-prep', name: 'Weekly Meal Prep Boxes', hook: '5 lunches frozen + delivered Sunday', image: 'photo-1490645935967-10de6ba17061', bg: '#6e8a5e', priceHint: '\u20b9999/week' }
  ]
}
