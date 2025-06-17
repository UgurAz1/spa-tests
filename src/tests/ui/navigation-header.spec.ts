import { test, expect } from "../../fixtures/pageObjectFixtures";

test.describe("Test header section", () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto("/");
    await pages.acceptCookiesIfVisible();
  });

  test("TC-N01: Navigate to Stores", async ({ pages }) => {
    await pages.headerNavigation.goToStores();
    await pages.expectUrl("locations");
    await expect(pages.currentPage.locator("h1")).toContainText("Filialen");
  });

  test("TC-N02: Navigate to Wellzones", async ({ pages }) => {
    await pages.headerNavigation.goToWellzones();
    await pages.expectUrl("wellzones");
    await expect(pages.currentPage.locator("h1")).toContainText("Wellzone");
  });

  test("TC-N03: Navigate to Add-Ons", async ({ pages }) => {
    await pages.headerNavigation.goToAddOns();
    await pages.expectUrl("add-ons");
    await expect(pages.currentPage.locator("h1")).toContainText("Add-Ons");
  });

  test("TC-N04: Navigate to How-To", async ({ pages }) => {
    await pages.headerNavigation.goToHowTo();
    await pages.expectUrl("how-to");
    await expect(pages.currentPage.locator("h1")).toContainText("How to");
  });

  test("TC-N05: Navigate to Gift Voucher", async ({ pages }) => {
    await pages.headerNavigation.goToVoucher();
    await pages.expectUrl("gutscheine");
    await expect(pages.currentPage.locator("h1")).toContainText("gift");
  });

  test("TC-N06: Navigate to Franchise", async ({ pages }) => {
    await pages.headerNavigation.goToFranchise();
    await pages.expectUrl("franchise");
    await expect(pages.currentPage.locator("h1")).toContainText("franchise");
  });
});
