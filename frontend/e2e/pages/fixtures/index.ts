import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../login.page';

//import { DashboardPage } from '../pages/dashboard.page';

type Fixtures = {
  loginPage: LoginPage;
  //authenticatedPage: DashboardPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Just visit the dashboard as we are already logged in via storageState
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await use(page as any);
  },
});

export { expect };