import { test, expect } from '@playwright/test';

test('shows user dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /dashboard|welcome/i })).toBeVisible();
});