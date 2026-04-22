import { test as setup } from '@playwright/test';
import { LoginPage } from './pages/login.page';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.login('admin@moukafih.nl', 'pass_1234');

  await page.waitForURL('**/dashboard', { timeout: 30000 });

  await page.context().storageState({
    path: 'e2e/.auth/user.json'
  });
});