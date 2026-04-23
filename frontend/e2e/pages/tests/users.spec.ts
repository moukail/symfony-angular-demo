import { test, expect } from '@playwright/test';

test('users table loads and paginates', async ({ page }) => {
  await page.goto('/users');

  // Wait for table
  const table = page.locator('table');
  await expect(table).toBeVisible();
  
  // Check rows exist
  const rows = table.locator('tbody tr');
  await expect(rows.first()).toBeVisible({ timeout: 10000 });

  // Go to next page
  await page.click('button[aria-label="Next page"]');

  // Ensure new data loads
  await expect(rows.first()).toBeVisible();
});