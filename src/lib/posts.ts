export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;       // ISO date "2026-03-18"
  readTime: string;   // "6 min read"
  author: string;
  featuredColor: string; // Tailwind gradient classes
  accentColor: string;   // Badge bg + text classes
  content: string;       // HTML string
}

export const posts: Post[] = [
  {
    slug: 'signs-refrigerator-needs-repair',
    title: '5 Warning Signs Your Refrigerator Needs Repair (Before It Fails Completely)',
    excerpt: 'Your refrigerator works around the clock. Learn the five most common warning signs that something is wrong — before a small issue becomes a costly breakdown.',
    category: 'Refrigerators',
    date: '2026-03-18',
    readTime: '6 min read',
    author: 'CT Appliance Repair Team',
    featuredColor: 'from-blue-900 via-blue-800 to-blue-700',
    accentColor: 'bg-blue-500 text-white',
    content: `
<p>Your refrigerator runs 24 hours a day, 365 days a year — and most of the time, it does so quietly and reliably. That's exactly why it's easy to miss early warning signs that something's going wrong. A failing refrigerator doesn't usually die overnight. It gives you signals weeks or even months in advance. Here are five of the most common warning signs to watch for.</p>

<h2>1. Interior Temperature Is Warmer Than It Should Be</h2>
<p>The most obvious sign: your food isn't staying cold. Your fridge should maintain a temperature between 35°F and 38°F. If you notice milk going bad faster than usual, produce wilting prematurely, or leftovers that smell off after just a day or two, check the actual temperature with a thermometer — don't rely on the dial setting.</p>
<p>Possible causes include a faulty thermostat, dirty condenser coils, or a failing compressor. Some are simple fixes; others are more serious. Either way, don't ignore it.</p>

<h2>2. Excessive Frost or Ice Buildup</h2>
<p>A small amount of frost in a freezer is normal, but if you're seeing thick ice buildup on the walls, shelves, or around the freezer door seal, that's a problem. It usually means the defrost system has failed — either the defrost heater, defrost thermostat, or defrost timer has stopped working correctly.</p>
<p>Left unaddressed, excessive frost forces the compressor to work harder, which can lead to a complete breakdown. If your freezer looks like a winter wonderland, it's time to call a technician.</p>

<h2>3. Unusual Noises — Clicking, Buzzing, or Knocking</h2>
<p>Refrigerators make some noise — a soft hum when the compressor runs, the occasional click when it cycles on and off. But certain noises are red flags:</p>
<ul>
  <li><strong>Loud clicking:</strong> Often indicates the start relay is failing. The compressor may be trying to start but can't. You might hear clicking every few minutes.</li>
  <li><strong>Loud buzzing or humming:</strong> Could point to a condenser fan motor issue, or a problem with the ice maker.</li>
  <li><strong>Knocking or banging:</strong> Often caused by a loose compressor mount or a failing compressor.</li>
</ul>
<p>If the noise is new and persistent, don't wait. Noise problems tend to worsen over time.</p>

<h2>4. Water Pooling Inside or Underneath the Refrigerator</h2>
<p>Finding water inside the fridge — usually in the crisper drawers — or a puddle on the floor under the unit are both signs that something needs attention. Common causes include:</p>
<ul>
  <li><strong>Clogged defrost drain:</strong> When the drain tube gets blocked by food particles or ice, water has nowhere to go and pools at the bottom of the fridge. This is usually a relatively simple fix.</li>
  <li><strong>Damaged door seals:</strong> Worn or cracked gaskets let warm air in, which creates condensation that eventually drips.</li>
  <li><strong>Leaking water supply line:</strong> If your fridge has an ice maker or water dispenser, a cracked supply line can cause significant leaking at the back.</li>
</ul>
<p>Water damage is no joke — standing water under an appliance can damage flooring and become a safety hazard. Don't let it sit.</p>

<h2>5. The Compressor Runs Constantly — or Rarely Turns On</h2>
<p>A refrigerator compressor should cycle on and off throughout the day. If yours runs non-stop, it's working overtime — usually because it can't maintain the target temperature. This could be caused by dirty condenser coils, a weak compressor, or a refrigerant leak. Constant running significantly increases your electricity bill and accelerates wear on internal components.</p>
<p>On the flip side, if the compressor never seems to run, your food will warm up quickly. Neither extreme is normal operating behavior.</p>

<h2>Pro Tip: Clean Your Condenser Coils Twice a Year</h2>
<p>Dirty condenser coils are behind a surprising number of refrigerator problems. These coils — located either underneath the fridge behind the front grille or on the back — release heat as part of the cooling process. When they're coated in dust and pet hair, the fridge can't cool efficiently, causing the compressor to overwork.</p>
<p>Cleaning them is simple: unplug the fridge, use a coil brush or vacuum attachment, and clean them every 6 months. This one maintenance step can extend the life of your refrigerator by years and prevent many of the problems listed above.</p>

<p>If you're seeing any of the warning signs above, don't wait until your refrigerator fails completely — at which point you're dealing with spoiled food, potential water damage, and an emergency repair bill. Early intervention almost always means a less expensive repair and a longer-lasting appliance.</p>
    `.trim(),
  },
  {
    slug: 'repair-vs-replace-guide-2025',
    title: "Repair or Replace? The Smart Homeowner's Guide for 2025",
    excerpt: "When your appliance breaks down, how do you decide whether to fix it or buy new? We break down the 50% rule, average lifespans, energy savings, and 2025 cost context to help you make the right call.",
    category: 'Tips & Advice',
    date: '2026-03-12',
    readTime: '7 min read',
    author: 'CT Appliance Repair Team',
    featuredColor: 'from-amber-700 via-amber-600 to-yellow-500',
    accentColor: 'bg-amber-400 text-amber-900',
    content: `
<p>When your washing machine makes a grinding noise or your refrigerator suddenly can't hold temperature, you face a decision that feels more complicated than it should be: repair it or replace it? In 2025, with appliance costs rising and repair bills sometimes substantial, making the right call can save you hundreds of dollars. Here's a practical framework for thinking it through.</p>

<h2>The 50% Rule — A Simple Starting Point</h2>
<p>The most widely used rule of thumb in the appliance industry is the <strong>50% Rule</strong>: if the cost of the repair is more than 50% of the cost of a replacement appliance, AND the unit is past halfway through its expected lifespan, you're generally better off replacing it.</p>
<p>This isn't a hard law, but it's a solid heuristic. The logic is simple: a repair buys you time on an aging machine, but you're likely to face another repair soon. At some point, you're spending more keeping an old appliance alive than it would cost to start fresh with a new unit and a warranty.</p>

<h2>Average Appliance Lifespans</h2>
<p>To apply the 50% Rule, you need to know how old your appliance is relative to its expected lifespan:</p>
<ul>
  <li><strong>Refrigerator:</strong> 10–15 years</li>
  <li><strong>Washer (top-load):</strong> 10–14 years</li>
  <li><strong>Washer (front-load):</strong> 11–14 years</li>
  <li><strong>Dryer:</strong> 10–13 years</li>
  <li><strong>Dishwasher:</strong> 9–12 years</li>
  <li><strong>Gas range/oven:</strong> 15–17 years</li>
  <li><strong>Electric range/oven:</strong> 13–15 years</li>
  <li><strong>Microwave:</strong> 9–10 years</li>
</ul>
<p>Example: your washer is 12 years old and the repair quote is $350, while a new washer costs $700. That's right at the 50% line — and at 12 years, the unit is near or past its expected lifespan. In this case, the age tips the decision toward replacement.</p>

<h2>Factor in Energy Savings</h2>
<p>Newer appliances are significantly more energy-efficient than models from a decade ago. An ENERGY STAR certified washer, for example, uses about 25% less energy and 33% less water than a standard older model. Over a few years, those savings add up in a meaningful way.</p>
<p>If you're keeping an old energy-hungry appliance running with repairs, the utility savings from a replacement can partially — or fully — offset the purchase cost over time. This is especially relevant for refrigerators and washers, which run constantly and consume significant electricity throughout the year.</p>

<h2>2025 Cost Context — What Repairs Actually Cost in Connecticut</h2>
<p>Repair costs have increased over the past few years, driven by parts availability and labor costs. In 2025, typical repair costs in Connecticut run:</p>
<ul>
  <li><strong>Diagnostic visit:</strong> $75–$120</li>
  <li><strong>Minor repair (belt, filter, gasket, door latch):</strong> $120–$250</li>
  <li><strong>Major repair (motor, control board, compressor):</strong> $300–$600+</li>
</ul>
<p>Tariff impacts on appliance parts — particularly components manufactured overseas — have pushed parts costs upward in 2025. This means the calculation has shifted slightly: repairs are more expensive than they used to be, which slightly favors replacement in borderline cases. However, new appliance purchase prices have also risen, so the comparison still requires doing the math for your specific situation.</p>

<h2>When It's Almost Always Better to Repair</h2>
<ul>
  <li>The appliance is less than 5 years old</li>
  <li>The repair is under $200 and the unit is mid-lifespan</li>
  <li>It's a high-end or commercial-grade appliance where a replacement would cost $1,500+</li>
  <li>The problem is a minor part: door seal, latch, drain pump filter, or similar</li>
  <li>The appliance has sentimental or functional features not easily replicated by newer models</li>
</ul>

<h2>When It's Almost Always Better to Replace</h2>
<ul>
  <li>The appliance is within 2 years of the end of its expected lifespan</li>
  <li>This is the second or third significant repair in 2 years</li>
  <li>Parts are no longer available — common with appliances older than 12–15 years</li>
  <li>A compressor replacement is needed on a refrigerator that's 10+ years old — this is rarely worth it</li>
  <li>The repair cost exceeds the appliance's current market value</li>
</ul>

<h2>Making the Final Call</h2>
<p>When in doubt, get a written diagnosis from a licensed technician before making a decision. A good repair company will give you an honest assessment of the repair cost versus the remaining useful life of the appliance — and tell you frankly if replacement is the smarter move, even if that means less business for them that day.</p>
<p>At CT Appliance Repair, we've been helping Connecticut homeowners make exactly this call since 2008. Our technicians will give you a full diagnosis and a straightforward opinion on whether the repair is worth it for your specific appliance and situation.</p>
    `.trim(),
  },
  {
    slug: 'washer-dryer-maintenance-tips',
    title: 'How to Make Your Washer & Dryer Last Longer: Maintenance Tips That Actually Work',
    excerpt: 'Simple maintenance habits can add years to the life of your washer and dryer — and prevent the most common (and costly) breakdowns. Here\'s what actually makes a difference.',
    category: 'Maintenance',
    date: '2026-03-05',
    readTime: '6 min read',
    author: 'CT Appliance Repair Team',
    featuredColor: 'from-teal-800 via-teal-700 to-teal-500',
    accentColor: 'bg-teal-500 text-white',
    content: `
<p>Washers and dryers take a beating. The average household runs 400 or more loads of laundry per year — that's a lot of wear on motors, drums, seals, and hoses. The good news is that a handful of simple maintenance habits can easily add 3–5 years to the life of your machines and prevent the most common breakdowns. Here's what actually works.</p>

<h2>Washer Maintenance Tips</h2>

<h3>1. Don't Overload the Machine</h3>
<p>This is the single most common mistake homeowners make, and one of the most damaging to the machine over time. Overloading puts serious strain on the drum bearings, motor, and drive belt. The drum also can't agitate properly, which means clothes don't get clean anyway. A good rule of thumb: clothes should move freely in the drum — you should be able to fit your hand in alongside the laundry.</p>

<h3>2. Clean the Drum Monthly</h3>
<p>Residue from detergent, fabric softener, and minerals in the water builds up inside the drum over time. This creates unpleasant odors and can actually transfer grime back onto your clean clothes. Run a cleaning cycle once a month using either a commercial washer cleaning tablet (like Affresh) or a cup of white vinegar on the hottest setting with no laundry in the machine.</p>

<h3>3. Check the Door Gasket for Mold (Front-Loaders)</h3>
<p>The rubber door seal on front-load washers is a notorious mold trap. Moisture gets trapped in the folds of the gasket, and within weeks you can have significant mold and mildew growth. After each wash, wipe the gasket dry with a cloth and check for any dark discoloration. If you see black spots, clean them immediately with a diluted bleach solution before they spread further into the rubber.</p>

<h3>4. Leave the Door Open After Every Wash</h3>
<p>After removing your laundry, leave the washer door ajar for a few hours. This allows the drum and door gasket to dry out thoroughly, dramatically reducing mold and mildew growth. This single habit applies to both front-loaders and top-loaders, and alone it can prevent most washer odor problems before they start.</p>

<h3>5. Clean the Detergent Drawer</h3>
<p>The detergent and fabric softener dispenser drawer gets coated with dried residue and can develop mold inside the housing. Pull the drawer out completely — most are designed to do this — and rinse it under warm water monthly. An old toothbrush works well for scrubbing the dispenser housing inside the machine where the drawer slides in.</p>

<h2>Dryer Maintenance Tips</h2>

<h3>1. Clean the Lint Trap After Every Single Load</h3>
<p>Most people know this, but it bears repeating clearly: a clogged lint screen is not just an inefficiency — it's a serious fire hazard. The U.S. Fire Administration estimates that clothes dryers cause approximately 2,900 house fires annually, with failure to clean the lint trap being the leading contributing cause. Clean it every time, after every load. No exceptions.</p>

<h3>2. Deep-Clean the Dryer Vent Annually</h3>
<p>Even if you clean the lint screen faithfully after every load, lint accumulates inside the dryer vent duct over time. A clogged vent forces the dryer to work harder (clothes take two cycles to dry), creates a significant fire risk, and can cause the dryer to overheat and damage the heating element. Once a year, disconnect the dryer from the wall, detach the vent hose, and clean it out with a dryer vent brush kit available at any hardware store.</p>
<p>Signs your vent may be clogged: clothes take noticeably longer to dry than they used to, the outside of the dryer cabinet feels extremely hot, or you detect a faint burning odor during a cycle. Don't ignore any of these.</p>

<h3>3. Don't Over-Dry Your Clothes</h3>
<p>Running clothes through unnecessarily long or hot drying cycles wears out the drum seal, heating element, and the fabrics themselves much faster than necessary. Use moisture sensor settings if your dryer has them, or adjust cycle times based on load size and fabric type. Heavy items like jeans and towels need more time; synthetics, delicates, and light fabrics need significantly less.</p>

<h3>4. Inspect the Drum Seals</h3>
<p>The felt or rubber seals around the front and rear of the dryer drum prevent clothes from getting caught between the drum and the dryer cabinet. Over time, these seals wear out, and you may begin to hear a thumping or scraping sound as the drum rotates. Worn seals can snag and damage clothes and, if left unaddressed, can score the drum itself. This is a straightforward repair when caught early — much less expensive than a drum replacement.</p>

<p>The best appliance is one you never have to think about. A small investment of time in regular maintenance — less than an hour a year for both machines combined — can keep your washer and dryer running reliably for well over a decade.</p>
    `.trim(),
  },
  {
    slug: 'common-dishwasher-problems',
    title: 'Most Common Dishwasher Problems & When to Call a Professional',
    excerpt: "Dishwasher acting up? Most problems are either a simple DIY fix or a clear sign to call a pro. Here's a plain-English guide to the six most common dishwasher issues.",
    category: 'Dishwashers',
    date: '2026-02-28',
    readTime: '6 min read',
    author: 'CT Appliance Repair Team',
    featuredColor: 'from-violet-900 via-violet-800 to-violet-600',
    accentColor: 'bg-violet-500 text-white',
    content: `
<p>Dishwashers are one of those appliances we take for granted — until they stop working. The frustrating thing is that most dishwasher problems are either a simple DIY fix or a clear signal that it's time to call a professional. This guide walks through the six most common issues and tells you exactly which category each one falls into.</p>

<h2>1. Dishes Aren't Getting Clean</h2>
<p>If you're pulling dishes out with food residue still on them, the most common culprit is clogged spray arms. The spray arms have small holes that jet water onto your dishes during the wash cycle. These holes get blocked with mineral deposits and food debris over time.</p>
<p><strong>DIY fix:</strong> Remove the spray arms (usually unscrew or unclip from the center post) and soak them in white vinegar for 30 minutes, then use a toothpick to clear any remaining clogs in the holes. Also clean the filter assembly at the bottom of the dishwasher — this is often overlooked entirely and gets coated with grease and food particles that reduce wash performance significantly.</p>
<p>If the spray arms are clear and the problem persists, the issue may be low water pressure or a failing wash pump motor — time to call a pro.</p>

<h2>2. Water Isn't Draining</h2>
<p>Standing water at the bottom of the dishwasher after a completed cycle is one of the most common complaints. Before you call a technician, check these things in order:</p>
<ul>
  <li><strong>Clean the filter:</strong> The cylindrical filter at the bottom of the dishwasher needs regular cleaning. A clogged filter prevents proper drainage. Remove it, rinse it under running water, and use a soft brush to remove buildup. This is a DIY job.</li>
  <li><strong>Check the drain hose:</strong> Look under the sink where the drain hose connects. Make sure it isn't kinked or clogged with debris.</li>
  <li><strong>Run the garbage disposal:</strong> If your dishwasher drains into the garbage disposal, run the disposal before starting a cycle to clear any blockage in the common drain line.</li>
</ul>
<p><strong>Call a pro if:</strong> The filter is clean and hoses are clear, but water still pools. This usually points to a failed drain pump motor — a repair that requires dismantling the machine's base assembly.</p>

<h2>3. Door Latch Problems</h2>
<p>If the dishwasher door doesn't latch securely, the machine won't start — it's a built-in safety interlock. Door latches wear out over time, especially on units that get heavy daily use.</p>
<p><strong>DIY check:</strong> Look for obvious obstructions preventing the door from closing fully, or visible damage to the latch mechanism itself. Sometimes the strike plate just needs minor adjustment — check your model's manual for this.</p>
<p><strong>Call a pro if:</strong> The latch assembly is broken or the door is misaligned beyond simple adjustment. A door latch replacement is typically an affordable repair and well worth doing rather than replacing the dishwasher.</p>

<h2>4. Dishwasher Won't Fill With Water</h2>
<p>If you hear the machine start its cycle but no water seems to be entering the tub, the issue is usually the water inlet valve. This valve controls the flow of water into the dishwasher and can fail mechanically or become blocked with mineral deposits over time.</p>
<p><strong>DIY check first:</strong> Make sure the water supply shutoff valve under the sink is fully open — sometimes it gets accidentally bumped. Also check the float switch, a small plastic dome or cylinder inside the bottom of the dishwasher. If it's stuck in the raised position, it incorrectly tells the machine the tub is full.</p>
<p><strong>Call a pro for:</strong> Actual water inlet valve replacement. While accessible, it involves working with water supply lines and electrical connections — not a DIY job for most homeowners.</p>

<h2>5. Strange Noises During Cycles</h2>
<p>Some noise is entirely normal — water spraying, the wash pump running, dishes occasionally clinking. But these specific sounds warrant attention:</p>
<ul>
  <li><strong>Grinding or scraping noise:</strong> Something may be caught in the spray arm or in the chopper blade assembly. Check for broken glass, small bones, or hard food particles that have made it past the filter.</li>
  <li><strong>Loud thumping:</strong> Often caused by a spray arm hitting a tall item that's been loaded too close to the center. Rearrange the load and check if the noise resolves.</li>
  <li><strong>Persistent humming or high-pitched whining:</strong> May indicate a failing wash pump or drain pump motor. This requires professional diagnosis.</li>
</ul>

<h2>6. Water Leaking Onto the Floor</h2>
<p>A leaking dishwasher requires prompt attention — water damage to flooring and cabinetry can be expensive, and mold grows quickly in concealed spaces.</p>
<p><strong>Common causes and fixes:</strong></p>
<ul>
  <li><strong>Worn door gasket:</strong> The rubber seal around the door perimeter dries out and cracks over years of use. This is a DIY replacement — gaskets cost $20–$50 and typically snap or slide into a channel around the door frame.</li>
  <li><strong>Wrong detergent:</strong> Using regular dish soap instead of dishwasher-specific detergent causes excessive sudsing that pushes water out the door seal. Use only dishwasher detergent.</li>
  <li><strong>Cracked tub or faulty pump seal:</strong> These internal leaks require professional repair.</li>
</ul>
<p>If you're not sure where the leak originates, run the dishwasher and watch carefully as it fills and begins washing. The leak source usually becomes visible within the first few minutes of the cycle.</p>

<p>Most dishwasher problems caught early are inexpensive to fix. If you're seeing any of these issues, or if your dishwasher is behaving in ways not covered here, a diagnostic visit from a qualified technician can save you from a much larger repair bill — or a flooded kitchen floor.</p>
    `.trim(),
  },
  {
    slug: 'appliance-maintenance-saves-money-connecticut',
    title: 'Why Connecticut Homeowners Who Maintain Their Appliances Save Hundreds Every Year',
    excerpt: 'Preventive maintenance costs almost nothing. Ignored appliances can cost hundreds to repair. Here\'s the math — plus specific maintenance advice for Connecticut\'s hard water and climate.',
    category: 'Tips & Advice',
    date: '2026-02-20',
    readTime: '6 min read',
    author: 'CT Appliance Repair Team',
    featuredColor: 'from-amber-800 via-orange-700 to-amber-600',
    accentColor: 'bg-amber-400 text-amber-900',
    content: `
<p>Most Connecticut homeowners don't think about their appliances until something breaks. That's entirely understandable — life is busy, and a running refrigerator or washing machine isn't exactly top of mind. But the numbers tell a clear story: homeowners who invest a small amount of time in routine maintenance consistently spend significantly less money over the life of their appliances. Here's why — and what the math looks like.</p>

<h2>The Real Cost of Skipping Maintenance</h2>
<p>Consider a washing machine that hasn't been maintained in several years. The drum is out of balance from chronic overloading, the drain filter is clogged with lint and debris, and the door gasket has developed mold. Each of these is a minor issue individually — but together, they force the motor to work harder, accelerating bearing wear. A bearing replacement costs $200–$350 in parts and labor. If caught early by a technician doing a routine service, it might have been a $50 balance adjustment.</p>
<p>This pattern repeats across appliance categories. A refrigerator with dirty condenser coils runs its compressor 15–20% harder than necessary. That additional strain shortens compressor life measurably. Compressor replacements on mid-range refrigerators cost $400–$600 — and at that price, many homeowners buy a new refrigerator instead. A $15 coil brush and 20 minutes of your time twice a year can prevent that entirely.</p>

<h2>Connecticut's Hard Water Problem</h2>
<p>Connecticut has notably hard water in many areas of the state, particularly in central Connecticut, the Naugatuck Valley, and parts of the northeast. Hard water contains elevated levels of calcium and magnesium that leave mineral deposits — commonly called scale or limescale — inside appliances over time.</p>
<p>Scale buildup forces dishwashers to work harder because the heating element becomes coated in an insulating mineral layer, reducing its ability to heat water efficiently. It also clogs the small spray jets in dishwasher arms. In water heaters, scale sediment at the bottom of the tank is one of the primary causes of premature failure and significantly increases energy bills in the meantime.</p>
<p><strong>Simple fixes for hard water:</strong> Run a cup of white vinegar through your dishwasher monthly on a hot cycle. Flush your water heater tank annually to remove sediment buildup. If your water is particularly hard, a whole-home water softener pays back its installation cost in extended appliance life and lower energy consumption over 5–7 years.</p>

<h2>Seasonal Demands on Your Appliances in Connecticut</h2>
<p>Connecticut's climate creates specific seasonal demands on home appliances that are less pronounced in milder states:</p>
<ul>
  <li><strong>Summer:</strong> Refrigerators work harder when kitchen temperatures rise. Make sure condenser coils are cleaned before the warm months — this is the most impactful single maintenance task for refrigerators.</li>
  <li><strong>Fall/Winter:</strong> Dryers handle heavier loads — thick sweaters, blankets, heavy denim. Check your dryer vent duct before winter. A partially blocked vent is a fire risk that becomes more dangerous when the dryer runs longer cycles.</li>
  <li><strong>Year-round:</strong> Connecticut's temperature swings cause rubber door gaskets to expand, contract, and crack over time. Inspect them each season and apply a thin coat of petroleum jelly to keep rubber flexible and extend seal life.</li>
</ul>

<h2>A Simple Maintenance Schedule for Connecticut Homeowners</h2>
<p>Here's a no-nonsense schedule covering the highest-impact maintenance tasks:</p>
<ul>
  <li><strong>After every dryer load:</strong> Clean the lint trap</li>
  <li><strong>Monthly:</strong> Run a vinegar cycle in the washer, run vinegar through the dishwasher, check washer door gasket</li>
  <li><strong>Every 6 months:</strong> Clean refrigerator condenser coils, inspect all appliance door seals, clean dishwasher filter</li>
  <li><strong>Annually:</strong> Deep-clean dryer vent duct, flush water heater tank, inspect washer inlet hoses for cracking or bulging (replace if over 5 years old — a burst hose is a common source of serious water damage)</li>
</ul>
<p>The total time commitment is roughly 2–3 hours per year. That's a reasonable exchange for potentially avoiding $300–$800 in repairs.</p>

<h2>Local Expertise Matters — And Saves You Money</h2>
<p>There's a meaningful difference between calling a national appliance repair chain and calling a local Connecticut technician. A local tech knows your area's water quality, has seen the same failure patterns in the same appliance models in local homes year after year, and will give you an honest assessment of whether a repair is worth it — rather than just completing the call and moving on to the next ticket.</p>
<p>CT Appliance Repair has been serving Connecticut homeowners since 2008. Our technicians are licensed, insured, and familiar with the specific conditions — hard water, seasonal demands, the appliance brands common in CT homes — that affect appliance longevity in our region. When you call us for a repair, you also get practical, no-upsell maintenance advice tailored to your specific appliances. We'd rather see you maintain an appliance for 15 years than replace it at 8.</p>
    `.trim(),
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, count = 2): Post[] {
  return posts.filter((p) => p.slug !== currentSlug).slice(0, count);
}
