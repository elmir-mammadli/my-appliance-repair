// Appliance options shared by the booking form and the hero quick-start strip.
// The strip pre-fills the form's appliance select, so both must use the same values.
export const APPLIANCES = [
  'Washer',
  'Dryer',
  'Refrigerator',
  'Dishwasher',
  'Oven / Range',
  'Cooktop',
  'Microwave',
  'Freezer',
  'Other',
] as const;

export type Appliance = (typeof APPLIANCES)[number];
