import type { ReactElement } from 'react';
import { APPLIANCE_REPAIR_COST_ANSWER, GAS_ODOR_GUIDANCE, SAME_DAY_SERVICE_ANSWER } from '@/lib/business';

// Must match an option in BookingModal.tsx`appliances` array.
export type ApplianceValue =
  | 'Washer'
  | 'Dryer'
  | 'Refrigerator'
  | 'Dishwasher'
  | 'Oven / Range'
  | 'Cooktop'
  | 'Microwave'
  | 'Freezer'
  | 'Other';

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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const pricingFaqs = [
  {
    q: 'How much does this repair cost in Connecticut?',
    a: APPLIANCE_REPAIR_COST_ANSWER,
  },
  {
    q: 'Do you offer same-day service?',
    a: SAME_DAY_SERVICE_ANSWER,
  },
  {
    q: 'Should I repair or replace my appliance?',
    a: 'Compare the written repair quote with the full installed cost of a replacement, including delivery, installation, and removal. Age, overall condition, repeat failures, parts availability, and any manufacturer warranty also matter. A small component failure and a major sealed-system or tub repair can lead to very different decisions. We explain the diagnosis and quote before you authorize work.',
  },
];

export const services: Service[] = [
  {
    slug: 'washer-repair',
    title: 'Washer Repair',
    shortName: 'Washer',
    heroAccent: 'Washer',
    subtitle: 'Front-load and top-load, every major brand',
    description:
      "If your washer left clothes soaking wet again or it's banging like it wants to leave the room, that's almost always a part we keep on the truck.",
    intro:
      "We diagnose front-load and top-load washers that will not spin, drain, fill, or finish a cycle. Leaks, door-lock faults, and vibration can have several causes, so we check the installation and the affected systems before recommending a part. Share the brand, model number, and any error code when booking washer repair in our Connecticut service area. Repair timing depends on the diagnosis and model-specific parts availability.",
    heroImage: '/images/services/washer-repair.jpg',
    heroImageAlt: 'Front-load washing machine, same-day washer repair in Connecticut',
    applianceValue: 'Washer',
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
      'Drain pump',
      'Door boot seal / gasket',
      'Shock absorbers',
      'Motor coupler',
      'Drive belt',
      'Door lock assembly',
      'Tub bearing kit',
      'Rear drum spider (front-load)',
      'Water inlet valve',
      'Rotor position sensor / hall sensor',
      'Control board',
      'Lid switch (top-load)',
    ],
    brands: ['Whirlpool', 'Samsung', 'LG', 'GE', 'Maytag', 'Speed Queen', 'Electrolux', 'Bosch'],
    faqs: [
      ...pricingFaqs,
      {
        q: "My washer won't spin. What's the usual culprit?",
        a: 'An unbalanced load, a drainage problem, a lid or door lock, or a drive-system fault can prevent spinning. The drive design varies by model; not every washer has a belt or motor coupler. We check drainage, locking, and the drive system before recommending a repair.',
      },
      {
        q: 'Why is my washer leaking water?',
        a: 'Where the water shows up tells us a lot. Water at the front of the machine is almost always a torn boot seal on a front-loader. Water underneath usually means a cracked drain hose, a worn pump seal, or a tub bearing seal that has let go. We can run the washer empty to confirm where the leak starts before opening it up.',
      },
      {
        q: 'My washer keeps walking out from the wall in the basement. Can you fix that?',
        a: 'We can check the cause. An uneven floor, loose leveling feet, shipping bolts left in a recently installed machine, an unbalanced load, or worn suspension components can all cause movement. Stop using a washer that moves violently. The diagnosis determines whether it needs an installation adjustment or a repair.',
      },
      {
        q: 'What can I check before booking washing machine repair?',
        a: 'Check the selected cycle, control lock, and whether the load is unbalanced. Note any error code and whether water remains in the drum. Follow your model manual for user-accessible filter cleaning. If the washer is leaking or moving violently, stop the cycle and arrange service instead of repeatedly restarting it.',
      },
    ],
  },
  {
    slug: 'dryer-repair',
    title: 'Dryer Repair',
    shortName: 'Dryer',
    heroAccent: 'Dryer',
    subtitle: 'Gas and electric, vented and ventless',
    description:
      "If your dryer is running but the clothes are still damp after an hour, or it's making a thumping noise that was not there last week, that is usually a one-trip fix.",
    intro:
      'We service gas and electric dryers with no heat, long drying times, starting problems, and unusual drum noises. Restricted exhaust airflow and a failed heating component can produce different symptoms, so a diagnosis should cover both the dryer and its installation. Tell us whether your dryer is gas, electric, or ventless, along with the model number and any check-vent warning.',
    heroImage: '/images/services/dryer-repair.jpg',
    heroImageAlt: 'Clothes dryer, same-day dryer repair in Connecticut',
    applianceValue: 'Dryer',
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
      'Gas odor: leave the building and call your gas utility from outside',
      "Clothes smell like they didn't dry",
    ],
    parts: [
      'Heating element (electric)',
      'Igniter assembly (gas)',
      'Thermal fuse',
      'High-limit thermostat (vent)',
      'Cycling thermostat / thermistor',
      'Gas valve coils',
      'Drum drive belt',
      'Idler pulley',
      'Drum bearing kit',
      'Door switch',
      'Blower wheel',
      'Control board',
    ],
    brands: ['Whirlpool', 'LG', 'Samsung', 'GE', 'Maytag', 'Electrolux', 'Kenmore', 'Speed Queen'],
    faqs: [
      ...pricingFaqs,
      {
        q: 'My dryer runs but produces no heat. Is the heating element bad?',
        a: 'A failed element is one possibility on an electric dryer, along with a power-supply fault, thermostat, thermal protection device, or control fault. Gas dryers use an ignition system rather than an electric heating element. A thermal fuse may stop heating or stop the dryer entirely depending on the model. We test the relevant circuit and check airflow instead of choosing a part from the symptom alone.',
      },
      {
        q: 'What can I check before booking dryer repair?',
        a: 'Check the cycle settings and clean the lint screen. Look for a visible crushed exhaust duct without moving or disconnecting the dryer, and check the outdoor vent only if it is safely accessible. Never run a vented dryer with its exhaust disconnected or bypass a thermal fuse. Stop using it if it overheats or smells burnt. ' + GAS_ODOR_GUIDANCE,
      },
      {
        q: "My dryer is squeaking or thumping. What's that?",
        a: 'Squeaking is almost always the drum glides, idler pulley, or rear drum bearing. Thumping usually means the drive belt has stretched or one of the rollers has flat-spotted. Both are straightforward to fix in one visit. We spin the empty drum by hand to confirm what is actually noisy before pulling the cabinet apart.',
      },
      {
        q: 'My dryer is in the basement with a long vent run. Is that a problem?',
        a: 'Yes. It is the single biggest cause of slow-drying calls we get in CT. Basements here often have vents running 25 feet or more, sometimes with two or three elbows. That much length means lint piles up faster than the dryer can clear it. We measure airflow at the dryer port, clear the vent if needed, and check the high-limit and thermal fuse while we are in there. If the vent run is longer than the manufacturer recommends, we tell you and write it up.',
      },
    ],
  },
  {
    slug: 'refrigerator-repair',
    title: 'Refrigerator Repair',
    shortName: 'Refrigerator',
    heroAccent: 'Refrigerator',
    subtitle: 'French-door, side-by-side, top and bottom freezer',
    description:
      'A fridge that is running warm can cost you a couple hundred dollars in groceries by tomorrow morning, so we treat it as a same-day call whenever we can.',
    intro:
      'A refrigerator that is running warm needs prompt attention. We diagnose cooling problems, ice maker faults, water leaks, and unusual noises on French-door, side-by-side, and top- or bottom-freezer models. Fan, defrost, air-damper, control, and sealed-system faults require different repairs. Tell us the model number and whether the refrigerator, freezer, or both compartments are affected so we can plan the visit.',
    heroImage: '/images/services/refrigerator-repair.jpg',
    heroImageAlt: 'French-door refrigerator, same-day fridge repair in Connecticut',
    applianceValue: 'Refrigerator',
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
      'Compressor',
      'Start relay and capacitor',
      'Evaporator fan motor',
      'Condenser fan motor',
      'Water inlet valve',
      'Ice maker assembly',
      'Door gasket',
      'Defrost heater',
      'Defrost thermostat / thermistor',
      'Defrost drain tube / clog kit',
      'Main control board / inverter board',
      'Twin-cooling damper assembly',
    ],
    brands: ['Samsung', 'LG', 'Whirlpool', 'GE', 'KitchenAid', 'Sub-Zero', 'Bosch', 'Frigidaire'],
    faqs: [
      ...pricingFaqs,
      {
        q: "My fridge isn't cold but the freezer is fine. Why?",
        a: 'This is one of the most common calls we get, and it is almost always the evaporator fan motor or a stuck defrost cycle. The compressor is still cooling the freezer fine, but cold air is not getting moved into the fridge section. We see it across Samsung, LG, and Whirlpool models. The fix is usually a fan motor or a defrost heater, both of which we carry.',
      },
      {
        q: 'My ice maker stopped working. Is it a big deal?',
        a: 'Usually not. On older fridges it is typically a failed ice maker assembly, a frozen water supply line, or a bad water inlet valve. On modern Samsung French-doors, the ice maker often ices over from a door seal leak or the auger motor wears out. We pull the bucket, check for ice buildup at the back, and swap whatever has failed in one visit.',
      },
      {
        q: 'My fridge is making loud buzzing or clicking sounds. Should I worry?',
        a: 'Clicking usually means the start relay or the compressor is having trouble starting, and it needs attention now. Buzzing is often the evaporator or condenser fan motor going bad. Neither should be left for weeks because both can escalate fast. We get the relay tested and the fan motor swapped or ordered before we leave.',
      },
      {
        q: 'Can well water affect my ice maker?',
        a: 'Water quality and supply pressure can affect ice production, but a repeated failure does not establish the cause. We check the water supply, the model-specific filter requirements, inlet valve, and ice maker before recommending repairs. Most refrigerator filters do not soften water; water-treatment decisions should be based on a water test.',
      },
      {
        q: 'What should I do while waiting for refrigerator repair?',
        a: 'Keep the doors closed as much as possible, record the compartment temperatures if you have an appliance thermometer, and note any error code. Check that the controls were not changed and that food is not blocking internal vents. Move perishable food to reliable cold storage when cooling is inadequate; food safety depends on its temperature and time, not on whether it smells normal.',
      },
    ],
  },
  {
    slug: 'dishwasher-repair',
    title: 'Dishwasher Repair',
    shortName: 'Dishwasher',
    heroAccent: 'Dishwasher',
    subtitle: 'Built-in and portable, every major brand',
    description:
      'Dishes coming out still dirty or water sitting in the bottom at the end of the cycle? Usually a drain pump, a clogged spray arm, or a sensor. Same-day fix when we can.',
    intro:
      'Dishwasher calls in CT usually come down to drainage, water entry, or the wash cycle itself. Water sitting at the bottom is almost always the drain pump, a clogged hose, or a stuck check valve. Dishes coming out dirty is usually clogged spray arms, a worn wash pump, or a failed soap dispenser. Bosch E15 errors and Whirlpool sump leaks are common enough that we know what we are looking at before we open the door. The truck carries pumps, sumps, valves, and door latches for the major brands.',
    heroImage: '/images/services/dishwasher-repair.jpg',
    heroImageAlt: 'Built-in dishwasher, same-day dishwasher repair in Connecticut',
    applianceValue: 'Dishwasher',
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
      'Drain pump',
      'Wash pump / circulation motor',
      'Control board',
      'Door latch assembly',
      'Water inlet valve',
      'Spray arms (upper and lower)',
      'Heating element',
      'Door gasket / tub seal',
      'Detergent dispenser',
      'Sump assembly',
      'Diverter motor (Whirlpool / KitchenAid)',
      'Chopper blade',
    ],
    brands: ['Bosch', 'Whirlpool', 'GE', 'Samsung', 'Miele', 'KitchenAid', 'Frigidaire', 'Maytag'],
    faqs: [
      ...pricingFaqs,
      {
        q: "My dishwasher isn't cleaning. What's wrong?",
        a: 'Most poor-cleaning calls are clogged spray arms or a worn wash pump motor, not detergent. We pull the lower spray arm and look at the holes for food particles and hard-water scale, then check the filter assembly. Sometimes the fix is showing you how to clean the filter yourself every few months. Sometimes it is a new pump.',
      },
      {
        q: 'Standing water at the bottom after a cycle. Is the pump broken?',
        a: 'Probably the drain pump, but not always. It can also be a clogged drain hose, a stuck check valve, or a garbage disposal connection that never had the knockout removed when the dishwasher was installed. We test the pump directly before swapping anything.',
      },
      {
        q: 'Are dishwashers OK on a septic system?',
        a: 'A dishwasher can be used with a properly designed and maintained septic system. Follow the appliance and septic-system instructions for detergent and water use, and ask your septic provider about drainage or capacity concerns. Use only cleaners approved for your dishwasher model; a vinegar cycle is not a general treatment for septic or drain problems.',
      },
      {
        q: 'What can I check before booking dishwasher repair?',
        a: 'Check the control lock, delayed-start setting, and door latch. Follow the model manual to clean a user-removable filter and make sure dishes do not block the spray arms. If it is leaking onto the floor, stop the cycle and arrange service. Do not remove the base panel, bypass a leak sensor, or reach into the pump.',
      },
    ],
  },
  {
    slug: 'oven-range-repair',
    title: 'Oven & Range Repair',
    shortName: 'Oven',
    heroAccent: 'Oven & Range',
    subtitle: 'Gas and electric, ranges and wall ovens',
    description:
      "Oven not getting hot, burners that click but won't light, or a self-clean cycle that won't run? Most oven jobs are a one-visit fix.",
    intro:
      'We diagnose gas and electric ranges, wall ovens, and cooktops with ignition, heating, temperature-control, and door problems. An oven that will not bake can have a different fault from a surface burner that will not light. Share the model number, fuel type, error code, and whether bake, broil, or the cooktop is affected. We explain the diagnosis and provide an on-site quote before repair work begins.',
    heroImage: '/images/services/oven-range-repair.jpg',
    heroImageAlt: 'Freestanding range with oven and cooktop, same-day oven repair in Connecticut',
    applianceValue: 'Oven / Range',
    icon: ovenIcon,
    symptoms: [
      "Oven runs cold or doesn't preheat",
      "Gas burner clicks and clicks but won't light",
      "Electric burner won't heat",
      'Oven takes way too long to preheat',
      'Hot and cold spots when cooking',
      "Self-clean cycle won't start or won't end",
      "Door won't close all the way",
      'Gas odor: leave the building and call your gas utility from outside',
      "Broiler isn't working",
      'Constant clicking even when no burner is on',
      "Control panel won't respond",
      "Oven light won't turn on",
    ],
    parts: [
      'Bake element',
      'Broil element',
      'Igniter assembly (gas)',
      'Oven safety valve (gas, separate from main)',
      'Main gas valve',
      'Temperature sensor / thermistor',
      'Control board',
      'Bake/broil relay board (GE)',
      'Door hinge socket / receiver',
      'Door gasket',
      'Spark module',
      'Convection fan motor',
    ],
    brands: ['GE', 'Whirlpool', 'Samsung', 'LG', 'Bosch', 'KitchenAid', 'Thermador', 'Wolf'],
    faqs: [
      ...pricingFaqs,
      {
        q: "My gas oven won't ignite. Is it dangerous?",
        a: GAS_ODOR_GUIDANCE + ' Without a gas odor, an ignition failure still needs a model-specific diagnosis; avoid repeatedly trying to light it.',
      },
      {
        q: 'My oven heats unevenly. Why?',
        a: 'Sometimes the oven just needs a calibration offset, especially older units that have drifted with age. We test the temperature in three zones with our own probe before deciding anything. If it has drifted by more than 25 degrees, the temperature sensor or the bake element is usually the cause. We can recalibrate on the spot in a lot of cases without replacing parts.',
      },
      {
        q: 'My older GE wall oven has stopped baking but the broiler still works. What is likely?',
        a: 'The bake element, its wiring, a control relay, or another part of the bake circuit may be involved. Working broil does not prove that the control board has failed. We check the model-specific circuit before recommending parts and discuss availability and replacement cost on older appliances.',
      },
      {
        q: 'What can I check before booking oven or stove repair?',
        a: 'Check the control lock, timer settings, and any displayed error code. With the cooktop off and fully cool, follow the manual to confirm each removable burner cap is dry and seated on its correct burner. Caps of different sizes are not interchangeable. Leave gas orifice adjustments, wiring, and internal testing to a qualified technician.',
      },
    ],
  },
  {
    slug: 'more-appliances',
    title: 'More Appliances',
    shortName: 'Appliance',
    heroAccent: 'Specialty Appliances',
    subtitle: 'Freezer, ice maker, cooktop, microwave',
    description:
      "Freezer not freezing? Ice maker quit? Cooktop won't ignite? If it plugs in or runs on gas, there is a good chance we fix it.",
    intro:
      'We also handle standalone freezers, ice makers, cooktops, and microwaves in our Connecticut service communities. These appliances use different systems, and serviceability depends on the brand, model, installation, and available parts. Call with the model number to confirm we can service your appliance before requesting a visit. For a lower-cost countertop microwave, compare the diagnostic and repair costs with replacement.',
    heroImage: '/images/services/more-appliances.jpg',
    heroImageAlt:
      'Specialty kitchen appliances, freezer, ice maker, cooktop, and microwave repair in Connecticut',
    applianceValue: 'Other',
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
      'Freezer compressor',
      'Evaporator coil (freezer)',
      'Ice maker module',
      'Ice maker water valve',
      'Cooktop igniter',
      'Cooktop spark module',
      'Burner switch (cooktop)',
      'Microwave magnetron',
      'Microwave control board',
      'Door switch (microwave)',
      'Glass cooktop surface',
      'Thermostat / thermocouple',
    ],
    brands: ['Whirlpool', 'Samsung', 'LG', 'GE', 'Frigidaire', 'Bosch', 'Sharp', 'Panasonic'],
    faqs: [
      ...pricingFaqs,
      {
        q: 'My garage freezer stops working when it gets really cold out. What is that?',
        a: 'Check the operating temperature range in your exact model manual. Some standalone garage-ready freezers are designed for colder conditions than ordinary refrigerators, so there is no single minimum temperature for every unit. A freezer that warms up may have an installation or component problem. Do not add a heater or garage kit unless the manufacturer approves it for that model.',
      },
      {
        q: 'What should I check before requesting microwave or cooktop service?',
        a: 'Record the model number and check the control lock and the user troubleshooting section of the manual. Stop using a microwave that sparks or has a damaged door. Do not remove its cover; internal components can retain a dangerous charge even when unplugged. For cooktops, tell us whether the appliance is gas, radiant electric, or induction.',
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

/**
 * Walks forward from the current service and wraps around, so every service —
 * `more-appliances` included — picks up inbound links. Slicing from the front
 * instead meant the last services in the list were never linked from anywhere.
 */
export function getRelatedServices(currentSlug: string, count = 3): Service[] {
  const start = services.findIndex((s) => s.slug === currentSlug);
  if (start === -1) return services.slice(0, count);

  return Array.from({ length: Math.min(count, services.length - 1) }, (_, i) => {
    return services[(start + 1 + i) % services.length];
  });
}
