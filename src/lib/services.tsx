import type { ReactElement } from'react';

// Must match an option in BookingModal.tsx`appliances` array.
export type ApplianceValue =
 |'Washer'
 |'Dryer'
 |'Refrigerator'
 |'Dishwasher'
 |'Oven / Range'
 |'Cooktop'
 |'Microwave'
 |'Freezer'
 |'Other';

export interface Service {
 slug: string;
 title: string;
 shortName: string;
 heroAccent: string;
 subtitle: string;
 description: string;
 intro: string;
 heroImage: string;
 heroImageAlt: string;
 applianceValue: ApplianceValue;
 symptoms: string[];
 parts: string[];
 brands: string[];
 faqs: { q: string; a: string }[];
 icon: ReactElement;
}

const washerIcon = (
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
 <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
 <circle cx="17" cy="5" r="1" fill="currentColor" strokeWidth={0} />
 <circle cx="14.5" cy="5" r="1" fill="currentColor" strokeWidth={0} />
 </svg>
);

const dryerIcon = (
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
 <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
 <path strokeLinecap="round" strokeWidth={1.5} d="M12 7v1M12 16v1M7 12h1M16 12h1" />
 </svg>
);

const refrigeratorIcon = (
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth={1.5} />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 10h16" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 6v2M8 14v4" />
 </svg>
);

const dishwasherIcon = (
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth={1.5} />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9h18" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 4v5M15 4v5" />
 </svg>
);

const ovenIcon = (
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <rect x="3" y="5" width="18" height="16" rx="2" strokeWidth={1.5} />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18" />
 <circle cx="7" cy="7.5" r="1" fill="currentColor" strokeWidth={0} />
 <circle cx="12" cy="7.5" r="1" fill="currentColor" strokeWidth={0} />
 <circle cx="17" cy="7.5" r="1" fill="currentColor" strokeWidth={0} />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 16h6" />
 </svg>
);

const otherIcon = (
 <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
 </svg>
);

const pricingFaqs = [
 {
 q:'How much does this repair cost in Connecticut?',
 a:"Most appliance repairs in CT run $120 to $400 depending on the part and how long the job takes. Premium brands like Sub-Zero, Wolf, Thermador, and Miele often run higher because their parts cost more. You get a written estimate before we start any work. The $89 service call fee is waived when you go ahead with the repair.",
 },
 {
 q:'Do you offer same-day service?',
 a:"Often yes. If you call before noon, we can usually get a tech to you the same afternoon. We run morning, afternoon, and evening slots Monday through Saturday, and emergency calls 24/7.",
 },
];

export const services: Service[] = [
 {
 slug:'washer-repair',
 title:'Washer Repair',
 shortName:'Washer',
 heroAccent:'Washer',
 subtitle:'Front-load and top-load, every major brand',
 description:
"If your washer left clothes soaking wet again or it's banging like it wants to leave the room, that's almost always a part we keep on the truck.",
 intro:
"Most washer calls fall into a couple of buckets. Front-loaders that won't drain or leak from the door gasket. Top-loaders that walk, won't fill, or quit mid-cycle. Connecticut basements are rough on washers because the floors are rarely level, so a lot of front-loaders end up rocking on shot shock absorbers within a few years. The truck carries shocks, boot seals, drain pumps, and motor couplers, so most of these jobs wrap in one visit.",
 heroImage:'/images/services/washer-repair.jpg',
 heroImageAlt:'Front-load washing machine, same-day washer repair in Connecticut',
 applianceValue:'Washer',
 icon: washerIcon,
 symptoms: [
"Won't go into spin",
'Stops with water in the drum',
'Leaks from the door gasket',
'Leaks from underneath',
'Shakes like crazy or walks across the floor',
"Won't fill with water",
'Loud banging or grinding on spin',
"Door won't lock",
'Mildew smell from the door gasket',
'Clothes come out soaking wet',
'Error code on the display',
"Won't turn on, no lights",
 ],
 parts: [
'Drain pump','Door boot seal / gasket','Shock absorbers','Motor coupler',
'Drive belt','Door lock assembly','Tub bearing kit','Rear drum spider (front-load)',
'Water inlet valve','Rotor position sensor / hall sensor','Control board','Lid switch (top-load)',
 ],
 brands: ['Whirlpool','Samsung','LG','GE','Maytag','Speed Queen','Electrolux','Bosch'],
 faqs: [
 ...pricingFaqs,
 {
 q:"My washer won't spin. What's the usual culprit?",
 a:"On Whirlpool, Maytag, and Kenmore direct-drives, the usual cause is a worn motor coupler. On most front-loaders it's the drive belt or a stuck door lock circuit. On LG and Samsung direct-drives, it's almost always the rotor position sensor or a hall sensor. We test the lock circuit and the motor before swapping anything.",
 },
 {
 q:'Why is my washer leaking water?',
 a:"Where the water shows up tells us a lot. Water at the front of the machine is almost always a torn boot seal on a front-loader. Water underneath usually means a cracked drain hose, a worn pump seal, or a tub bearing seal that has let go. We can run the washer empty to confirm where the leak starts before opening it up.",
 },
 {
 q:'My washer keeps walking out from the wall in the basement. Can you fix that?',
 a:"Yes. This is a top-five call for us in Connecticut. Most CT basements have uneven concrete floors, and front-loader shock absorbers wear faster than they should because the drum is constantly fighting that tilt. New shocks bring the noise and movement back to normal. While we are there, we will level the feet so the new shocks last longer.",
 },
 ],
 },
 {
 slug:'dryer-repair',
 title:'Dryer Repair',
 shortName:'Dryer',
 heroAccent:'Dryer',
 subtitle:'Gas and electric, vented and ventless',
 description:
"If your dryer is running but the clothes are still damp after an hour, or it's making a thumping noise that was not there last week, that is usually a one-trip fix.",
 intro:
"Dryer calls in Connecticut tend to split two ways. Long basement vent runs clog with lint, which trips the high-limit thermostat and blows the thermal fuse. Drum hardware (belts, glides, idler pulleys, bearings) wears with age and starts squeaking or thumping. We clear the vent and swap the worn parts in one visit when we can. Every gas dryer call gets a leak check at the supply line before we leave.",
 heroImage:'/images/services/dryer-repair.jpg',
 heroImageAlt:'Clothes dryer, same-day dryer repair in Connecticut',
 applianceValue:'Dryer',
 icon: dryerIcon,
 symptoms: [
'No heat, clothes come out damp',
'Takes forever to dry, runs twice',
'Stops mid-cycle on its own',
"Won't start",
'Squeaking or thumping when running',
'Drum not turning',
'Cuts off early or runs hot',
'Burning smell from the drum',
"Door won't close all the way",
'Error code or check-vent light on the display',
'Gas smell from the dryer (call us right away)',
"Clothes smell like they didn't dry",
 ],
 parts: [
'Heating element (electric)','Igniter assembly (gas)','Thermal fuse','High-limit thermostat (vent)',
'Cycling thermostat / thermistor','Gas valve coils','Drum drive belt','Idler pulley',
'Drum bearing kit','Door switch','Blower wheel','Control board',
 ],
 brands: ['Whirlpool','LG','Samsung','GE','Maytag','Electrolux','Kenmore','Speed Queen'],
 faqs: [
 ...pricingFaqs,
 {
 q:'My dryer runs but produces no heat. Is the heating element bad?',
 a:"Maybe, but probably not first. The thermal fuse blows nine times out of ten because the vent is clogged. If we replace the fuse without clearing the vent, it blows again within a week and the heat trapped inside the cabinet becomes a real fire risk. On gas dryers, the igniter or gas valve coils are usually the cause. Our first step on any no-heat call is the vent, then the thermal protection.",
 },
 {
 q:"My dryer is squeaking or thumping. What's that?",
 a:"Squeaking is almost always the drum glides, idler pulley, or rear drum bearing. Thumping usually means the drive belt has stretched or one of the rollers has flat-spotted. Both are straightforward to fix in one visit. We spin the empty drum by hand to confirm what is actually noisy before pulling the cabinet apart.",
 },
 {
 q:'My dryer is in the basement with a long vent run. Is that a problem?',
 a:"Yes. It is the single biggest cause of slow-drying calls we get in CT. Basements here often have vents running 25 feet or more, sometimes with two or three elbows. That much length means lint piles up faster than the dryer can clear it. We measure airflow at the dryer port, clear the vent if needed, and check the high-limit and thermal fuse while we are in there. If the vent run is longer than the manufacturer recommends, we tell you and write it up.",
 },
 ],
 },
 {
 slug:'refrigerator-repair',
 title:'Refrigerator Repair',
 shortName:'Refrigerator',
 heroAccent:'Refrigerator',
 subtitle:'French-door, side-by-side, top and bottom freezer',
 description:
"A fridge that is running warm can cost you a couple hundred dollars in groceries by tomorrow morning, so we treat it as a same-day call whenever we can.",
 intro:
"Refrigerator calls jump to the top of our schedule because food spoils fast. The truck carries compressors, start relays, evaporator fans, ice maker assemblies, and water inlet valves so we can usually finish on the first visit. Samsung and LG French-doors and Bosch counter-depths are the most common units we see. We have also done plenty of Sub-Zero work in Fairfield County kitchens, so if yours is a Sub-Zero running warm, we already know the three things it is likely to be before we walk in.",
 heroImage:'/images/services/refrigerator-repair.jpg',
 heroImageAlt:'French-door refrigerator, same-day fridge repair in Connecticut',
 applianceValue:'Refrigerator',
 icon: refrigeratorIcon,
 symptoms: [
"Fridge isn't cold, food going bad",
"Freezer's fine but the fridge isn't cold",
"Ice maker isn't making ice",
"Water dispenser doesn't work",
'Water on the floor under the fridge',
'Loud humming, clicking, or buzzing',
'Frost building up in the freezer',
'Runs all the time and never shuts off',
'Water pooling under the vegetable drawers',
'Fridge gets warm, then cold, then warm again',
"Door seal isn't sealing right",
"Display panel doesn't respond",
 ],
 parts: [
'Compressor','Start relay and capacitor','Evaporator fan motor','Condenser fan motor',
'Water inlet valve','Ice maker assembly','Door gasket','Defrost heater',
'Defrost thermostat / thermistor','Defrost drain tube / clog kit','Main control board / inverter board','Twin-cooling damper assembly',
 ],
 brands: ['Samsung','LG','Whirlpool','GE','KitchenAid','Sub-Zero','Bosch','Frigidaire'],
 faqs: [
 ...pricingFaqs,
 {
 q:"My fridge isn't cold but the freezer is fine. Why?",
 a:"This is one of the most common calls we get, and it is almost always the evaporator fan motor or a stuck defrost cycle. The compressor is still cooling the freezer fine, but cold air is not getting moved into the fridge section. We see it across Samsung, LG, and Whirlpool models. The fix is usually a fan motor or a defrost heater, both of which we carry.",
 },
 {
 q:'My ice maker stopped working. Is it a big deal?',
 a:"Usually not. On older fridges it is typically a failed ice maker assembly, a frozen water supply line, or a bad water inlet valve. On modern Samsung French-doors, the ice maker often ices over from a door seal leak or the auger motor wears out. We pull the bucket, check for ice buildup at the back, and swap whatever has failed in one visit.",
 },
 {
 q:'My fridge is making loud buzzing or clicking sounds. Should I worry?',
 a:"Clicking usually means the start relay or the compressor is having trouble starting, and it needs attention now. Buzzing is often the evaporator or condenser fan motor going bad. Neither should be left for weeks because both can escalate fast. We get the relay tested and the fan motor swapped or ordered before we leave.",
 },
 {
 q:"We're on well water in Litchfield County. The ice maker keeps failing. Is that related?",
 a:"Almost certainly. Well water in northwest CT runs hard, and the mineral content scales up the water inlet valve, the ice maker assembly, and the fill tube. Every couple of years we see homeowners on wells go through ice makers when the actual problem is the valve clogging with scale. A whole-house softener or a fridge filter rated for high TDS slows it down. We can confirm with a quick valve flow test.",
 },
 ],
 },
 {
 slug:'dishwasher-repair',
 title:'Dishwasher Repair',
 shortName:'Dishwasher',
 heroAccent:'Dishwasher',
 subtitle:'Built-in and portable, every major brand',
 description:
"Dishes coming out still dirty or water sitting in the bottom at the end of the cycle? Usually a drain pump, a clogged spray arm, or a sensor. Same-day fix when we can.",
 intro:
"Dishwasher calls in CT usually come down to drainage, water entry, or the wash cycle itself. Water sitting at the bottom is almost always the drain pump, a clogged hose, or a stuck check valve. Dishes coming out dirty is usually clogged spray arms, a worn wash pump, or a failed soap dispenser. Bosch E15 errors and Whirlpool sump leaks are common enough that we know what we are looking at before we open the door. The truck carries pumps, sumps, valves, and door latches for the major brands.",
 heroImage:'/images/services/dishwasher-repair.jpg',
 heroImageAlt:'Built-in dishwasher, same-day dishwasher repair in Connecticut',
 applianceValue:'Dishwasher',
 icon: dishwasherIcon,
 symptoms: [
"Dishes aren't getting clean",
'Water sitting at the bottom',
"Won't start, no power",
'Leaks water onto the floor',
"Won't fill with water",
'Dishes still wet at the end of the cycle',
'Grinding or rattling noise when running',
"Door won't latch shut",
"Soap dispenser doesn't open",
'Bad odor after every cycle',
'Spots and film on glasses',
'E15, E22, or other error code',
 ],
 parts: [
'Drain pump','Wash pump / circulation motor','Control board','Door latch assembly',
'Water inlet valve','Spray arms (upper and lower)','Heating element','Door gasket / tub seal',
'Detergent dispenser','Sump assembly','Diverter motor (Whirlpool / KitchenAid)','Chopper blade',
 ],
 brands: ['Bosch','Whirlpool','GE','Samsung','Miele','KitchenAid','Frigidaire','Maytag'],
 faqs: [
 ...pricingFaqs,
 {
 q:"My dishwasher isn't cleaning. What's wrong?",
 a:"Most poor-cleaning calls are clogged spray arms or a worn wash pump motor, not detergent. We pull the lower spray arm and look at the holes for food particles and hard-water scale, then check the filter assembly. Sometimes the fix is showing you how to clean the filter yourself every few months. Sometimes it is a new pump.",
 },
 {
 q:'Standing water at the bottom after a cycle. Is the pump broken?',
 a:"Probably the drain pump, but not always. It can also be a clogged drain hose, a stuck check valve, or a garbage disposal connection that never had the knockout removed when the dishwasher was installed. We test the pump directly before swapping anything.",
 },
 {
 q:'Are dishwashers OK on a septic system?',
 a:"Yes. Modern dishwashers actually use less water than handwashing the same load, which is easier on a septic. The real concern used to be high-phosphate detergent, but Connecticut requires phosphate-free dishwasher detergent now, so that is handled. We do recommend a vinegar rinse cycle once a month if you are on septic, just to keep the lines clear.",
 },
 ],
 },
 {
 slug:'oven-range-repair',
 title:'Oven & Range Repair',
 shortName:'Oven',
 heroAccent:'Oven & Range',
 subtitle:'Gas and electric, ranges and wall ovens',
 description:
"Oven not getting hot, burners that click but won't light, or a self-clean cycle that won't run? Most oven jobs are a one-visit fix.",
 intro:
"Oven and range work is mostly gas igniters, bake elements, and control boards. Old GE wall ovens in West Hartford and Glastonbury colonials are still everywhere, and we keep their igniters on the truck. On modern slide-ins, the bake/broil relay board fails before the elements do. Every gas oven call gets a leak check at the supply valve and a flame test on each burner before we leave.",
 heroImage:'/images/services/oven-range-repair.jpg',
 heroImageAlt:'Freestanding range with oven and cooktop, same-day oven repair in Connecticut',
 applianceValue:'Oven / Range',
 icon: ovenIcon,
 symptoms: [
"Oven runs cold or doesn't preheat",
"Gas burner clicks and clicks but won't light",
"Electric burner won't heat",
'Oven takes way too long to preheat',
'Hot and cold spots when cooking',
"Self-clean cycle won't start or won't end",
"Door won't close all the way",
'Gas smell when the oven is running (urgent, call us)',
"Broiler isn't working",
'Constant clicking even when no burner is on',
"Control panel won't respond",
"Oven light won't turn on",
 ],
 parts: [
'Bake element','Broil element','Igniter assembly (gas)','Oven safety valve (gas, separate from main)',
'Main gas valve','Temperature sensor / thermistor','Control board','Bake/broil relay board (GE)',
'Door hinge socket / receiver','Door gasket','Spark module','Convection fan motor',
 ],
 brands: ['GE','Whirlpool','Samsung','LG','Bosch','KitchenAid','Thermador','Wolf'],
 faqs: [
 ...pricingFaqs,
 {
 q:"My gas oven won't ignite. Is it dangerous?",
 a:"If you smell gas at any time, shut off the gas at the appliance valve, leave the house, and call your gas utility before calling us. Do not try to light the oven. If there is no gas smell, the usual causes are a worn igniter, a failed spark module, or a clogged burner port. We test the igniter resistance and the gas pressure on every call.",
 },
 {
 q:'My oven heats unevenly. Why?',
 a:"Sometimes the oven just needs a calibration offset, especially older units that have drifted with age. We test the temperature in three zones with our own probe before deciding anything. If it has drifted by more than 25 degrees, the temperature sensor or the bake element is usually the cause. We can recalibrate on the spot in a lot of cases without replacing parts.",
 },
 {
 q:'My older GE wall oven has stopped baking but the broiler still works. What is likely?',
 a:"On GE wall ovens older than about 10 years, this is almost always the bake/broil relay board. The board has separate relays for each element and the bake side fails first because it cycles more often. We carry the board for the common GE platforms and can swap it in about 30 minutes. If your oven is from the 80s or early 90s, we will tell you honestly whether parts are still available or whether replacement makes more sense.",
 },
 ],
 },
 {
 slug:'more-appliances',
 title:'More Appliances',
 shortName:'Appliance',
 heroAccent:'Specialty Appliances',
 subtitle:'Freezer, ice maker, cooktop, microwave',
 description:
"Freezer not freezing? Ice maker quit? Cooktop won't ignite? If it plugs in or runs on gas, there is a good chance we fix it.",
 intro:
"Specialty appliance work is a smaller portion of what we do, but a real one. Standalone freezers in CT basements and garages are common, and we see plenty in the lake regions near Candlewood and Bantam. Ice makers, both built-in and standalone, share a lot of parts with refrigerators so we usually have what we need. Cooktops (induction, gas, electric) and microwaves (countertop, over-the-range, built-in) round out the regular calls. If you are not sure whether we cover what you have, call us. The answer is yes more often than not.",
 heroImage:'/images/services/more-appliances.jpg',
 heroImageAlt:'Specialty kitchen appliances, freezer, ice maker, cooktop, and microwave repair in Connecticut',
 applianceValue:'Other',
 icon: otherIcon,
 symptoms: [
"Standalone freezer isn't freezing",
'Ice maker stopped making ice',
"Cooktop burner won't ignite",
"Microwave hums but doesn't heat",
'Ice maker overflowing or jammed',
'Freezer making a loud noise',
'Cooktop display unresponsive',
'Microwave sparking inside',
"Freezer door isn't sealing right",
'Ice maker leaking water',
"Induction burner won't recognize my pan",
"Microwave turntable isn't turning",
 ],
 parts: [
'Freezer compressor','Evaporator coil (freezer)','Ice maker module','Ice maker water valve',
'Cooktop igniter','Cooktop spark module','Burner switch (cooktop)','Microwave magnetron',
'Microwave control board','Door switch (microwave)','Glass cooktop surface','Thermostat / thermocouple',
 ],
 brands: ['Whirlpool','Samsung','LG','GE','Frigidaire','Bosch','Sharp','Panasonic'],
 faqs: [
 ...pricingFaqs,
 {
 q:'My garage freezer stops working when it gets really cold out. What is that?',
 a:"Most consumer freezers are not rated to run below about 38 degrees ambient. When a CT garage drops below freezing in January, the freezer's thermostat thinks it is already cold enough and the compressor stops. The freezer warms up, food thaws, and you find out in February. The fix is either a garage-ready kit add-on for some models or moving the freezer somewhere that stays above 40 degrees. We can confirm whether your unit accepts a garage kit.",
 },
 ],
 },
];

export function getServiceBySlug(slug: string): Service | undefined {
 return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
 return services.map((s) => s.slug);
}

export function getRelatedServices(currentSlug: string, count = 3): Service[] {
 return services.filter((s) => s.slug !== currentSlug).slice(0, count);
}
