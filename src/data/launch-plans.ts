/**
 * Category-aware 30-day launch plan templates.
 * Each plan has tasks specific to that business type.
 *
 * Categories: physical-handmade, physical-resell, saas, pod, food
 * Falls back to physical-handmade for unmatched types.
 */

export interface PlanTask {
  day: number
  title: string
  description: string
  category: 'research' | 'source' | 'create' | 'brand' | 'list' | 'sell'
  estimatedMinutes: number
}

export interface PlanTemplate {
  id: string
  phases: { name: string; range: [number, number] }[]
  tasks: PlanTask[]
}

// ============================================================
// PHYSICAL — Handmade / Crafted (candles, soap, jewelry, etc.)
// ============================================================
const PHYSICAL_HANDMADE: PlanTemplate = {
  id: 'physical-handmade',
  phases: [
    { name: 'Research & Decide', range: [1, 3] },
    { name: 'Source & Sample', range: [4, 9] },
    { name: 'Make & Photograph', range: [10, 18] },
    { name: 'List & Launch', range: [19, 24] },
    { name: 'First Sale Sprint', range: [25, 30] },
  ],
  tasks: [
    // RESEARCH & DECIDE (Days 1-3)
    { day: 1, title: 'Pick your exact product niche', description: 'Don\'t just pick "candles." Pick "soy candles with dried flowers for gift-giving." The niche is where the money is. Write it in one sentence.', category: 'research', estimatedMinutes: 15 },
    { day: 2, title: 'Study 5 top sellers on Etsy', description: 'Search your product on Etsy. Open the top 5 sellers. Screenshot: their prices, their photos (count how many per listing), their review count, and their shipping times. Put it all in one note.', category: 'research', estimatedMinutes: 25 },
    { day: 3, title: 'Set your price using real math', description: 'Open the profit calculator. Enter: material cost per unit + packaging + shipping. Set your price at 3-4x material cost minimum. If that\'s below competitor average, you\'re in good shape.', category: 'research', estimatedMinutes: 15 },

    // SOURCE & SAMPLE (Days 4-9)
    { day: 4, title: 'Order raw materials sample', description: 'Go to AliExpress (or your sourcing tab). Order the minimum quantity of your main material. Spend $15-30 max. Pick a supplier with 4.5+ stars and 100+ orders. Save the tracking number.', category: 'source', estimatedMinutes: 30 },
    { day: 5, title: 'Order packaging samples', description: 'Search "custom labels" or "product packaging" on AliExpress. Order 2-3 options: boxes, bags, or wrapping. Your packaging is 40% of the buying decision. Budget: $10-20.', category: 'source', estimatedMinutes: 20 },
    { day: 6, title: 'Pick your brand name', description: 'Write 10 names in 5 minutes. Check if the Instagram handle is free. Check if the .com is available (not required). Pick the one that\'s simple, memorable, and you won\'t cringe saying out loud.', category: 'brand', estimatedMinutes: 20 },
    { day: 7, title: 'Create your logo in Canva', description: 'Open Canva > search "minimal logo." Pick a template. Change the name. Export as PNG. Done. Spend max 20 minutes. You can always upgrade later.', category: 'brand', estimatedMinutes: 20 },
    { day: 8, title: 'Set up your Instagram', description: 'Create a business account. Add: logo as profile pic, one-line bio ("Handmade [product] for [who]"), link placeholder, and 1 post that says "Something beautiful is coming." That\'s it.', category: 'brand', estimatedMinutes: 15 },
    { day: 9, title: 'Watch one product photo tutorial', description: 'YouTube: "[your product] product photography phone." Watch the first result that\'s under 10 minutes. Note 3 things: lighting setup, background, angles they use. You\'ll use this on Day 15.', category: 'create', estimatedMinutes: 15 },

    // MAKE & PHOTOGRAPH (Days 10-18)
    { day: 10, title: 'Unbox and inspect your materials', description: 'When your sample arrives: check quality, smell/feel/test it. Take a photo of everything laid out. Ask yourself: "Would I pay $X for something made from this?" If no, reorder from a different supplier.', category: 'create', estimatedMinutes: 15 },
    { day: 11, title: 'Make your first product', description: 'Just one. Don\'t try to be perfect. The goal is to go through the entire process once: measure, mix/assemble, package. Time yourself. Write down what was harder than expected.', category: 'create', estimatedMinutes: 45 },
    { day: 12, title: 'Make 2 more and improve', description: 'Make 2 more units. Fix what you noted yesterday. By unit #3, you should be 30% faster. If the quality isn\'t there, that\'s OK. You\'re learning.', category: 'create', estimatedMinutes: 40 },
    { day: 13, title: 'Design your label/packaging', description: 'Open Canva. Search "[product] label." Customize with your brand name + Instagram handle. Print on regular paper first to check sizing. You\'ll print properly later.', category: 'brand', estimatedMinutes: 25 },
    { day: 14, title: 'Package your first 3 products', description: 'Assemble: product + label + packaging. Lay all 3 out and photograph them together. This is your "hero shot." If the packaging looks cheap, fix it now.', category: 'create', estimatedMinutes: 30 },
    { day: 15, title: 'Photo shoot: 7 photos per product', description: 'Take exactly these: (1) flat lay on white, (2) flat lay on textured surface, (3) in-hand/scale shot, (4) lifestyle shot (in use), (5) close-up detail, (6) packaging shot, (7) group of all 3. Natural light near a window. Phone is fine.', category: 'create', estimatedMinutes: 45 },
    { day: 16, title: 'Edit your photos', description: 'Use Snapseed (free app). For each photo: brighten slightly, sharpen, crop tight. The #1 edit that matters: make the background consistent. White or wood for all photos.', category: 'create', estimatedMinutes: 25 },
    { day: 17, title: 'Write your listing copy', description: 'Title: [Material] + [Product] + [Use Case] + [For Whom]. Example: "Hand-Poured Soy Candle, Lavender Calm, Self-Care Gift for Her." Description: 3 benefit bullets, then materials, dimensions, care instructions.', category: 'list', estimatedMinutes: 25 },
    { day: 18, title: 'Set up your Etsy seller account', description: 'Go to etsy.com/sell. Set up: shop name (your brand name), location, payment method. Don\'t list anything yet. Just get the account ready. Takes 10 minutes if you have your info ready.', category: 'list', estimatedMinutes: 20 },

    // LIST & LAUNCH (Days 19-24)
    { day: 19, title: 'Publish your first listing', description: 'Upload all 7 photos (best one first). Paste your title and description. Set your price. Add 13 tags (all 13 slots). Pick your category carefully. Set shipping. Hit publish. You\'re live.', category: 'list', estimatedMinutes: 25 },
    { day: 20, title: 'Share your launch on Instagram', description: 'Post a carousel: photo 1 = product hero shot, photo 2 = close-up detail, photo 3 = you holding it or making it. Caption: what it is, who it\'s for, link in bio. Story: "It\'s live!" with link sticker.', category: 'sell', estimatedMinutes: 20 },
    { day: 21, title: 'Send to 10 people personally', description: 'Message 10 friends/family the direct Etsy link. Not "buy my stuff." Say: "I just launched this, would love your honest opinion on the listing." Ask for a favorite/heart. Early engagement helps rankings.', category: 'sell', estimatedMinutes: 15 },
    { day: 22, title: 'List a second product or variation', description: 'Add a different scent, color, size, or bundle option. Two listings are 2x the surface area. Use the same photo style for consistency. Etsy rewards shops that list regularly.', category: 'list', estimatedMinutes: 25 },
    { day: 23, title: 'Join 3 communities in your niche', description: 'Find 2 Facebook groups + 1 Reddit sub about your product category. Join and introduce yourself. Don\'t link your shop yet. Comment on 3 posts with helpful advice. Be a human first, seller second.', category: 'sell', estimatedMinutes: 20 },
    { day: 24, title: 'List product #3 (or a gift bundle)', description: 'A bundle (set of 2-3) at a slight discount boosts your AOV. Example: "Gift Set: 3 Mini Candles" at $32 vs $14 each. Bundle = higher perceived value.', category: 'list', estimatedMinutes: 25 },

    // FIRST SALE SPRINT (Days 25-30)
    { day: 25, title: 'Check your stats and optimize', description: 'Etsy dashboard > Stats. Check: views, favorites, visits. If views are under 20, your title/tags need work. If views are 50+ but no sales, your photos or price need work. Fix the weakest link.', category: 'sell', estimatedMinutes: 20 },
    { day: 26, title: 'Post a behind-the-scenes reel', description: 'Film 5-10 seconds of you making/packaging your product. Add text: "Made by hand, shipped with love." Post to Instagram Reels + TikTok. BTS content gets 2-3x the engagement of product photos.', category: 'sell', estimatedMinutes: 25 },
    { day: 27, title: 'Create a 15% off launch coupon', description: 'Etsy > Marketing > Sales and coupons. Create code "LAUNCH15." Share on Instagram stories with countdown sticker. "First 10 orders get 15% off." Urgency drives action.', category: 'sell', estimatedMinutes: 15 },
    { day: 28, title: 'Engage with potential buyers', description: 'Go to Instagram. Search hashtags related to your product. Like and comment (genuine comments) on 20 posts from potential buyers. Don\'t DM. Just be visible. 10% will check your profile.', category: 'sell', estimatedMinutes: 25 },
    { day: 29, title: 'Run a $5 Etsy ad test', description: 'Etsy > Marketing > Etsy Ads. Set budget to $1/day for 5 days on your best listing. This gets you data: which keywords bring clicks. If CPC is under $0.30, keep it running.', category: 'sell', estimatedMinutes: 15 },
    { day: 30, title: 'Your 30-day review', description: 'Write down: total views, favorites, sales (even if 0). What worked? What surprised you? If you got 1+ sales: order more materials, keep listing. If 0 sales but 50+ views: tweak pricing/photos. If under 10 views: rethink your tags and title.', category: 'sell', estimatedMinutes: 20 },
  ],
}

// ============================================================
// PHYSICAL — Resell / Import (source from China, sell on marketplaces)
// ============================================================
const PHYSICAL_RESELL: PlanTemplate = {
  id: 'physical-resell',
  phases: [
    { name: 'Research & Validate', range: [1, 3] },
    { name: 'Source & Test', range: [4, 10] },
    { name: 'Brand & Prepare', range: [11, 18] },
    { name: 'List & Launch', range: [19, 24] },
    { name: 'First Sale Sprint', range: [25, 30] },
  ],
  tasks: [
    // RESEARCH (Days 1-3)
    { day: 1, title: 'Validate demand on Amazon + Etsy', description: 'Search your product on both. Check: how many results? What\'s the price range? Read 10 negative reviews on competitors. Those complaints are your opportunity. Write 3 things you\'d do better.', category: 'research', estimatedMinutes: 25 },
    { day: 2, title: 'Find 5 suppliers on AliExpress', description: 'Search your product. Sort by "Orders." Open the top 5 suppliers. Compare: price per unit, minimum order, shipping time, seller rating, review photos. Save all 5 in a note.', category: 'research', estimatedMinutes: 25 },
    { day: 3, title: 'Calculate your landed cost', description: 'For each supplier: unit price + shipping to your country + any customs duty (Google "[product] import duty [country]"). Add $1-2 for packaging. That\'s your landed cost. You need at least 3x markup to profit.', category: 'research', estimatedMinutes: 20 },

    // SOURCE & TEST (Days 4-10)
    { day: 4, title: 'Order samples from 2 suppliers', description: 'Order 2-3 units from your top 2 suppliers. Different suppliers, same product. You\'re testing: quality, packaging, and shipping speed. Budget: $20-40 total. Save tracking numbers.', category: 'source', estimatedMinutes: 25 },
    { day: 5, title: 'Message suppliers about customization', description: 'Ask both suppliers: "Can you add my logo/label to the product? What\'s the MOQ? Can you modify [specific thing]?" Suppliers who respond fast and clearly are the ones you want.', category: 'source', estimatedMinutes: 15 },
    { day: 6, title: 'Pick your brand name and register domain', description: 'Name rules: easy to spell, easy to say, available as .com and Instagram handle. Check Namecheap for domain ($9/yr). You don\'t need a website yet, just reserve the name.', category: 'brand', estimatedMinutes: 20 },
    { day: 7, title: 'Create logo + brand assets', description: 'Canva > logo template. Also create: a product label template, a thank-you card template (include your Instagram + "Leave a review, get 10% off next order"). Export all as PNG + PDF.', category: 'brand', estimatedMinutes: 25 },
    { day: 8, title: 'Set up Instagram + TikTok', description: 'Business accounts on both. Same name, same logo, same bio. Post 1 teaser on each: "Launching [product] soon. Follow for a launch discount." Pin that post.', category: 'brand', estimatedMinutes: 20 },
    { day: 9, title: 'Research your competitor\'s listing strategy', description: 'Find the #1 seller for your product on Amazon/Etsy. Study: how many photos? What\'s in their title? What keywords do they use in tags? How is their description structured? Screenshot everything.', category: 'research', estimatedMinutes: 20 },
    { day: 10, title: 'Set up seller accounts', description: 'Create accounts on Etsy + eBay (and Amazon if you\'re ready for the fees). Complete all verification steps. Link your bank account. Don\'t list yet. Just be ready.', category: 'list', estimatedMinutes: 25 },

    // BRAND & PREPARE (Days 11-18)
    { day: 11, title: 'Unbox and compare your samples', description: 'Both samples should have arrived. Compare side by side: quality, finish, smell, weight, packaging. Pick the winner. If both are bad, reorder from 2 new suppliers. Don\'t settle on quality.', category: 'create', estimatedMinutes: 20 },
    { day: 12, title: 'Order your first batch (10-25 units)', description: 'Message your chosen supplier: "I want [quantity] units with my logo. What\'s the total including shipping?" Confirm the price in writing before paying. Use AliExpress buyer protection.', category: 'source', estimatedMinutes: 20 },
    { day: 13, title: 'Order custom labels and packaging', description: 'Order sticker labels (Sticker Mule or AliExpress) and packaging (boxes/bags/tissue paper). Match your brand colors. Include a QR code linking to your Instagram on the thank-you card.', category: 'brand', estimatedMinutes: 25 },
    { day: 14, title: 'Build your photo setup', description: 'You need: a window (natural light), a white poster board ($2), and your phone. That\'s it. Set up a small area where you can shoot consistently. Same spot every time = consistent photos.', category: 'create', estimatedMinutes: 15 },
    { day: 15, title: 'Take 10+ product photos', description: 'Shoot these exact shots: (1) clean white background, (2) in-hand for scale, (3) lifestyle/in-use, (4) close-up texture/detail, (5) packaging, (6) size comparison next to common object, (7-10) different angles. Edit with Snapseed.', category: 'create', estimatedMinutes: 40 },
    { day: 16, title: 'Write 3 listing titles (A/B test later)', description: 'Formula: [Brand] + [Key Feature] + [Product Name] + [Benefit] + [For Whom]. Example: "EcoNest Bamboo Utensil Set, Portable Travel Cutlery Kit, Zero Waste Gift for Her." Write 3 versions.', category: 'list', estimatedMinutes: 20 },
    { day: 17, title: 'Write your product description', description: 'Structure: Hook line (why this product is different) > 5 bullet points (benefits, not features) > What\'s included > Dimensions/specs > Care instructions > Satisfaction guarantee. Keep it scannable.', category: 'list', estimatedMinutes: 25 },
    { day: 18, title: 'Prepare your inventory', description: 'When your batch arrives: inspect every unit, apply your labels, add thank-you cards, prep packaging. Set aside 2 units for flat-lay photos with your branding visible.', category: 'create', estimatedMinutes: 30 },

    // LIST & LAUNCH (Days 19-24)
    { day: 19, title: 'Publish listing #1 on Etsy', description: 'Upload photos (best one first). Paste your best title version. Add description. Set price. Use all 13 tag slots (mix specific + broad keywords). Set shipping. Hit publish.', category: 'list', estimatedMinutes: 25 },
    { day: 20, title: 'Cross-list on eBay', description: 'Same product, same photos, adjust title format for eBay (eBay titles can be longer). Set "Buy It Now" price. eBay has different buyers than Etsy. More listings = more chances.', category: 'list', estimatedMinutes: 20 },
    { day: 21, title: 'Launch announcement everywhere', description: 'Instagram post + story + reel (15 sec of unboxing your product). Text 10 friends the direct link. Post in 1 relevant Facebook group (with permission). "Just launched, would love feedback."', category: 'sell', estimatedMinutes: 25 },
    { day: 22, title: 'List a variation or bundle', description: 'Add a different color/size/bundle option. Bundles typically have 20-30% higher conversion. "Set of 3" or "Gift Bundle" works for almost any physical product.', category: 'list', estimatedMinutes: 20 },
    { day: 23, title: 'Set up Etsy ads ($1/day)', description: 'Etsy > Marketing > Etsy Ads. Budget: $1/day. Let it run for 5 days. You\'re buying data, not sales. After 5 days you\'ll know which search terms bring clicks.', category: 'sell', estimatedMinutes: 10 },
    { day: 24, title: 'Create a short-form video for TikTok', description: 'Film: unboxing your product (10 sec) + showing it in use (5 sec) + satisfied reaction (5 sec). Add trending audio. Post with 5-7 hashtags. TikTok is free distribution.', category: 'sell', estimatedMinutes: 25 },

    // FIRST SALE SPRINT (Days 25-30)
    { day: 25, title: 'Analyze your first week of data', description: 'Check: views, clicks, favorites, conversion rate. If views < 20: title/tags problem. If views 50+ but 0 sales: price or photos. If favorites but no sales: add a coupon code to push them over.', category: 'sell', estimatedMinutes: 20 },
    { day: 26, title: 'Create a 20% launch coupon', description: 'Etsy coupon or eBay markdown. "LAUNCH20" for the first 10 orders. Share on Instagram stories with a countdown. "Only 7 left at this price." Scarcity converts.', category: 'sell', estimatedMinutes: 15 },
    { day: 27, title: 'Engage in 3 niche communities', description: 'Reddit, Facebook groups, or Discord. Answer questions, share your expertise, be helpful. Your profile links to your shop. Don\'t spam. People buy from people they trust.', category: 'sell', estimatedMinutes: 25 },
    { day: 28, title: 'Reach out to 3 micro-influencers', description: 'Find Instagram accounts with 1K-10K followers in your niche. DM: "Love your content about [topic]. I just launched [product] and would love to send you one. No strings." 1 in 3 will say yes.', category: 'sell', estimatedMinutes: 25 },
    { day: 29, title: 'Optimize your weakest listing', description: 'Compare your listings. Which has the most views? Which has zero? Rewrite the title of the worst performer. Swap the main photo. Small changes can double your visibility.', category: 'sell', estimatedMinutes: 20 },
    { day: 30, title: 'Your 30-day review + next order decision', description: 'Write down: total views, favorites, messages, sales. Revenue vs cost so far. If 1+ sales: reorder materials, scale what worked. If 0 sales: don\'t quit. Rework your photos/price and give it 30 more days. Most Etsy shops hit momentum at 60-90 days.', category: 'sell', estimatedMinutes: 20 },
  ],
}

// ============================================================
// SAAS — Software product (Chrome extension, micro tool, API)
// ============================================================
const SAAS: PlanTemplate = {
  id: 'saas',
  phases: [
    { name: 'Validate & Plan', range: [1, 5] },
    { name: 'Build MVP', range: [6, 16] },
    { name: 'Launch Prep', range: [17, 22] },
    { name: 'Launch & Get Users', range: [23, 30] },
  ],
  tasks: [
    // VALIDATE & PLAN (Days 1-5)
    { day: 1, title: 'Define the ONE problem you solve', description: 'Write it in one sentence: "[Type of person] struggles with [specific problem] because [reason]. My tool fixes this by [solution]." If you can\'t write it in one sentence, your idea isn\'t focused enough.', category: 'research', estimatedMinutes: 20 },
    { day: 2, title: 'Find 10 people with this problem', description: 'Search Reddit, Twitter, Indie Hackers for people complaining about this problem. Screenshot 10 posts/comments. These are your future users. If you can\'t find 10 complaints, the problem might not be painful enough.', category: 'research', estimatedMinutes: 30 },
    { day: 3, title: 'Study 3 existing solutions', description: 'Find what people currently use to solve this. Could be a competitor tool, a spreadsheet hack, or manual process. Sign up for each. Note: what they charge, what\'s missing, what users complain about in reviews.', category: 'research', estimatedMinutes: 25 },
    { day: 4, title: 'Sketch your MVP on paper', description: 'Draw 3-5 screens. What does the user see first? What\'s the core action? What\'s the output? Keep it to ONE core feature. If you can\'t draw it in 5 minutes, you\'re overbuilding. The best MVPs do one thing.', category: 'research', estimatedMinutes: 20 },
    { day: 5, title: 'Pick your tech stack', description: 'Recommended: Next.js + Vercel (free) + Supabase (free tier) + Stripe. Or: Bolt.new to prototype fast. Don\'t overthink this. The stack doesn\'t matter until you have users. Ship speed > stack perfection.', category: 'source', estimatedMinutes: 15 },

    // BUILD MVP (Days 6-16)
    { day: 6, title: 'Set up your repo and deploy skeleton', description: 'Create GitHub repo. Deploy a blank Next.js app to Vercel. You should be able to visit yourapp.vercel.app and see "Hello World." That\'s your deploy pipeline. Everything from here is incremental.', category: 'create', estimatedMinutes: 30 },
    { day: 7, title: 'Build the landing page', description: 'One page: headline (the problem you solve), subheadline (how), a screenshot/mockup, 3 benefit bullets, CTA button ("Join waitlist" or "Try free"). Use Tailwind. This is your pitch. If you can\'t sell it in one page, simplify.', category: 'create', estimatedMinutes: 45 },
    { day: 8, title: 'Add email capture / waitlist', description: 'Add an email input on the landing page. Store emails in Supabase (free) or use Buttondown/Mailchimp. Share the landing page in 2 communities. Goal: get 10 signups to validate interest.', category: 'create', estimatedMinutes: 30 },
    { day: 9, title: 'Build core feature: input', description: 'What does the user put IN? A URL? Text? A file? Build that input form. Validate the input. Show a loading state. Don\'t build the processing yet, just the front door.', category: 'create', estimatedMinutes: 45 },
    { day: 10, title: 'Build core feature: processing', description: 'The actual logic. If it\'s AI-powered: connect to Claude/OpenAI API. If it\'s data processing: write the transform. If it\'s automation: build the pipeline. One function, one job. Test with 3 sample inputs.', category: 'create', estimatedMinutes: 60 },
    { day: 11, title: 'Build core feature: output', description: 'What does the user get OUT? A report? A file? A dashboard? Build that output view. Make it look good. The output is what the user screenshots and shares. Spend time here.', category: 'create', estimatedMinutes: 45 },
    { day: 12, title: 'Add auth (login/signup)', description: 'Supabase Auth or Clerk. Email + password is fine. Google OAuth is a nice bonus. Gate the core feature behind auth. Free users can use it X times. Don\'t build billing yet.', category: 'create', estimatedMinutes: 40 },
    { day: 13, title: 'Fix bugs and polish the happy path', description: 'Use your app start to finish. Does it break? Is anything confusing? Fix the 3 worst bugs. Polish the loading states. Add error messages that actually help. The happy path must feel smooth.', category: 'create', estimatedMinutes: 45 },
    { day: 14, title: 'Ask 3 people to try it', description: 'Send your app to 3 people in your target audience. Watch them use it (screen share or ask for feedback). Don\'t explain anything. If they get confused, that\'s a UX problem. Write down every friction point.', category: 'research', estimatedMinutes: 30 },
    { day: 15, title: 'Fix the top 3 feedback issues', description: 'Whatever confused your testers most, fix it today. Usually it\'s: (1) unclear what the tool does, (2) confusing first action, (3) output doesn\'t look useful. Ship the fixes.', category: 'create', estimatedMinutes: 45 },
    { day: 16, title: 'Add Stripe billing', description: 'Stripe Checkout. Two plans: Free (limited usage) and Pro ($19-29/mo). Don\'t agonize over pricing. You can change it anytime. The goal is to have a "Pay" button that works.', category: 'create', estimatedMinutes: 40 },

    // LAUNCH PREP (Days 17-22)
    { day: 17, title: 'Write your Product Hunt listing', description: 'Maker comment: why you built this, who it\'s for, and what makes it different. Tagline: max 60 chars. Description: the problem, the solution, the result. Prepare 3-5 screenshots. Don\'t submit yet.', category: 'brand', estimatedMinutes: 30 },
    { day: 18, title: 'Create your social presence', description: 'Twitter/X: create account with your product name. Write a pinned tweet explaining what it does in 2 lines. LinkedIn: personal post about why you\'re building this. Build in public = free distribution.', category: 'brand', estimatedMinutes: 20 },
    { day: 19, title: 'Write 3 launch posts for different platforms', description: 'Reddit (r/SideProject or niche sub): "I built X because..." Twitter: launch thread (problem > solution > demo > link). Indie Hackers: "Show IH" post. Each platform has different tone. Adapt.', category: 'brand', estimatedMinutes: 30 },
    { day: 20, title: 'Record a 60-second demo video', description: 'Screen record: open your app > show the problem > use the tool > show the result. Add voiceover or captions. Upload to YouTube (unlisted) and embed on your landing page. Loom works great.', category: 'brand', estimatedMinutes: 30 },
    { day: 21, title: 'Set up analytics', description: 'Add Plausible or PostHog (both have free tiers). Track: landing page visits, signups, feature usage, upgrade clicks. You need data to know what\'s working.', category: 'create', estimatedMinutes: 20 },
    { day: 22, title: 'Final testing and bug sweep', description: 'Go through the full flow: landing page > signup > use feature > see result > upgrade prompt > payment. Test on mobile. Test with a fresh browser (no cache). Fix anything broken.', category: 'create', estimatedMinutes: 30 },

    // LAUNCH & GET USERS (Days 23-30)
    { day: 23, title: 'Launch on Product Hunt', description: 'Submit at 12:01 AM PST (that\'s when the day resets). Post your maker comment immediately. Share the PH link with your waitlist. Ask for support, not votes. Tuesday-Thursday launch days work best.', category: 'sell', estimatedMinutes: 20 },
    { day: 24, title: 'Post on Reddit + Indie Hackers', description: 'Post your pre-written Reddit and IH posts. Be genuine, not salesy. "I built this to solve my own problem, here\'s what I learned." Reply to every comment within 2 hours.', category: 'sell', estimatedMinutes: 25 },
    { day: 25, title: 'Share on Twitter with a thread', description: 'Thread format: Tweet 1: The problem. Tweet 2: What you tried. Tweet 3: What you built. Tweet 4: Demo screenshot. Tweet 5: Link. Tag relevant people. Use 3-5 hashtags.', category: 'sell', estimatedMinutes: 20 },
    { day: 26, title: 'Email your waitlist', description: 'Subject: "[Product] is live." Body: What it does, one testimonial/quote if you have it, link, and a special offer for waitlist members (extended free trial or 30% off first month).', category: 'sell', estimatedMinutes: 20 },
    { day: 27, title: 'Respond to every user and comment', description: 'Check PH, Reddit, IH, Twitter, email. Reply to every single comment and message. Ask: "What would make this more useful for you?" Early users are your product managers. Listen hard.', category: 'sell', estimatedMinutes: 30 },
    { day: 28, title: 'Ship one feature your users asked for', description: 'From yesterday\'s feedback, pick the most-requested feature or fix. Build and ship it today. Tweet: "You asked, we shipped: [feature]." Fast iteration = loyal users.', category: 'create', estimatedMinutes: 45 },
    { day: 29, title: 'Write a "building in public" post', description: 'Share your launch numbers honestly: signups, active users, revenue (even if $0). Post on Twitter + Indie Hackers. Transparency builds trust. People root for builders.', category: 'sell', estimatedMinutes: 20 },
    { day: 30, title: 'Your 30-day review + growth plan', description: 'Metrics: signups, active users, paying users, MRR, most-used feature, biggest complaint. If you have 1+ paying user: you have product-market fit signal. Double down. If 0 paying but 50+ free users: your pricing or value prop needs work. If < 10 users: distribution problem, not product problem.', category: 'sell', estimatedMinutes: 25 },
  ],
}

// ============================================================
// POD / PRINTABLES — Print on Demand, digital downloads
// ============================================================
const POD_PRINTABLES: PlanTemplate = {
  id: 'pod-printables',
  phases: [
    { name: 'Research & Design', range: [1, 5] },
    { name: 'Create & Prepare', range: [6, 14] },
    { name: 'List & Optimize', range: [15, 22] },
    { name: 'Scale & Sell', range: [23, 30] },
  ],
  tasks: [
    // RESEARCH & DESIGN (Days 1-5)
    { day: 1, title: 'Pick your niche and platform', description: 'POD/printables is all about niche. "Dog lover mugs" beats "mugs." "Teacher planner" beats "planner." Pick ONE niche you understand. Platform: Etsy for printables, Redbubble/Merch for POD.', category: 'research', estimatedMinutes: 20 },
    { day: 2, title: 'Study the top 10 sellers in your niche', description: 'Search your niche on Etsy. Sort by bestselling. Study: their designs (style, colors, fonts), pricing, number of reviews, how many products they have. The top sellers do 50-200+ designs.', category: 'research', estimatedMinutes: 25 },
    { day: 3, title: 'Identify 5 design trends that sell', description: 'Look for patterns: minimalist? retro? watercolor? typography? What colors repeat? What phrases/quotes sell? Write 5 design themes you\'ll create. Each theme should produce 5-10 products.', category: 'research', estimatedMinutes: 20 },
    { day: 4, title: 'Set up your design tools', description: 'Free: Canva Pro trial (30 days free). Paid: Procreate ($12 once) or Affinity Designer ($25 once). For printables: Canva is enough. For POD: you need transparent PNG exports at 300 DPI.', category: 'source', estimatedMinutes: 15 },
    { day: 5, title: 'Create your first 3 designs', description: 'Don\'t aim for perfect. Aim for done. 3 designs in one sitting. Follow what\'s selling, not what you think is cool. Use your trending theme research from Day 3. Export as high-res PNG.', category: 'create', estimatedMinutes: 45 },

    // CREATE & PREPARE (Days 6-14)
    { day: 6, title: 'Create 3 more designs (6 total)', description: 'Consistency matters more than perfection. You need volume. The top Etsy printable sellers have 100+ listings. Your goal this week: hit 10 designs by Day 10.', category: 'create', estimatedMinutes: 40 },
    { day: 7, title: 'Set up your POD provider account', description: 'Printful, Gelato, or Printify. Connect to your Etsy shop (or create one). Order 1 sample of your best design on a product. You need to see the actual quality before selling.', category: 'source', estimatedMinutes: 25 },
    { day: 8, title: 'Create your brand identity', description: 'Brand name + logo (Canva). Shop banner (2400x1200px). Consistent style across all designs. Your brand is the thread that ties 50+ products together. Pick 3-4 brand colors and stick to them.', category: 'brand', estimatedMinutes: 25 },
    { day: 9, title: 'Create 2 more designs (8 total)', description: 'Today: try a different style within your niche. If you\'ve been doing minimalist, try one with a hand-drawn feel. Variety tests what resonates. You don\'t know what will sell until it\'s listed.', category: 'create', estimatedMinutes: 35 },
    { day: 10, title: 'Create 2 more designs (10 total)', description: 'You now have 10 designs. Lay them all out side by side. Do they look like they belong to one shop? Is there variety but consistency? Remove any that feel off-brand. Replace if needed.', category: 'create', estimatedMinutes: 35 },
    { day: 11, title: 'Create product mockups', description: 'For each design, create 3-5 mockup images showing the design on the actual product. Use Placeit.net (free trial), Canva mockups, or your POD provider\'s mockup generator. Mockups sell the product.', category: 'create', estimatedMinutes: 40 },
    { day: 12, title: 'Write listing templates', description: 'Create 1 title template and 1 description template you can reuse. Title: [Niche Keyword] + [Product Type] + [Design Detail] + [Use Case]. Description: What it is, what makes it special, specs, instant download info.', category: 'list', estimatedMinutes: 20 },
    { day: 13, title: 'Research SEO tags and keywords', description: 'Use eRank (free tool for Etsy SEO) or just search Etsy and note autocomplete suggestions. Build a list of 30-50 keywords/tags for your niche. You\'ll rotate these across listings.', category: 'research', estimatedMinutes: 25 },
    { day: 14, title: 'Set up your Etsy shop completely', description: 'Shop name, banner, logo, about section (tell your story), shipping/refund policies (for printables: digital download = no shipping). Complete every section. Incomplete shops look amateur.', category: 'list', estimatedMinutes: 25 },

    // LIST & OPTIMIZE (Days 15-22)
    { day: 15, title: 'List your first 5 products', description: 'Upload 5 listings with mockups, titles, descriptions, tags. For printables: upload the digital file as "instant download." For POD: connect to Printful/Printify. Price competitively vs top sellers.', category: 'list', estimatedMinutes: 40 },
    { day: 16, title: 'List your next 5 products (10 total)', description: 'More listings = more surface area. Etsy rewards active shops. Try to list at least 1 new product every day for the first month. 10 is a good start but 30+ is where sales get consistent.', category: 'list', estimatedMinutes: 35 },
    { day: 17, title: 'Share your shop on Pinterest', description: 'Create a Pinterest business account. Pin all your product mockups with keyword-rich descriptions. Pinterest is the #1 free traffic source for printables. Pin 5-10 images today.', category: 'sell', estimatedMinutes: 25 },
    { day: 18, title: 'Create 3 new designs and list them', description: 'Keep the pipeline going. Design > mockup > list. 30 minutes of design, 15 minutes of listing. Your conversion rate won\'t change much, so more listings = more revenue. Simple math.', category: 'create', estimatedMinutes: 45 },
    { day: 19, title: 'Post your best design on Instagram/TikTok', description: 'Film a 15-second "design to product" timelapse. Show your screen as you create, then the mockup. People love seeing the process. Use niche hashtags.', category: 'sell', estimatedMinutes: 20 },
    { day: 20, title: 'Create a seasonal/trending variation', description: 'What\'s coming up? Christmas? Back to school? New Year? Create a design that taps into a seasonal trend. Seasonal products spike in search 2-4 weeks before the event.', category: 'create', estimatedMinutes: 30 },
    { day: 21, title: 'List 3 more products (16+ total)', description: 'Your shop is growing. At 15-20 listings, Etsy starts showing you in more searches. Each new listing is a lottery ticket. Keep creating, keep listing.', category: 'list', estimatedMinutes: 30 },
    { day: 22, title: 'Run an Etsy ad test ($1/day)', description: 'Pick your 3 best-looking listings. Set $1/day Etsy Ads for 5 days. You\'re buying data: which keywords convert, which mockups get clicks. Don\'t expect profit from ads this early.', category: 'sell', estimatedMinutes: 10 },

    // SCALE & SELL (Days 23-30)
    { day: 23, title: 'Analyze what\'s working', description: 'Etsy Stats: Which listings get the most views? Favorites? Which tags bring traffic? Double down on what\'s working. If a design gets 50+ views, create 3-5 variations of it.', category: 'sell', estimatedMinutes: 20 },
    { day: 24, title: 'Create a bundle product', description: 'Take your top 3-5 designs and bundle them at a 20-30% discount vs buying individually. "Complete [Niche] Bundle" listings convert well and increase your AOV.', category: 'create', estimatedMinutes: 25 },
    { day: 25, title: 'Create 5 more designs (20+ total)', description: 'You should now know what style/theme gets the most views. Create 5 more in that style. Volume is everything in POD/printables. Top sellers have 200-500+ listings.', category: 'create', estimatedMinutes: 45 },
    { day: 26, title: 'Add products on a second platform', description: 'If you\'re on Etsy, add to Redbubble or Creative Market. Same designs, different audience. It takes 30 minutes to set up and each platform has unique buyers.', category: 'list', estimatedMinutes: 30 },
    { day: 27, title: 'Create a "free sample" lead magnet', description: 'Give away 1 design for free (on your Instagram or a landing page) in exchange for email signups. This builds your audience for future launches. Use Mailchimp or Buttondown.', category: 'sell', estimatedMinutes: 25 },
    { day: 28, title: 'Pin 20 images on Pinterest', description: 'Pinterest is a long game. Pins can drive traffic for months after you post them. Pin all your mockups + create lifestyle pins with text overlay. Schedule with Tailwind free tier.', category: 'sell', estimatedMinutes: 25 },
    { day: 29, title: 'Batch create 5 more designs', description: 'You should have a system now: pick theme > design > mockup > list. Batch it. 5 designs in one sitting. The faster you create, the more listings, the more revenue.', category: 'create', estimatedMinutes: 40 },
    { day: 30, title: 'Your 30-day review + velocity goal', description: 'Metrics: total listings, total views, favorites, sales, revenue. If 1+ sales: your niche works. Create more. If 0 sales: check your mockups, pricing, and tags. The goal for month 2: hit 50 listings and maintain 2-3 new listings per day.', category: 'sell', estimatedMinutes: 20 },
  ],
}

// ============================================================
// FOOD & BEVERAGE — Kitchen businesses with compliance needs
// ============================================================
const FOOD_BEVERAGE: PlanTemplate = {
  id: 'food-beverage',
  phases: [
    { name: 'Research & Comply', range: [1, 5] },
    { name: 'Recipe & Source', range: [6, 12] },
    { name: 'Produce & Brand', range: [13, 20] },
    { name: 'Sell & Get Customers', range: [21, 30] },
  ],
  tasks: [
    // RESEARCH & COMPLY (Days 1-5)
    { day: 1, title: 'Check cottage food laws in your state', description: 'Google "[your state/country] cottage food law." Find out: what can you sell from home? Do you need a license? What\'s the annual revenue limit? Some states allow up to $75K from a home kitchen. This determines everything.', category: 'research', estimatedMinutes: 25 },
    { day: 2, title: 'Research your local competition', description: 'Search your product on Etsy, Amazon, and local farmers markets. Visit 1-2 farmers markets this weekend. What\'s selling? What prices? What packaging? Take photos and notes. The gap you find is your opportunity.', category: 'research', estimatedMinutes: 30 },
    { day: 3, title: 'Define your signature recipe', description: 'You need ONE hero product, not a full menu. What do people always compliment you on? What makes yours different? Write down the recipe, the story behind it, and why someone would choose yours over store-bought.', category: 'research', estimatedMinutes: 20 },
    { day: 4, title: 'Calculate your true cost per unit', description: 'List every ingredient + packaging + labels + shipping materials. Calculate cost per batch, then divide by units per batch. Add 20% for waste/mistakes. You need 3-4x markup minimum. If your jar costs $3 to make, sell for $12+.', category: 'research', estimatedMinutes: 20 },
    { day: 5, title: 'Get required permits/licenses', description: 'Apply for: food handler\'s certificate (usually online, $10-15), cottage food permit if required, business license from your city. Some take days to process, so start early. Don\'t sell without proper licensing.', category: 'source', estimatedMinutes: 30 },

    // RECIPE & SOURCE (Days 6-12)
    { day: 6, title: 'Source packaging and containers', description: 'Search "glass jars wholesale" or "[container type] bulk" on AliExpress/Amazon. Order samples of 2-3 options. Consider: does it look premium? Is it food-safe? Can you apply a label cleanly? Budget: $20-30 for samples.', category: 'source', estimatedMinutes: 25 },
    { day: 7, title: 'Source ingredients in bulk', description: 'Compare prices: grocery store vs restaurant supply store vs online bulk. Nuts, spices, and dry goods are 40-60% cheaper in bulk. Check: WebstaurantStore, Azure Standard, or local wholesalers.', category: 'source', estimatedMinutes: 25 },
    { day: 8, title: 'Perfect your recipe with 3 test batches', description: 'Make 3 batches today. Adjust flavors between each. Take notes on every change. Have 3-5 people taste test (not family who\'ll say "it\'s great" to be nice). Ask: "What would you change?"', category: 'create', estimatedMinutes: 60 },
    { day: 9, title: 'Create your nutrition label', description: 'Use a free tool: FDA\'s Label Maker or caloriecount.io. Enter all ingredients and quantities. Generate the nutrition facts panel. This is required for most food sales. Print a test label to check formatting.', category: 'create', estimatedMinutes: 30 },
    { day: 10, title: 'Design your label and branding', description: 'Your label needs: brand name, product name, net weight, ingredients list, allergens, nutrition facts, "Homemade" or cottage food disclaimer, your contact info. Use Canva for design. Keep it clean and readable.', category: 'brand', estimatedMinutes: 35 },
    { day: 11, title: 'Create your brand story', description: 'Food sells on story. "Small-batch hot sauce made from my grandmother\'s recipe" beats "Hot sauce." Write 3-4 sentences about why you make this. This goes on your label back, your website, your Instagram bio.', category: 'brand', estimatedMinutes: 20 },
    { day: 12, title: 'Set up your Instagram', description: 'Food Instagram rule: 80% mouth-watering photos, 20% behind-the-scenes. Post 3 photos: your product, your kitchen/workspace, your ingredients laid out beautifully. Bio: what you make + location + how to order.', category: 'brand', estimatedMinutes: 20 },

    // PRODUCE & BRAND (Days 13-20)
    { day: 13, title: 'Produce your first batch for sale', description: 'Make your first real batch. Follow your perfected recipe exactly. Weigh/measure everything. Label each jar/bag. This batch should be 10-20 units. Take photos at every stage of the process.', category: 'create', estimatedMinutes: 90 },
    { day: 14, title: 'Food photography shoot', description: 'Photograph: (1) product alone on clean surface, (2) product with ingredients around it, (3) product being used (on food, poured, etc.), (4) lifestyle shot (picnic, kitchen, etc.), (5) close-up of texture/label. Natural light only. Phone is fine.', category: 'create', estimatedMinutes: 40 },
    { day: 15, title: 'Taste test with 10 strangers', description: 'Not friends, not family. Go to a coffee shop, gym, or coworking space. Offer free samples. Ask: "Would you buy this? How much would you pay?" Honest feedback from strangers is gold.', category: 'research', estimatedMinutes: 30 },
    { day: 16, title: 'Set up your online store', description: 'Etsy for artisan food or your own Shopify/Square site. Upload photos, write descriptions (lead with taste/experience, not ingredients). Set shipping rates. For local delivery: set up a Google Form for orders.', category: 'list', estimatedMinutes: 30 },
    { day: 17, title: 'Create a gift set or bundle', description: 'Bundle 2-3 products (or 2 jars + a recipe card) in a gift box. Gift sets sell 3x more during holidays. Price at 15-20% less than buying separately. "Gift box" is one of the most searched terms on Etsy for food.', category: 'create', estimatedMinutes: 25 },
    { day: 18, title: 'Apply to your first farmers market', description: 'Search "[your city] farmers market vendor application." Most charge $25-75/day. Apply to the busiest one. Farmers markets are the #1 way to get your first 50 customers and real-time feedback.', category: 'list', estimatedMinutes: 20 },
    { day: 19, title: 'Create your market display setup', description: 'You need: tablecloth, product display (tiered shelf works best), price signs, business cards with Instagram + order link, sample cups/toothpicks, a banner or sign with your brand name. Budget: $30-50.', category: 'brand', estimatedMinutes: 25 },
    { day: 20, title: 'List on Etsy with SEO optimization', description: 'Publish 3 listings: (1) single product, (2) multi-pack, (3) gift set. Use all 13 tags. Include: product name, flavor, use case, gift, handmade, location in tags. Food ships well in winter, less so in summer.', category: 'list', estimatedMinutes: 30 },

    // SELL & GET CUSTOMERS (Days 21-30)
    { day: 21, title: 'Launch announcement on social media', description: 'Instagram post: your best product photo + "Now available! Link in bio." Story: behind-the-scenes of you making it + "Swipe up to order." Send DM to 10 friends with the link. Personal outreach converts.', category: 'sell', estimatedMinutes: 20 },
    { day: 22, title: 'Reach out to 3 local shops', description: 'Find 3 local specialty stores, coffee shops, or gift shops. Walk in with 2 samples and a one-pager (your product, wholesale price, and contact). "Would you be interested in carrying a local [product]?"', category: 'sell', estimatedMinutes: 30 },
    { day: 23, title: 'Send free samples to 5 food bloggers', description: 'Find 5 local food bloggers or Instagram food accounts (2K-20K followers). DM: "I make [product] locally. Would love to send you a free jar, no obligations." Include a handwritten note with the sample.', category: 'sell', estimatedMinutes: 25 },
    { day: 24, title: 'Post a recipe using your product', description: 'Create a simple recipe that features your product (hot sauce on tacos, honey in a cocktail, spice blend on chicken). Film a 30-second cooking video. This shows people HOW to use it. Use = sales.', category: 'sell', estimatedMinutes: 30 },
    { day: 25, title: 'Do your first farmers market', description: 'Arrive early, set up your display, bring samples. Smile, tell your story. Hand out business cards to every person who tries a sample. Collect emails on a paper list: "10% off your first online order."', category: 'sell', estimatedMinutes: 240 },
    { day: 26, title: 'Follow up from the farmers market', description: 'Email/DM everyone who gave you their info: "Great meeting you! Here\'s 10% off: [code]. Link to shop." Post a recap on Instagram: "First market day! Thank you to everyone who stopped by."', category: 'sell', estimatedMinutes: 20 },
    { day: 27, title: 'Ask your first customers for reviews', description: 'Message everyone who\'s bought from you: "Hope you\'re loving the [product]! A quick review on Etsy (or Google) would mean the world to a small business like ours." Reviews are social proof. Chase them.', category: 'sell', estimatedMinutes: 15 },
    { day: 28, title: 'Create a subscription or repeat order offer', description: '"Monthly [product] delivery: $X/month." Or: "Buy 3, get 1 free." Food businesses live or die on repeat orders. Make it easy for happy customers to come back automatically.', category: 'sell', estimatedMinutes: 20 },
    { day: 29, title: 'Produce your next batch', description: 'Based on what sold: make more of the popular items. If the farmers market sold more small jars, make more smalls. If online sold more gift sets, make more bundles. Let demand guide production.', category: 'create', estimatedMinutes: 60 },
    { day: 30, title: 'Your 30-day review', description: 'Metrics: units made, units sold, revenue, cost, profit, best seller, best channel (online vs market vs local shops). If you sold 10+ units: you have a business. Scale what worked. If under 10: test a different flavor/size/price before quitting.', category: 'sell', estimatedMinutes: 20 },
  ],
}

// ============================================================
// PLAN SELECTION LOGIC
// ============================================================

/** Map interests to the best plan template */
export function getPlanForIdea(deck: string, interests: string[]): PlanTemplate {
  if (deck === 'saas') return SAAS

  // Check interests for specific plan types
  const hasFood = interests.includes('food')
  const hasDesign = interests.some(i => ['design'].includes(i))
  const hasCrafts = interests.includes('crafts')

  if (hasFood) return FOOD_BEVERAGE

  // POD / printables: design-heavy, no crafts component
  if (hasDesign && !hasCrafts) return POD_PRINTABLES

  // Crafts-heavy (handmade): jewelry, candles, soap, etc.
  if (hasCrafts) return PHYSICAL_HANDMADE

  // Default: resell/import (sourcing from suppliers)
  return PHYSICAL_RESELL
}

export const ALL_PLANS: Record<string, PlanTemplate> = {
  'physical-handmade': PHYSICAL_HANDMADE,
  'physical-resell': PHYSICAL_RESELL,
  'saas': SAAS,
  'pod-printables': POD_PRINTABLES,
  'food-beverage': FOOD_BEVERAGE,
}
