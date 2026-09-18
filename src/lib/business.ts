// Business details confirmed by the owner on September 18, 2026.
export const SERVICE_CALL_FEE = 99;

export const REPAIR_PRICING_DESCRIPTION =
  'Repair prices vary by appliance, diagnosis, parts, and labor. Your technician determines the repair price on-site and provides a written quote before work begins.';

export const APPLIANCE_REPAIR_COST_ANSWER = `${REPAIR_PRICING_DESCRIPTION} The $${SERVICE_CALL_FEE} service call fee covers the diagnostic and is waived when you proceed with the repair.`;

export const SERVICE_AREAS = [
  'New Haven',
  'Hamden',
  'West Haven',
  'East Haven',
  'North Haven',
  'Woodbridge',
  "Beacon Falls",
  "Prospect",
  "Durham",
  "Wolcott",
  'Orange',
  'Bethany',
  'Branford',
  "North Branford",
  'Milford',
  'Shelton',
  'Derby',
  'Ansonia',
  'Naugatuck',
  'Bristol',
  'Waterbury',
  'Cheshire',
  'Meriden',
  'Wallingford',
  'Trumbull',
  'Stratford',
  'Madison',
  "Oxford",
  "Guilford",
  "Seymour",
] as const;

export const SERVICE_AREA_SCHEMA = SERVICE_AREAS.map((name) => ({
  '@type': 'City',
  name,
  containedInPlace: { '@type': 'State', name: 'Connecticut' },
}));

export const REVIEW_RATINGS = {
  google: { rating: 5, count: 81 },
  thumbtack: { rating: 5, count: 145 },
} as const;
