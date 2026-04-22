import { test, expect } from '@playwright/test';

test('JWT refresh flow works (401 → refresh → retry)', async ({ page }) => {

  let firstCallCount = 0;

  // Intercept API calls
  await page.route('**/api/v1/users*', async route => {
    firstCallCount++;
    if (firstCallCount === 1) {
      // Simulate expired token
      return route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Token expired' })
      });
    }

    // Retry succeeds
    return route.fulfill({
      status: 200,
      body: JSON.stringify({
        data: [
          { id: 1, email: 'refreshed@test.com', role: 'ROLE_USER' }
        ],
        meta: { page: 1, total: 1 }
      })
    });
  });

  // Intercept refresh endpoint
  await page.route('**/api/token/refresh', async route => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify({
        token: 'NEW_ACCESS_TOKEN',
        refresh_token: 'NEW_REFRESH_TOKEN'
      })
    });
  });

  // Go to protected page
  await page.goto('/users');

  // Expect data to eventually load (after retry)
  // We use a more specific locator and longer timeout
  await expect(page.locator('table')).toContainText('refreshed@test.com', { timeout: 15000 });
});