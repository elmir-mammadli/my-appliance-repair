import { test, expect, type Page } from '@playwright/test';

// ─── Helpers ────────────────────────────────────────────────────────────────

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

/** aria-label used on day buttons: e.g. "March 26, 2026" */
function tomorrowLabel(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Mock /api/book so tests never touch real Sheets or Resend */
async function mockBookingApi(page: Page, ok = true) {
  await page.route('**/api/book', (route) =>
    route.fulfill({
      status: ok ? 200 : 500,
      contentType: 'application/json',
      body: JSON.stringify(ok ? { ok: true } : { error: 'Failed to submit booking' }),
    })
  );
}

/** Open date picker and click tomorrow's date */
async function pickTomorrow(page: Page) {
  // The trigger button text shows "Select a date..." when empty
  const trigger = page.getByRole('button', { name: /Select a date/i });
  // There might be multiple pickers; click the visible one
  await trigger.first().click();
  await page.getByRole('button', { name: tomorrowLabel() }).click();
}

// ─── Contact Form ────────────────────────────────────────────────────────────

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await mockBookingApi(page);
    await page.goto('/');
    // Scroll the contact section into view
    await page.evaluate(() => {
      document.getElementById('contact')?.scrollIntoView();
    });
  });

  test('renders all required fields', async ({ page }) => {
    const form = page.locator('#contact form');
    await expect(form.locator('#name')).toBeVisible();
    await expect(form.locator('#phone')).toBeVisible();
    await expect(form.locator('#zip')).toBeVisible();
    await expect(form.locator('#appliance')).toBeVisible();
    await expect(form.locator('#issue')).toBeVisible();
    await expect(form.locator('#datepicker')).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    const form = page.locator('#contact form');
    await form.locator('button[type="submit"]').click();

    await expect(form.getByText('Name is required')).toBeVisible();
    await expect(form.getByText('Phone number is required')).toBeVisible();
    await expect(form.getByText('ZIP code is required')).toBeVisible();
    await expect(form.getByText('Please select an appliance')).toBeVisible();
    await expect(form.getByText('Please describe the issue')).toBeVisible();
    await expect(form.getByText('Please select a preferred date')).toBeVisible();
  });

  test('shows invalid phone error', async ({ page }) => {
    const form = page.locator('#contact form');
    await form.locator('#phone').fill('123');
    await form.locator('button[type="submit"]').click();
    await expect(form.getByText('Please enter a valid phone number')).toBeVisible();
  });

  test('rejects out-of-state ZIP', async ({ page }) => {
    const form = page.locator('#contact form');
    await form.locator('#zip').fill('10001');
    await expect(form.getByText('Outside our service area (CT only)')).toBeVisible();
  });

  test('accepts Connecticut ZIP', async ({ page }) => {
    const form = page.locator('#contact form');
    await form.locator('#zip').fill('06510');
    await expect(form.getByText('We service your area')).toBeVisible();
  });

  test('date picker opens and selects tomorrow', async ({ page }) => {
    const form = page.locator('#contact form');
    await form.locator('#datepicker').click();
    // Calendar must be visible
    await expect(page.getByRole('button', { name: tomorrowLabel() })).toBeVisible();
    await page.getByRole('button', { name: tomorrowLabel() }).click();
    // Trigger button now shows a formatted date (contains the year)
    await expect(form.locator('#datepicker')).toContainText(String(new Date().getFullYear()));
  });

  test('clears field error after typing', async ({ page }) => {
    const form = page.locator('#contact form');
    await form.locator('button[type="submit"]').click();
    await expect(form.getByText('Name is required')).toBeVisible();
    await form.locator('#name').fill('John Smith');
    await expect(form.getByText('Name is required')).not.toBeVisible();
  });

  test('submits successfully and shows confirmation', async ({ page }) => {
    const form = page.locator('#contact form');

    await form.locator('#name').fill('John Smith');
    await form.locator('#phone').fill('(203) 555-0100');
    await form.locator('#zip').fill('06510');
    await form.locator('#appliance').selectOption('Washer');
    await form.locator('#issue').fill('Washer makes loud grinding noise and does not spin');

    await form.locator('#datepicker').click();
    await page.getByRole('button', { name: tomorrowLabel() }).click();

    await form.locator('button[type="submit"]').click();

    await expect(page.getByText('Booking Request Received!')).toBeVisible();
    await expect(page.locator('#contact').getByText('John Smith', { exact: true })).toBeVisible();
    await expect(page.locator('#contact').getByText('Washer', { exact: true })).toBeVisible();
  });

  test('shows alert on API failure', async ({ page }) => {
    await mockBookingApi(page, false);

    const form = page.locator('#contact form');
    await form.locator('#name').fill('John Smith');
    await form.locator('#phone').fill('(203) 555-0100');
    await form.locator('#zip').fill('06510');
    await form.locator('#appliance').selectOption('Washer');
    await form.locator('#issue').fill('Not working');

    await form.locator('#datepicker').click();
    await page.getByRole('button', { name: tomorrowLabel() }).click();

    const dialogPromise = page.waitForEvent('dialog');
    await form.locator('button[type="submit"]').click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('(800) 555-0123');
    await dialog.dismiss();
  });

  test('submit button is disabled while submitting', async ({ page }) => {
    await page.route('**/api/book', async (route) => {
      await new Promise((r) => setTimeout(r, 600));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
    });

    const form = page.locator('#contact form');
    await form.locator('#name').fill('John Smith');
    await form.locator('#phone').fill('(203) 555-0100');
    await form.locator('#zip').fill('06510');
    await form.locator('#appliance').selectOption('Washer');
    await form.locator('#issue').fill('Not working');

    await form.locator('#datepicker').click();
    await page.getByRole('button', { name: tomorrowLabel() }).click();

    await form.locator('button[type="submit"]').click();
    await expect(form.locator('button[type="submit"]')).toBeDisabled();
    await expect(form.getByText('Sending Request...')).toBeVisible();
  });
});

// ─── Booking Modal ───────────────────────────────────────────────────────────

test.describe('Booking Modal', () => {
  test.beforeEach(async ({ page }) => {
    await mockBookingApi(page);
    await page.goto('/');
  });

  test('opens from hero "Schedule a Repair" button', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('closes on backdrop click', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.mouse.click(10, 300);
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 2000 });
  });

  test('closes on Escape key', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 2000 });
  });

  test('closes via X button', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    await page.getByRole('button', { name: 'Close modal' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 2000 });
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

  test('rejects out-of-state ZIP inside modal', async ({ page }) => {
    await page.getByRole('button', { name: /Schedule a Repair/i }).first().click();
    const modal = page.getByRole('dialog');
    await modal.locator('#m-zip').fill('90210');
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
    await page.getByRole('button', { name: tomorrowLabel() }).click();

    await modal.getByRole('button', { name: /Book My Repair/i }).click();

    await expect(modal.getByText('Booking Request Received!')).toBeVisible();
    await expect(modal.getByText(/Jane Doe/)).toBeVisible();
    await expect(modal.getByText(/Refrigerator/)).toBeVisible();
  });

  test('opens from Navbar "Book a Repair" button', async ({ page }) => {
    // On mobile the button lives inside the hamburger menu — open it first
    const hamburger = page.getByRole('button', { name: /Toggle mobile menu/i });
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }
    await page.locator('header').getByRole('button', { name: /Book a Repair/i }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
