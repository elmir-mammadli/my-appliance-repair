import { test, expect, type Page } from '@playwright/test';
import { BUSINESS, SAME_DAY_SERVICE_ANSWER } from '../src/lib/business';

type Command = [string, string, Record<string, unknown>?];

async function commands(page: Page): Promise<Command[]> {
  return page.evaluate(() =>
    (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>)),
  ) as Promise<Command[]>;
}

async function events(page: Page, name: string) {
  return (await commands(page)).filter((entry) => entry[0] === 'event' && entry[1] === name);
}

async function consent(page: Page, value: 'granted' | 'denied') {
  await page.addInitScript((choice) => localStorage.setItem('ga_consent', choice), value);
}

async function fillBooking(page: Page, nj = false) {
  await page.locator('#bf-phone').fill('2035550100');
  await page.locator('#bf-zip').fill(nj ? '07601' : '06510');
  if (nj) await page.locator('#bf-municipality').selectOption('Hackensack');
  await page
    .getByRole('form', { name: 'Step 1: Contact check' })
    .getByRole('button', { name: 'Check Availability', exact: true })
    .click();
  await page.locator('#bf-name').fill('Private Test Customer');
  await page.locator('#bf-address').fill('123 Private Test Street');
  await page.locator('#bf-email').fill('private-test@example.com');
  await page.locator('#bf-appliance').selectOption('Washer');
  await page.locator('#bf-issue').fill('Private issue text that must never go to Analytics');
  await page.locator('#bf-datepicker').click();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const label = tomorrow.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  if (tomorrow.getMonth() !== new Date().getMonth()) {
    await page.getByRole('button', { name: 'Next month' }).click();
  }
  await page.getByRole('button', { name: label, exact: true }).click();
}

test.beforeEach(async ({ page }) => {
  // Prevent real marketing requests, dispatches, geocoding, or customer emails.
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.hostname === 'localhost' ? route.continue() : route.abort();
  });
  await page.route('**/api/places**', (route) => route.fulfill({ json: { predictions: [] } }));
  await page.route('**/api/book', (route) => route.fulfill({ json: { ok: true } }));
});

test('restores consent before config and records one lead only after API success without contact data', async ({
  page,
}) => {
  await consent(page, 'granted');
  let finishRequest!: () => void;
  const pending = new Promise<void>((resolve) => {
    finishRequest = resolve;
  });
  await page.route('**/api/book', async (route) => {
    await pending;
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto('/booking?email=private-test@example.com#private');
  await fillBooking(page);
  const initial = await commands(page);
  expect(initial[0]).toEqual([
    'consent',
    'default',
    expect.objectContaining({ analytics_storage: 'granted', ad_storage: 'denied' }),
  ]);
  expect(initial.findIndex((c) => c[0] === 'config')).toBeGreaterThan(0);
  expect(await events(page, 'form_start')).toHaveLength(1);
  expect(await events(page, 'booking_step_complete')).toHaveLength(1);
  await page
    .getByRole('form', { name: 'Step 2: Repair details' })
    .getByRole('button', { name: /submit|request|confirm|book/i })
    .click();
  expect(await events(page, 'generate_lead')).toHaveLength(0);
  finishRequest();
  await expect(page.getByText('Booking Request Received!')).toBeVisible();
  const leads = await events(page, 'generate_lead');
  expect(leads).toHaveLength(1);
  expect(leads[0][2]).toMatchObject({
    form_id: 'booking',
    form_variant: 'page',
    branch_id: 'ct',
    appliance_type: 'Washer',
    page_path: '/booking',
  });
  const payload = JSON.stringify(await commands(page));
  for (const privateValue of [
    '2035550100',
    'Private Test Customer',
    '123 Private Test Street',
    'private-test@example.com',
    'Private issue text',
  ]) {
    expect(payload).not.toContain(privateValue);
  }
});

test('failed requests never become leads; a successful retry uses the service location branch', async ({
  page,
}) => {
  await consent(page, 'granted');
  let fail = true;
  await page.route('**/api/book', (route) =>
    route.fulfill({ status: fail ? 500 : 200, json: { ok: !fail } }),
  );
  page.on('dialog', (dialog) => dialog.dismiss());
  await page.goto('/booking');
  await fillBooking(page, true);
  const submit = page
    .getByRole('form', { name: 'Step 2: Repair details' })
    .getByRole('button', { name: /submit|request|confirm|book/i });
  await submit.click();
  await expect.poll(async () => (await events(page, 'booking_submit_error')).length).toBe(1);
  expect(await events(page, 'generate_lead')).toHaveLength(0);
  fail = false;
  await submit.click();
  await expect(page.getByText('Booking Request Received!')).toBeVisible();
  const leads = await events(page, 'generate_lead');
  expect(leads).toHaveLength(1);
  expect(leads[0][2]?.branch_id).toBe('nj');
});

test('declined consent suppresses conversion events while booking still works', async ({
  page,
}) => {
  await consent(page, 'denied');
  await page.goto('/booking');
  await fillBooking(page);
  await page
    .getByRole('form', { name: 'Step 2: Repair details' })
    .getByRole('button', { name: /submit|request|confirm|book/i })
    .click();
  await expect(page.getByText('Booking Request Received!')).toBeVisible();
  expect((await commands(page)).filter((c) => c[0] === 'event')).toHaveLength(0);
});

test('phone taps and modal opens are intent events, not successful leads', async ({ page }) => {
  await consent(page, 'granted');
  await page.goto('/services/washer-repair');
  await page
    .locator(`a[href="${BUSINESS.phone.href}"]`)
    .first()
    .evaluate((el) => {
      el.addEventListener('click', (event) => event.preventDefault(), { once: true });
      el.click();
    });
  expect(await events(page, 'click_to_call')).toHaveLength(1);
  await page.getByRole('button', { name: 'Schedule Washer Repair', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Book a repair appointment' })).toBeVisible();
  expect(await events(page, 'booking_open')).toHaveLength(1);
  expect(await events(page, 'generate_lead')).toHaveLength(0);
});

test('inline contact form produces one received lead and no customer data', async ({ page }) => {
  await consent(page, 'granted');
  await page.goto('/');
  const form = page.getByRole('form', { name: 'Repair booking form', exact: true });
  await form.locator('#name').fill('Private Inline Customer');
  await form.locator('#phone').fill('2035550100');
  await form.locator('#zip').fill('06510');
  await form.locator('#appliance').selectOption('Dishwasher');
  await form.locator('#issue').fill('Private inline issue');
  await form.locator('#datepicker').click();
  const date = new Date();
  const label = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  await page.getByRole('button', { name: label, exact: true }).click();
  await form.locator('button[type="submit"]').click();
  await expect(page.getByText('Booking Request Received!')).toBeVisible();
  expect(await events(page, 'form_start')).toHaveLength(1);
  const leads = await events(page, 'generate_lead');
  expect(leads).toHaveLength(1);
  expect(leads[0][2]).toMatchObject({
    form_id: 'contact',
    form_variant: 'inline',
    appliance_type: 'Dishwasher',
    branch_id: 'ct',
  });
  const payload = JSON.stringify(leads);
  expect(payload).not.toMatch(/Private|2035550100|06510/);
});

test('a visitor can accept analytics even when consent storage is unavailable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getItem = Storage.prototype.getItem;
    const setItem = Storage.prototype.setItem;
    Storage.prototype.getItem = function (key: string) {
      if (key === 'ga_consent') throw new Error('Consent storage blocked');
      return getItem.call(this, key);
    };
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key === 'ga_consent') throw new Error('Consent storage blocked');
      return setItem.call(this, key, value);
    };
  });
  await page.goto('/services/washer-repair');
  await expect(page.getByRole('dialog', { name: 'Cookie consent' })).toBeVisible();
  await page.getByRole('button', { name: 'Accept Cookies', exact: true }).click();
  await page.getByRole('button', { name: 'Schedule Washer Repair', exact: true }).click();
  expect(await events(page, 'booking_open')).toHaveLength(1);
  expect(
    (await commands(page)).some(
      (c) => c[0] === 'consent' && c[1] === 'update' && c[2]?.analytics_storage === 'granted',
    ),
  ).toBe(true);
});

test('service metadata, FAQs and structured data agree and remain usable on mobile', async ({
  page,
}) => {
  await consent(page, 'denied');
  for (const slug of [
    'washer-repair',
    'dryer-repair',
    'refrigerator-repair',
    'dishwasher-repair',
    'oven-range-repair',
    'more-appliances',
  ]) {
    await page.goto(`/services/${slug}`);
    const canonical = `${BUSINESS.url}/services/${slug}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /\$99 diagnostic, waived with repair/,
    );
    expect((await page.title()).match(/My Appliance Repair/g)).toHaveLength(1);
    const title = await page.title();
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(
      page
        .getByRole('navigation', { name: 'Breadcrumb' })
        .getByRole('link', { name: 'Services', exact: true }),
    ).toHaveAttribute('href', '/services');
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent!)));
    const service = schemas.filter((schema) => schema['@type'] === 'Service');
    expect(service).toHaveLength(1);
    expect(service[0]).toMatchObject({
      '@id': `${canonical}#service`,
      url: canonical,
      provider: { '@id': `${BUSINESS.url}/#business` },
    });
    const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
    expect(
      faq.mainEntity.find((q: { name: string }) => q.name === 'Do you offer same-day service?')
        .acceptedAnswer.text,
    ).toBe(SAME_DAY_SERVICE_ANSWER);
    const beforeBooking = page.getByRole('button', {
      name: /what can I check before booking|what should I do while waiting|what should I check before requesting/i,
    });
    await beforeBooking.click();
    await expect(beforeBooking).toHaveAttribute('aria-expanded', 'true');
    const answer = page.locator(`[id="${await beforeBooking.getAttribute('aria-controls')}"]`);
    await expect
      .poll(async () => answer.evaluate((el) => el.clientHeight >= el.scrollHeight))
      .toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
});

test('revised articles preserve URLs and publish dates while exposing actual edit dates', async ({
  page,
  request,
}) => {
  await consent(page, 'denied');
  for (const slug of [
    'dryer-heating-element-thermal-fuse-misdiagnosis',
    'stove-burners-wont-light-cheap-fix',
  ]) {
    await page.goto(`/blog/${slug}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${BUSINESS.url}/blog/${slug}`,
    );
    await expect(page.locator('time[datetime="2026-10-18"]')).toHaveText('October 18, 2026');
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent!)));
    const article = schemas.find((schema) => schema['@type'] === 'Article');
    expect(article.dateModified).toBe('2026-10-18');
    expect(article.datePublished).not.toBe(article.dateModified);
  }
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<lastmod>2026-10-18<\/lastmod>/g)).toHaveLength(2);
  await page.goto('/blog/stacking-washer-dryer-warranty-problems');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});
