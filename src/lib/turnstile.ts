// Server-side Cloudflare Turnstile check plus honeypot helper for public forms.

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/** Name of the hidden field bots tend to fill. Real visitors never see it. */
export const HONEYPOT_FIELD = 'website';

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Returns true when the Turnstile token is valid.
 * Without TURNSTILE_SECRET_KEY: skipped in local dev, but rejected in
 * production so a missing env var can never silently turn the captcha off.
 */
export async function verifyTurnstile(token: unknown, ip?: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[turnstile] TURNSTILE_SECRET_KEY not set in production; rejecting submission');
      return false;
    }
    console.warn('[turnstile] TURNSTILE_SECRET_KEY not set (dev); skipping captcha check');
    return true;
  }
  if (typeof token !== 'string' || !token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  try {
    const res = await fetch(VERIFY_URL, { method: 'POST', body });
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
    if (!data.success) console.warn('[turnstile] rejected:', data['error-codes']);
    return data.success === true;
  } catch (err) {
    console.error('[turnstile] verify request failed:', err);
    return false;
  }
}

export function clientIp(headers: Headers): string | null {
  return (
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip')
  );
}
