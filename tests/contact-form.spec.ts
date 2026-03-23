import { test, expect } from '@playwright/test';

// Pick a valid date for tests: tomorrow
function tomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

// Mock the booking API so tests never hit real Sheets / Resend
async function mockBookingApi(page: import('@playwright/test').Page, { ok = true } = {}) {
  await page.route('**/api/book', (route) =>
    route.fulfill({
      status: ok ? 200 : 500,
      contentType: 'application/json',
      body: JSON.stringify(ok ? { ok: true } : { error: 'Failed to submit booking' }),
    })
  );
}

// Fill shared form fields that exist in both ContactForm and BookingModal
async function fillBaseFields(page: import('@playwright/test').Page, prefix = '') {
  const id = (s: string) => (prefix ? `#${prefix}-${s}` : `#${s}`);

  await page.fill(id('name'), 'John Smith');
  await page.fill(id('phone'), '(203) 555-0100');
  await page.fill(id('zip'), '06510');
  await page.fill(id('appliance'), 'Washer');
  await page.fill(id('issue'), 'Washer makes loud grinding noise and does not spin');
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await mockBookingApi(page);
    await page.goto('/#contact');
  });

  test('renders all required fields', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await expect(form.locator('#name')).toBeVisible();
    await expect(form.locator('#phone')).toBeVisible();
    await expect(form.locator('#zip')).toBeVisible();
    await expect(form.locator('#appliance')).toBeVisible();
    await expect(form.locator('#issue')).toBeVisible();
    await expect(form.locator('#datepicker')).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.click('form[aria-label="Repair booking form"] button[type="submit"]');
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Phone number is required')).toBeVisible();
    await expect(page.getByText('ZIP code is required')).toBeVisible();
    await expect(page.getByText('Please select an appliance')).toBeVisible();
    await expect(page.getByText('Please describe the issue')).toBeVisible();
    await expect(page.getByText('Please select a preferred date')).toBeVisible();
  });

  test('shows invalid phone error', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await form.locator('#phone').fill('123');
    await form.locator('button[type="submit"]').click();
    await expect(page.getByText('Please enter a valid phone number')).toBeVisible();
  });

  test('shows CT ZIP validation — out-of-state ZIP rejected', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await form.locator('#zip').fill('10001'); // New York
    await expect(page.getByText('Outside our service area (CT only)')).toBeVisible();
  });

  test('shows CT ZIP validation — Connecticut ZIP accepted', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await form.locator('#zip').fill('06510');
    await expect(page.getByText('We service your area')).toBeVisible();
  });

  test('date picker opens and selects a date', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();
    const trigger = form.locator('#datepicker');
    await trigger.click();

    // Calendar should be visible
    await expect(page.locator('[aria-label^="Previous month"], [aria-label^="Next month"]').first()).toBeVisible();

    // Click the first enabled (non-disabled) day button inside the calendar
    const firstAvailableDay = page
      .locator('.absolute.z-50 button:not([disabled])')
      .filter({ hasNotText: /[A-Z]/ }) // exclude month nav buttons
      .first();
    await firstAvailableDay.click();

    // Calendar should close and trigger should show a date
    await expect(trigger).toContainText(/\d{4}/);
  });

  test('clears field errors on input', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await form.locator('button[type="submit"]').click();
    await expect(page.getByText('Name is required')).toBeVisible();

    await form.locator('#name').fill('John Smith');
    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('submits successfully and shows confirmation', async ({ page }) => {
    const form = page.locator('form[aria-label="Repair booking form"]').first();

    await form.locator('#name').fill('John Smith');
    await form.locator('#phone').fill('(203) 555-0100');
    await form.locator('#zip').fill('06510');
    await form.locator('#appliance').selectOption('Washer');
    await form.locator('#issue').fill('Washer makes loud grinding noise and does not spin');

    // Open date picker and select a day
    await form.locator('#datepicker').click();
    const firstAvailableDay = page
      .locator('.absolute.z-50 button:not([disabled])')
      .filter({ hasNotText: /[A-Z]/ })
      .first();
    await firstAvailableDay.click();

    await form.locator('button[type="submit"]').click();

    await expect(page.getByText('Booking Request Received!')).toBeVisible();
    await expect(page.getByText(/John Smith/)).toBeVisible();
    await expect(page.getByText(/Washer/)).toBeVisible();
  });

  test('shows error alert on API failure', async ({ page }) => {
    await page.route('**/api/book', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'error' }) })
    );

    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await form.locator('#name').fill('John Smith');
    await form.locator('#phone').fill('(203) 555-0100');
    await form.locator('#zip').fill('06510');
    await form.locator('#appliance').selectOption('Washer');
    await form.locator('#issue').fill('Not working');

    await form.locator('#datepicker').click();
    const firstAvailableDay = page
      .locator('.absolute.z-50 button:not([disabled])')
      .filter({ hasNotText: /[A-Z]/ })
      .first();
    await firstAvailableDay.click();

    page.on('dialog', (dialog) => dialog.dismiss());
    await form.locator('button[type="submit"]').click();
  });

  test('submit button is disabled while submitting', async ({ page }) => {
    // Delay the API so we can observe the loading state
    await page.route('**/api/book', async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    const form = page.locator('form[aria-label="Repair booking form"]').first();
    await form.locator('#name').fill('John Smith');
    await form.locator('#phone').fill('(203) 555-0100');
    await form.locator('#zip').fill('06510');
    await form.locator('#appliance').selectOption('Washer');
    await form.locator('#issue').fill('Not working');

    await form.locator('#datepicker').click();
    const firstAvailableDay = page
      .locator('.absolute.z-50 button:not([disabled])')
      .filter({ hasNotText: /[A-Z]/ })
      .first();
    await firstAvailableDay.click();

    await form.locator('button[type="submit"]').click();
    await expect(form.locator('button[type="submit"]')).toBeDisabled();
    await expect(page.getByText('Sending Request...')).toBeVisible();
  });
});

// ─── BOOKING MODAL ───────────────────────────────────────────────────────────

test.describe('Booking Modal', () => {
  test.beforeEach(async ({ page }) => {
    await mockBookingApi(page);
    await page.goto('/');
  });

  test('opens when "Schedule a Repair" hero button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Schedule a Repair').nth(1)).toBeVisible();
  });

  test('closes on backdrop click', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click the backdrop (outside the panel)
    await page.mouse.click(10, 10);
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 1000 });
  });

  test('closes on Escape key', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 1000 });
  });

  test('closes via the X button', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 1000 });
  });

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    const modal = page.getByRole('dialog');
    await modal.getByRole('button', { name: /Book My Repair/i }).click();

    await expect(modal.getByText('Name is required')).toBeVisible();
    await expect(modal.getByText('Phone number is required')).toBeVisible();
    await expect(modal.getByText('ZIP code is required')).toBeVisible();
    await expect(modal.getByText('Please select an appliance')).toBeVisible();
    await expect(modal.getByText('Please describe the issue')).toBeVisible();
    await expect(modal.getByText('Please select a preferred date')).toBeVisible();
  });

  test('shows out-of-state ZIP error inside modal', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    const modal = page.getByRole('dialog');
    await modal.locator('#m-zip').fill('90210'); // Beverly Hills
    await expect(modal.getByText('Outside our service area (CT only)')).toBeVisible();
  });

  test('submits successfully and shows confirmation inside modal', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    const modal = page.getByRole('dialog');

    await modal.locator('#m-name').fill('Jane Doe');
    await modal.locator('#m-phone').fill('(860) 555-0200');
    await modal.locator('#m-zip').fill('06902');
    await modal.locator('#m-appliance').selectOption('Refrigerator');
    await modal.locator('#m-issue').fill('Fridge not cooling, making clicking sounds');

    await modal.locator('#m-datepicker').click();
    const firstAvailableDay = page
      .locator('.absolute.z-50 button:not([disabled])')
      .filter({ hasNotText: /[A-Z]/ })
      .first();
    await firstAvailableDay.click();

    await modal.getByRole('button', { name: /Book My Repair/i }).click();

    await expect(modal.getByText('Booking Request Received!')).toBeVisible();
    await expect(modal.getByText(/Jane Doe/)).toBeVisible();
    await expect(modal.getByText(/Refrigerator/)).toBeVisible();
  });

  test('can be triggered from Navbar "Book a Repair" button', async ({ page }) => {
    await page.getByRole('link', { name: /Book a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
