import { branchForZip, BRANCHES, coverageError } from './branches';

export function validateBookingRequest(
  input: unknown,
  allowNj?: boolean,
): { ok: true; data: Record<string, string> } | { ok: false; error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input))
    return { ok: false, error: 'Invalid request.' };
  const raw = input as Record<string, unknown>;
  const fields = [
    'name',
    'phone',
    'email',
    'address',
    'zip',
    'municipality',
    'appliance',
    'brand',
    'issue',
    'urgency',
    'date',
    'timeSlot',
    'sourcePage',
  ];
  const data: Record<string, string> = {};
  for (const key of fields) {
    if (raw[key] !== undefined && typeof raw[key] !== 'string')
      return { ok: false, error: `Invalid ${key}.` };
    data[key] = (raw[key] as string | undefined)?.trim() ?? '';
    if (data[key].length > (key === 'issue' ? 5000 : 500))
      return { ok: false, error: `${key} is too long.` };
  }
  if (!data.name || !data.appliance || !data.issue || !/^\d{4}-\d{2}-\d{2}$/.test(data.date))
    return { ok: false, error: 'Name, appliance, issue, and preferred date are required.' };
  const phone = data.phone.replace(/\D/g, '');
  if (!/^(1\d{10}|\d{10})$/.test(phone)) return { ok: false, error: 'Enter a valid phone number.' };
  data.phone = phone.length === 11 ? `+${phone}` : `+1${phone}`;
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { ok: false, error: 'Enter a valid email address.' };
  const error = coverageError(data.zip, data.municipality, allowNj);
  if (error) return { ok: false, error };
  const branchId = branchForZip(data.zip)!;
  // Branch is derived from service location, never trusted from the submitted branchId.
  data.branchId = branchId;
  data.branchName = BRANCHES[branchId].name;
  if (branchId === 'ct') data.municipality = '';
  data.urgency = ['emergency', 'today', 'standard'].includes(data.urgency)
    ? data.urgency
    : 'standard';
  data.sourcePage = /^\/(?!\/)[^\s?#]*$/.test(data.sourcePage) ? data.sourcePage : '';
  return { ok: true, data };
}

export function escapeEmailData(data: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value.replace(
        /[&<>"']/g,
        (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
      ),
    ]),
  );
}
