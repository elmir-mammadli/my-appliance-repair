// Municipality names: https://bergencountynj.gov/municipalities/
// ZIPs are initial routing hints, not a guarantee of county/address coverage.
// Dispatch confirms the actual service address before accepting an appointment.
export const BERGEN_MUNICIPALITIES = [
  'Allendale',
  'Alpine',
  'Bergenfield',
  'Bogota',
  'Carlstadt',
  'Cliffside Park',
  'Closter',
  'Cresskill',
  'Demarest',
  'Dumont',
  'East Rutherford',
  'Edgewater',
  'Elmwood Park',
  'Emerson',
  'Englewood',
  'Englewood Cliffs',
  'Fair Lawn',
  'Fairview',
  'Fort Lee',
  'Franklin Lakes',
  'Garfield',
  'Glen Rock',
  'Hackensack',
  'Harrington Park',
  'Hasbrouck Heights',
  'Haworth',
  'Hillsdale',
  'Ho-Ho-Kus',
  'Leonia',
  'Little Ferry',
  'Lodi',
  'Lyndhurst',
  'Mahwah',
  'Maywood',
  'Midland Park',
  'Montvale',
  'Moonachie',
  'New Milford',
  'North Arlington',
  'Northvale',
  'Norwood',
  'Oakland',
  'Old Tappan',
  'Oradell',
  'Palisades Park',
  'Paramus',
  'Park Ridge',
  'Ramsey',
  'Ridgefield',
  'Ridgefield Park',
  'Ridgewood',
  'River Edge',
  'River Vale',
  'Rochelle Park',
  'Rockleigh',
  'Rutherford',
  'Saddle Brook',
  'Saddle River',
  'South Hackensack',
  'Teaneck',
  'Tenafly',
  'Teterboro',
  'Upper Saddle River',
  'Waldwick',
  'Wallington',
  'Washington Township',
  'Westwood',
  'Woodcliff Lake',
  'Wood-Ridge',
  'Wyckoff',
] as const;

export const BERGEN_ZIPS = new Set([
  '07010',
  '07020',
  '07022',
  '07024',
  '07026',
  '07031',
  '07057',
  '07070',
  '07071',
  '07072',
  '07073',
  '07074',
  '07075',
  '07401',
  '07407',
  '07410',
  '07417',
  '07423',
  '07430',
  '07432',
  '07436',
  '07446',
  '07450',
  '07452',
  '07458',
  '07463',
  '07481',
  '07495',
  '07601',
  '07603',
  '07604',
  '07605',
  '07606',
  '07607',
  '07608',
  '07620',
  '07621',
  '07624',
  '07626',
  '07627',
  '07628',
  '07630',
  '07631',
  '07632',
  '07640',
  '07641',
  '07642',
  '07643',
  '07644',
  '07645',
  '07646',
  '07647',
  '07648',
  '07649',
  '07650',
  '07652',
  '07656',
  '07657',
  '07660',
  '07661',
  '07662',
  '07663',
  '07666',
  '07670',
  '07675',
  '07676',
  '07677',
]);

export interface BergenTownFaq {
  q: string;
  a: string;
}

export interface BergenTown {
  slug: string;
  name: string;
  zip: string;
  /** Hero subtitle. One sentence that could only be about this town. */
  tagline: string;
  /** Opening paragraph: the housing stock and what it means for repairs. */
  intro: string;
  /** Second paragraph: the appliance patterns that follow from that housing. */
  homes: string;
  /** What to have ready before the visit, specific to the town's buildings. */
  preparation: string;
  /** Named sections of town, used in copy and metadata so no two pages share a list. */
  neighborhoods: string[];
  /** Town-specific questions. The shared pricing/warranty questions are added by the page. */
  faqs: BergenTownFaq[];
}

// Town facts are public geography and housing patterns, not records of jobs done there.
// Keep claims about our own work to what dispatch can confirm.
export const BERGEN_TOWNS: BergenTown[] = [
  {
    slug: 'hackensack',
    name: 'Hackensack',
    zip: '07601',
    tagline:
      'County-seat high-rises on Prospect Avenue, two-family houses off Main Street, and a new wave of downtown rentals.',
    intro:
      'Hackensack has three kinds of kitchens. The Prospect Avenue towers run on building-supplied appliances that a management office approves repairs for. The two-family and three-family houses on the side streets between Main Street and the river have owner-bought units that have been there a while. And the new rentals going up around the Main Street redevelopment have compact, builder-grade packages still inside their first decade.',
    homes:
      'In the towers, the call is usually a dishwasher or an in-unit washer in a space with no room to pull it out, so we diagnose in place. In the older houses it is more often a basement dryer with a long vent run or a refrigerator past fifteen years. In the new buildings it is control boards and door latches, the parts that fail first on builder-grade units.',
    preparation:
      'For a Prospect Avenue or downtown building, have the unit number, the management office phone number and any certificate-of-insurance or service-elevator rule ready before you book. For a house, tell us whether the appliance belongs to you or to a landlord who needs to approve the quote.',
    neighborhoods: ['Prospect Avenue', 'Main Street', 'Fairmount', 'Anderson Park', 'Hackensack Riverfront'],
    faqs: [
      {
        q: 'My building on Prospect Avenue requires a certificate of insurance. Can you provide one?',
        a: 'Yes. Ask your management office what the certificate needs to name, send that to our NJ team, and we will have it issued before the visit. Most Hackensack buildings also want a service-elevator reservation, which you make and we work around.',
      },
      {
        q: 'I rent the top floor of a two-family house. Who books the repair?',
        a: 'Either of you can contact us, but the person paying approves the written quote. Most Hackensack landlords book and pay, and the tenant lets the technician in. We text both sides the arrival window.',
      },
      {
        q: 'Do you repair the compact appliances in the new Main Street rental buildings?',
        a: 'We do. Those buildings use 24-inch dishwashers, slim refrigerators and ventless stacked laundry. Parts for those are specific to the model, so include the brand and model number from the sticker inside the door when you book.',
      },
    ],
  },
  {
    slug: 'teaneck',
    name: 'Teaneck',
    zip: '07666',
    tagline:
      'A large township of colonials and capes where many kitchens are built for two of everything.',
    intro:
      'Teaneck is one of the biggest towns in the county by population and almost all of it is single-family houses from the 1920s through the 1950s, with a commercial spine along Cedar Lane and Teaneck Road. A large share of households keep kosher kitchens, which from a repair standpoint means two dishwashers, two ovens or a double wall oven, sometimes two sinks with a dishwasher each, and a lot of ovens with a Sabbath mode that has to survive the repair.',
    homes:
      'Two of everything means twice the dishwashers to leak and twice the ovens to lose an igniter, and the second set is often older than the first. Wall ovens in Teaneck houses are frequently built into cabinetry that was cut for the original unit, so a replacement is a bigger job than a repair. That makes it worth fixing the one you have whenever the part exists.',
    preparation:
      'Tell us which appliance of a pair has the problem, where it sits in the kitchen, and whether the oven has a Sabbath or holiday mode you rely on. If you need the visit on a particular weekday because of your schedule, say so when booking and we will confirm what is open.',
    neighborhoods: ['Cedar Lane', 'West Englewood', 'Glenpointe', 'Teaneck Road', 'Votee Park'],
    faqs: [
      {
        q: 'Will a repair affect the Sabbath mode on my oven?',
        a: 'A control board replacement restores the oven to factory settings, so the Sabbath mode will need to be re-enabled afterward. The technician can walk you through it on the model you have. A mechanical repair such as an igniter or a door hinge does not touch the settings.',
      },
      {
        q: 'Can one visit cover both dishwashers in my kitchen?',
        a: 'Yes. Describe both machines and both problems when you book so the technician brings parts for each. One service call fee covers the diagnostic visit; the written quote lists each repair separately so you can approve one or both.',
      },
      {
        q: 'Our double wall oven is built into 1950s cabinetry. Can it be repaired in place?',
        a: 'Usually. Most wall-oven faults, including elements, igniters, thermostats and control boards, are reached from the front or by sliding the unit forward a few inches. We only remove the oven entirely for a rare fault, and we tell you first.',
      },
    ],
  },
  {
    slug: 'fort-lee',
    name: 'Fort Lee',
    zip: '07024',
    tagline:
      'High-rise condos and co-ops over the Palisades, where every repair starts with the front desk.',
    intro:
      'Fort Lee is vertical. The towers along the Palisades and the newer buildings around Hudson Lights hold most of the housing, and almost all of them have a doorman, a service elevator and a rule book for contractors. The garden apartments and the older single-family streets west of Main Street are the rest. Many kitchens are compact and some, especially in buildings with a large Korean community, use appliances that were bought for the space rather than off a big-box floor.',
    homes:
      'In a Fort Lee tower the appliance is often a 24-inch dishwasher, a counter-depth refrigerator and a washer-dryer combo in a closet, all of which have to be repaired where they stand. Water leaks matter more here than anywhere else we go because the unit below yours is someone else’s ceiling, so a dishwasher or washer leak gets a same-day slot whenever we can manage it.',
    preparation:
      'Before you book, ask the front desk or management office what they require from a service company: usually a certificate of insurance naming the building, a service-elevator reservation and a set arrival window. Send those requirements to our NJ team and include the unit number and the brand and model of the appliance.',
    neighborhoods: ['Palisades high-rises', 'Hudson Lights', 'Main Street', 'Palisade Avenue', 'Linwood Park'],
    faqs: [
      {
        q: 'My co-op board needs paperwork before a contractor can enter. What do you provide?',
        a: 'A certificate of insurance naming your building, issued before the visit. If the board also wants a work order or a scheduled window on the service elevator, tell us and we will provide what we can and work around the rest. We cannot start a visit the building has not cleared.',
      },
      {
        q: 'My washer-dryer combo is in a closet with no clearance. Can it be serviced?',
        a: 'Yes. Combo units open from the front and the top, and the technician will pull it forward only as far as the hoses allow. If a fault needs the unit fully out, we tell you before doing it and put everything back where it was.',
      },
      {
        q: 'Can you work on a Korean or European brand my building’s appliance store installed?',
        a: 'Samsung and LG, yes, and we stock common parts for both. Bosch and Miele, yes. For a brand without a U.S. parts distributor we will look, say honestly whether the part can be sourced, and not charge for a repair we cannot complete.',
      },
    ],
  },
  {
    slug: 'fair-lawn',
    name: 'Fair Lawn',
    zip: '07410',
    tagline:
      'Radburn and the postwar neighborhoods around it, with hyphenated house numbers that trip up every GPS.',
    intro:
      'Fair Lawn is a borough of split-levels, capes and colonials, most of them from the 1940s through the 1960s, built around the 1929 planned community of Radburn with its shared greens and houses that face away from the street. Addresses here use hyphenated numbers like 12-34, which is why we ask you to write the address exactly as your mail shows it.',
    homes:
      'Radburn houses were built small and have been extended, so laundry pairs are often in a converted garage or a tight ground-floor closet and dryer vents run farther than they should. Elsewhere in the borough the typical call is a 1990s-era kitchen on its second refrigerator and a split-level laundry room half a flight down from the kitchen, where a washer leak is found late because nobody is standing there when it happens.',
    preparation:
      'Write the full hyphenated house number and the street, and tell us whether the house is in Radburn so the technician knows to look for the walkway entrance rather than a front door on the road. For a leak, note where you first saw water and at what point in the cycle it shows up.',
    neighborhoods: ['Radburn', 'Warren Point', 'River Road', 'Broadway', 'Fair Lawn Avenue'],
    faqs: [
      {
        q: 'Our GPS keeps sending technicians to the wrong house because of the hyphenated number. How do you handle that?',
        a: 'We ask for the address exactly as your mail prints it and our dispatcher confirms it by phone before the visit. Hyphenated Fair Lawn numbers are a known thing for us; the technician calls on approach if there is any doubt.',
      },
      {
        q: 'My washer leaks but only sometimes. What should I tell you?',
        a: 'When it happens in the cycle, where the water appears, and whether it is on the floor in front, beside or behind the machine. Intermittent leaks in Fair Lawn split-levels are often a door boot, a drain hose clamp or an overfill, each of which leaves water in a different place.',
      },
      {
        q: 'The dryer in our converted garage takes two cycles to dry a load. Is that the dryer?',
        a: 'Often it is the vent. Garage and extension laundry rooms in Radburn-era houses tend to have long vent runs with several bends, and a clogged or crushed vent makes a healthy dryer look broken. The technician checks airflow before quoting any part.',
      },
    ],
  },
  {
    slug: 'garfield',
    name: 'Garfield',
    zip: '07026',
    tagline:
      'Dense blocks of two- and three-family houses along the Passaic, with basement laundry rooms and street parking.',
    intro:
      'Garfield is one of the most densely built towns in Bergen County. Most of it is two-family and three-family houses on narrow lots, many with a basement laundry shared by the units or a washer and dryer on each floor. The city was a mill town on the Passaic and its housing is largely pre-1960, so the kitchens have been updated piecemeal and the appliances vary from floor to floor.',
    homes:
      'The pattern here is landlord-owned appliances in occupied units and a shared basement dryer whose vent has not been cleaned in years. Refrigerators in Garfield apartments are often standard top-freezer units that respond well to a relay or a fan motor, and we see gas ranges with igniter faults more than in towns with newer housing.',
    preparation:
      'Include the floor and unit for a multi-family house, and tell us who will approve and pay for the repair if it is not you. Say whether the laundry is in the basement and whether it is shared, and whether the technician needs a key or a tenant to be home for access.',
    neighborhoods: ['Midland Avenue', 'Passaic Street', 'Outwater Lane', 'Lanza Avenue', 'Columbus Avenue'],
    faqs: [
      {
        q: 'I am a tenant in Garfield. Can I book the repair myself?',
        a: 'You can contact us and describe the problem. Before the visit, confirm with your landlord who approves and pays for the work, because the technician gives the written quote to that person. If the landlord books, you only need to be home for access.',
      },
      {
        q: 'The shared dryer in our basement runs but nothing dries. What is likely wrong?',
        a: 'With a shared basement dryer the usual cause is a vent clogged with lint from several households, followed by a failed heating element or thermal fuse. The technician checks the vent and the element on the same visit so you are not paying twice.',
      },
      {
        q: 'Parking on my block is tight. Will that delay the technician?',
        a: 'It has not been a reason to miss a Garfield visit. If your street is permit-only, a spot in the driveway or a visitor pass helps. Otherwise the technician parks where the van fits and walks the tools in.',
      },
    ],
  },
  {
    slug: 'englewood',
    name: 'Englewood',
    zip: '07631',
    tagline:
      'Big East Hill kitchens with pro-grade appliances, and a downtown of apartments above Palisade Avenue storefronts.',
    intro:
      'Englewood splits sharply by hill. The East Hill side has large houses on big lots with kitchens that were designed around Sub-Zero, Wolf, Thermador and Viking, often with a second refrigerator or a wine column. Downtown along Palisade Avenue and the neighborhoods west of it are apartments, condos and smaller houses with ordinary appliances. We take both, and we are clear about which premium repairs we handle and which belong with the manufacturer.',
    homes:
      'On East Hill the common call is a built-in refrigerator that is warming on one side, a pro range with a burner that will not light, or a paneled dishwasher that has started leaking under custom cabinetry. In the apartments it is the usual mix of dishwashers, top-freezer refrigerators and stacked laundry, with building access rules that are lighter than Fort Lee’s but still exist.',
    preparation:
      'For a premium built-in, send the brand, model and serial number before the visit so the right parts can be checked for availability. Tell us about panel fronts, trim kits and any cabinetry that would have to move. For an apartment, include the unit number and the building’s requirements for service visits.',
    neighborhoods: ['East Hill', 'Palisade Avenue', 'Fourth Ward', 'West Englewood border', 'Mackay Park'],
    faqs: [
      {
        q: 'Do you repair Sub-Zero, Wolf and Thermador appliances in Englewood?',
        a: 'Yes for most faults: fans, defrost systems, control boards, igniters, door gaskets and similar. A sealed-system refrigeration repair on a Sub-Zero is a different kind of job, and we will tell you at the diagnostic whether it is one we take or one the manufacturer’s own program should handle.',
      },
      {
        q: 'My dishwasher has a custom cabinet panel on the front. Will the repair damage it?',
        a: 'The panel comes off with the door as a unit and goes back on the same way. We do not cut, drill or refinish cabinetry. If a repair would require a cabinet change, we stop and tell you first.',
      },
      {
        q: 'Can you service an apartment above a Palisade Avenue store?',
        a: 'Yes. Tell us how the technician reaches the unit, whether the entrance is on the avenue or around the back, and whether parking needs to be in a lot. Downtown Englewood visits are routine for our NJ team.',
      },
    ],
  },
  {
    slug: 'bergenfield',
    name: 'Bergenfield',
    zip: '07621',
    tagline:
      'Compact capes and split-levels on small lots, with kitchens that were updated once in the 1990s and are due again.',
    intro:
      'Bergenfield is mostly single-family houses from the 1940s through the 1960s on narrow lots along a street grid between Washington Avenue and the Teaneck and Dumont lines. The kitchens are modest and were commonly redone once in the 1990s, so a lot of refrigerators, ranges and dishwashers are twenty-plus years old and still in service. Laundry is usually in the basement.',
    homes:
      'The appliances here are the mid-range units that are cheapest to keep going: a top-freezer refrigerator that needs a defrost thermostat, a dishwasher with a worn pump, a gas range with a weak igniter. The question we hear most in Bergenfield is whether a twenty-year-old appliance is worth a repair, and the honest answer is usually yes for a single failed part and no for a second major fault.',
    preparation:
      'Note any error code before resetting the appliance and whether the problem happens every cycle or only sometimes. Tell us the brand and approximate age; a model number from the sticker inside the door is better. Say if the laundry is in the basement and whether the stairs are tight.',
    neighborhoods: ['Washington Avenue', 'Cooper’s Pond', 'South Bergenfield', 'North Bergenfield', 'Prospect Avenue'],
    faqs: [
      {
        q: 'My refrigerator is from 2002. Should I even call?',
        a: 'Call. A single failed part such as a start relay, a defrost thermostat or a fan motor on a refrigerator that age is a cheap repair. The technician gives you a written quote at the diagnostic so you can compare it against a replacement before you decide.',
      },
      {
        q: 'Should I reset the appliance before I book?',
        a: 'Write down the error code and the symptom first, then follow the reset in your manual once. If it comes back, do not keep restarting it; send us the code and what you tried. Repeated resets can hide the fault the technician needs to see.',
      },
      {
        q: 'The dryer in our basement is on a long vent run. Is that why it stopped heating?',
        a: 'Often. Bergenfield basements vent across the house to an outside wall, and a lint-packed run makes the dryer overheat and trip its thermal fuse. The technician checks the vent and the fuse together; replacing the fuse without clearing the vent just repeats the failure.',
      },
    ],
  },
  {
    slug: 'paramus',
    name: 'Paramus',
    zip: '07652',
    tagline:
      'Large postwar lots, big new-build kitchens, and the one county town where you cannot buy a replacement on a Sunday.',
    intro:
      'Paramus is known for its malls, but the residential side is ranches, split-levels and increasingly large new-build colonials on generous lots between Route 4 and Route 17. The newer houses have full-size premium kitchens and second refrigerators in the garage. The town’s blue laws close retail on Sundays, which is why a Sunday appliance failure in Paramus is a repair call rather than a trip to the store.',
    homes:
      'Garage refrigerators are a Paramus specialty: a second fridge or chest freezer in an unheated garage that struggles in winter and dies in summer. In the new-build kitchens the calls are French-door refrigerators with ice-maker faults and front-load washers in second-floor laundry rooms, where a leak means a ceiling below.',
    preparation:
      'If more than one appliance needs attention, list each one with its brand and symptom and tell us which is urgent. For a garage refrigerator or freezer, say so; the technician brings the parts that typically fail in unheated spaces. For a second-floor laundry room, mention any sign of water below.',
    neighborhoods: ['Paramus Park area', 'Midland Avenue', 'Farview Avenue', 'Spring Valley Road', 'Arcola'],
    faqs: [
      {
        q: 'Everything is closed on Sunday in Paramus. Can I still get a repair?',
        a: 'Yes. Our NJ team takes Sunday requests and schedules by technician availability. The blue laws close stores, not service calls, so a Sunday breakdown is often fixed before Monday morning when you would otherwise be shopping for a replacement.',
      },
      {
        q: 'My garage refrigerator stopped cooling when it got hot. Is it worth repairing?',
        a: 'Usually. Garage units fail from overheated compressors, dirty condensers and relays more than anything else, and those are routine repairs. If the compressor itself is gone, we tell you, because that repair rarely makes sense on a second refrigerator.',
      },
      {
        q: 'Is $99 the total repair price in Paramus?',
        a: 'No. $99 is the service call fee that covers the diagnostic visit. Repair pricing depends on the diagnosis, parts and labor, and your technician gives you a written quote before any work. The service call fee is waived when you go ahead with the repair.',
      },
    ],
  },
  {
    slug: 'ridgewood',
    name: 'Ridgewood',
    zip: '07450',
    tagline:
      'Victorian and Tudor houses around a village downtown, with kitchens that were renovated to match the architecture.',
    intro:
      'Ridgewood is a village of large older houses, Victorians near the train station, Tudors and center-hall colonials up in the Heights and Upper Ridgewood, with a walkable downtown along East Ridgewood Avenue where parking is enforced. The kitchens tend to be high-end renovations fitted into century-old rooms, so premium appliances sit in spaces with old floors, old plumbing and cabinetry built around the exact unit.',
    homes:
      'That combination produces specific calls: a built-in refrigerator that has to be serviced in place because the cabinet opening is exact, a stacked laundry pair in a second-floor closet of a Victorian, a gas range on a line that was run decades ago. We bring the trim clips and floor protection those kitchens need and we tell you before anything heavy moves.',
    preparation:
      'Tell us where the appliance is, especially if the laundry is upstairs or the kitchen is reached through a narrow hall. For a stacked pair, include both model numbers if the labels are reachable safely. For a premium built-in, send the brand, model and serial so parts can be checked before the visit.',
    neighborhoods: ['Ridgewood Village', 'The Heights', 'Upper Ridgewood', 'Lower Ridgewood', 'Ho-Ho-Kus border'],
    faqs: [
      {
        q: 'Can you service a stacked washer and dryer on the second floor of an older house?',
        a: 'Yes. Stacked pairs are serviced from the front and the dryer can be lifted off the washer if the fault requires it. We protect the floor and the stairway, and we note in advance if a repair would need both units out of the closet.',
      },
      {
        q: 'Our built-in refrigerator fits its cabinet exactly. Can it be repaired without removing it?',
        a: 'Almost always. Built-in refrigerators are designed to be serviced from the front and top, and most faults, including fans, controls and defrost parts, are reached that way. If a repair needed the unit out, we would tell you first rather than start pulling.',
      },
      {
        q: 'Downtown Ridgewood parking is strict. Does that affect a visit near the station?',
        a: 'No. The technician parks in a legal spot or your driveway and brings the tools in. Visits to the Victorian streets near the train station are routine; tell us if the house is on a one-way street or has no driveway.',
      },
    ],
  },
  {
    slug: 'lodi',
    name: 'Lodi',
    zip: '07644',
    tagline:
      'Small ranches and two-family houses between Route 46 and the Saddle River, where basement appliances have seen high water.',
    intro:
      'Lodi is a compact borough of small single-family ranches and two-family houses on tight lots, with Main Street and Route 46 as its commercial edges and the Saddle River along the west side. The river has flooded the low streets more than once, so basement appliances in parts of Lodi have been through water, and a lot of laundry has moved up a floor as a result.',
    homes:
      'That history shows up in the calls: dryers and washers that were replaced after a flood and are now a decade old, furnace-room refrigerators with corroded relays, and gas ranges in kitchens that were renovated quickly. In the two-family houses the appliances are often landlord-owned with a tenant in residence, so we confirm who approves the quote before the visit.',
    preparation:
      'For a cooking appliance, say whether it is gas or electric and whether the problem is the oven, one burner or the controls. Include the brand and any display code. If the appliance is in a basement that has flooded, tell us; the technician will look for water damage before quoting a part.',
    neighborhoods: ['Main Street', 'Route 46 corridor', 'Saddle River side', 'Garibaldi Avenue', 'Memorial Park'],
    faqs: [
      {
        q: 'Our basement flooded two years ago and the dryer has acted up since. Is that related?',
        a: 'It can be. Water reaches the motor, the controls and the vent before anything else, and corrosion shows up months later. The technician checks for water damage first, because a corroded control board is quoted differently from a worn belt and you should know which it is before paying.',
      },
      {
        q: 'What should I include for an oven repair request in Lodi?',
        a: 'Fuel type, brand, and whether the oven fails to heat, heats unevenly or shows an error, plus whether the burners still work. That tells the technician whether to bring an igniter, an element or a control part, which is the difference between one visit and two.',
      },
      {
        q: 'I rent the first floor of a two-family house. Can you still come?',
        a: 'Yes. Contact us with the problem, then confirm with your landlord who approves and pays, because the written quote goes to that person. If the landlord books, you just need to be home or arrange a key.',
      },
    ],
  },
];
