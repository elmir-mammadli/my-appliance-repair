import { defineConfig } from '@playwright/test';

// Pure routing/validation tests: no browser, server, or live dispatch integrations.
export default defineConfig({
  testDir: './tests',
  testMatch: 'branch-routing.spec.ts',
  forbidOnly: !!process.env.CI,
  reporter: 'line',
  workers: 1,
});
