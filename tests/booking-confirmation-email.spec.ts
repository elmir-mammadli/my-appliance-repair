import { test, expect } from '@playwright/test';
import { createBookingConfirmationEmail } from '../src/lib/booking-confirmation-email';
import { SERVICE_CALL_FEE } from '../src/lib/business';

const booking = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  phone: '(203) 555-0148',
  appliance: 'Washer',
  brand: 'LG',
  date: '2026-09-27',
  timeSlot: 'Morning (8am–12pm)',
  address: '123 Sample Street, Hamden, CT 06518',
  issue: 'Will not spin',
};

test('includes the requested visit, correct status, pricing, and a plain-text alternative', () => {
  const email = createBookingConfirmationEmail(booking);
  expect(email.subject).toBe('Request received: Washer repair · My Appliance Repair');
  expect(email.html).toContain('Sun, Sep 27, 2026');
  expect(email.html).toContain(booking.address);
  expect(email.html).toContain(booking.timeSlot);
  expect(email.html).toContain(`Your $${SERVICE_CALL_FEE} service call`);
  expect(email.html).toContain('your appointment is confirmed by phone');
  expect(email.html).not.toContain('your booking request is confirmed');
  expect(email.text).toContain('Washer · LG');
  expect(email.text).toContain(booking.phone);
  expect(email.text).toContain(booking.issue);
  expect(email.html).toContain('https://www.myappliance.us/images/email/myappliance-logo.png');
});

test('escapes customer content so it cannot add HTML or links to the email', () => {
  const dangerous = '<img src=x onerror="alert(1)"> & <a href="https://example.net">click</a>';
  const email = createBookingConfirmationEmail({
    ...booking,
    name: dangerous,
    address: dangerous,
    issue: dangerous,
    brand: dangerous,
    email: dangerous,
  });
  expect(email.html).not.toContain(dangerous);
  expect(email.html).not.toContain('<img src=x');
  expect(email.html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  expect(email.html).toContain('&amp;');
});

test('handles contact-form requests without a full address or preferred time', () => {
  const email = createBookingConfirmationEmail({
    name: 'Alex',
    email: 'alex@example.com',
    zip: '06518',
    appliance: 'Dryer',
  });
  expect(email.html).toContain('ZIP 06518 — address to be confirmed');
  expect(email.html).toContain('To be arranged');
  expect(email.html).toContain('Any time');
  expect(email.html).not.toContain('undefined');
  expect(email.html).not.toContain('Invalid Date');
});
