import { test, expect } from '../fixtures/fixtures'; // unser custom test importieren


test.describe('Test navigation in header', () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto('/');
    await pages.acceptCookiesIfVisible()
  });

  test.describe('Navigation Links', () => {
    test('TC-FN01: Navigate to Filialen', async ({ pages }) => {
      await pages.footerNavigation.goToStores()
      await pages.expectUrl('locations')
      await expect(pages.currentPage.locator('h1')).toContainText('Filialen')
    });

    test('TC-FN02: Navigate to Wellzones', async ({ pages }) => {
      await pages.footerNavigation.goToWellzones()
      await pages.expectUrl('wellzones')
      await expect(pages.currentPage.locator('h1')).toContainText('Wellzone')
    });

    test('TC-FN03: Navigate to Add-Ons', async ({ pages }) => {
      await pages.footerNavigation.goToAddOns()
      await pages.expectUrl('add-ons')
      await expect(pages.currentPage.locator('h1')).toContainText('Add-Ons')
    });

    test('TC-FN04: Navigate to How-To', async ({ pages }) => {
      await pages.footerNavigation.goToHowTo()
      await pages.expectUrl('how-to')
      await expect(pages.currentPage.locator('h1')).toContainText('How to')
    });

    test('TC-FN05: Navigate to Gift Voucher', async ({ pages }) => {
      await pages.footerNavigation.goToGiftVoucher()
      await pages.expectUrl('gutscheine')
      await expect(pages.currentPage.locator('h1')).toContainText('gift')
    });

    test('TC-FN06: Navigate to Franchise', async ({ pages }) => {
      await pages.footerNavigation.goToFranchise()
      await pages.expectUrl('franchise')
      await expect(pages.currentPage.locator('h1')).toContainText('franchise')
    });

    test('TC-FN07: Navigate to jobs', async ({ pages }) => {
      await pages.footerNavigation.goToJobs()
      await pages.expectUrl('jobs')
      await expect(pages.currentPage.locator('h1')).toContainText('Teamwork makes the Wellness dream work.')
    });

    test('TC-FN08: Navigate to faq', async ({ pages }) => {
      await pages.footerNavigation.goToFaq()
      await pages.expectUrl('faq')
      await expect(pages.currentPage.locator('h1')).toContainText('Questions? Answers.')
    });


  })


});
