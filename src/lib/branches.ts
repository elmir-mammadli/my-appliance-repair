import { SERVICE_CALL_FEE } from './business';
import { BERGEN_MUNICIPALITIES, BERGEN_ZIPS } from './bergen';
import { isCtZip } from './zip';

export type BranchId = 'ct' | 'nj';
export const NJ_PATH = '/new-jersey/bergen-county';
// Owner confirmed NJ intake on September 20, 2026. Set false to pause NJ intake.
export const NJ_BOOKING_ENABLED = process.env.NEXT_PUBLIC_NJ_BOOKING_ENABLED !== 'false';
export const BRANCHES = {
  ct: {
    id: 'ct',
    name: 'Connecticut',
    state: 'CT',
    phone: '(959) 261-6736',
    telephone: '+19592616736',
    home: '/',
    fee: SERVICE_CALL_FEE,
    hours: 'Mon–Sun 8am–6pm',
  },
  nj: {
    id: 'nj',
    name: 'Bergen County, NJ',
    state: 'NJ',
    phone: '(201) 403-0001',
    telephone: '+12014030001',
    home: NJ_PATH,
    fee: SERVICE_CALL_FEE,
    hours: 'Mon–Sun 8am–6pm',
  },
} as const;

export function branchForZip(zip: string): BranchId | null {
  if (isCtZip(zip)) return 'ct';
  if (BERGEN_ZIPS.has(zip)) return 'nj';
  return null;
}

export function isBergenMunicipality(value: string) {
  return BERGEN_MUNICIPALITIES.some((town) => town === value);
}

export function coverageError(
  zip: string,
  municipality: string,
  allowNj = NJ_BOOKING_ENABLED,
): string | null {
  const branch = branchForZip(zip);
  if (!branch) return 'Please call us to check coverage for this ZIP code.';
  if (branch === 'nj' && !allowNj) return 'Online booking for Bergen County is not open yet.';
  if (branch === 'nj' && !isBergenMunicipality(municipality))
    return 'Select your Bergen County municipality so we can confirm your service address.';
  return null;
}
