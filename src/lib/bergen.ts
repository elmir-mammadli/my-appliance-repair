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

export interface BergenTown {
  slug: string;
  name: string;
  zip: string;
  intro: string;
  preparation: string;
  question: string;
  answer: string;
}

// Editorial starting set, not a search-volume ranking. No local jobs or reviews are implied.
export const BERGEN_TOWNS: BergenTown[] = [
  {
    slug: 'hackensack',
    name: 'Hackensack',
    zip: '07601',
    intro:
      'A refrigerator warming up, a dishwasher holding water, or laundry that stops mid-cycle can interrupt the whole day. Tell our Bergen County team what has changed, and we will help arrange an in-home diagnostic visit in Hackensack.',
    preparation:
      'For an apartment or managed building, include the unit number, entry instructions, and any building requirements for a service visit. Let us know whether the appliance belongs to you or needs a property manager’s approval.',
    question: 'What should I include when booking an apartment repair in Hackensack?',
    answer:
      'Share the appliance type, brand, unit number, and the problem you are seeing. If building access or owner approval is required, tell us when requesting the visit so we can confirm the arrangements before arrival.',
  },
  {
    slug: 'teaneck',
    name: 'Teaneck',
    zip: '07666',
    intro:
      'When your washer will not drain or your dryer leaves a load damp, start with the symptoms rather than guessing at replacement parts. Our Bergen County team takes repair requests for Teaneck kitchens and laundry rooms.',
    preparation:
      'For a laundry repair, note whether the machine stops while filling, washing, draining, or spinning. Include whether the dryer is gas or electric and whether the machines are stacked.',
    question: 'Can I request a washer and dryer visit together in Teaneck?',
    answer:
      'Yes. Describe both machines and both issues in your request. Call our NJ number to confirm the diagnostic charges and appointment time for multiple appliances before the visit.',
  },
  {
    slug: 'fort-lee',
    name: 'Fort Lee',
    zip: '07024',
    intro:
      'Book an appliance diagnostic for your Fort Lee home with our Bergen County team. From a refrigerator that cannot hold temperature to a range that will not heat, the repair recommendation follows an on-site inspection.',
    preparation:
      'If your building requires a certificate of insurance, a service-elevator reservation, or a specific arrival window, contact us before booking. Those details help us confirm whether the requested visit can go ahead.',
    question: 'How do I arrange a visit to a Fort Lee condo?',
    answer:
      'Give us your unit number and the building’s access requirements. Ask the building manager about service visits first, then share any paperwork or elevator requirements with our team for confirmation.',
  },
  {
    slug: 'fair-lawn',
    name: 'Fair Lawn',
    zip: '07410',
    intro:
      'A leak, an error code, or an unusual noise is a useful starting point for your repair request. We help Fair Lawn homeowners arrange appliance diagnosis with a clear quote before any repair work begins.',
    preparation:
      'Write the full service address exactly as it appears on your mail, including any hyphenated house number. For a leak, describe where you first noticed water and when it appears during the cycle.',
    question: 'What information helps with a leaking dishwasher in Fair Lawn?',
    answer:
      'Tell us whether water appears at the door, under the machine, or near the sink, and whether it happens while filling or draining. Stop using the appliance if it continues to leak and request a diagnostic visit.',
  },
  {
    slug: 'garfield',
    name: 'Garfield',
    zip: '07026',
    intro:
      'Keep your repair request straightforward: the appliance, the symptom, and when it started. Our NJ team handles Garfield appliance inquiries and confirms the service address and appointment availability with you.',
    preparation:
      'For a rental or a home with more than one unit, include the floor and unit number. If someone else authorizes the repair, arrange their approval before work is scheduled.',
    question: 'Can a tenant request an appliance repair in Garfield?',
    answer:
      'You can contact us about the problem. Confirm with the owner or property manager who will authorize and pay for the work, and share the access instructions when arranging the appointment.',
  },
  {
    slug: 'englewood',
    name: 'Englewood',
    zip: '07631',
    intro:
      'An appliance that still runs may need attention if it no longer cools, cleans, or heats properly. Request an Englewood diagnostic visit and tell us what the appliance is doing differently.',
    preparation:
      'For built-in kitchen appliances, send the brand and model number when available. Mention cabinetry, trim panels, or other access restrictions before the visit; avoid pulling out a heavy appliance yourself.',
    question: 'Do you need the model number for an Englewood repair request?',
    answer:
      'It is helpful but not required to contact us. The model number lets us check the appliance type and discuss parts availability. We confirm the repair recommendation after diagnosis.',
  },
  {
    slug: 'bergenfield',
    name: 'Bergenfield',
    zip: '07621',
    intro:
      'A washer stopping halfway through a load or a freezer losing temperature deserves a clear diagnosis. Our Bergen County team helps arrange Bergenfield repair visits with an on-site quote.',
    preparation:
      'Copy the exact error code before resetting the appliance. Include whether the issue happens on every cycle or only occasionally, and whether anything changed just before it began.',
    question: 'Should I reset an appliance before requesting repair in Bergenfield?',
    answer:
      'Record any error code and the symptoms first. Follow the manufacturer’s instructions for your model. If the fault returns, include the code and what you tried in your request rather than repeatedly restarting it.',
  },
  {
    slug: 'paramus',
    name: 'Paramus',
    zip: '07652',
    intro:
      'Request refrigerator, laundry, dishwasher, or cooking-appliance repair for your Paramus home. A $99 service call gets the diagnostic process started; the technician provides the repair quote on-site.',
    preparation:
      'If more than one appliance needs attention, list each brand and symptom. Tell us which problem is most urgent so we can discuss the scope and charges before scheduling.',
    question: 'Is $99 the total repair price in Paramus?',
    answer:
      'No. $99 is the service call fee. Repair pricing depends on the diagnosis, required parts, and labor. Your technician provides a written quote before repair work; the service call fee is waived when you proceed with the repair.',
  },
  {
    slug: 'ridgewood',
    name: 'Ridgewood',
    zip: '07450',
    intro:
      'Whether the problem is a noisy dryer or an oven that heats unevenly, describe it to our NJ team and request a Ridgewood service visit. We confirm availability before setting an appointment.',
    preparation:
      'Tell us where the appliance is located, especially if access involves stairs or a tight laundry space. For a stacked pair, include both model numbers if you can reach the labels safely.',
    question: 'Can I request service for a stacked laundry unit in Ridgewood?',
    answer:
      'Yes. Mention that the machines are stacked and describe the access space. We will confirm the appliance type and any handling requirements before arranging the visit.',
  },
  {
    slug: 'lodi',
    name: 'Lodi',
    zip: '07644',
    intro:
      'When your appliance no longer does its everyday job, a description of the symptom helps us start in the right place. Request an in-home diagnostic in Lodi through our Bergen County team.',
    preparation:
      'For cooking-appliance issues, say whether the appliance is gas or electric and whether the problem affects the oven, one burner, or the controls. Include the brand and any display code.',
    question: 'What should I include for an oven repair request in Lodi?',
    answer:
      'Include the fuel type, brand, and whether the oven fails to heat, heats unevenly, or displays an error. Tell us if the burners still work. The technician diagnoses the cause before quoting the repair.',
  },
];
