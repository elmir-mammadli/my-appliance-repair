import { test, expect } from '@playwright/test';
import { BERGEN_MUNICIPALITIES, BERGEN_TOWNS } from '../src/lib/bergen';
import { branchForZip, coverageError } from '../src/lib/branches';
import { validateBookingRequest, escapeEmailData } from '../src/lib/booking-request';
import { bergenMetadata } from '../src/lib/bergen-metadata';

const request = {
  name: 'Test Customer',
  phone: '2015550100',
  email: 'test@example.com',
  zip: '07601',
  municipality: 'Hackensack',
  appliance: 'Washer',
  issue: 'Will not drain',
  date: '2026-10-01',
  sourcePage: '/new-jersey/bergen-county',
};

test('routes CT and representative Bergen ZIPs without accepting all NJ ZIPs', () => {
  expect(branchForZip('06510')).toBe('ct');
  expect(branchForZip('06902')).toBe('ct');
  for (const zip of ['07601', '07024', '07410', '07675']) expect(branchForZip(zip)).toBe('nj');
  for (const zip of ['07030', '07102', '10001', '00000', '7601'])
    expect(branchForZip(zip)).toBeNull();
});

test('covers 70 municipalities with a focused set of ten unique town routes', () => {
  expect(new Set(BERGEN_MUNICIPALITIES).size).toBe(70);
  expect(new Set(BERGEN_TOWNS.map((town) => town.slug)).size).toBe(10);
  for (const town of BERGEN_TOWNS) {
    expect(BERGEN_MUNICIPALITIES).toContain(town.name);
    expect(branchForZip(town.zip)).toBe('nj');
    expect(bergenMetadata(town).alternates?.canonical).toBe(
      `https://www.myappliance.us/new-jersey/bergen-county/${town.slug}`,
    );
  }
});

test('NJ intake needs a real Bergen municipality and honors the pause switch', () => {
  expect(coverageError('07601', '', true)).toContain('municipality');
  expect(coverageError('07601', 'Hoboken', true)).toContain('municipality');
  expect(coverageError('07601', 'Hackensack', true)).toBeNull();
  expect(coverageError('07601', 'Hackensack', false)).toContain('not open');
  expect(coverageError('06510', '', false)).toBeNull();
});

test('server resolves branch from location, ignoring a forged browser branch', () => {
  const nj = validateBookingRequest({ ...request, branchId: 'ct' }, true);
  expect(nj.ok).toBe(true);
  if (nj.ok)
    expect(nj.data).toMatchObject({
      branchId: 'nj',
      branchName: 'Bergen County, NJ',
      phone: '+12015550100',
    });
  const ct = validateBookingRequest({ ...request, zip: '06510', branchId: 'nj' }, true);
  expect(ct.ok).toBe(true);
  if (ct.ok) expect(ct.data).toMatchObject({ branchId: 'ct', municipality: '' });
});

test('server rejects malformed and out-of-area requests before dispatch', () => {
  for (const invalid of [
    null,
    [],
    {},
    { ...request, phone: 'bad' },
    { ...request, zip: '07030' },
    { ...request, municipality: 'Hoboken' },
    { ...request, issue: 123 },
    { ...request, email: 'not-an-email' },
  ]) {
    expect(validateBookingRequest(invalid, true).ok).toBe(false);
  }
});

test('email display escapes customer markup; source tracking excludes query data', () => {
  expect(escapeEmailData({ issue: '<img src=x>&"' }).issue).toBe('&lt;img src=x&gt;&amp;&quot;');
  const result = validateBookingRequest(
    { ...request, sourcePage: '/booking?email=private@example.com' },
    true,
  );
  if (!result.ok) throw new Error(result.error);
  expect(result.data.sourcePage).toBe('');
});
