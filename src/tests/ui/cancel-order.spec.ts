import { expect, test } from "../../fixtures/pageObjectFixtures";

test("TC-D01: Cancel order by number", async ({ page, pages }) => {
  await page.goto("/");

  await pages.header.accountManager.openAccountEntryPoint();
  await pages.header.accountManager.goToProfile();
  const orders = await pages.header.accountManager.profile.viewOrders();
  await orders.cancelFirstCancelableOrder();

  await expect(page.getByText("Order successfully canceled.")).toBeVisible({
    timeout: 7000,
  });
});
