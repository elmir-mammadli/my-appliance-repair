// Canonical business details. Update this record when the legal or Google Business Profile
// listing changes; every rendered NAP reference and structured-data record derives from it.
export const BUSINESS = {
  name: 'My Appliance Repair LLC',
  shortName: 'My Appliance Repair',
  url: 'https://www.myappliance.us',
  email: 'service@myappliance.us',
  phone: {
    display: '(959) 261-6736',
    e164: '+19592616736',
    href: 'tel:+19592616736',
  },
  address: {
    streetAddress: '12221 Town Walk Dr.',
    addressLocality: 'Hamden',
    addressRegion: 'CT',
    postalCode: '06518',
    addressCountry: 'US',
  },
  get formattedAddress() {
    return `${this.address.streetAddress}, ${this.address.addressLocality}, ${this.address.addressRegion} ${this.address.postalCode}`;
  },
  get schemaAddress() {
    return {
      '@type': 'PostalAddress',
      ...this.address,
    };
  },
} as const;

export const SERVICE_CALL_FEE = 99;

// Keep published hours aligned with the branch records and LocalBusiness markup.
export const BUSINESS_HOURS = {
  display: 'Mon–Sun 8am–7pm',
  schema: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '19:00',
  },
} as const;

// Evening emergency line. The top announcement bar switches to it from 8 PM to midnight Eastern.
// Kept separate from BUSINESS_HOURS so the Google Business Profile hours and
// LocalBusiness markup stay unchanged.
export const EMERGENCY_SERVICE = {
  timeZone: 'America/New_York',
  startHour: 20, // 8 PM
  endHour: 24, // midnight
  from: '8 PM',
  until: '12:00 AM',
  fee: 149,
} as const;

export const SAME_DAY_SERVICE_ANSWER =
  'Same-day appointments may be available depending on your location, technician schedules, and parts. Call early to check availability. Your requested date and time are confirmed by our team; submitting a request does not reserve an appointment. Call to discuss urgent or after-hours requests and any additional charges.';

export const GAS_ODOR_GUIDANCE =
  'If you smell gas, leave the building immediately. Do not use switches, appliances, flames, or a phone inside. From a safe location outside, call 911 or your gas utility. Arrange appliance repair only after the emergency has been addressed.';

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
  'Monroe',
  'Middletown',
  'Berlin',
  'New Britain',
  'Hartford',
  'West Hartford',
  'Farmington',
  'Plainville',
  'Newington',
  'Hartford County',
] as const;

export const SERVICE_AREA_SCHEMA = SERVICE_AREAS.map((name) => ({
  '@type': name.endsWith('County') ? 'AdministrativeArea' : 'City',
  name,
  containedInPlace: { '@type': 'State', name: 'Connecticut' },
}));

export const REVIEW_RATINGS = {
  google: { rating: 5, count: 100 },
  thumbtack: { rating: 5, count: 160 },
} as const;
