import { test, expect } from '../fixtures';

test.describe('Authentication', () => {
  test('user can login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login('admin@moukafih.nl', 'pass_1234');
    await expect(page).toHaveURL('/dashboard');
  });

  test('shows error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('bad@example.com', 'wrongpassword');
    // We expect multiple errors or specific message
    await expect(loginPage.errorMessage.first()).toBeVisible();
  });

  test('validates required fields', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.submitButton.click();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
});