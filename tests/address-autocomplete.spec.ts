import { test, expect, type Page } from '@playwright/test';

const prediction = { place_id: 'test-place', description: '123 Main St, Hartford, CT, USA' };
const address = '123 Main St, Hartford, CT 06103';

async function openAddressForm(page: Page, modal = false) {
  await page.goto(modal ? '/' : '/booking');
  if (modal) await page.evaluate(() => window.dispatchEvent(new CustomEvent('open-booking')));
  await page.locator('#bf-phone').fill('2035550123');
  await page.locator('#bf-zip').fill('06510');
  await page.getByRole('button', { name: 'Check Availability', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Service Address' })).toBeVisible();
}

async function mockPlaces(page: Page) {
  await page.route('**/api/places?**', (route) => {
    const params = new URL(route.request().url()).searchParams;
    return route.fulfill({
      json: params.has('placeId') ? { address, zip: '06103' } : { predictions: [prediction] },
    });
  });
}

test('keyboard selection fills address and ZIP without submitting', async ({ page }) => {
  const tokens: string[] = [];
  await page.route('**/api/places?**', (route) => {
    const params = new URL(route.request().url()).searchParams;
    tokens.push(params.get('sessionToken')!);
    return route.fulfill({
      json: params.has('placeId') ? { address, zip: '06103' } : { predictions: [prediction] },
    });
  });
  await openAddressForm(page);
  const input = page.getByRole('combobox', { name: 'Service Address' });
  await input.fill('123 Main');
  await expect(
    page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }),
  ).toBeVisible();
  await input.press('ArrowDown');
  await expect(
    page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }),
  ).toHaveAttribute('aria-selected', 'true');
  await input.press('Enter');
  await expect(input).toHaveValue(address);
  await expect(page.locator('#bf-service-zip')).toHaveValue('06103');
  await expect(page.getByText('Name is required')).not.toBeVisible();
  expect(tokens).toHaveLength(2);
  expect(tokens[0]).toBe(tokens[1]);
  await input.fill('456 Main');
  await expect(
    page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }),
  ).toBeVisible();
  expect(tokens[2]).not.toBe(tokens[0]);
});

test('pointer selection works in the booking modal', async ({ page }) => {
  await mockPlaces(page);
  await openAddressForm(page, true);
  const input = page.getByRole('combobox', { name: 'Service Address' });
  await input.fill('123 Main');
  await page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }).click();
  await expect(input).toHaveValue(address);
  await expect(page.locator('#bf-service-zip')).toHaveValue('06103');
});

test('Escape dismisses suggestions without closing the modal; Tab leaves the field', async ({
  page,
}) => {
  await mockPlaces(page);
  await openAddressForm(page, true);
  const input = page.getByRole('combobox', { name: 'Service Address' });
  await input.fill('123 Main');
  await expect(
    page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }),
  ).toBeVisible();
  await input.press('Escape');
  await expect(page.getByRole('listbox')).not.toBeVisible();
  await expect(page.getByRole('dialog', { name: 'Book a repair appointment' })).toBeVisible();
  await input.press('ArrowDown');
  await expect(
    page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }),
  ).toBeVisible();
  await input.press('Tab');
  await expect(page.getByRole('listbox')).not.toBeVisible();
  await expect(page.locator('#bf-service-zip')).toBeFocused();
});

test('API failure allows manual entry and exposes required-address error', async ({ page }) => {
  await page.route('**/api/places?**', (route) =>
    route.fulfill({ status: 503, json: { error: 'Unavailable' } }),
  );
  await openAddressForm(page);
  const input = page.getByRole('combobox', { name: 'Service Address' });
  await page.getByRole('button', { name: 'Book My Repair' }).click();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#bf-address-error')).toHaveText('Service address is required');
  await input.fill('123 Main St, Apt 4, Hartford, CT');
  await expect(
    page.getByText('Address suggestions are unavailable. Please enter your full address manually.'),
  ).toBeVisible();
  await expect(input).toHaveValue('123 Main St, Apt 4, Hartford, CT');
  await expect(input).toHaveAttribute('aria-invalid', 'false');
});

test('clearing input discards an outstanding prediction request', async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/api/places?**', async (route) => {
    await pending;
    await route.fulfill({ json: { predictions: [prediction] } }).catch(() => {});
  });
  await openAddressForm(page);
  const input = page.getByRole('combobox', { name: 'Service Address' });
  const request = page.waitForRequest('**/api/places?**');
  await input.fill('123 Main');
  await request;
  await input.fill('');
  release();
  await expect(input).toHaveValue('');
  await expect(page.getByRole('listbox')).not.toBeVisible();
});

test('editing a selection prevents delayed details from overwriting it', async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/api/places?**', async (route) => {
    if (new URL(route.request().url()).searchParams.has('placeId')) {
      await pending;
      await route.fulfill({ json: { address, zip: '06103' } }).catch(() => {});
    } else await route.fulfill({ json: { predictions: [prediction] } });
  });
  await openAddressForm(page);
  const input = page.getByRole('combobox', { name: 'Service Address' });
  await input.fill('123 Main');
  const request = page.waitForRequest((req) => req.url().includes('placeId='));
  await page.getByRole('option', { name: '123 Main St, Hartford, CT', exact: true }).click();
  await request;
  await input.fill('12');
  release();
  await expect(input).toHaveValue('12');
  await expect(page.locator('#bf-service-zip')).toHaveValue('06510');
});
