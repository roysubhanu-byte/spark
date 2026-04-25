import type { Idea } from '../types'

export const IDEAS: Idea[] = [
  // ---------- PHYSICAL PRODUCTS (sold online or offline) ----------
  {
    id: 'soy-candles',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Scented Soy Candles',
    hook: 'Hand-pour in your kitchen, sell on Instagram & Etsy',
    capital: '\u20b95K \u2013 15K',
    effort: 2,
    interests: ['home', 'crafts'],
    image: 'https://images.unsplash.com/photo-1602874801007-aa24b7551751?w=900&q=80',
    bg: '#C99A4B',
    badges: ['trending', 'beginner', 'lowCapital'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 60, high: 180 },
    sellingPrice_usd: { single: 6, set: 14 },
    distributors: {
      US: 'Soy wax: <strong>CandleScience</strong>, BulkApothecary. Wicks/jars: <strong>Wholesale Supplies Plus</strong>. Fragrance: <strong>NaturesGarden</strong>. Order $30 sample first.',
      IN: 'Soy wax: <strong>CandleSci India</strong> (Mumbai), Shubh Wax. Wicks & jars: <strong>Wholesalebox</strong>, Bulk MRO. Fragrance oils: <strong>Aromaaz</strong>, Devinez. Order \u20b9500 sample first.',
      AE: 'Soy wax: <strong>Soap Supplies Dubai</strong>, BoldChemicals. Containers: <strong>Tiger Stationery</strong> bulk. Fragrance: imported via Aromaaz/UAE distributors.',
      RU: '\u0421\u043e\u0435\u0432\u044b\u0439 \u0432\u043e\u0441\u043a: <strong>\u0421\u0432\u0435\u0447\u043d\u043e\u0439 \u041c\u0430\u0440\u043a\u0435\u0442</strong>, \u0412\u043e\u0441\u043a.\u0420\u0443. \u0424\u0438\u0442\u0438\u043b\u0438 \u0438 \u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u044b: <strong>WildSoap</strong>. \u0410\u0440\u043e\u043c\u0430\u0442\u044b: \u041c\u044b\u043b\u043e\u041e\u043f\u0442.',
      KZ: '\u0421\u043e\u0435\u0432\u044b\u0439 \u0432\u043e\u0441\u043a: \u0438\u043c\u043f\u043e\u0440\u0442 \u0447\u0435\u0440\u0435\u0437 \u0420\u0424 (\u0421\u0432\u0435\u0447\u043d\u043e\u0439 \u041c\u0430\u0440\u043a\u0435\u0442). \u041a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u044b: <strong>Kaspi.kz</strong> \u043e\u043f\u0442. \u0410\u0440\u043e\u043c\u0430\u043c\u0430\u0441\u043b\u0430: \u0438\u043c\u043f\u043e\u0440\u0442.'
    },
    breakdown: {
      strategy: {
        body: "Look \u2014 soy candles work because people don't buy them for light. They buy them for <strong>vibe</strong>. So your job isn't to make a candle. It's to make a <strong>moment</strong>. Pick one feeling \u2014 calm, romance, focus \u2014 and own it. That's the whole strategy.",
        action: 'Pick your one feeling/angle for the candles'
      },
      value: {
        body: "Your buyer is a 25-40 year old woman buying a small treat for herself or a gift for a friend. She's not comparing to Yankee Candle \u2014 she's comparing to flowers. <strong>Sell the ritual, not the wax.</strong>",
        action: 'Write a 1-line description of your buyer'
      },
      profit: {
        body: "Soy wax + wick + jar + scent oil = roughly <strong>\u20b9120 cost per candle</strong>. Sell at \u20b9450-650. After packaging and shipping, you keep \u20b9250-400 each. Sell 50/month and that's <strong>\u20b915K-20K clean</strong> from your kitchen counter.",
        stats: [{label: 'Margin', value: '60%+'}, {label: 'Per month (50 units)', value: '\u20b915K+'}],
        action: 'Calculate your numbers \u2014 paste cost & target price'
      },
      distributors: {
        body: "<strong>Soy wax:</strong> CandleSci India (Mumbai), Shubh Wax (online). <strong>Wicks & jars:</strong> Wholesalebox, Bulk MRO. <strong>Fragrance oils:</strong> Aromaaz, Devinez. Order \u20b9500 sample first. Don't bulk-buy until you know your scent works.",
        action: 'Order \u20b9500 sample from CandleSci India'
      },
      pricing: {
        body: "Three pricing models that work: <strong>(1) Singles</strong> \u20b9450-650 each. <strong>(2) Bundles</strong> 3-pack at \u20b91,200 (people buy gifts in 3s). <strong>(3) Subscription</strong> 'scent of the month' at \u20b9999/mo. Start with singles + bundles. Subscription is v2.",
        action: 'Pick your pricing model'
      },
      sellingPrice: {
        body: "Start at <strong>\u20b9499</strong> for a single 200g candle. It's the price-point everyone buys without thinking. Once you have 20 reviews, raise to \u20b9599. Don't price below \u20b9399 \u2014 you'll attract bargain hunters who complain.",
        stats: [{label: 'Launch price', value: '\u20b9499'}, {label: 'After 20 reviews', value: '\u20b9599'}],
        action: 'List 1 candle on Instagram at \u20b9499'
      }
    }
  },
  {
    id: 'pet-tags',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Custom Pet ID Tags',
    hook: 'Engraved tags for dogs & cats, ship anywhere',
    capital: '\u20b98K \u2013 20K',
    effort: 2,
    interests: ['pets', 'crafts'],
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80',
    bg: '#5C7A5C',
    badges: ['beginner', 'fastSale', 'lessCrowded'],
    markets: ['US','IN','AE'],
    capital_usd: { low: 100, high: 240 },
    sellingPrice_usd: { single: 9, bundle: 22 },
    distributors: {
      US: 'Blank tags: <strong>JRMTags</strong>, BulkPetTags. Engraving machine: <strong>Gravograph</strong> $400 desktop. Chains: AmazonBusiness. Easiest: outsource to local engraver via Yelp.',
      IN: 'Blank tags: local engraver in your city, or <strong>Tags4Pets</strong> online. Engraving machine: \u20b915K rotary engraver from Amazon \u2014 DIY at home. Chains/rings: <strong>BulkMRO</strong>.',
      AE: 'Blank tags: <strong>Hassan Tags Dubai</strong>, AmazonAE business. Local engravers in Karama district. Chains: AmazonAE.',
      RU: '\u0417\u0430\u0433\u043e\u0442\u043e\u0432\u043a\u0438: <strong>\u0413\u0440\u0430\u0432\u0438\u0440\u043e\u0432\u043a\u0430.\u041e\u043f\u0442</strong>. \u0413\u0440\u0430\u0432\u0451\u0440: Wildberries (~\u20bd25K). \u0426\u0435\u043f\u043e\u0447\u043a\u0438: Ozon \u043e\u043f\u0442.',
      KZ: '\u0418\u043c\u043f\u043e\u0440\u0442 \u0447\u0435\u0440\u0435\u0437 Wildberries.kz \u0438 AliExpress. \u041c\u0435\u0441\u0442\u043d\u0430\u044f \u0433\u0440\u0430\u0432\u0438\u0440\u043e\u0432\u043a\u0430 \u0432 \u0410\u043b\u043c\u0430\u0442\u044b.'
    },
    breakdown: {
      strategy: {
        body: "Pet tags are a <strong>love product</strong>. People buying are saying 'this dog matters to me.' So your strategy isn't 'cheap tags' \u2014 it's <strong>beautiful tags worth showing off</strong>. Aesthetic, not utility.",
        action: 'Define your tag aesthetic (boho? minimal? cute?)'
      },
      value: {
        body: "Your buyer: pet parent, 25-45, on Instagram. They've already spent \u20b915K on a pet bed. \u20b9399 for a beautiful tag is nothing. <strong>You compete on style, not safety.</strong>",
        action: 'Find 5 pet accounts on IG matching your aesthetic'
      },
      profit: {
        body: "Tag + engraving + chain = <strong>\u20b960-80 cost</strong>. Sell at \u20b9399-599. After shipping you keep ~\u20b9250 per order. <strong>40 orders/month = \u20b910K profit</strong>. Easily scaled by paid ads once unit economics are proven.",
        stats: [{label: 'Cost per unit', value: '\u20b970'}, {label: 'Net margin', value: '60%'}],
        action: 'Calculate cost & target price'
      },
      distributors: {
        body: "<strong>Blank tags:</strong> Local engraver in your city (cheaper) or Tags4Pets (online). <strong>Engraving machine:</strong> \u20b915K rotary engraver from Amazon \u2014 DIY at home. <strong>Chains/rings:</strong> Bulkmro. Easiest start: outsource engraving locally.",
        action: 'Find local engraver near you'
      },
      pricing: {
        body: "<strong>Single tag</strong> \u20b9399. <strong>Multi-pet pack</strong> 2 tags \u20b9699. <strong>Bundle with leash/collar:</strong> \u20b9999. Bundles raise AOV without changing your work.",
        action: 'Set price \u20b9399 for single tag'
      },
      sellingPrice: {
        body: "<strong>\u20b9399</strong> single tag is the sweet spot \u2014 feels premium but impulse-buyable. Test \u20b9499 once you have testimonials.",
        stats: [{label: 'Launch', value: '\u20b9399'}, {label: 'Bundle', value: '\u20b9999'}],
        action: 'List on Instagram + Etsy at \u20b9399'
      }
    }
  },
  {
    id: 'silver-jewelry',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Minimal Silver Jewelry',
    hook: 'Dainty rings & chains, drop-shipped from Jaipur',
    capital: '\u20b93K \u2013 10K',
    effort: 2,
    interests: ['jewelry', 'fashion'],
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80',
    bg: '#8a8077',
    badges: ['provenIncome', 'globalDemand'],
    markets: ['US','IN','AE','RU'],
    capital_usd: { low: 36, high: 120 },
    sellingPrice_usd: { single: 12, set: 22 },
    distributors: {
      US: 'Wholesale silver: <strong>RioGrande</strong> (US), HalsteadJewelry. Or import from <strong>India wholesalers</strong> via Alibaba ($2 sample pack). Photos: hire local photographer $50 for 50 shots.',
      IN: 'Jaipur silver wholesalers: <strong>IndiaMART listings</strong>, Karat Karma, Tribebyamrapali wholesalers. Order \u20b92K sample pack first. Shipping: <strong>Shiprocket</strong>. Photos: \u20b93K for 50 shots.',
      AE: 'Import from Jaipur via <strong>IndiaMART</strong> wholesalers (\u20b92K samples). Local: Gold Souk for premium. Photography: hire from Fiverr UAE.',
      RU: '\u0421\u0435\u0440\u0435\u0431\u0440\u043e: <strong>SOKOLOV</strong> \u043e\u043f\u0442, \u0438\u043b\u0438 \u0438\u043c\u043f\u043e\u0440\u0442 \u0438\u0437 \u0418\u043d\u0434\u0438\u0438. \u0424\u043e\u0442\u043e: \u0444\u0440\u0438\u043b\u0430\u043d\u0441\u0435\u0440\u044b \u0441 Profi.ru.',
      KZ: '\u0418\u043c\u043f\u043e\u0440\u0442 \u0447\u0435\u0440\u0435\u0437 \u0410\u043b\u043c\u0430\u0442\u044b \u043e\u043f\u0442\u043e\u0432\u044b\u0435 \u0440\u044b\u043d\u043a\u0438 \u0438\u043b\u0438 \u043f\u0440\u044f\u043c\u043e \u0438\u0437 \u0418\u043d\u0434\u0438\u0438. \u0421\u0430\u043c\u043f\u043b\u044b \u0437\u0430 ~\u20b815K.'
    },
    breakdown: {
      strategy: {
        body: "Minimalist silver is the <strong>safest</strong> jewelry niche right now. Won't go out of style, low return rate, every woman 22-35 wants more. Your edge: tight aesthetic, fewer SKUs, cleaner brand than the 10,000 cluttered Instagram shops.",
        action: 'Pick 5-7 hero pieces (not 50)'
      },
      value: {
        body: "Buyer: woman who'd buy from Mejuri but wants Indian prices. Wants <strong>'I get compliments but no one knows where it's from'</strong> energy. Your hook: ethical silver, hand-finished, ships in 3 days.",
        action: 'Define your one-line brand promise'
      },
      profit: {
        body: "Wholesale silver from Jaipur: <strong>\u20b9150-300 per piece</strong>. Retail: \u20b9699-1,499. Margin 60-70%. Drop-ship model means zero inventory risk. <strong>30 orders/month = \u20b915K-20K profit</strong>.",
        stats: [{label: 'Wholesale cost', value: '\u20b9250'}, {label: 'Retail', value: '\u20b9999'}],
        action: 'Compute breakeven units per month'
      },
      distributors: {
        body: "<strong>Jaipur silver wholesalers:</strong> IndiaMART listings, Karat Karma, Tribebyamrapali wholesalers. Order \u20b92K sample pack first. <strong>Shipping:</strong> Shiprocket. <strong>Photos:</strong> hire local photographer \u20b93K for 50 shots.",
        action: 'Order sample pack from Jaipur (~\u20b92K)'
      },
      pricing: {
        body: "Three tiers: <strong>Daily</strong> \u20b9699-899 (rings, studs). <strong>Statement</strong> \u20b9999-1,499 (necklaces, hoops). <strong>Sets</strong> \u20b91,799 (3-piece). Tier pricing trains buyer to upgrade.",
        action: 'Set 3 pricing tiers for your collection'
      },
      sellingPrice: {
        body: "Anchor your starter at <strong>\u20b9799</strong> \u2014 premium feel, still impulse-able. Sets at \u20b91,799 give the 'splurge' option. Avoid \u20b9499 \u2014 feels cheap, attracts wrong buyer.",
        stats: [{label: 'Daily', value: '\u20b9799'}, {label: 'Statement', value: '\u20b91,299'}],
        action: 'List 5 pieces on Instagram'
      }
    }
  },
  {
    id: 'baby-clothes',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Organic Baby Clothes',
    hook: 'Soft cotton sets for newborns, sold via Amazon',
    capital: '\u20b915K \u2013 40K',
    effort: 3,
    interests: ['kids', 'fashion'],
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=900&q=80',
    bg: '#d4b896',
    badges: ['provenIncome', 'growing'],
    markets: ['US','IN','AE'],
    capital_usd: { low: 180, high: 480 },
    sellingPrice_usd: { single: 11, set: 22 },
    distributors: {
      US: 'Manufacturers: <strong>Alibaba GOTS suppliers</strong> (100-piece minimums). USA-made: <strong>Spoonflower</strong> for print-on-demand. Photography: Amazon-style on white. Use FBA for Prime badge.',
      IN: 'Organic cotton manufacturers: <strong>Tirupur</strong> (Tamil Nadu) \u2014 minimum 100-piece runs. Search IndiaMART for "GOTS organic baby clothes manufacturer". Photography: Amazon-style on white background.',
      AE: 'Import from <strong>Tirupur (India)</strong> via Alibaba/IndiaMART. Local printing: Sharjah industrial. Photography: Fiverr UAE.',
      RU: '\u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u0438\u0435 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u0438: <strong>\u0418\u0432\u0430\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u0442\u0435\u043a\u0441\u0442\u0438\u043b\u044c</strong>. \u0418\u043c\u043f\u043e\u0440\u0442 \u0438\u0437 \u0422\u0443\u0440\u0446\u0438\u0438/\u0418\u043d\u0434\u0438\u0438.',
      KZ: '\u0418\u043c\u043f\u043e\u0440\u0442 \u0438\u0437 \u0422\u0443\u0440\u0446\u0438\u0438 (\u0431\u043b\u0438\u0437\u043a\u043e) \u0438\u043b\u0438 \u0418\u043d\u0434\u0438\u0438. \u041c\u0435\u0441\u0442\u043d\u044b\u0435 \u0448\u0432\u0435\u0438 \u0432 \u0410\u043b\u043c\u0430\u0442\u044b \u0434\u043b\u044f \u043e\u0431\u0440\u0430\u0437\u0446\u043e\u0432.'
    },
    breakdown: {
      strategy: {
        body: "New parents spend recklessly in the first 6 months. Organic = <strong>peace of mind</strong>. Your strategy: pick 5 SKUs (onesie, romper, set, bib, beanie), nail the photography, list on Amazon. Don't try to be a 'brand' yet \u2014 be a <strong>product</strong>.",
        action: 'Pick 5 starter SKUs'
      },
      value: {
        body: "Buyer: new mom or gift-giver (grandma, aunt). They're scared of chemicals on baby skin. <strong>Your value isn't fashion \u2014 it's safety.</strong> 'GOTS certified organic cotton' is worth \u20b9500 alone in the listing.",
        action: 'Source GOTS certified cotton supplier'
      },
      profit: {
        body: "Cost per set: <strong>\u20b9180-250</strong>. Sell at \u20b9699-999. Amazon takes 15-20% fee. After fees + shipping, keep \u20b9250-350. <strong>100 sets/month = \u20b930K profit</strong>. Higher capital but predictable.",
        stats: [{label: 'COGS', value: '\u20b9220'}, {label: 'Net per unit', value: '\u20b9300'}],
        action: 'Get cost quote for 100 units'
      },
      distributors: {
        body: "<strong>Organic cotton manufacturers:</strong> Tirupur (Tamil Nadu) \u2014 minimum 100-piece runs. Search IndiaMART for 'GOTS organic baby clothes manufacturer'. <strong>Photography:</strong> Amazon-style on white background.",
        action: 'Get 3 quotes from Tirupur manufacturers'
      },
      pricing: {
        body: "<strong>Single piece</strong> \u20b9699. <strong>3-piece set</strong> \u20b91,499. <strong>Gift box</strong> \u20b92,299. Gift box is your money-maker for festival season \u2014 same products, premium packaging.",
        action: 'Design 3 pricing tiers'
      },
      sellingPrice: {
        body: "Start the 3-piece set at <strong>\u20b91,499</strong>. Anchor on Amazon search results. Use FBA so you get Prime badge \u2014 adds ~30% conversion.",
        stats: [{label: 'Set price', value: '\u20b91,499'}, {label: 'Gift box', value: '\u20b92,299'}],
        action: 'List 3-piece set on Amazon FBA'
      }
    }
  },
  {
    id: 'lip-balm',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Tinted Lip Balms',
    hook: 'Small batch, kitchen-made, sold on Instagram',
    capital: '\u20b94K \u2013 12K',
    effort: 2,
    interests: ['beauty', 'crafts'],
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&q=80',
    bg: '#B85C3C',
    badges: ['lowCapital', 'beginner', 'fastSale'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 48, high: 144 },
    sellingPrice_usd: { single: 4, pack: 9 },
    distributors: {
      US: 'Beeswax & shea: <strong>BulkApothecary</strong>, MountainRoseHerbs. Mica/tint: <strong>BrambleBerry</strong>. Tubes: <strong>SKS Bottle</strong> $0.20 each. Labels: Vistaprint. ~$30 to start.',
      IN: 'Beeswax & shea: <strong>Aromaaz</strong>, Vinayak Ingredients. Mica/tint: <strong>Soaprepublic</strong>. Tubes: Bulk MRO \u20b98-12 each. Labels: Vistaprint or local print shop. \u20b92K total to start.',
      AE: 'Ingredients: <strong>SoapSuppliesDubai</strong>, Aroma Zone (import). Tubes: AmazonAE business. Labels: local Dubai printer.',
      RU: '\u0412\u043e\u0441\u043a/\u043c\u0430\u0441\u043b\u0430: <strong>\u041c\u044b\u043b\u043e\u041e\u043f\u0442</strong>, \u0410\u0440\u043e\u043c\u0430\u0440\u0442\u0438. \u0422\u0443\u0431\u044b: Wildberries \u043e\u043f\u0442. \u042d\u0442\u0438\u043a\u0435\u0442\u043a\u0438: Photoprint.',
      KZ: '\u0418\u043c\u043f\u043e\u0440\u0442 \u0447\u0435\u0440\u0435\u0437 \u0420\u043e\u0441\u0441\u0438\u044e \u0438\u043b\u0438 AliExpress. \u041c\u0435\u0441\u0442\u043d\u0430\u044f \u043f\u0435\u0447\u0430\u0442\u044c \u043d\u0430\u043a\u043b\u0435\u0435\u043a \u0432 \u0410\u043b\u043c\u0430\u0442\u044b.'
    },
    breakdown: {
      strategy: {
        body: "Lip balm is a <strong>gateway beauty product</strong>. Cheap to try, easy to gift, repeatable purchase. Your strategy: own one vibe \u2014 'kitchen-made, no chemicals' \u2014 and make it look luxurious despite being homemade.",
        action: 'Define your one product vibe'
      },
      value: {
        body: "Buyer: 18-35 woman who reads ingredient labels. She'll pay \u20b9299 for 5g if she trusts you. <strong>Your value is trust, not the wax.</strong>",
        action: 'Write a 3-line ingredient story'
      },
      profit: {
        body: "Beeswax + shea + tint + tube = <strong>\u20b935-50 cost</strong>. Sell at \u20b9249-349. <strong>~80% margin</strong>. Sell 100/month from kitchen = \u20b920K-25K. Lowest barrier of any beauty product.",
        stats: [{label: 'Cost', value: '\u20b940'}, {label: 'Margin', value: '80%'}],
        action: 'Calculate breakeven volume'
      },
      distributors: {
        body: "<strong>Beeswax & shea:</strong> Aromaaz, Vinayak Ingredients. <strong>Mica/tint:</strong> Soaprepublic. <strong>Tubes:</strong> Bulk MRO \u20b98-12 each. <strong>Labels:</strong> Vistaprint or local print shop. \u20b92K total to start.",
        action: 'Order materials kit from Aromaaz'
      },
      pricing: {
        body: "<strong>Single</strong> \u20b9299. <strong>3-pack</strong> \u20b9749. <strong>Customizable gift box</strong> \u20b9999. 3-pack is the volume driver \u2014 most buyers pick it.",
        action: 'Lock in 3 pricing options'
      },
      sellingPrice: {
        body: "<strong>\u20b9299</strong> single is the magic number. Below that feels mass-market, above feels gimmicky for first product. Once profitable, launch a \u20b9499 'pro' version.",
        stats: [{label: 'Single', value: '\u20b9299'}, {label: '3-pack', value: '\u20b9749'}],
        action: 'Launch IG store with 3-pack'
      }
    }
  },
  {
    id: 'resin-jewelry',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Resin Jewelry & Trays',
    hook: 'Pour pretty pieces from your kitchen table',
    capital: '\u20b94K \u2013 12K',
    effort: 2,
    interests: ['jewelry', 'crafts', 'home'],
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80',
    bg: '#d4a896',
    badges: ['lowCapital', 'beginner'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Resin lets anyone make jewelry that looks <strong>impossibly pretty</strong>. Your strategy: pick ONE aesthetic \u2014 pressed flowers, ocean waves, glitter terrazzo \u2014 and own it. Customers don't want options, they want <strong>your style</strong>.",
        action: 'Pick your one aesthetic theme'
      },
      value: {
        body: "Buyer: 18-35 woman who wants 'I get compliments on this every day' jewelry. She'll pay \u20b9500 for an earring set. <strong>You sell uniqueness, not gemstones.</strong>",
        action: 'Find 3 IG accounts with your aesthetic'
      },
      profit: {
        body: "Resin + molds + pigments = <strong>\u20b940-80 per piece</strong>. Sell at \u20b9399-899. <strong>70-80% margin</strong>. Sell 50/month = \u20b915-30K kitchen-table profit.",
        stats: [{label: 'Cost', value: '\u20b960'}, {label: 'Margin', value: '75%'}],
        action: 'Calculate cost per piece'
      },
      distributors: {
        body: "<strong>Resin & hardener:</strong> Itsy Bitsy, Aromaaz. <strong>Molds:</strong> Amazon (silicone sets \u20b9500). <strong>Pigments/flowers:</strong> Soaprepublic, local craft store. \u20b93K starter kit makes ~30 pieces.",
        action: 'Order starter kit from Itsy Bitsy'
      },
      pricing: {
        body: "<strong>Earrings</strong> \u20b9399. <strong>Tray</strong> \u20b9699. <strong>Gift box (3 items)</strong> \u20b91,299. Bundle gift boxes for festival season \u2014 3x AOV.",
        action: 'Set 3 pricing tiers'
      },
      sellingPrice: {
        body: "Launch earrings at <strong>\u20b9449</strong>. It's premium-feel without scaring impulse buyers. Tray at \u20b9699 is your statement piece.",
        stats: [{label: 'Earrings', value: '\u20b9449'}, {label: 'Tray', value: '\u20b9699'}],
        action: 'List 3 pieces on Instagram'
      }
    }
  },
  {
    id: 'crochet-bags',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Crochet Bags & Totes',
    hook: 'Hand-stitched, slow fashion that sells fast',
    capital: '\u20b93K \u2013 10K',
    effort: 3,
    interests: ['fashion', 'crafts'],
    image: 'https://images.unsplash.com/photo-1587837164129-0e98ad2f6e6a?w=900&q=80',
    bg: '#a8845a',
    badges: ['trending', 'lowCapital'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Crochet bags are having a <strong>moment</strong> \u2014 TikTok, Pinterest, all the slow-fashion girls want one. Your strategy: master <strong>one shape</strong> first (tote, bucket, granny square). Repetition makes you fast. Speed makes profit.",
        action: 'Pick your one bag shape'
      },
      value: {
        body: "Buyer: 22-35 woman who wants 'handmade, conscious, photo-worthy.' She'll pay \u20b91,500 for what cost you \u20b9200 in yarn. <strong>You're selling craft + time, not material.</strong>",
        action: "Define your buyer's aesthetic in 3 words"
      },
      profit: {
        body: "Yarn + lining + labels = <strong>\u20b9150-250 per bag</strong>. Sell at \u20b9999-2,499. <strong>4-5 hour build per bag</strong>. Sell 15/month = \u20b915-30K. Slow but predictable.",
        stats: [{label: 'Cost per bag', value: '\u20b9200'}, {label: 'Hours each', value: '4-5'}],
        action: 'Build 1 bag and time yourself'
      },
      distributors: {
        body: "<strong>Yarn:</strong> Pony, Ganga, Vardhman from local craft store or Amazon. <strong>Hooks:</strong> Amazon \u20b9300 set. <strong>Lining fabric:</strong> Local market. <strong>Brand labels:</strong> Custom from Vistaprint. \u20b92K kit = 5 bags.",
        action: 'Buy yarn for first 3 bags'
      },
      pricing: {
        body: "<strong>Mini bag</strong> \u20b9999. <strong>Tote</strong> \u20b91,499. <strong>Custom color</strong> +\u20b9300. Custom orders pay 30% upfront.",
        action: 'Set base + custom pricing'
      },
      sellingPrice: {
        body: "<strong>\u20b91,499 tote</strong> is the sweet spot \u2014 premium but impulse-buyable. Don't go below \u20b9799 even early on; undercharging trains buyers wrong.",
        stats: [{label: 'Tote', value: '\u20b91,499'}, {label: 'Custom', value: '+\u20b9300'}],
        action: 'Post 3 finished bags on Instagram'
      }
    }
  },
  {
    id: 'embroidered-patches',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Embroidered Patches & Pins',
    hook: 'Tiny art, big margins, jacket-ready',
    capital: '\u20b96K \u2013 15K',
    effort: 2,
    interests: ['fashion', 'crafts', 'design'],
    image: 'https://images.unsplash.com/photo-1583939411023-14783179e581?w=900&q=80',
    bg: '#5C7A5C',
    badges: ['lowCapital', 'lessCrowded'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Patches are <strong>cheap to make, expensive to sell</strong>. Your strategy: design 5-10 patches with one strong identity (cottagecore, gamer, plant lady, witchy). Sell as packs. Customers buy 3 at once.",
        action: 'Design 5 patches in one theme'
      },
      value: {
        body: "Buyer: 16-30 person personalizing jackets, totes, hats. Pays \u20b9250 each for patches. <strong>You're selling identity, not embroidery.</strong>",
        action: 'Define your patch theme + audience'
      },
      profit: {
        body: "Iron-on patches manufactured: <strong>\u20b930-50 each</strong> (MOQ 100). Sell at \u20b9199-349. <strong>80%+ margin</strong> at scale. 100 sold/month = \u20b915-25K.",
        stats: [{label: 'Cost', value: '\u20b940'}, {label: 'Sell', value: '\u20b9249'}],
        action: 'Get manufacturing quote for 100 patches'
      },
      distributors: {
        body: "<strong>Manufacturers:</strong> IndiaMART (search 'custom embroidered patches'), or AliExpress 'custom patch' suppliers (MOQ 50-100). <strong>Design tools:</strong> Canva or Procreate. \u20b95K covers first 100-pack.",
        action: 'Get 3 quotes from IndiaMART suppliers'
      },
      pricing: {
        body: "<strong>Single patch</strong> \u20b9249. <strong>3-pack</strong> \u20b9599. <strong>Sticker pack add-on</strong> +\u20b999. Bundles always win.",
        action: 'Lock 3 pricing tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b9249 single, \u20b9599 3-pack.</strong> Don't price below \u20b9199 \u2014 feels low quality. 3-packs are 70% of orders.",
        stats: [{label: 'Single', value: '\u20b9249'}, {label: '3-pack', value: '\u20b9599'}],
        action: 'Open Etsy + Instagram store'
      }
    }
  },
  {
    id: 'aromatherapy-rollers',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Aromatherapy Roll-Ons',
    hook: 'Tiny bottles, big self-care market',
    capital: '\u20b95K \u2013 12K',
    effort: 2,
    interests: ['beauty', 'crafts'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    bg: '#7a8a6e',
    badges: ['lowCapital', 'beginner', 'growing'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Roll-ons solve a specific feeling. Your strategy: build a <strong>line of 3-5 problem-solvers</strong> \u2014 sleep, stress, focus, headache, anxiety. Each gets its own essential oil blend + brand identity.",
        action: 'Pick 3 problems to solve'
      },
      value: {
        body: "Buyer: 25-45 woman who buys self-care like jewelry. \u20b9399 for a bottle is impulse. <strong>You're selling 'a moment of calm,' not chemistry.</strong>",
        action: 'Write benefit copy for each blend'
      },
      profit: {
        body: "Carrier oil + essential oils + bottle = <strong>\u20b940-70 per roll-on</strong>. Sell at \u20b9299-449. <strong>~80% margin</strong>. Sell 100/month = \u20b920-30K.",
        stats: [{label: 'Cost', value: '\u20b955'}, {label: 'Margin', value: '80%'}],
        action: 'Calculate cost per blend'
      },
      distributors: {
        body: "<strong>Essential oils:</strong> Aromaaz, Soulflower, KAZIMA. <strong>Roller bottles:</strong> Amazon \u20b915-20 each (10ml). <strong>Carrier oil (jojoba/sweet almond):</strong> Aromaaz. <strong>Labels:</strong> Vistaprint. \u20b93K = 50 bottles.",
        action: 'Order oils kit from Aromaaz'
      },
      pricing: {
        body: "<strong>Single</strong> \u20b9399. <strong>3-pack (sleep+stress+focus)</strong> \u20b9999. <strong>Wellness gift box (5)</strong> \u20b91,799.",
        action: 'Build 3 pricing tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b9399 single</strong> is the magic number. 3-pack at \u20b9999 is 60% of revenue.",
        stats: [{label: 'Single', value: '\u20b9399'}, {label: '3-pack', value: '\u20b9999'}],
        action: 'Launch with 3-pack as hero product'
      }
    }
  },
  {
    id: 'phone-cases',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Custom Phone Cases',
    hook: 'Print-on-demand, no inventory needed',
    capital: '\u20b90 \u2013 5K',
    effort: 1,
    interests: ['design', 'fashion', 'tech'],
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80',
    bg: '#8a7a8a',
    badges: ['lowCapital', 'beginner', 'globalDemand'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Phone cases are the <strong>perfect POD product</strong>: zero inventory, mass demand, low return rate. Your strategy: niche down hard. 'Cases for plant moms.' 'Cases for K-pop fans.' Specific = unbeatable.",
        action: 'Pick your niche audience'
      },
      value: {
        body: "Buyer: 16-35 person who treats phone case as fashion accessory. Pays \u20b9599-899 for unique design. <strong>You sell self-expression, not protection.</strong>",
        action: 'Define your design aesthetic in 3 words'
      },
      profit: {
        body: "POD service prints on demand: <strong>\u20b9250-350 cost per case</strong>. Sell at \u20b9599-899. <strong>~50% margin</strong>. No inventory risk. 80 sold/month = \u20b920-30K passive.",
        stats: [{label: 'POD cost', value: '\u20b9300'}, {label: 'Sell', value: '\u20b9699'}],
        action: 'Pick your POD service'
      },
      distributors: {
        body: "<strong>POD services:</strong> Printrove (India, best for INR), Printful (global, USD), Qikink (India alternative). They print + ship; you only design. <strong>Design tools:</strong> Canva or Procreate. \u20b90 to start.",
        action: 'Sign up on Printrove or Printful'
      },
      pricing: {
        body: "<strong>Standard</strong> \u20b9699. <strong>Premium (extra protection)</strong> \u20b9999. <strong>Custom design fee</strong> +\u20b9300. Custom is your high-margin upsell.",
        action: 'Set 3 pricing tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b9699</strong> for standard. Don't go below \u20b9499 \u2014 POD prices won't allow margin.",
        stats: [{label: 'Standard', value: '\u20b9699'}, {label: 'Premium', value: '\u20b9999'}],
        action: 'Upload 5 designs to Printrove'
      }
    }
  },
  {
    id: 'tufted-rugs',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Tufted Rugs & Mats',
    hook: 'Viral on TikTok, premium pricing',
    capital: '\u20b925K \u2013 50K',
    effort: 3,
    interests: ['home', 'crafts', 'design'],
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80',
    bg: '#c99a4b',
    badges: ['trending', 'provenIncome'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Tufted rugs went viral and stayed. Your strategy: <strong>weird shapes win</strong>. A square rug is invisible. A cherry, a flame, a strawberry shape gets shared on Instagram. Niche = customers find you.",
        action: 'Sketch 5 unusual rug shapes'
      },
      value: {
        body: "Buyer: 22-35, decorating first apartment, willing to pay \u20b93-8K for one statement piece. <strong>You're selling Instagram moments, not floor coverage.</strong>",
        action: "Find 5 reference rugs you'd remix"
      },
      profit: {
        body: "Yarn + cloth backing + adhesive = <strong>\u20b9400-800 per rug</strong>. Sell at \u20b92,999-7,999. <strong>4-8 hours per rug</strong>. Sell 8-10/month = \u20b925-50K.",
        stats: [{label: 'Cost', value: '\u20b9600'}, {label: 'Sell', value: '\u20b94,999'}],
        action: 'Get yarn cost for 1 rug'
      },
      distributors: {
        body: "<strong>Tufting gun:</strong> Amazon \u20b915-20K (one-time investment). <strong>Yarn:</strong> Vardhman, Ganga (acrylic, bulk). <strong>Backing fabric & adhesive:</strong> Local market. <strong>Frame:</strong> DIY \u20b92K. Total kit ~\u20b925K, recoupable in 8 rugs.",
        action: 'Buy tufting gun + yarn starter'
      },
      pricing: {
        body: "<strong>Small (1ft)</strong> \u20b92,999. <strong>Medium (2ft)</strong> \u20b94,999. <strong>Custom</strong> +30% premium. Custom is most of the orders.",
        action: 'Build size-based pricing'
      },
      sellingPrice: {
        body: "<strong>\u20b94,999</strong> medium is your hero piece. Don't undercharge \u2014 every cheap rug devalues you.",
        stats: [{label: 'Medium', value: '\u20b94,999'}, {label: 'Custom', value: '+30%'}],
        action: 'Post tufting reels on Instagram'
      }
    }
  },
  {
    id: 'macrame-hangings',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Macram\u00e9 Wall Hangings',
    hook: 'Boho home decor, knot by knot',
    capital: '\u20b92K \u2013 8K',
    effort: 2,
    interests: ['home', 'crafts'],
    image: 'https://images.unsplash.com/photo-1525695230005-efd074980869?w=900&q=80',
    bg: '#a89c89',
    badges: ['lowCapital', 'beginner'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Macram\u00e9 hangs on every Pinterest board. Your strategy: <strong>3 sizes, 2 colors</strong>. Don't overwhelm with 50 options. A small lineup feels curated and premium.",
        action: 'Pick your color palette (2 max)'
      },
      value: {
        body: "Buyer: 25-40 woman decorating bedroom or living room. Pays \u20b91,200-3,500. <strong>You're selling vibe, not rope.</strong>",
        action: "Find your buyer's aesthetic on Pinterest"
      },
      profit: {
        body: "Cotton cord + dowel = <strong>\u20b9100-250 per piece</strong>. Sell at \u20b91,200-3,500. <strong>3-5 hour build</strong>. Sell 12/month = \u20b915-30K.",
        stats: [{label: 'Cost', value: '\u20b9150'}, {label: 'Hours', value: '3-5'}],
        action: 'Time yourself building one'
      },
      distributors: {
        body: "<strong>Macram\u00e9 cord:</strong> Pony, Amazon (5mm cotton, \u20b9400/kg). <strong>Wooden dowels:</strong> Local hardware \u20b950 each. <strong>Beads (optional):</strong> Local craft store. \u20b91.5K starter = 5 pieces.",
        action: 'Order cord from Amazon'
      },
      pricing: {
        body: "<strong>Small</strong> \u20b91,299. <strong>Medium</strong> \u20b92,299. <strong>Statement piece</strong> \u20b93,999.",
        action: 'Set 3 size tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b92,299 medium</strong> is the sweet spot. Sells more than the small one because it doesn't feel cheap.",
        stats: [{label: 'Medium', value: '\u20b92,299'}, {label: 'Statement', value: '\u20b93,999'}],
        action: 'List 3 pieces on Instagram + Etsy'
      }
    }
  },
  {
    id: 'sticker-packs',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Sticker Packs & Decals',
    hook: 'Tiny art, easy to sell, cheap to make',
    capital: '\u20b92K \u2013 8K',
    effort: 1,
    interests: ['design', 'crafts'],
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=900&q=80',
    bg: '#F0997B',
    badges: ['lowCapital', 'beginner', 'fastSale'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Stickers are the <strong>perfect first product</strong> \u2014 cheap, cute, and people buy 5 at once. Your strategy: build a <strong>themed pack</strong> (cottagecore, anime, plant mom, productivity). Singular vibe wins.",
        action: 'Design 10 stickers in one theme'
      },
      value: {
        body: "Buyer: 14-30 person decorating laptop, water bottle, journal. Pays \u20b9199 for 5 stickers. <strong>You sell joy + identity.</strong>",
        action: 'Find your sticker theme + audience'
      },
      profit: {
        body: "Print cost: <strong>\u20b93-8 per sticker</strong>. Sell pack of 5 at \u20b9199-299. <strong>80% margin</strong>. Sell 80 packs/month = \u20b915-25K.",
        stats: [{label: 'Cost (5)', value: '\u20b930'}, {label: 'Sell', value: '\u20b9249'}],
        action: 'Get printing quote for 100 packs'
      },
      distributors: {
        body: "<strong>Print services:</strong> StickerYou, Vistaprint, or local digital printer (\u20b95/sticker). <strong>Design:</strong> Canva or Procreate. <strong>Sell on:</strong> Etsy, Instagram, Amazon. \u20b92K = 200 stickers printed.",
        action: 'Print 50 sticker samples'
      },
      pricing: {
        body: "<strong>5-pack</strong> \u20b9199. <strong>10-pack</strong> \u20b9349. <strong>15-pack mega</strong> \u20b9499. Multi-packs are 80% of sales.",
        action: 'Lock 3 pack sizes'
      },
      sellingPrice: {
        body: "<strong>\u20b9199 5-pack</strong> is impulse-buy gold. Don't go below \u2014 feels cheap and attracts wrong buyer.",
        stats: [{label: '5-pack', value: '\u20b9199'}, {label: '10-pack', value: '\u20b9349'}],
        action: 'List 3 themed packs on Etsy'
      }
    }
  },
  {
    id: 'soap-bars',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Handmade Soap Bars',
    hook: 'Cold-process, small batch, ingredient-led',
    capital: '\u20b96K \u2013 18K',
    effort: 3,
    interests: ['beauty', 'crafts'],
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=900&q=80',
    bg: '#e8b87a',
    badges: ['provenIncome', 'globalDemand'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Soap is <strong>commodity unless you make it personal</strong>. Your strategy: pick 3-4 specific ingredients (turmeric, neem, coffee, oatmeal) and tell their story. Buyers want a reason, not a soap.",
        action: 'Pick 3 hero ingredients'
      },
      value: {
        body: "Buyer: 25-50 woman wary of chemicals, willing to pay \u20b9250-500/bar. <strong>You sell ingredient transparency, not lather.</strong>",
        action: 'Write ingredient story for each bar'
      },
      profit: {
        body: "Soap base + oils + scent + mold = <strong>\u20b950-90 per bar</strong>. Sell at \u20b9249-499. <strong>~75% margin</strong>. Sell 80/month = \u20b915-25K.",
        stats: [{label: 'Cost', value: '\u20b970'}, {label: 'Sell', value: '\u20b9349'}],
        action: 'Calculate cost per bar'
      },
      distributors: {
        body: "<strong>Soap base & oils:</strong> Aromaaz, Vinayak Ingredients, Soaprepublic. <strong>Molds:</strong> Amazon silicone (\u20b9500 set). <strong>Packaging:</strong> Kraft paper boxes from Amazon. \u20b93K = 30 bars.",
        action: 'Order soap base + 3 essential oils'
      },
      pricing: {
        body: "<strong>Single</strong> \u20b9299. <strong>3-pack gift box</strong> \u20b9799. <strong>6-bar wellness pack</strong> \u20b91,499.",
        action: 'Set 3 pricing tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b9299 single, \u20b9799 3-pack.</strong> 3-packs sell more \u2014 they feel like gifts.",
        stats: [{label: 'Single', value: '\u20b9299'}, {label: '3-pack', value: '\u20b9799'}],
        action: 'Launch 3-pack on Instagram'
      }
    }
  },
  {
    id: 'bath-bombs',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Bath Bombs & Salts',
    hook: 'Fizzy, photogenic, gift-perfect',
    capital: '\u20b93K \u2013 10K',
    effort: 2,
    interests: ['beauty', 'crafts'],
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4cb9c93?w=900&q=80',
    bg: '#ED93B1',
    badges: ['lowCapital', 'beginner'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Bath bombs are <strong>visual products</strong>. They have to look amazing on Instagram. Your strategy: bright colors + clean shapes + clear packaging. The reels do the marketing for you.",
        action: 'Design 3 hero bath bomb looks'
      },
      value: {
        body: "Buyer: 22-40 woman buying a treat for herself or a gift. Pays \u20b9199-399. <strong>You sell self-care moments, not chemistry.</strong>",
        action: 'Define your photo aesthetic'
      },
      profit: {
        body: "Baking soda + citric acid + oils + colors = <strong>\u20b930-50 per bomb</strong>. Sell at \u20b9199-349. <strong>~75% margin</strong>. Sell 100/month = \u20b915-25K.",
        stats: [{label: 'Cost', value: '\u20b940'}, {label: 'Sell', value: '\u20b9249'}],
        action: 'Cost out one batch (10 bombs)'
      },
      distributors: {
        body: "<strong>Citric acid + baking soda:</strong> Local kirana or Amazon (cheap). <strong>Essential oils + mica:</strong> Aromaaz, Soaprepublic. <strong>Molds:</strong> Amazon (silicone hemispheres \u20b9400). \u20b92K = 50 bombs.",
        action: 'Order ingredients kit'
      },
      pricing: {
        body: "<strong>Single</strong> \u20b9249. <strong>3-pack</strong> \u20b9599. <strong>Gift hamper (5)</strong> \u20b9999.",
        action: 'Lock 3 sizes'
      },
      sellingPrice: {
        body: "<strong>\u20b9249 single, \u20b9599 3-pack.</strong> Festival/Diwali season pushes hampers \u2014 pre-stock 50.",
        stats: [{label: 'Single', value: '\u20b9249'}, {label: 'Hamper', value: '\u20b9999'}],
        action: 'Photograph & list 3-pack'
      }
    }
  },
  {
    id: 'polymer-clay-earrings',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Polymer Clay Earrings',
    hook: 'Bold, lightweight, Gen-Z favorite',
    capital: '\u20b93K \u2013 10K',
    effort: 2,
    interests: ['jewelry', 'fashion', 'crafts'],
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80',
    bg: '#F4C0D1',
    badges: ['trending', 'lowCapital', 'fastSale'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Polymer clay earrings are <strong>booming</strong> with Gen-Z because they're bold, weightless, and unique. Your strategy: pick a vibe \u2014 checkerboard, terrazzo, abstract, fruit shapes \u2014 and make it yours.",
        action: 'Pick your one design language'
      },
      value: {
        body: "Buyer: 18-30 woman who wants statement earrings she can wear daily. Pays \u20b9399-799 per pair. <strong>You sell personality, not weight.</strong>",
        action: 'Define your one aesthetic'
      },
      profit: {
        body: "Clay + bake + posts + glaze = <strong>\u20b930-60 per pair</strong>. Sell at \u20b9349-699. <strong>85% margin</strong>. Sell 60 pairs/month = \u20b920-30K.",
        stats: [{label: 'Cost', value: '\u20b945'}, {label: 'Margin', value: '85%'}],
        action: 'Calculate cost per pair'
      },
      distributors: {
        body: "<strong>Polymer clay (Sculpey, Fimo, Amos):</strong> Itsy Bitsy, Amazon. <strong>Earring posts/wires:</strong> Amazon (\u20b9300 for 200). <strong>Glaze + tools:</strong> Itsy Bitsy. \u20b92.5K kit = 30 pairs. <strong>Oven:</strong> regular kitchen oven works.",
        action: 'Order polymer clay starter kit'
      },
      pricing: {
        body: "<strong>Studs</strong> \u20b9399. <strong>Statement</strong> \u20b9699. <strong>Set of 3</strong> \u20b9999. Sets are most-bought.",
        action: 'Set 3 styles'
      },
      sellingPrice: {
        body: "<strong>\u20b9699 statement</strong> is the hero. Don't price below \u20b9299 \u2014 clay earrings can fetch premium when style is right.",
        stats: [{label: 'Statement', value: '\u20b9699'}, {label: 'Set', value: '\u20b9999'}],
        action: 'List 5 designs on Instagram'
      }
    }
  },
  {
    id: 'pet-bandanas',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Pet Bandanas & Bow Ties',
    hook: 'Dog parents will spend on cute',
    capital: '\u20b93K \u2013 8K',
    effort: 2,
    interests: ['pets', 'fashion', 'crafts'],
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=900&q=80',
    bg: '#9FE1CB',
    badges: ['fastSale', 'lessCrowded'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Pet parents are <strong>recession-proof</strong>. They'll buy a \u20b9400 bandana for a dog wearing nothing else. Your strategy: cute + unique + fits all sizes via velcro/snap. Sell as packs.",
        action: 'Pick 3 pattern themes'
      },
      value: {
        body: "Buyer: 25-45 dog parent on Instagram. Pays \u20b9399-599 per bandana. <strong>You sell 'my dog is cute,' not fabric.</strong>",
        action: 'Find 5 dog accounts in your aesthetic'
      },
      profit: {
        body: "Fabric + velcro + label = <strong>\u20b950-90 per bandana</strong>. Sell at \u20b9399-599. <strong>~80% margin</strong>. Sell 60/month = \u20b915-25K.",
        stats: [{label: 'Cost', value: '\u20b970'}, {label: 'Sell', value: '\u20b9449'}],
        action: 'Cost out one bandana'
      },
      distributors: {
        body: "<strong>Cotton fabric (printed):</strong> Local market or IndiaMART (cotton printed). <strong>Velcro/snaps:</strong> Local notions store \u20b9100/meter. <strong>Custom labels:</strong> Vistaprint. \u20b92K = 30 bandanas.",
        action: 'Buy fabric for first batch (5)'
      },
      pricing: {
        body: "<strong>Single bandana</strong> \u20b9449. <strong>Bandana + bow tie set</strong> \u20b9699. <strong>Seasonal 4-pack</strong> \u20b91,299.",
        action: 'Set 3 pricing tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b9449 single</strong> works. Most pet parents buy 2-3 in different colors. Push the seasonal pack hard for festivals.",
        stats: [{label: 'Single', value: '\u20b9449'}, {label: '4-pack', value: '\u20b91,299'}],
        action: 'List 3 patterns on Instagram'
      }
    }
  },
  {
    id: 'scrunchies',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Hair Scrunchies & Accessories',
    hook: 'Tiny product, big repeat purchase',
    capital: '\u20b92K \u2013 6K',
    effort: 1,
    interests: ['fashion', 'crafts'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
    bg: '#F0997B',
    badges: ['lowCapital', 'beginner', 'fastSale'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Scrunchies are <strong>impulse + repeat</strong>. Cheap to make, easy to gift, every girl owns 10. Your strategy: build sets of 5-7 in coordinating colors. Singles don't sell \u2014 sets do.",
        action: 'Pick 3 color palettes'
      },
      value: {
        body: "Buyer: 16-35 woman who buys hair stuff like socks. Pays \u20b9399-699 for a 5-pack. <strong>Easiest first product to start.</strong>",
        action: 'Define your color palettes'
      },
      profit: {
        body: "Fabric + elastic + thread = <strong>\u20b915-25 per scrunchie</strong>. Sell pack of 5 at \u20b9399-599. <strong>~85% margin</strong>. Sell 60 packs/month = \u20b915-25K.",
        stats: [{label: 'Cost (5)', value: '\u20b9100'}, {label: 'Sell', value: '\u20b9499'}],
        action: 'Cost out one 5-pack'
      },
      distributors: {
        body: "<strong>Fabric (silk, satin, cotton):</strong> Local market or IndiaMART (\u20b950-150/meter \u2014 covers many scrunchies). <strong>Elastic:</strong> Local notions \u20b920/meter. <strong>Sewing machine:</strong> Borrow or \u20b96K used. \u20b91.5K = 30 scrunchies.",
        action: 'Buy fabric for 30 scrunchies'
      },
      pricing: {
        body: "<strong>5-pack</strong> \u20b9499. <strong>7-pack rainbow</strong> \u20b9699. <strong>Custom color set</strong> \u20b9799.",
        action: 'Lock 3 pack sizes'
      },
      sellingPrice: {
        body: "<strong>\u20b9499 5-pack</strong> is impulse-perfect. Don't sell singles below \u20b9149 \u2014 too cheap, devalues the line.",
        stats: [{label: '5-pack', value: '\u20b9499'}, {label: 'Rainbow', value: '\u20b9699'}],
        action: 'List 3 packs on Instagram'
      }
    }
  },
  {
    id: 'greeting-cards',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Greeting Cards & Stationery',
    hook: 'Etsy classic, evergreen demand',
    capital: '\u20b93K \u2013 10K',
    effort: 2,
    interests: ['design', 'crafts', 'writing'],
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=900&q=80',
    bg: '#F5C4B3',
    badges: ['lowCapital', 'globalDemand'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Greeting cards never go out of style. Your strategy: pick a <strong>specific occasion</strong> niche \u2014 Indian weddings, queer love, new mom, dog birthdays. Generic cards lose; specific cards win.",
        action: 'Pick your occasion niche'
      },
      value: {
        body: "Buyer: 25-45 person who hates Hallmark blandness. Pays \u20b9199-299/card. <strong>You sell the right words for a specific moment.</strong>",
        action: 'Write 5 card concepts in your niche'
      },
      profit: {
        body: "Print cost: <strong>\u20b915-30 per card</strong>. Sell at \u20b9199-299. <strong>~85% margin</strong>. Sell 80 cards/month = \u20b915-20K.",
        stats: [{label: 'Cost', value: '\u20b920'}, {label: 'Sell', value: '\u20b9249'}],
        action: 'Get printing quote for 100 cards'
      },
      distributors: {
        body: "<strong>Local digital print shop</strong> or Vistaprint (\u20b915-30/card minimum 50). <strong>Design tools:</strong> Canva, Procreate. <strong>Envelopes:</strong> bulk on Amazon. <strong>Sell:</strong> Etsy, Instagram. \u20b92K = 100 cards.",
        action: 'Get sample print quote'
      },
      pricing: {
        body: "<strong>Single card</strong> \u20b9249. <strong>Set of 5</strong> \u20b9999. <strong>Subscription (4 cards/month)</strong> \u20b9699/mo.",
        action: 'Lock 3 pricing options'
      },
      sellingPrice: {
        body: "<strong>\u20b9249 single, \u20b9999 set.</strong> Subscription is your moonshot \u2014 recurring revenue.",
        stats: [{label: 'Single', value: '\u20b9249'}, {label: 'Set', value: '\u20b9999'}],
        action: 'Open Etsy + email subscription form'
      }
    }
  },
  {
    id: 'dried-flowers',
    deck: 'physical', deckLabel: 'Physical \u00b7 online + offline', channels: ['online','offline'],
    name: 'Dried Flower Arrangements',
    hook: 'Premium decor, lasts a year, big margins',
    capital: '\u20b95K \u2013 15K',
    effort: 2,
    interests: ['home', 'crafts'],
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=900&q=80',
    bg: '#9FE1CB',
    badges: ['provenIncome', 'growing'],
    markets: [],
    breakdown: {
      strategy: {
        body: "Dried flowers are <strong>premium + lasting</strong>. Fresh flowers die in a week; dried bouquets last a year. Your strategy: position as <strong>art</strong>, not flowers. Charge accordingly.",
        action: 'Define your aesthetic palette'
      },
      value: {
        body: "Buyer: 25-40 woman or wedding planner. Pays \u20b91,500-4,500 for one arrangement. <strong>You sell living art, not flowers.</strong>",
        action: 'Build mood board for your style'
      },
      profit: {
        body: "Dried stems + vase/wrapping = <strong>\u20b9150-400 per arrangement</strong>. Sell at \u20b91,499-3,999. <strong>~80% margin</strong>. Sell 15/month = \u20b920-40K.",
        stats: [{label: 'Cost', value: '\u20b9250'}, {label: 'Sell', value: '\u20b92,499'}],
        action: 'Cost out one arrangement'
      },
      distributors: {
        body: "<strong>Dried stems wholesale:</strong> IndiaMART (search 'dried flowers wholesale'), Pune flower wholesalers. Or dry your own (DIY route, takes 2 weeks). <strong>Vases:</strong> IKEA, Amazon. <strong>Wrapping/twine:</strong> local craft store. \u20b94K = 10 arrangements.",
        action: 'Source dried stems from IndiaMART'
      },
      pricing: {
        body: "<strong>Mini bouquet</strong> \u20b91,499. <strong>Standard</strong> \u20b92,499. <strong>Statement piece</strong> \u20b94,499. Wedding orders custom.",
        action: 'Set 3 size tiers'
      },
      sellingPrice: {
        body: "<strong>\u20b92,499 standard</strong> is the impulse-buy hero. Wedding orders are 50% of revenue once you find that channel.",
        stats: [{label: 'Standard', value: '\u20b92,499'}, {label: 'Statement', value: '\u20b94,499'}],
        action: 'List 3 arrangements on Instagram'
      }
    }
  },
  // ---------- DIGITAL (digital products) ----------
  {
    id: 'notion-templates',
    deck: 'digital', deckLabel: 'Digital \u00b7 online', channels: ['online'],
    name: 'Notion Templates',
    hook: 'Sell on Gumroad, passive income while you sleep',
    capital: '\u20b90 \u2013 2K',
    effort: 1,
    interests: ['design', 'tech', 'writing'],
    image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=900&q=80',
    bg: '#1F1B16',
    badges: ['lowCapital', 'beginner', 'fastSale', 'globalDemand'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 0, high: 25 },
    sellingPrice_usd: { single: 19, bundle: 39 },
    distributors: {
      US: 'Sell on: <strong>Gumroad</strong>, Lemon Squeezy, your own site. Tools: Notion + Canva. Free traffic: <strong>Pinterest</strong>, Twitter threads, Reddit (relevant subs).',
      IN: 'Sell on: <strong>Gumroad</strong> (USD), Topmate.io (INR). Indian creators do best on <strong>Twitter/X</strong> + LinkedIn + Pinterest. Currency: charge in USD for global reach.',
      AE: 'Same global tools (Gumroad/Lemon). UAE creators have advantage of English-fluent affluent buyers locally.',
      RU: '\u041f\u0440\u043e\u0434\u0430\u0436\u0430: <strong>Boosty</strong>, Patreon. \u041f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b: Telegram, VK, \u0414\u0437\u0435\u043d.',
      KZ: '\u0422\u0435 \u0436\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b \u0447\u0442\u043e \u0432 \u0420\u0424. \u0422\u0430\u043a\u0436\u0435 Gumroad \u0434\u043b\u044f \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u043e\u0439 \u043f\u0440\u043e\u0434\u0430\u0436\u0438.'
    },
    breakdown: {
      strategy: {
        body: "Notion templates is a <strong>distribution game, not a design game</strong>. You don't need to be a designer. You need to solve one specific person's problem better than anyone \u2014 'wedding planner template,' 'thesis tracker,' 'freelance CRM'.",
        action: 'Pick your one user (specific!)'
      },
      value: {
        body: "Buyer: someone Googling 'how to organize X in Notion' at 11pm. They've already spent 3 hours trying. Your template = <strong>their last 3 hours back</strong>. Worth $15 easily.",
        action: 'Write the Google search your buyer types'
      },
      profit: {
        body: "Cost to make: <strong>$0</strong>. Sell on Gumroad: $15-49 per pack. Gumroad takes ~10%. <strong>20 sales/month at $29 = $522 = \u20b943K passive</strong>. Scales without your time.",
        stats: [{label: 'Cost', value: '$0'}, {label: 'Monthly (20 sales)', value: '~\u20b943K'}],
        action: 'Project monthly income at 20 sales'
      },
      distributors: {
        body: "<strong>Where to sell:</strong> Gumroad (easiest), Lemon Squeezy, your own site. <strong>Tools you already have:</strong> Notion + Canva for cover image. <strong>Free traffic:</strong> Pinterest pins + Twitter threads + Reddit (relevant subs).",
        action: 'Create Gumroad seller account'
      },
      pricing: {
        body: "<strong>Single template</strong> $19. <strong>Bundle (3-5 templates)</strong> $39. <strong>Lifetime access</strong> $99. Bundle pricing 2\u00d7 single is the sweet spot.",
        action: 'Lock pricing tiers'
      },
      sellingPrice: {
        body: "Launch at <strong>$19</strong>. Once you have 50+ buyers and reviews, raise to $29. Don't go below $9 \u2014 signals low quality, attracts refund-happy buyers.",
        stats: [{label: 'Launch', value: '$19'}, {label: 'After reviews', value: '$29'}],
        action: 'List on Gumroad at $19'
      }
    }
  },
  {
    id: 'lightroom-presets',
    deck: 'digital', deckLabel: 'Digital \u00b7 online', channels: ['online'],
    name: 'Lightroom Presets',
    hook: 'Photo filters for Instagram creators',
    capital: '\u20b90 \u2013 5K',
    effort: 1,
    interests: ['design', 'beauty'],
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=80',
    bg: '#8a8077',
    badges: ['lowCapital', 'fastSale', 'globalDemand'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 0, high: 60 },
    sellingPrice_usd: { pack: 19, lifetime: 79 },
    distributors: {
      US: 'Sell: <strong>Etsy</strong> (huge for presets), Gumroad, FilterGrade. Tools: Adobe Lightroom (free trial). Marketing: <strong>Pinterest</strong> is goldmine \u2014 every pin is a landing page.',
      IN: 'Sell: <strong>Etsy</strong>, Gumroad (USD). Tools: Lightroom. Indian buyers prefer Instagram before/after reels \u2014 start there.',
      AE: 'Etsy + Gumroad. UAE wedding/lifestyle photographers are big preset buyers \u2014 niche down.',
      RU: '\u041f\u0440\u043e\u0434\u0430\u0436\u0430: <strong>Boosty</strong>, \u0442\u0435\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 Telegram-\u043a\u0430\u043d\u0430\u043b\u044b. \u0415\u0441\u0442\u044c \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b.',
      KZ: '\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b (Etsy, Gumroad) \u043b\u0443\u0447\u0448\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442 \u0434\u043b\u044f KZ.'
    },
    breakdown: {
      strategy: {
        body: "Presets are saturated <strong>except in niches</strong>. Don't make 'aesthetic presets'. Make <strong>'preset for plant moms,' 'preset for skincare flatlays,' 'preset for caf\u00e9 reels'</strong>. Niche = no competition.",
        action: 'Pick your niche aesthetic'
      },
      value: {
        body: "Buyer: 22-32 IG creator with 1-10K followers who wants 'cohesive feed' but doesn't know editing. <strong>Sells the look, not the technical filter.</strong>",
        action: 'Find 10 accounts with your target aesthetic'
      },
      profit: {
        body: "Cost: <strong>$0</strong>. You make 5 presets in one weekend. Sell pack at $19-39. <strong>30 sales/month = ~\u20b950K passive</strong>. Same files. Sells forever.",
        stats: [{label: 'Cost', value: '$0'}, {label: 'Monthly', value: '~\u20b950K'}],
        action: 'Compute breakeven traffic'
      },
      distributors: {
        body: "<strong>Sell:</strong> Etsy (huge for presets), Gumroad, FilterGrade. <strong>Tools:</strong> Adobe Lightroom (free trial). <strong>Marketing:</strong> Instagram before/after reels, Pinterest pins, TikTok edits. Pinterest is goldmine for this niche.",
        action: 'Open Etsy + Gumroad listings'
      },
      pricing: {
        body: "<strong>Pack of 5</strong> $19. <strong>Pack of 10</strong> $29. <strong>Lifetime full library</strong> $79. Bundles are the obvious pick \u2014 push them.",
        action: 'Set 3 pack tiers'
      },
      sellingPrice: {
        body: "<strong>$19 pack of 5.</strong> Etsy buyer expects this price. Once you have 50+ reviews, launch lifetime at $79.",
        stats: [{label: 'Starter pack', value: '$19'}, {label: 'Full library', value: '$79'}],
        action: 'List on Etsy + Pinterest pins'
      }
    }
  },
  {
    id: 'ebook-niche',
    deck: 'digital', deckLabel: 'Digital \u00b7 online', channels: ['online'],
    name: 'Niche Ebooks',
    hook: 'Sell expertise as PDFs on Amazon Kindle + Gumroad',
    capital: '\u20b90 \u2013 3K',
    effort: 2,
    interests: ['writing', 'design'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80',
    bg: '#5C7A5C',
    badges: ['lowCapital', 'globalDemand'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 0, high: 36 },
    sellingPrice_usd: { single: 19, bundle: 39 },
    distributors: {
      US: 'Sell on: <strong>Gumroad</strong> (highest cut), <strong>Amazon Kindle</strong> (most traffic), your own site. Tools: Google Docs + Canva for cover. Traffic: Pinterest, email list, Twitter/X threads, niche FB groups.',
      IN: 'Sell on: <strong>Amazon Kindle India</strong>, Gumroad (USD). Distribution: Twitter/X, LinkedIn, niche WhatsApp groups. Indian readers love tactical PDFs.',
      AE: 'Amazon Kindle + Gumroad. UAE has large English-reading professional audience for tactical guides.',
      RU: '\u041b\u0438\u0442\u0420\u0435\u0441.\u0421\u0430\u043c\u0438\u0437\u0434\u0430\u0442, Telegram-\u043a\u0430\u043d\u0430\u043b\u044b, Boosty. \u0420\u0443\u0441\u0441\u043a\u043e\u044f\u0437\u044b\u0447\u043d\u044b\u0435 \u043d\u0438\u0448\u0438 \u043e\u0442\u043a\u0440\u044b\u0442\u044b.',
      KZ: '\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u043e: Amazon Kindle. \u041b\u043e\u043a\u0430\u043b\u044c\u043d\u043e: Telegram-\u043a\u0430\u043d\u0430\u043b\u044b.'
    },
    breakdown: {
      strategy: {
        body: "Forget novels. Ebook money is in <strong>tactical, niche how-to PDFs</strong>. '30 reels scripts for hairdressers.' '50 newsletter ideas for coaches.' Specific to a job, solves one problem, sells forever.",
        action: 'Pick a niche + specific problem'
      },
      value: {
        body: "Buyer: someone in that exact niche, stuck, willing to pay \u20b9500 to skip 10 hours of work. <strong>Tactical > inspirational.</strong>",
        action: 'Find your buyer in 1 Reddit/FB group'
      },
      profit: {
        body: "Cost: <strong>$0</strong>. Write in 2 weeks. Sell at $9-29. <strong>50 sales \u00d7 $19 = $950 = \u20b978K. One-time work, sells forever.</strong>",
        stats: [{label: 'Cost', value: '$0'}, {label: 'At 50/mo sales', value: '~\u20b978K'}],
        action: 'Outline your ebook (5 chapters)'
      },
      distributors: {
        body: "<strong>Sell on:</strong> Gumroad (highest cut), Amazon Kindle (most traffic), your own site. <strong>Tools:</strong> Google Docs + Canva for cover. <strong>Traffic:</strong> Pinterest, your email list, Twitter/X threads, niche FB groups.",
        action: 'Outline 5-chapter ebook'
      },
      pricing: {
        body: "<strong>Standalone</strong> $19. <strong>Ebook + bonuses (templates, video)</strong> $39. <strong>Lifetime updates</strong> $79. Always bundle bonuses \u2014 it 2\u00d7 your AOV.",
        action: 'Decide: standalone vs bundle'
      },
      sellingPrice: {
        body: "<strong>$19 launch.</strong> Don't go below $9 \u2014 Amazon Kindle race-to-bottom. Once you have testimonials, bundle to $39.",
        stats: [{label: 'Launch', value: '$19'}, {label: 'Bundle', value: '$39'}],
        action: 'Publish + share in 1 niche group'
      }
    }
  },
  {
    id: 'canva-templates',
    deck: 'digital', deckLabel: 'Digital \u00b7 online', channels: ['online'],
    name: 'Canva Templates',
    hook: 'Instagram & Pinterest templates for creators',
    capital: '\u20b90 \u2013 2K',
    effort: 1,
    interests: ['design', 'writing'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=900&q=80',
    bg: '#B85C3C',
    badges: ['lowCapital', 'beginner', 'globalDemand'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 0, high: 25 },
    sellingPrice_usd: { pack: 29, lifetime: 99 },
    distributors: {
      US: 'Sell on: <strong>Etsy</strong> (massive Canva template buyer base), Creative Market, Gumroad. Tools: Canva Pro $13/mo. Free traffic: <strong>Pinterest</strong> is THE channel.',
      IN: 'Sell on: <strong>Etsy</strong> (USD), Gumroad. Indian creators charge in USD for global reach. Pinterest + Instagram reels.',
      AE: 'Etsy + Creative Market. UAE small-business owners are template buyers \u2014 niche to UAE/Gulf businesses.',
      RU: '\u041f\u0440\u043e\u0434\u0430\u0436\u0430: <strong>Boosty</strong>, Telegram-\u043a\u0430\u043d\u0430\u043b. \u0422\u0430\u043a\u0436\u0435 \u043c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u043e \u0447\u0435\u0440\u0435\u0437 Etsy.',
      KZ: '\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u043e: Etsy, Gumroad. \u041b\u043e\u043a\u0430\u043b\u044c\u043d\u043e: Instagram reels.'
    },
    breakdown: {
      strategy: {
        body: "Canva templates work because <strong>everyone needs Instagram posts but nobody wants to design them</strong>. Your edge: a tight aesthetic + niche use case ('templates for therapists,' 'templates for nail techs').",
        action: 'Pick your use-case niche'
      },
      value: {
        body: "Buyer: small business owner posting daily on IG, exhausted by design choices. \u20b91,500 saves them 10 hours of fiddling. <strong>You're selling time-back, not pretty PDFs.</strong>",
        action: 'Define your aesthetic in 3 words'
      },
      profit: {
        body: "Cost: <strong>$0</strong> (Canva Pro $13/mo). Make 30 templates in a week. Sell pack at $29. <strong>20 sales/month = $580 = \u20b948K passive</strong>.",
        stats: [{label: 'Cost', value: '~$13'}, {label: 'Monthly (20 sales)', value: '~\u20b948K'}],
        action: 'Compute break-even sales'
      },
      distributors: {
        body: "<strong>Sell on:</strong> Etsy (massive Canva template buyer base), Creative Market, Gumroad. <strong>Tools:</strong> Canva Pro. <strong>Free traffic:</strong> Pinterest is THE channel for Canva templates \u2014 every pin links back.",
        action: 'Set up Etsy shop'
      },
      pricing: {
        body: "<strong>Single 10-template pack</strong> $19. <strong>30-template pack</strong> $39. <strong>Lifetime + future</strong> $99. Bundle pricing is the move.",
        action: 'Lock pricing structure'
      },
      sellingPrice: {
        body: "<strong>$29 30-pack.</strong> Etsy users buy this without thinking. Don't price below $19 \u2014 bargain bin.",
        stats: [{label: '30-pack', value: '$29'}, {label: 'Lifetime', value: '$99'}],
        action: 'List on Etsy with Pinterest pins'
      }
    }
  },
  {
    id: 'stock-photos',
    deck: 'digital', deckLabel: 'Digital \u00b7 online', channels: ['online'],
    name: 'Niche Stock Photos',
    hook: 'Sell flatlay photos to brands & bloggers',
    capital: '\u20b92K \u2013 10K',
    effort: 2,
    interests: ['design', 'beauty', 'home'],
    image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=900&q=80',
    bg: '#d4a373',
    badges: ['lessCrowded', 'globalDemand'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 24, high: 120 },
    sellingPrice_usd: { pack: 39, sub: 199 },
    distributors: {
      US: 'Sell: <strong>Gumroad</strong> (best cut), Creative Market, your own site, Etsy. Tools: phone + natural light. Traffic: Pinterest pins for each photo, Instagram with brand-niche hashtags.',
      IN: 'Sell on: <strong>Gumroad</strong> (USD). Indian niches (festival, traditional, brown skin) have low supply, growing demand globally.',
      AE: 'Niche: <strong>Modest fashion, Ramadan, Gulf lifestyle</strong> \u2014 underserved on global stock sites. Sell via Gumroad.',
      RU: '\u041f\u0440\u043e\u0434\u0430\u0436\u0430: <strong>Shutterstock</strong>, Adobe Stock \u043c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u043e. \u041b\u043e\u043a\u0430\u043b\u044c\u043d\u043e: Boosty.',
      KZ: '\u0422\u0435 \u0436\u0435 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b. \u0423\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u0430\u044f \u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u043e\u0430\u0437\u0438\u0430\u0442\u0441\u043a\u0430\u044f \u044d\u0441\u0442\u0435\u0442\u0438\u043a\u0430 \u2014 \u043c\u0430\u043b\u043e \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439.'
    },
    breakdown: {
      strategy: {
        body: "Stock photos are <strong>brutally saturated globally</strong> \u2014 except in tight niches. 'Indian wellness flatlays.' 'Brown skin beauty.' 'Mid-century minimal home.' <strong>Niche = high price, low competition.</strong>",
        action: 'Pick your underserved niche'
      },
      value: {
        body: "Buyer: brand + blogger desperate for non-generic stock that matches their audience. They'd pay $39 for 10 photos that look like 'their people'. <strong>Representation = pricing power.</strong>",
        action: 'Find 5 brands needing your niche'
      },
      profit: {
        body: "Cost: phone camera + \u20b95K props. Effort: 2-3 shoot days = 100+ photos. Sell packs at $39-99. <strong>15 packs/mo \u00d7 $39 = $585 = ~\u20b948K</strong>.",
        stats: [{label: 'Per pack net', value: '$35'}, {label: 'Monthly', value: '~\u20b948K'}],
        action: 'Plan your first photo shoot'
      },
      distributors: {
        body: "<strong>Sell:</strong> Gumroad (best cut), Creative Market, your own site, Etsy. <strong>Tools:</strong> phone + natural light. <strong>Traffic:</strong> Pinterest pins for each photo, Instagram with brand-niche hashtags.",
        action: 'Set up Gumroad + sample 10 photos'
      },
      pricing: {
        body: "<strong>10-photo pack</strong> $39. <strong>25-photo pack</strong> $79. <strong>Annual subscription</strong> 50 photos/yr $199. Subscription is the real prize.",
        action: 'Build pricing tiers'
      },
      sellingPrice: {
        body: "Launch <strong>$39 starter pack</strong>. Volume + consistency > price. Subscription at $199 is your eventual annuity.",
        stats: [{label: 'Starter', value: '$39'}, {label: 'Subscription', value: '$199/yr'}],
        action: 'Shoot first 10 photos this weekend'
      }
    }
  },
  // ---------- SAAS ----------
  {
    id: 'micro-ai-tool',
    deck: 'saas', deckLabel: 'SaaS \u00b7 online', channels: ['online'],
    name: 'AI Copy Generator (Niche)',
    hook: 'One-task AI tool for one specific industry',
    capital: '\u20b910K \u2013 50K',
    effort: 3,
    interests: ['tech', 'writing'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80',
    bg: '#1F1B16',
    badges: ['trending', 'provenIncome'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 120, high: 600 },
    sellingPrice_usd: { starter: 19, pro: 49 },
    distributors: {
      US: 'Build: <strong>Bolt</strong> or Lovable (no-code AI), Vercel hosting, Stripe billing. Backend: OpenAI/Anthropic APIs. Find users: Reddit niche subs, FB groups, cold DMs to top creators in niche. <strong>Indie Hackers</strong> community.',
      IN: 'Same global stack: Bolt, Vercel, <strong>Razorpay</strong> + Stripe. Distribute via Twitter/X, Indian niche communities.',
      AE: 'Same stack. UAE has good ecosystem for B2B SaaS \u2014 reach out via LinkedIn UAE.',
      RU: '\u0421\u0442\u0435\u043a: <strong>Lovable</strong>, Vercel, \u042e\u041assa \u0434\u043b\u044f \u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439 RU. \u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0430: Habr, VC.ru.',
      KZ: '\u0422\u0430 \u0436\u0435 \u0441\u0442\u0435\u043a. \u0414\u043b\u044f KZ-\u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439: Kaspi Pay \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f.'
    },
    breakdown: {
      strategy: {
        body: "Don't build 'AI for everyone' \u2014 that's ChatGPT's game. Build <strong>'AI for one job in one industry'</strong>. 'AI listing writer for Etsy sellers'. 'AI bio writer for fitness coaches'. Narrow = winnable.",
        action: 'Pick your one-job + one-niche'
      },
      value: {
        body: "Buyer: a person doing this one job 50\u00d7 per week. They'll pay $19/mo to do it 10\u00d7 faster. <strong>You're not selling AI \u2014 you're selling the 4 hours back.</strong>",
        action: 'Find 3 people in your niche to interview'
      },
      profit: {
        body: "OpenAI cost per use: <strong>$0.01-0.05</strong>. Charge $19/mo subscription. <strong>50 paying users = $950/mo = \u20b978K MRR</strong>. Recurring. Compounds.",
        stats: [{label: 'Per user/mo', value: '$19'}, {label: 'At 50 users', value: '~\u20b978K MRR'}],
        action: 'Calculate unit economics'
      },
      distributors: {
        body: "<strong>Build:</strong> Bolt or Lovable (no-code AI), Vercel hosting, Stripe billing. <strong>Backend:</strong> OpenAI/Anthropic APIs. <strong>Find users:</strong> Reddit niche subs, FB groups, cold DMs to top creators in niche. Indie Hackers community.",
        action: 'Set up Stripe + Bolt account'
      },
      pricing: {
        body: "<strong>Free trial</strong> 5 generations. <strong>Starter</strong> $19/mo (50 generations). <strong>Pro</strong> $49/mo (unlimited). Three tiers always beat one.",
        action: 'Lock 3-tier pricing'
      },
      sellingPrice: {
        body: "Starter at <strong>$19/mo</strong> is the magic price for solo SaaS. Below that = bad customers. Above = needs a sales pitch.",
        stats: [{label: 'Starter', value: '$19/mo'}, {label: 'Pro', value: '$49/mo'}],
        action: 'Build landing page + waitlist'
      }
    }
  },
  {
    id: 'chrome-extension',
    deck: 'saas', deckLabel: 'SaaS \u00b7 online', channels: ['online'],
    name: 'Niche Chrome Extension',
    hook: 'Tiny browser tool for one specific workflow',
    capital: '\u20b95K \u2013 30K',
    effort: 3,
    interests: ['tech'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80',
    bg: '#5C7A5C',
    badges: ['lowCapital', 'fastSale'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 60, high: 360 },
    sellingPrice_usd: { lifetime: 9, monthly: 4 },
    distributors: {
      US: 'Build: Chrome Web Store APIs (free), use <strong>Cursor</strong> or Bolt to build. Hosting: Vercel free tier. Distribution: Chrome Web Store search + <strong>Product Hunt</strong> launch + Reddit niche subs.',
      IN: 'Same global tools. Indian devs strong on <strong>Twitter/X</strong> + Indie Hackers India community.',
      AE: 'Same. UAE indie SaaS founder community on LinkedIn growing.',
      RU: '\u0422\u0435 \u0436\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b. \u0421\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e: Habr, \u0438\u043d\u0434\u0438\u0445\u0430\u043a\u0435\u0440\u0441 RU \u0447\u0430\u0442\u044b \u0432 Telegram.',
      KZ: '\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0442\u0435\u043a. KZ developer community \u043c\u0430\u043b\u0430, \u043d\u043e \u0430\u043a\u0442\u0438\u0432\u043d\u0430 \u0432 Telegram.'
    },
    breakdown: {
      strategy: {
        body: "Chrome extensions are <strong>the lowest-effort SaaS</strong>. Solve ONE annoying browser problem. Distribution is built in (Chrome Web Store). 'Save Twitter threads as PDFs'. 'Export Notion to Markdown'.",
        action: 'Pick the one annoying browser problem'
      },
      value: {
        body: "Buyer: someone who has the problem 5\u00d7 a day. \u20b9500 lifetime is impulse. \u20b9500/yr subscription is also impulse. <strong>Capture intent at the moment of frustration.</strong>",
        action: 'Find users complaining about it on Twitter'
      },
      profit: {
        body: "Cost: <strong>~$0</strong> (you build it). One-time $9 lifetime or $4/mo. <strong>200 users \u00d7 $9 = \u20b91.5L one-time</strong>, or ongoing $800/mo MRR if subscription.",
        stats: [{label: 'Lifetime price', value: '$9'}, {label: '200 users', value: '~\u20b91.5L'}],
        action: 'Decide: lifetime or subscription'
      },
      distributors: {
        body: "<strong>Build:</strong> Chrome Web Store APIs (free), use Cursor or Bolt to build. <strong>Hosting:</strong> Vercel free tier. <strong>Distribution:</strong> Chrome Web Store search + Product Hunt launch + Reddit niche subs.",
        action: 'Submit to Chrome Web Store'
      },
      pricing: {
        body: "<strong>Free with limits</strong> + <strong>Pro $9 lifetime</strong> OR <strong>Pro $4/mo</strong>. Lifetime gets you cash now. Subscription compounds. Most niche extensions go lifetime.",
        action: 'Pick lifetime vs subscription'
      },
      sellingPrice: {
        body: "<strong>$9 lifetime</strong> for an extension feels right. Below $5 = perceived as junk. Above $19 needs a sales page.",
        stats: [{label: 'Lifetime', value: '$9'}, {label: 'Pro/mo', value: '$4'}],
        action: 'Launch v1 on Product Hunt'
      }
    }
  },
  {
    id: 'auto-script',
    deck: 'saas', deckLabel: 'SaaS \u00b7 online', channels: ['online'],
    name: 'Automation Service',
    hook: 'Build & sell Zapier/Make automations for SMBs',
    capital: '\u20b90 \u2013 10K',
    effort: 2,
    interests: ['tech', 'services'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80',
    bg: '#C99A4B',
    badges: ['fastSale', 'provenIncome'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 0, high: 120 },
    sellingPrice_usd: { audit: 60, project: 300 },
    distributors: {
      US: 'Tools: <strong>Zapier</strong>, Make.com, n8n (free). Find clients: <strong>LinkedIn DMs</strong> to SMB owners, FB groups, local Chamber of Commerce, cold email. Productize: packaged "automation audits".',
      IN: 'Same tools. Indian SMB outreach: <strong>LinkedIn</strong> + WhatsApp groups for industry niches. Audits in INR for local clients.',
      AE: 'UAE SMBs are eager for automation but underserved. LinkedIn UAE + DMCC/SHAMS networking events.',
      RU: '\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b: <strong>Make</strong>, n8n. \u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u0438\u0435 \u0421\u041c\u0411 \u043d\u0430\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 LinkedIn + Telegram-\u043a\u0430\u043d\u0430\u043b\u044b \u043f\u043e \u043d\u0438\u0448\u0430\u043c.',
      KZ: '\u0422\u0435 \u0436\u0435 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b. KZ-\u0421\u041c\u0411 \u043c\u0435\u043d\u044c\u0448\u0435 \u0437\u043d\u0430\u044e\u0442 \u043f\u0440\u043e \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044e \u2014 \u043d\u0438\u0437\u043a\u0430\u044f \u043a\u043e\u043d\u043a\u0443\u0440\u0435\u043d\u0446\u0438\u044f.'
    },
    breakdown: {
      strategy: {
        body: "Most small businesses run on chaos \u2014 Google Sheets, email, WhatsApp. They don't know Zapier exists. <strong>You sell automation as 'I'll fix your back-office mess in 1 week'.</strong>",
        action: 'List 5 SMB types to target'
      },
      value: {
        body: "Buyer: 30-50 yr old small business owner losing 10 hours/wk to manual work. \u20b915K to never do it again = obvious yes. <strong>Time = money, ROI obvious.</strong>",
        action: 'Pick 1 industry to start with'
      },
      profit: {
        body: "Per project: <strong>\u20b915K-50K one-time</strong>. Cost: your time + Zapier/Make subscription \u20b92K. <strong>2 projects/mo = \u20b930K-100K profit</strong>. Plus retainers later.",
        stats: [{label: 'Per project', value: '\u20b915-50K'}, {label: 'Monthly (2 projects)', value: '\u20b930-100K'}],
        action: 'Plan project pricing tiers'
      },
      distributors: {
        body: "<strong>Tools:</strong> Zapier, Make.com, n8n (free). <strong>Find clients:</strong> LinkedIn DMs to SMB owners, FB groups, local Chamber of Commerce, cold email. <strong>Productize:</strong> packaged 'automation audits' at fixed price.",
        action: 'Pick 3 SMB FB groups to join'
      },
      pricing: {
        body: "<strong>Audit</strong> \u20b95,000 (find 5 things to automate). <strong>Build</strong> \u20b915K-30K per workflow. <strong>Retainer</strong> \u20b910K/mo for ongoing tweaks. Audit is your foot-in-door.",
        action: 'Productize 3 service tiers'
      },
      sellingPrice: {
        body: "Lead with <strong>\u20b95K audit</strong> \u2014 low risk, easy yes. Then upsell \u20b915-30K builds. Retainers come naturally after first build.",
        stats: [{label: 'Audit (entry)', value: '\u20b95K'}, {label: 'Full project', value: '\u20b925K'}],
        action: 'Pitch 5 SMBs with audit offer'
      }
    }
  },
  {
    id: 'membership-site',
    deck: 'saas', deckLabel: 'SaaS \u00b7 online', channels: ['online'],
    name: 'Niche Membership Site',
    hook: 'Paid community + content for one specific group',
    capital: '\u20b93K \u2013 15K',
    effort: 2,
    interests: ['tech', 'services', 'writing'],
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80',
    bg: '#8E4128',
    badges: ['provenIncome', 'lowCapital'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 36, high: 180 },
    sellingPrice_usd: { monthly: 29, annual: 290 },
    distributors: {
      US: 'Build on: <strong>Skool</strong> (best for new), Circle, Mighty Networks. Distribute: Twitter/LinkedIn audience, niche newsletters, podcast guesting. Free pre-launch: waitlist + 1-on-1 calls with first 10.',
      IN: 'Build on: <strong>Skool</strong> (USD pricing) or Topmate.io (INR). Distribute: LinkedIn + Twitter/X + niche WhatsApp groups.',
      AE: 'Skool/Circle. UAE professional community on LinkedIn is dense \u2014 niche communities can hit 100 members fast.',
      RU: '\u041f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b: <strong>Boosty</strong>, Patreon, Sponsr. Telegram premium-\u043a\u0430\u043d\u0430\u043b\u044b \u0442\u043e\u0436\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442.',
      KZ: 'Boosty + \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0435. KZ-\u0430\u0443\u0434\u0438\u0442\u043e\u0440\u0438\u044f \u0441\u043e\u0432\u043c\u0435\u0449\u0430\u0435\u0442 \u0441 RU-\u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0430\u043c\u0438.'
    },
    breakdown: {
      strategy: {
        body: "Membership sites win on <strong>community + curated info</strong>, not content volume. 'Private community of female solopreneurs.' 'Indian designers job board + crit group.' Tight, real value, $19-49/mo.",
        action: 'Pick your community niche'
      },
      value: {
        body: "Buyer: someone who feels alone in their pursuit. They want <strong>'people like me' + insider info</strong>. \u20b91,500/mo for 'I have peers' is a steal. <strong>Belonging > content.</strong>",
        action: 'Pick your insider value (jobs? feedback? AMAs?)'
      },
      profit: {
        body: "Cost: Skool/Circle subscription \u20b91,500/mo. Charge $29/mo. <strong>30 members = $870/mo = \u20b972K MRR</strong>. Compounds. Highest LTV of any product type.",
        stats: [{label: 'Per member/mo', value: '$29'}, {label: 'At 30 members', value: '~\u20b972K MRR'}],
        action: 'Calculate target member count'
      },
      distributors: {
        body: "<strong>Build on:</strong> Skool (best for new), Circle, Mighty Networks. <strong>Distribute:</strong> Twitter/LinkedIn audience, niche newsletters, podcast guesting. <strong>Free pre-launch:</strong> waitlist + 1-on-1 calls with first 10.",
        action: 'Choose Skool or Circle'
      },
      pricing: {
        body: "<strong>Monthly</strong> $29. <strong>Annual</strong> $290 (2 months free). <strong>Lifetime founders'</strong> $499. Annual is your locked revenue.",
        action: 'Set 3 pricing options'
      },
      sellingPrice: {
        body: "<strong>$29/mo</strong> is the proven niche-membership price. Below = doesn't feel premium, churn high. Annual at $290 anchors loyalty.",
        stats: [{label: 'Monthly', value: '$29'}, {label: 'Annual', value: '$290'}],
        action: 'Build waitlist landing page'
      }
    }
  },
  {
    id: 'newsletter-paid',
    deck: 'saas', deckLabel: 'SaaS \u00b7 online', channels: ['online'],
    name: 'Paid Newsletter (Niche)',
    hook: 'Weekly insights for one professional group',
    capital: '\u20b90 \u2013 3K',
    effort: 2,
    interests: ['writing', 'tech'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80',
    bg: '#5C7A5C',
    badges: ['lowCapital', 'globalDemand'],
    markets: ['US','IN','AE','RU','KZ'],
    capital_usd: { low: 0, high: 36 },
    sellingPrice_usd: { monthly: 7, annual: 70 },
    distributors: {
      US: 'Platforms: <strong>Substack</strong> (built-in audience), beehiiv (better tools), Ghost (you own it). Growth: Twitter threads \u2192 free version \u2192 upsell premium.',
      IN: 'Platforms: <strong>Substack</strong>, beehiiv. Indian niches (D2C, finance, AI) growing fast. Charge in USD for global, INR via Topmate for local.',
      AE: 'Substack + beehiiv. UAE business newsletters have premium-pricing pull.',
      RU: '\u041f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b: <strong>Boosty</strong>, Sponsr. Telegram-\u043a\u0430\u043d\u0430\u043b\u044b \u0441 \u043f\u043b\u0430\u0442\u043d\u043e\u0439 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u043e\u0439 \u2014 \u043e\u0441\u043d\u043e\u0432\u043d\u043e\u0439 \u0444\u043e\u0440\u043c\u0430\u0442 RU.',
      KZ: 'Boosty + Substack. \u0414\u0432\u0443\u044f\u0437\u044b\u0447\u043d\u044b\u0435 \u043d\u0438\u0448\u0438 (RU + KZ + EN) \u0432\u044b\u0434\u0435\u043b\u044f\u044e\u0442\u0441\u044f.'
    },
    breakdown: {
      strategy: {
        body: "Paid newsletters are the <strong>highest-margin content business</strong>. Pick one professional niche. Become 'the source' for them. 'Marketing for Indian D2C founders.' 'AI for HR teams.' Specific = paid.",
        action: 'Pick your niche + your specific weekly value'
      },
      value: {
        body: "Buyer: a professional in your niche who'd pay $5/mo to NOT spend 5 hours scanning Twitter. <strong>You're selling time + curation.</strong>",
        action: 'Define your weekly format (3-section, deep dive, etc.)'
      },
      profit: {
        body: "Cost: ~$0 (Substack/beehiiv free + paid plans). Charge $5-10/mo. <strong>200 paid subs \u00d7 $5 = $1,000/mo = ~\u20b983K MRR</strong>. Compounds with audience growth.",
        stats: [{label: 'Per sub/mo', value: '$5'}, {label: 'At 200 subs', value: '~\u20b983K MRR'}],
        action: 'Project subscriber count needed'
      },
      distributors: {
        body: "<strong>Platforms:</strong> Substack (built-in audience), beehiiv (better tools), Ghost (you own it). <strong>Growth:</strong> Twitter threads \u2192 free version \u2192 upsell premium. <strong>Free tier first</strong> always.",
        action: 'Sign up on beehiiv or Substack'
      },
      pricing: {
        body: "<strong>Free tier</strong> (1 post/wk). <strong>Paid</strong> $7/mo or $70/yr. <strong>Founding member</strong> $200 lifetime. Annual is the lock-in.",
        action: 'Plan free vs paid content split'
      },
      sellingPrice: {
        body: "<strong>$7/mo</strong> is the sweet spot. Below $5 feels devalued. Above $10 needs a sales pitch. Annual at $70 anchors retention.",
        stats: [{label: 'Monthly', value: '$7'}, {label: 'Annual', value: '$70'}],
        action: 'Send first 4 free issues to build list'
      }
    }
  }
]
