import { expect, test } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';

test('TC-D01: Cancel order by number', async ({ page }) => {
  const pages = new PageManager(page)

  await page.goto('/');

  await pages.header.accountManager.openAccountEntryPoint()
  await pages.header.accountManager.goToProfile()
  const orders = await pages.header.accountManager.profile.viewOrders();
  await orders.cancelOrder(1)

  //  await expect(page.getByText('Order successfully canceled.').toBeVisible()))

});