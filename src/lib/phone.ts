/** Formats US phone numbers as (xxx) xxx-xxxx. */

function usDigits(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits.length > 10 && digits.startsWith('1') ? digits.slice(1) : digits;
}

/** For display (emails, confirmations). Returns the input unchanged if it is not a 10-digit US number. */
export function formatPhone(value: string): string {
  const digits = usDigits(value);
  if (digits.length !== 10) return value;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** For input fields: formats while the customer types. Pass the previous value so backspacing over punctuation still deletes a digit. */
export function formatPhoneInput(value: string, previous = ''): string {
  let digits = usDigits(value).slice(0, 10);
  const prevDigits = usDigits(previous).slice(0, 10);
  if (value.length < previous.length && digits === prevDigits) digits = digits.slice(0, -1);
  if (digits.length === 0) return '';
  if (digits.length < 4) return digits.length === 3 && value.length >= previous.length ? `(${digits}) ` : `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
