export interface CityFaq {
  q: string;
  a: string;
}

export interface City {
  slug: string;
  name: string;
  county: string;
  region: string;
  intro: string;
  faqs: CityFaq[];
}

export const cities: City[] = [
  {
    slug: 'new-haven',
    name: 'New Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "New Haven's a tough town for appliances. Half the housing stock in East Rock and Wooster Square is triple-deckers built before World War II, which means original wiring, tight stairwells, and dryers vented straight out a window that was never meant for one. We run calls from Fair Haven to Westville every week, and street parking near Yale is its own adventure for the van.",
    faqs: [
      {
        q: "Can you get a repair truck down these narrow streets near Yale?",
        a: "Yeah, our vans are built for tight city driving and we deal with metered parking near campus all the time. Worst case our tech circles the block once. It's never held up a repair yet.",
      },
      {
        q: "My fridge is in a third-floor walkup in Fair Haven, is that a problem?",
        a: "Not really. Most of what breaks on a fridge, the compressor, the ice maker, the seals, gets fixed right where it sits. We only need to move the unit itself for something rare, and we bring the right dolly for stairs.",
      },
      {
        q: "Do you work on older gas ranges in the Victorian homes around Wooster Square?",
        a: "All the time. Old gas ranges in that part of town usually just need a new igniter or a cleaned out burner orifice. The stove itself often outlasts three owners if you keep up with small fixes like that.",
      },
      {
        q: "How fast can someone get to my apartment near downtown?",
        a: "Same day in most cases if you call before noon. Downtown and East Rock are close to where our techs already run jobs most mornings, so it's usually one of our shorter drives of the day.",
      },
    ],
  },
  {
    slug: 'hamden',
    name: 'Hamden',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Hamden's a mixed bag. You've got tight ranch homes off Whitney Avenue, bigger colonials up near Sleeping Giant, and a pile of rental units around Quinnipiac that turn over every August. We've fixed washers in all of them, and the state park traffic on weekends is the only thing that ever slows us down getting to Mount Carmel.",
    faqs: [
      {
        q: "Do you fix appliances in the student rentals near Quinnipiac?",
        a: "We do a lot of these. Landlords usually want the cheapest fix that holds until the lease turns over, and we're upfront about which repairs make sense for a rental versus a house you're staying in for years.",
      },
      {
        q: "I'm in Spring Glen and my dryer smells like it's burning. Is that urgent?",
        a: "Yes, call us right away. A burning smell from a dryer is almost always lint built up near the heating element and it's a real fire risk. We can usually get someone out same day for anything that smells like that.",
      },
      {
        q: "Does Sleeping Giant traffic ever delay you getting to Mount Carmel?",
        a: "On a nice weekend, maybe by twenty minutes if the park is packed. We build a little extra time into those appointments so it doesn't throw off your whole afternoon.",
      },
      {
        q: "What's the most common appliance issue you see in Hamden?",
        a: "Washing machines that won't spin, honestly. A lot of the older homes have washers on uneven basement floors, and once the machine's out of level it throws the bearing off fast.",
      },
    ],
  },
  {
    slug: 'west-haven',
    name: 'West Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Living a few blocks from the Sound in West Haven is great until you notice what salt air does to outdoor dryer vents and exposed metal parts. We see it constantly around Savin Rock and Allingtown, corrosion that an inland town barely has to think about. It's 06516 pretty much the whole way through, and beach traffic in summer is the only thing that slows us down.",
    faqs: [
      {
        q: "Does living near the beach actually damage appliances?",
        a: "It does, more than people expect. Salt air eats through dryer vent covers and outdoor unit housings faster than you'd think. If your dryer vent is within a mile of the water, I'd check it every season instead of once a year.",
      },
      {
        q: "Can you still get to Savin Rock during the summer beach traffic?",
        a: "Yes, we just plan around it. Our techs know to avoid Beach Street around peak afternoon hours in July and August, so it barely adds any time to the appointment.",
      },
      {
        q: "My washer is in a small beach cottage basement, is that a problem for repairs?",
        a: "Not usually. A lot of those cottages have tighter basements than a standard house, but our techs carry compact tools built for exactly that kind of space.",
      },
      {
        q: "Do you work on older units in the Allingtown apartment buildings?",
        a: "We do, regularly. Property managers over there call us because we're fast and we don't nickel and dime them on the estimate.",
      },
    ],
  },
  {
    slug: 'east-haven',
    name: 'East Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "East Haven's small enough that our techs know most of the streets in Momauguin and Foxon without the GPS. It's a lot of older ranch homes and beach cottages near Short Beach, plus the noise from Tweed airport that everybody stops hearing after a while. One zip code, 06512, covers the whole town.",
    faqs: [
      {
        q: "Do you service the older cottages out by Short Beach?",
        a: "Yes, we're out there often. A lot of those homes were built as summer places and later converted to year round, so the appliance hookups aren't always up to modern code. We work around what's there.",
      },
      {
        q: "Does the noise from Tweed airport ever get in the way of a repair?",
        a: "Not for the work itself. Our techs just talk a little louder near Foxon when a plane's coming in. It's more funny than anything.",
      },
      {
        q: "My oven in Momauguin won't hold temperature, what usually causes that?",
        a: "Nine times out of ten it's a failing temperature sensor or a bad igniter on gas models. Both are quick fixes and parts are cheap, usually under fifty bucks.",
      },
      {
        q: "Are you familiar with the older electrical panels in East Haven's ranch homes?",
        a: "Very. A lot of those homes still have their original panels from the sixties, so we always check the breaker before assuming the appliance itself is the problem.",
      },
    ],
  },
  {
    slug: 'north-haven',
    name: 'North Haven',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "North Haven's got two different personalities depending which side of the Quinnipiac you're on. The Broadway and Route 5 side is all newer construction and shopping plazas, while the older side near the river still has farmhouses with appliances that have been running since the Reagan administration. We cover 06473 top to bottom.",
    faqs: [
      {
        q: "Do you fix appliances in the newer subdivisions off Route 5?",
        a: "All the time, and honestly those calls tend to be quick. Newer homes usually have modern appliances, so it's more often a simple part swap than a real diagnosis.",
      },
      {
        q: "What about the older farmhouses near the Quinnipiac River?",
        a: "Those are a different story, and I mean that in a good way. A lot of those old appliances were built to last and just need a belt or a new switch to keep going another decade.",
      },
      {
        q: "Is there a difference in cost for older versus newer homes?",
        a: "Not really for labor. Parts can run a little more for older models since we sometimes special order them, but we'll tell you that cost upfront before starting anything.",
      },
      {
        q: "How quickly can you get to the Route 5 business corridor?",
        a: "Same day almost always. It's a central spot for us and easy to reach from wherever our other North Haven jobs are that morning.",
      },
    ],
  },
  {
    slug: 'woodbridge',
    name: 'Woodbridge',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Woodbridge is quiet and wooded, big lots, longer driveways, and a lot of homes on well water instead of city lines. That well water changes how appliances age here, especially dishwashers and washing machines, way more than people in New Haven ten minutes away ever have to think about.",
    faqs: [
      {
        q: "Does well water really affect my dishwasher that much?",
        a: "Yes, hard well water builds up mineral scale on heating elements and spray arms faster than city water does. If your dishwasher in Woodbridge isn't cleaning like it used to, that's usually the first thing we check.",
      },
      {
        q: "My driveway is pretty long, will that be an issue for a service call?",
        a: "Not at all. A lot of Woodbridge homes have long driveways and our techs are used to it. Just let us know if there's anything unusual like a gate code when you book.",
      },
      {
        q: "Do you recommend a water softener to protect appliances out here?",
        a: "For a lot of these older wells, yeah. It's not our product to sell, but if we see scale buildup that's clearly shortening your appliance's life, we'll say so honestly.",
      },
      {
        q: "How far out do you typically book in a low-density town like this?",
        a: "Usually same week, often same day if you call in the morning. Woodbridge isn't as dense as some towns, but it's not out of our normal route.",
      },
    ],
  },
  {
    slug: 'orange',
    name: 'Orange',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Orange runs along the Boston Post Road with plazas and offices on one side and quiet family neighborhoods on the other, up past the fairgrounds toward High Plains. It's one of the more even mixes we service, newer builds next to homes that have been in the same family for decades.",
    faqs: [
      {
        q: "Do you service both the commercial strip and residential areas?",
        a: "Mostly residential, homes and rentals, though we've helped a few property managers near the Post Road plazas with break room appliances too.",
      },
      {
        q: "What's the most common repair you see in the newer High Plains developments?",
        a: "Dishwasher racks and spray arms, mostly. A lot of the builder-grade dishwashers in newer construction are fine machines but the plastic components wear faster than you'd expect.",
      },
      {
        q: "Is there a wait time difference during Fair Grounds events?",
        a: "A little, if there's a big event pulling traffic onto the Post Road. We just build extra travel time into those appointments so it doesn't affect your window.",
      },
      {
        q: "Do older Orange homes near town center have different wiring issues?",
        a: "Sometimes. A handful of the older colonials still have original wiring that wasn't built for today's appliance loads, so we always check the breaker box first if something keeps tripping.",
      },
    ],
  },
  {
    slug: 'bethany',
    name: 'Bethany',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Bethany's the most rural town we cover, mostly farms and wooded lots with no real downtown to speak of. Almost every house out here is on well water and septic, and that combination shows up in appliance wear in ways a shoreline town never sees.",
    faqs: [
      {
        q: "Do you actually come all the way out to Bethany?",
        a: "We do, regularly. It's a smaller call volume than New Haven but we've got customers out here we've worked with for years, so it's a normal stop on our route.",
      },
      {
        q: "Does well water cause the same mineral buildup here as other towns?",
        a: "Usually more, honestly. Bethany wells tend to run harder than what we see closer to the shoreline, so washing machines and dishwashers scale up faster if nobody's treating the water.",
      },
      {
        q: "My house is pretty far off the main road, is that an issue?",
        a: "Not for us. Just give us clear directions or a pin drop when you book, since GPS can be spotty out in the more wooded parts of town.",
      },
      {
        q: "Is there a longer wait to get service out here compared to New Haven?",
        a: "Sometimes a day longer if our schedule that week is packed with closer jobs, but we don't push Bethany calls to the back of the line. Most weeks it's still same day.",
      },
    ],
  },
  {
    slug: 'branford',
    name: 'Branford',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Branford's shoreline character is obvious the second you cross into Stony Creek or Short Beach, older cottages packed close together, salt air, and a lot of appliances that have seen more humidity than a normal inland kitchen ever will. Indian Neck's a similar story, older homes with appliance closets that were never built with modern units in mind.",
    faqs: [
      {
        q: "Do the Thimble Island ferries or summer crowds slow your response time?",
        a: "A bit in July and August around Stony Creek dock, but we know to route around it. It rarely adds more than fifteen or twenty minutes.",
      },
      {
        q: "Does salt air near Short Beach shorten appliance life?",
        a: "It does, especially on outdoor dryer vents and any appliance near a door that stays open a lot in summer. We see corrosion issues here more than most of our other towns.",
      },
      {
        q: "My appliance closet in Indian Neck is really tight, will that be a problem?",
        a: "Usually fine. A lot of those older shoreline homes have snug appliance closets and our techs are used to working in tight spots without pulling the whole unit out.",
      },
      {
        q: "Do you handle seasonal cottages that are only occupied part of the year?",
        a: "Yes, and that's actually a common call, an appliance that sat unused all winter and needs a once-over before the family comes back for summer.",
      },
    ],
  },
  {
    slug: 'milford',
    name: 'Milford',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Milford's got more coastline than almost any town we cover, from Woodmont down to Walnut Beach and Devon, so we see the same story a lot: an appliance that's ten years old but looks twenty because of the salt air. Add in the beach cottages that got converted to year-round homes and the hookups aren't always standard.",
    faqs: [
      {
        q: "Do beach cottages converted to year-round homes cause repair issues?",
        a: "Sometimes, yeah. A lot of those Walnut Beach and Woodmont cottages have appliance hookups that were added later and aren't quite up to modern spec. We just work with what's actually there.",
      },
      {
        q: "Does the salt air in Milford affect washers and dryers the way it does elsewhere on the shoreline?",
        a: "Pretty similarly. Anything near the water corrodes faster, especially exposed metal on the back of a washer or a dryer's outdoor vent cap.",
      },
      {
        q: "How's parking and access for a service call near Devon?",
        a: "Usually easy, most of that area has driveways rather than street parking, so it's one of our simpler stops to get in and out of.",
      },
      {
        q: "What's the most common summer season call you get in Milford?",
        a: "Refrigerators and ice makers, by a wide margin. More people home for the summer means the fridge just works harder, and it shows.",
      },
    ],
  },
  {
    slug: 'shelton',
    name: 'Shelton',
    county: 'Fairfield County',
    region: 'Greater New Haven',
    intro:
      "Shelton's grown a lot in the last twenty years, newer condos and office parks along Constitution Boulevard next to older neighborhoods like Huntington and White Hills that have been there since before there was a bridge over the Housatonic in that spot. We fix appliances on both sides of that divide pretty much every week.",
    faqs: [
      {
        q: "Do you service the newer condo developments near Constitution Boulevard?",
        a: "Yes, often. Condo appliances tend to be builder-grade units, so parts are usually easy to source and repairs go quick.",
      },
      {
        q: "What about the older homes in Huntington and White Hills?",
        a: "Those calls take a little more diagnosing since the appliances vary more, but we've got techs who've worked that part of town for years and know what tends to fail first.",
      },
      {
        q: "Is access difficult for the hilly streets near White Hills?",
        a: "Not really, our vans handle hills fine. The only time it slows us down is a heavy snow day, same as anywhere else.",
      },
      {
        q: "Do you work with property managers on the newer Shelton developments?",
        a: "We do, and it's one of the more common relationships we have in town. Fast turnaround matters a lot when a unit's occupied and the tenant's without a fridge.",
      },
    ],
  },
  {
    slug: 'derby',
    name: 'Derby',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Derby's the smallest city in Connecticut, and it feels like it, tight streets, older homes packed close where the Naugatuck meets the Housatonic. Parking's tighter than almost anywhere else we cover, but our techs know the shortcuts by now.",
    faqs: [
      {
        q: "Is parking really that tight for a service van in Derby?",
        a: "It can be, especially on the older streets downtown. Our techs know to grab a spot early rather than circle, and it hasn't caused a missed appointment yet.",
      },
      {
        q: "Do the older homes here have appliance hookups that cause problems?",
        a: "Sometimes. A fair number of Derby's houses are older two-families with hookups that were added or modified over the years, so we always double check the actual setup before quoting a repair.",
      },
      {
        q: "What's the most common issue you see on Derby's older refrigerators?",
        a: "Compressor and condenser fan problems, mostly. A lot of these units are older models that were built solid, so it's often cheaper to fix than replace.",
      },
      {
        q: "How fast can you get across town given how small Derby is?",
        a: "Pretty fast. It's one of our quicker towns to fully cover since nothing's more than a few minutes from anything else.",
      },
    ],
  },
  {
    slug: 'ansonia',
    name: 'Ansonia',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Ansonia's an old mill town up the Naugatuck Valley, hillside streets and older multi-family homes that go back to when the factories were still running full shifts. A lot of the electrical panels haven't been touched since then either, so appliance calls here often start with a look at the breaker box.",
    faqs: [
      {
        q: "Are the older electrical panels in Ansonia a common issue?",
        a: "Yes, more here than in most towns we cover. If an appliance keeps tripping a breaker, sometimes it's the panel itself that's overdue for an upgrade, which we'll tell you honestly even though that's not our repair to do.",
      },
      {
        q: "Do you fix appliances in the older multi-family homes near downtown?",
        a: "All the time. A lot of those buildings have shared basements with washers and dryers that get heavy use, so we see a lot of worn belts and bearings.",
      },
      {
        q: "Are the hillside streets a problem for getting a van in?",
        a: "Not usually, though a heavy ice storm can slow things down same as anywhere in the valley. Our techs know which streets get tricky first.",
      },
      {
        q: "What does a typical repair cost look like for an older Ansonia home?",
        a: "Usually in the same range as anywhere else, $120 to $400 depending on the part. Age of the home doesn't change pricing, just sometimes the diagnosis takes an extra few minutes.",
      },
    ],
  },
  {
    slug: 'naugatuck',
    name: 'Naugatuck',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Naugatuck's still got that old borough feel, steep hills, older homes built for the rubber factory workers, and a downtown that hasn't changed shape much in decades. We've fixed appliances in basements you practically need to duck to get into all over this town.",
    faqs: [
      {
        q: "Do the steep driveways and hills in Naugatuck cause access problems?",
        a: "Not really for us, though winter ice on some of those hillside driveways can slow a visit down. We just ask you clear a path if there's been recent snow.",
      },
      {
        q: "Are the basements in Naugatuck's older homes hard to work in?",
        a: "Some are pretty low ceilinged, yeah, especially in the older borough homes. Our techs are used to it and bring the right tools for tighter spaces.",
      },
      {
        q: "What's the most common washer issue you see in this area?",
        a: "Worn out suspension springs and bad bearings, mostly from age. A lot of these machines have been running in the same basement for fifteen, twenty years.",
      },
      {
        q: "Do you offer evening appointments for people who work in Waterbury?",
        a: "Yes, we know a lot of Naugatuck folks commute out of town for work, so evening slots are one of our more popular options here.",
      },
    ],
  },
  {
    slug: 'cheshire',
    name: 'Cheshire',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Cheshire's a pretty even family suburb, newer developments mixed with older colonials, and it's usually one of our more straightforward towns to service. Most of the calls here are standard stuff, nothing too unusual about the housing that changes how we approach a repair.",
    faqs: [
      {
        q: "Is Cheshire generally an easy town for you to service?",
        a: "Yes, honestly. Most homes here have modern hookups and easy access, so appointments tend to move quick and predictable.",
      },
      {
        q: "What's the most common appliance call in the newer Cheshire developments?",
        a: "Dishwashers not draining properly. It's usually a clogged filter or a kinked drain hose, both quick fixes.",
      },
      {
        q: "Do you see many older appliances still running in Cheshire?",
        a: "Some, especially in the older colonials near town center. Those tend to be sturdier builds and often just need a part instead of a full replacement.",
      },
      {
        q: "How quickly can I get an appointment in Cheshire?",
        a: "Usually same day if you call in the morning. It's a central spot for us between our other New Haven County stops.",
      },
    ],
  },
  {
    slug: 'meriden',
    name: 'Meriden',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Meriden earned the nickname Silver City back when the factories here were turning out silverware, and you can still see that history in the older triple-deckers around Hanover and the East Side. Newer subdivisions fill out the rest of town, so we're fixing appliances in everything from hundred-year-old multi-families to five-year-old builds in the same week.",
    faqs: [
      {
        q: "Do you fix appliances in the older triple-deckers near Hanover?",
        a: "Regularly. Those buildings usually have shared basement laundry that gets heavy use across a few units, so we see a lot of wear on washers and dryers there.",
      },
      {
        q: "Is Meriden's location off 91 and Route 15 convenient for a fast response?",
        a: "Yes, it's actually one of the more central towns we cover, so same-day service is common here even on short notice.",
      },
      {
        q: "What's a typical issue in the newer East Side developments?",
        a: "Ice maker and water line problems, mostly. Newer fridges have more electronics in them than the old ones did, so there's a bit more to troubleshoot.",
      },
      {
        q: "Do you service both renters and homeowners in Meriden?",
        a: "Both, and pretty evenly. We work with a handful of landlords in town who call us directly when a tenant's appliance goes down.",
      },
    ],
  },
  {
    slug: 'wallingford',
    name: 'Wallingford',
    county: 'New Haven County',
    region: 'Greater New Haven',
    intro:
      "Wallingford sits right between Meriden and New Haven, and it's got a similar mix, older homes near the center of town and newer construction out toward Community Lake and Yalesville. We're out here often enough that a few of our regulars just text us directly when something breaks.",
    faqs: [
      {
        q: "Do you cover the Yalesville side of town as much as the center?",
        a: "Yes, both sides get about the same amount of our attention. Yalesville's grown a lot and we've got plenty of regular customers out there now.",
      },
      {
        q: "What's the most common dryer problem you see in Wallingford?",
        a: "Long dry times, almost always from a clogged vent. A lot of these older homes have longer vent runs than newer construction, so lint builds up faster.",
      },
      {
        q: "Are appointments near Community Lake harder to schedule?",
        a: "Not at all, it's a normal stop for us. Same booking process and same-day availability as the rest of town.",
      },
      {
        q: "Do you offer the same 90-day warranty here as in New Haven?",
        a: "Yes, every repair anywhere in our service area gets the same 90-day parts and labor warranty. Doesn't matter which town you're in.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((c) => c.region === region);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
