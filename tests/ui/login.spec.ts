import { test, expect, request } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { UserHelper } from '../../utils/UserHelper';

test.use({ storageState: { cookies: [], origins: [] } });

test('TC-L01: Login mit gültigen Daten', async ({ page }) => {
  const pages = new PageManager(page);
  const account = pages.header.accountManager
  const user = UserHelper.load();

  await page.goto('/');

  await account.openAccountEntryPoint();
  await account.loginPage.login(user.email, user.password)

  await expect(page.getByText('Welcome back')).toBeVisible()
});