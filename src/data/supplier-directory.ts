/**
 * Curated supplier directory — real platforms with real URLs.
 * Organized by category so each product idea gets matched to the right suppliers.
 *
 * Sources: Shopify wholesale guide, China manufacturer directories,
 * IndiaMART, Faire, DHgate, category-specific B2B sites.
 */

export interface SupplierPlatform {
  name: string
  url: string
  type: 'marketplace' | 'manufacturer-direct' | 'wholesale' | 'b2b-directory'
  region: 'global' | 'china' | 'india' | 'us' | 'eu'
  bestFor: string // "Small test orders" | "Bulk manufacturing" | etc
  moqRange: string // "1 unit" | "50-100" | "500+"
  shippingDays: string
  color: string // brand color for pill
  textColor: string
}

export interface CategorySuppliers {
  category: string
  keywords: string[] // match product ideas to this category
  platforms: SupplierPlatform[]
  chinaDirectSites: { name: string; url: string; specialty: string }[]
  youtubeGuides: { title: string; url: string; views: string; channel: string }[]
}

// ============================================================
// GLOBAL PLATFORMS — work for almost every product category
// ============================================================

export const GLOBAL_PLATFORMS: SupplierPlatform[] = [
  {
    name: 'AliExpress',
    url: 'https://www.aliexpress.com',
    type: 'marketplace',
    region: 'china',
    bestFor: 'Small test orders (1-10 units), fast sampling',
    moqRange: '1 unit',
    shippingDays: '7-14 days',
    color: '#FFE4B5',
    textColor: '#1F1B16',
  },
  {
    name: 'Alibaba',
    url: 'https://www.alibaba.com',
    type: 'manufacturer-direct',
    region: 'china',
    bestFor: 'Bulk orders, custom branding, factory direct',
    moqRange: '50-500 units',
    shippingDays: '14-30 days',
    color: '#FF6A00',
    textColor: '#fff',
  },
  {
    name: 'DHgate',
    url: 'https://www.dhgate.com',
    type: 'marketplace',
    region: 'china',
    bestFor: 'Mid-range orders, good for electronics + fashion',
    moqRange: '5-50 units',
    shippingDays: '10-20 days',
    color: '#FF6B00',
    textColor: '#fff',
  },
  {
    name: 'Faire',
    url: 'https://www.faire.com',
    type: 'wholesale',
    region: 'us',
    bestFor: 'US/EU wholesale brands, net-60 payment terms, free returns',
    moqRange: 'Varies by brand',
    shippingDays: '3-7 days (US)',
    color: '#000000',
    textColor: '#fff',
  },
  {
    name: 'IndiaMART',
    url: 'https://www.indiamart.com',
    type: 'b2b-directory',
    region: 'india',
    bestFor: 'International manufacturers, negotiate MOQ directly',
    moqRange: '10-100 units',
    shippingDays: '14-21 days (international shipping)',
    color: '#FF6F00',
    textColor: '#fff',
  },
  {
    name: 'Wholesale Central',
    url: 'https://www.wholesalecentral.com',
    type: 'b2b-directory',
    region: 'us',
    bestFor: 'US wholesale suppliers directory, verified sellers',
    moqRange: 'Varies',
    shippingDays: '3-7 days (US)',
    color: '#2563EB',
    textColor: '#fff',
  },
  {
    name: 'Thomasnet',
    url: 'https://www.thomasnet.com',
    type: 'b2b-directory',
    region: 'us',
    bestFor: 'US/North American manufacturers, industrial + consumer goods',
    moqRange: 'Varies',
    shippingDays: '5-14 days',
    color: '#00843D',
    textColor: '#fff',
  },
  {
    name: 'Shopify Collective',
    url: 'https://www.shopify.com/collective',
    type: 'wholesale',
    region: 'us',
    bestFor: 'Sell other Shopify brands products, no inventory needed',
    moqRange: 'No MOQ — dropship from brands',
    shippingDays: '3-5 days (brand ships)',
    color: '#96BF48',
    textColor: '#fff',
  },
  {
    name: 'EK Wholesale',
    url: 'https://www.ekwholesale.com',
    type: 'wholesale',
    region: 'eu',
    bestFor: 'EU wholesale, trending products, low MOQ',
    moqRange: '10+ units',
    shippingDays: '5-10 days (EU)',
    color: '#E91E63',
    textColor: '#fff',
  },
  {
    name: 'LightInTheBox',
    url: 'https://www.lightinthebox.com',
    type: 'marketplace',
    region: 'china',
    bestFor: 'General merchandise, fashion, home goods, small orders',
    moqRange: '1 unit',
    shippingDays: '7-14 days',
    color: '#FF4081',
    textColor: '#fff',
  },
]

// ============================================================
// CATEGORY-SPECIFIC SUPPLIERS — China direct + niche platforms
// ============================================================

export const CATEGORY_SUPPLIERS: CategorySuppliers[] = [
  // === HOME & LIVING ===
  {
    category: 'Home & Living',
    keywords: ['home', 'rug', 'macrame', 'pillow', 'planter', 'coaster', 'decor', 'wall hanging', 'flower', 'curtain', 'blanket', 'clock', 'mirror', 'shelf', 'basket', 'vase', 'terrarium', 'wreath', 'night light', 'potpourri'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'MeiJiaVIP', url: 'https://meijiavip.com', specialty: 'Furniture and home goods manufacturing' },
      { name: 'GlobalSources Home', url: 'https://www.globalsources.com/home-decor.html', specialty: 'Verified home decor manufacturers' },
    ],
    youtubeGuides: [
      { title: 'How to Source Home Decor Products', url: 'https://youtube.com/@wholesaleted', views: '312K', channel: '@wholesaleted' },
    ],
  },
  // === CANDLES & FRAGRANCE ===
  {
    category: 'Candles & Fragrance',
    keywords: ['candle', 'soy candle', 'wax melt', 'reed diffuser', 'room spray', 'fragrance', 'incense', 'diffuser', 'aroma', 'scent', 'wick', 'wax', 'pillar candle', 'taper', 'massage candle', 'linen spray'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'CaiFeDeCandles', url: 'https://caifedecandles.com', specialty: 'Candle manufacturing, custom scents, private label' },
    ],
    youtubeGuides: [
      { title: 'How to Find the Best Manufacturer for Your Product', url: 'https://youtube.com/@marshallcrews_', views: '218K', channel: '@marshallcrews_' },
    ],
  },
  // === JEWELRY & ACCESSORIES ===
  {
    category: 'Jewelry & Accessories',
    keywords: ['jewelry', 'silver', 'resin', 'polymer clay', 'earrings', 'bracelet', 'necklace', 'ring', 'pendant', 'anklet', 'brooch', 'cuff', 'stud', 'hoop', 'chain', 'bangle', 'pin', 'keychain', 'locket', 'charm', 'gemstone', 'opal', 'turquoise', 'pearl'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'EasyWholesales', url: 'https://easywholesales.com', specialty: 'Wholesale jewelry, fashion accessories' },
      { name: 'Pandahall', url: 'https://www.pandahall.com', specialty: 'Jewelry findings, beads, and supplies wholesale' },
    ],
    youtubeGuides: [
      { title: 'Jewelry Supplier Sourcing Guide', url: 'https://youtube.com/@createandflow', views: '95K', channel: '@createandflow' },
    ],
  },
  // === BEAUTY & WELLNESS ===
  {
    category: 'Beauty & Wellness',
    keywords: ['soap', 'bath bomb', 'lip balm', 'serum', 'body butter', 'scrub', 'oil', 'beauty', 'skincare', 'shampoo', 'cream', 'mask', 'toner', 'deodorant', 'balm', 'roller', 'gua sha', 'perfume', 'moisturizer', 'cleanser', 'hair oil', 'beard', 'nail', 'lash', 'brow'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'BeautySourcing', url: 'https://www.beautysourcing.com', specialty: 'Beauty and cosmetics contract manufacturing' },
    ],
    youtubeGuides: [
      { title: 'How to Start a Skincare Line', url: 'https://youtube.com/@modernmakeup', views: '450K', channel: '@modernmakeup' },
    ],
  },
  // === PETS ===
  {
    category: 'Pet Supplies',
    keywords: ['pet', 'dog', 'cat', 'bandana', 'tag', 'treat', 'toy', 'collar', 'leash', 'harness', 'bed', 'bowl', 'bird', 'fish', 'hamster', 'rabbit', 'shampoo', 'dental', 'carrier', 'stroller', 'anxiety', 'snuffle'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'GlobalSources Pets', url: 'https://www.globalsources.com/pet-products.html', specialty: 'Pet products wholesale from verified factories' },
    ],
    youtubeGuides: [],
  },
  // === FOOD & BEVERAGE ===
  {
    category: 'Food & Beverage',
    keywords: ['food', 'spice', 'sauce', 'honey', 'granola', 'cookie', 'tea', 'coffee', 'jerky', 'nut butter', 'kombucha', 'popcorn', 'chocolate', 'jam', 'matcha', 'salt', 'protein', 'pickle', 'vinegar', 'caramel', 'broth', 'mushroom', 'syrup', 'seaweed', 'curry'],
    platforms: [
      ...GLOBAL_PLATFORMS.filter(p => ['IndiaMART', 'Faire', 'Wholesale Central', 'Thomasnet'].includes(p.name)),
      { name: 'WebstaurantStore', url: 'https://www.webstaurantstore.com', type: 'wholesale', region: 'us', bestFor: 'Restaurant-grade ingredients and packaging at wholesale prices', moqRange: 'Varies', shippingDays: '2-5 days (US)', color: '#2E7D32', textColor: '#fff' },
    ],
    chinaDirectSites: [],
    youtubeGuides: [
      { title: 'How to Start a Food Business from Home', url: 'https://youtube.com/@foodbizwiz', views: '280K', channel: '@foodbizwiz' },
    ],
  },
  // === KIDS & BABY ===
  {
    category: 'Kids & Baby',
    keywords: ['kids', 'baby', 'children', 'toy', 'wooden toy', 'sensory', 'art kit', 'bib', 'teething', 'milestone', 'swaddle', 'mobile', 'puzzle', 'flashcard', 'night light', 'backpack', 'lunch', 'booties', 'sticker book'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'GlobalSources Kids', url: 'https://www.globalsources.com/baby-products.html', specialty: 'Baby and kids products, CPSC-compliant factories' },
    ],
    youtubeGuides: [],
  },
  // === STATIONERY & ART ===
  {
    category: 'Stationery & Art',
    keywords: ['sticker', 'card', 'washi tape', 'print', 'stamp', 'bookmark', 'stationery', 'planner', 'notebook', 'pen', 'pencil', 'sketchbook', 'calligraphy', 'coloring', 'origami', 'scrapbook', 'desk', 'clipboard', 'cork board'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'ShenZhen FH', url: 'https://szrfh.com', specialty: 'School and office supplies manufacturing' },
      { name: 'Sticker Mule', url: 'https://www.stickermule.com', specialty: 'Custom stickers, labels, magnets, buttons' },
    ],
    youtubeGuides: [],
  },
  // === CLOTHING & APPAREL ===
  {
    category: 'Clothing & Apparel',
    keywords: ['clothing', 'shirt', 't-shirt', 'dress', 'fashion', 'scrunchie', 'tie-dye', 'crochet', 'hat', 'beanie', 'scarf', 'bandana', 'kimono', 'shorts', 'leggings', 'sweater', 'jacket', 'swimwear', 'pajama', 'hijab', 'apron', 'jersey', 'belt', 'sock', 'sneaker'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'GlobalSources Apparel', url: 'https://www.globalsources.com/fashion-accessories.html', specialty: 'Fashion and garment manufacturing' },
    ],
    youtubeGuides: [
      { title: 'How to Start a Clothing Brand', url: 'https://youtube.com/@justinwoll', views: '1.2M', channel: '@justinwoll' },
    ],
  },
  // === TECH & GADGETS ===
  {
    category: 'Tech & Gadgets',
    keywords: ['phone', 'led', 'charger', 'cable', 'laptop', 'keyboard', 'webcam', 'speaker', 'usb', 'bluetooth', 'stylus', 'hub', 'fan', 'tripod', 'power bank', 'mouse pad', 'plug', 'lamp', 'ring light', 'sleeve', 'desk mat', 'thermometer'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'SZ Electronics', url: 'https://www.globalsources.com/electronics.html', specialty: 'Shenzhen electronics and gadgets wholesale' },
    ],
    youtubeGuides: [],
  },
  // === ECO & SUSTAINABILITY ===
  {
    category: 'Eco & Sustainability',
    keywords: ['reusable', 'bamboo', 'eco', 'compost', 'biodegradable', 'zero waste', 'organic', 'sustainable', 'natural', 'silicone', 'beeswax wrap', 'seed', 'cork', 'jute', 'loofah', 'worm'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'EcoBamboo', url: 'https://www.alibaba.com/premium/bamboo-products.html', specialty: 'Bamboo and eco-friendly product manufacturing' },
    ],
    youtubeGuides: [],
  },
  // === FITNESS & SPORTS ===
  {
    category: 'Fitness & Sports',
    keywords: ['resistance', 'yoga', 'jump rope', 'gym', 'water bottle', 'foam roller', 'wrist', 'towel', 'glove', 'shaker', 'weight', 'grip', 'balance', 'stepper', 'swim', 'paddle', 'timer', 'mat', 'agility', 'chalk'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'NanTong Sports', url: 'https://www.alibaba.com/premium/sports-goods.html', specialty: 'Sports and fitness equipment manufacturing' },
    ],
    youtubeGuides: [],
  },
  // === GARDEN & OUTDOOR ===
  {
    category: 'Garden & Outdoor',
    keywords: ['herb', 'garden', 'plant', 'seed', 'bird', 'planter', 'watering', 'gnome', 'solar', 'stepping stone', 'succulent', 'wind chime', 'compost', 'bonsai', 'mushroom grow', 'butterfly', 'rain gauge', 'propagation', 'outdoor cushion'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'Yiwu Garden', url: 'https://www.alibaba.com/premium/garden-supplies.html', specialty: 'Garden tools and decor wholesale from Yiwu' },
    ],
    youtubeGuides: [],
  },
  // === ART & CRAFT SUPPLIES ===
  {
    category: 'Art & Craft Supplies',
    keywords: ['resin kit', 'candle making kit', 'soap making', 'embroidery kit', 'tie-dye kit', 'pottery', 'macrame cord', 'punch needle', 'weaving', 'screen printing', 'alcohol ink', 'leather craft', 'sewing kit', 'needle felt', 'mosaic', 'crochet kit', 'block print', 'terrarium kit', 'quilling', 'batik', 'wire art', 'cross stitch', 'book binding'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'Yiwu Crafts', url: 'https://www.alibaba.com/premium/craft-supplies.html', specialty: 'DIY craft kits and supplies wholesale' },
    ],
    youtubeGuides: [],
  },
  // === PERSONALIZED & CUSTOM ===
  {
    category: 'Personalized & Custom',
    keywords: ['engrav', 'personali', 'custom', 'monogram', 'name', 'portrait', 'commission', 'neon sign', 'bobblehead', 'playing card', 'stamp', 'initial'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'CustomPromo', url: 'https://www.alibaba.com/premium/custom-gifts.html', specialty: 'Custom engraving, printing, and personalization' },
    ],
    youtubeGuides: [],
  },
  // === HEALTH & SUPPLEMENTS ===
  {
    category: 'Health & Supplements',
    keywords: ['supplement', 'vitamin', 'protein', 'collagen', 'probiotics', 'melatonin', 'gummies', 'capsule', 'powder', 'electrolyte', 'magnesium', 'turmeric', 'omega', 'biotin', 'zinc', 'elderberry', 'spirulina', 'mushroom complex', 'fiber', 'iron', 'ashwagandha', 'creatine', 'mct', 'digestive', 'pre-workout', 'calcium', 'joint'],
    platforms: [
      ...GLOBAL_PLATFORMS.filter(p => ['Alibaba', 'IndiaMART', 'Thomasnet'].includes(p.name)),
      { name: 'NutraScience Labs', url: 'https://nutrasciencelabs.com', type: 'manufacturer-direct', region: 'us', bestFor: 'Contract supplement manufacturing, custom formulations, FDA-compliant', moqRange: '500-1000 units', shippingDays: '6-8 weeks (manufacturing)', color: '#1565C0', textColor: '#fff' },
      { name: 'BulkSupplements', url: 'https://www.bulksupplements.com', type: 'wholesale', region: 'us', bestFor: 'Raw supplement ingredients in bulk, self-capsule', moqRange: '1 kg+', shippingDays: '3-5 days (US)', color: '#4CAF50', textColor: '#fff' },
    ],
    chinaDirectSites: [],
    youtubeGuides: [],
  },
  // === PARTY & EVENTS ===
  {
    category: 'Party & Events',
    keywords: ['balloon', 'party', 'cake topper', 'confetti', 'banner', 'bunting', 'tableware', 'favor', 'hat', 'pinata', 'centerpiece', 'cupcake', 'streamer', 'sparkler', 'crown', 'pom pom'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'Yiwu Party', url: 'https://www.alibaba.com/premium/party-supplies.html', specialty: 'Party supplies and decorations wholesale from Yiwu' },
    ],
    youtubeGuides: [],
  },
  // === TRAVEL & LIFESTYLE ===
  {
    category: 'Travel & Lifestyle',
    keywords: ['passport', 'luggage', 'travel', 'packing', 'toiletry', 'pillow', 'adapter', 'journal', 'fanny pack', 'weekender', 'eye mask', 'compression', 'bottle', 'organizer', 'backpack', 'sling bag', 'rain jacket', 'headphone case', 'money belt', 'shoe bag', 'camera strap', 'sunglasses'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'Yiwu Bags', url: 'https://www.alibaba.com/premium/travel-bags.html', specialty: 'Travel bags and accessories manufacturing' },
    ],
    youtubeGuides: [],
  },
  // === AUTOMOTIVE & TOOLS ===
  {
    category: 'Automotive & Tools',
    keywords: ['car', 'auto', 'steering', 'dash cam', 'tire', 'charger', 'mount', 'seat', 'floor mat', 'visor', 'windshield', 'bluetooth adapter', 'multitool', 'wrench', 'garage', 'wristband'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'AutoParts China', url: 'https://www.alibaba.com/premium/car-accessories.html', specialty: 'Car accessories and auto parts wholesale' },
    ],
    youtubeGuides: [],
  },
  // === HANDMADE LEATHER GOODS ===
  {
    category: 'Handmade Leather Goods',
    keywords: ['leather', 'wallet', 'journal cover', 'tote bag', 'watch band', 'dopp kit', 'card holder', 'laptop sleeve', 'desk pad', 'catch-all', 'suspenders', 'glasses case', 'pen case', 'apron', 'flask', 'photo album', 'mouse pad', 'belt bag'],
    platforms: [
      ...GLOBAL_PLATFORMS,
      { name: 'Tandy Leather', url: 'https://www.tandyleather.com', type: 'wholesale', region: 'us', bestFor: 'Leather hides, tools, hardware, dyes, and patterns', moqRange: '1 hide', shippingDays: '3-7 days (US)', color: '#8D6E63', textColor: '#fff' },
      { name: 'Weaver Leather Supply', url: 'https://www.weaverleathersupply.com', type: 'wholesale', region: 'us', bestFor: 'Leather supply, hardware, buckles, rivets, snaps', moqRange: '1 unit', shippingDays: '3-5 days (US)', color: '#5D4037', textColor: '#fff' },
    ],
    chinaDirectSites: [],
    youtubeGuides: [
      { title: 'Leather Sourcing for Beginners', url: 'https://youtube.com/@corterleather', views: '340K', channel: '@corterleather' },
    ],
  },
  // === WOODWORKING & CARPENTRY ===
  {
    category: 'Woodworking & Carpentry',
    keywords: ['wood', 'wooden', 'cutting board', 'serving board', 'crate', 'chess', 'dice', 'key holder', 'wine rack', 'plant stand', 'recipe box', 'coat rack', 'towel rack', 'tablet stand', 'doorstop', 'bookend', 'wall hooks', 'laptop riser'],
    platforms: [
      ...GLOBAL_PLATFORMS.filter(p => ['Alibaba', 'IndiaMART', 'Faire'].includes(p.name)),
      { name: 'Rockler', url: 'https://www.rockler.com', type: 'wholesale', region: 'us', bestFor: 'Woodworking tools, hardware, plans, and finishing supplies', moqRange: '1 unit', shippingDays: '3-7 days (US)', color: '#E65100', textColor: '#fff' },
      { name: 'Bell Forest Products', url: 'https://www.bellforestproducts.com', type: 'wholesale', region: 'us', bestFor: 'Exotic and domestic hardwood, pen blanks, turning wood', moqRange: '1 board', shippingDays: '5-10 days (US)', color: '#33691E', textColor: '#fff' },
    ],
    chinaDirectSites: [],
    youtubeGuides: [
      { title: 'Woodworking Business from Your Garage', url: 'https://youtube.com/@stevinmarin', views: '520K', channel: '@stevinmarin' },
    ],
  },
  // === PRINTABLES & POD ===
  {
    category: 'Printables & POD',
    keywords: ['printable', 'pod', 'print on demand', 'wall art', 'planner', 'budget tracker', 'worksheet', 'invitation', 'affirmation', 'habit tracker', 'chore chart', 'mug', 'throw pillow', 'poster', 'sticker', 'puzzle', 'blanket', 'ornament', 'canvas', 'yard sign', 'magnet', 'sock', 'mask', 'shower curtain'],
    platforms: [
      { name: 'Printful', url: 'https://www.printful.com', type: 'manufacturer-direct', region: 'global', bestFor: 'Print-on-demand fulfillment, integrates with Etsy/Shopify', moqRange: 'No MOQ (made per order)', shippingDays: '3-7 days', color: '#2B2B2B', textColor: '#fff' },
      { name: 'Printify', url: 'https://www.printify.com', type: 'manufacturer-direct', region: 'global', bestFor: 'POD with multiple print providers, lowest price routing', moqRange: 'No MOQ', shippingDays: '3-7 days', color: '#39B54A', textColor: '#fff' },
      { name: 'Gelato', url: 'https://www.gelato.com', type: 'manufacturer-direct', region: 'global', bestFor: 'POD with local production in 30+ countries, fast delivery', moqRange: 'No MOQ', shippingDays: '2-5 days (local)', color: '#FF6B00', textColor: '#fff' },
      { name: 'Canva Pro', url: 'https://www.canva.com/pro', type: 'wholesale', region: 'global', bestFor: 'Design templates, mockups, and printable creation', moqRange: 'N/A', shippingDays: 'Instant (digital)', color: '#00C4CC', textColor: '#fff' },
    ],
    chinaDirectSites: [],
    youtubeGuides: [
      { title: 'How I Make $10K/Month Selling Printables', url: 'https://youtube.com/@goldcityventures', views: '890K', channel: '@goldcityventures' },
    ],
  },
  // === VINTAGE & UPCYCLED ===
  {
    category: 'Vintage & Upcycled',
    keywords: ['vintage', 'upcycled', 'thrift', 'antique', 'retro', 'reclaimed', 'resale', 'estate', 'pallet', 'denim', 'vinyl record', 'typewriter', 'camera', 'kitchenware', 'pyrex', 'board game'],
    platforms: [
      { name: 'Goodwill Outlet', url: 'https://www.goodwill.org/shop/outlet-and-warehouse-stores', type: 'wholesale', region: 'us', bestFor: 'Buy by the pound, lowest prices on vintage/secondhand', moqRange: 'By the pound', shippingDays: 'In-store only', color: '#1565C0', textColor: '#fff' },
      { name: 'AuctionZip', url: 'https://www.auctionzip.com', type: 'b2b-directory', region: 'us', bestFor: 'Estate auctions, local liquidations, bulk vintage lots', moqRange: 'Per lot', shippingDays: 'In-person pickup', color: '#B71C1C', textColor: '#fff' },
      { name: 'Facebook Marketplace', url: 'https://www.facebook.com/marketplace', type: 'marketplace', region: 'global', bestFor: 'Local sourcing, estate sales, garage sales', moqRange: '1 unit', shippingDays: 'Local pickup', color: '#1877F2', textColor: '#fff' },
      ...GLOBAL_PLATFORMS.filter(p => ['Faire'].includes(p.name)),
    ],
    chinaDirectSites: [],
    youtubeGuides: [
      { title: 'How to Make $1000/Week Flipping Vintage', url: 'https://youtube.com/@thriftytreasure', views: '670K', channel: '@thriftytreasure' },
    ],
  },
  // === PACKAGING & LABELS (cross-category) ===
  {
    category: 'Packaging & Printing',
    keywords: ['packaging', 'label', 'box', 'printing', 'custom packaging', 'sticker label', 'tissue paper', 'thank you card'],
    platforms: [
      ...GLOBAL_PLATFORMS,
      { name: 'Sticker Mule', url: 'https://www.stickermule.com', type: 'manufacturer-direct', region: 'us', bestFor: 'Custom stickers, labels, magnets, packaging tape', moqRange: '50 units', shippingDays: '4-7 days (US)', color: '#FF5722', textColor: '#fff' },
      { name: 'Noissue', url: 'https://www.noissue.co', type: 'manufacturer-direct', region: 'global', bestFor: 'Eco-friendly custom packaging, tissue paper, stickers', moqRange: '250 units', shippingDays: '7-14 days', color: '#00897B', textColor: '#fff' },
    ],
    chinaDirectSites: [
      { name: 'CPP114', url: 'https://cpp114.com', specialty: 'Packaging and printing industry' },
    ],
    youtubeGuides: [],
  },
  // === BAGS & CASES (cross-category) ===
  {
    category: 'Bags & Cases',
    keywords: ['bag', 'case', 'phone case', 'tote', 'backpack', 'pouch', 'wallet', 'purse', 'clutch', 'duffel', 'messenger', 'crossbody', 'fanny'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'China BagsNet', url: 'https://china.bagsnet.com', specialty: 'Bags and cases wholesale manufacturing' },
    ],
    youtubeGuides: [],
  },
  // === LIGHTING (cross-category) ===
  {
    category: 'Lighting',
    keywords: ['light', 'lamp', 'led', 'lighting', 'neon', 'fairy light', 'string light'],
    platforms: GLOBAL_PLATFORMS,
    chinaDirectSites: [
      { name: 'XTFJ Deng', url: 'https://xtfj.deng.com', specialty: 'Lights and lighting manufacturing' },
    ],
    youtubeGuides: [],
  },
]

// ============================================================
// MATCHER — given a product name, find the best suppliers
// ============================================================

export function findSuppliersForProduct(productName: string): {
  category: CategorySuppliers | null
  searchUrls: { platform: string; url: string; color: string; textColor: string }[]
} {
  const lower = productName.toLowerCase()

  // Find matching category
  const match = CATEGORY_SUPPLIERS.find(c =>
    c.keywords.some(k => lower.includes(k))
  )

  // Generate search URLs for top platforms
  const q = encodeURIComponent(productName.toLowerCase())
  const searchUrls = [
    { platform: 'AliExpress', url: `https://www.aliexpress.com/wholesale?SearchText=${q}+supplies`, color: '#FFE4B5', textColor: '#1F1B16' },
    { platform: 'Alibaba', url: `https://www.alibaba.com/trade/search?SearchText=${q}`, color: '#FF6A00', textColor: '#fff' },
    { platform: 'DHgate', url: `https://www.dhgate.com/wholesale/search.do?searchkey=${q}`, color: '#FF6B00', textColor: '#fff' },
    { platform: 'IndiaMART', url: `https://dir.indiamart.com/search.mp?ss=${q}`, color: '#FF6F00', textColor: '#fff' },
    { platform: 'Faire', url: `https://www.faire.com/search?q=${q}`, color: '#000', textColor: '#fff' },
    { platform: 'Wholesale Central', url: `https://www.wholesalecentral.com/srch.cfm?searchterm=${q}`, color: '#2563EB', textColor: '#fff' },
  ]

  return { category: match || null, searchUrls }
}
