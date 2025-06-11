import { test, expect } from "../fixtures/pageObjectFixtures";

test.describe("Test footer section", () => {
  test.beforeEach(async ({ page, pages }) => {
    await page.goto("/");
    await pages.acceptCookiesIfVisible();
  });

  test.describe("Navigation Links", () => {
    test("TC-FN01: Navigate to stores", async ({ pages }) => {
      await pages.footerNavigation.goToStores();
      await pages.expectUrl("locations");
      await expect(pages.currentPage.locator("h1")).toContainText("Filialen");
    });

    test("TC-FN02: Navigate to Wellzones", async ({ pages }) => {
      await pages.footerNavigation.goToWellzones();
      await pages.expectUrl("wellzones");
      await expect(pages.currentPage.locator("h1")).toContainText("Wellzone");
    });

    test("TC-FN03: Navigate to add-ons", async ({ pages }) => {
      await pages.footerNavigation.goToAddOns();
      await pages.expectUrl("add-ons");
      await expect(pages.currentPage.locator("h1")).toContainText("Add-Ons");
    });

    test("TC-FN04: Navigate to how-to", async ({ pages }) => {
      await pages.footerNavigation.goToHowTo();
      await pages.expectUrl("how-to");
      await expect(pages.currentPage.locator("h1")).toContainText("How to");
    });

    test("TC-FN05: Navigate to gift voucher", async ({ pages }) => {
      await pages.footerNavigation.goToGiftVoucher();
      await pages.expectUrl("gutscheine");
      await expect(pages.currentPage.locator("h1")).toContainText("gift");
    });

    test("TC-FN06: Navigate to franchise", async ({ pages }) => {
      await pages.footerNavigation.goToFranchise();
      await pages.expectUrl("franchise");
      await expect(pages.currentPage.locator("h1")).toContainText("franchise");
    });

    test("TC-FN07: Navigate to jobs", async ({ pages }) => {
      await pages.footerNavigation.goToJobs();
      await pages.expectUrl("jobs");
      await expect(pages.currentPage.locator("h1")).toContainText(
        "Teamwork makes the Wellness dream work.",
      );
    });

    test("TC-FN08: Navigate to faq", async ({ pages }) => {
      await pages.footerNavigation.goToFaq();
      await pages.expectUrl("faq");
      await expect(pages.currentPage.locator("h1")).toContainText(
        "Questions? Answers.",
      );
    });
  });

  test.describe("Legal Links", () => {
    test("TC-FLL01: Navigate to imprint", async ({ pages }) => {
      await pages.footerLegalLinks.goToImprint();
      await pages.expectUrl("impressum");
      await expect(pages.currentPage.getByText("Imprint")).toBeVisible();
    });

    test("TC-FLL02: Navigate to privacy", async ({ pages }) => {
      await pages.footerLegalLinks.goToPrivacyLink();
      await pages.expectUrl("datenschutz");
      await expect(pages.currentPage.getByText("Privacy")).toBeVisible();
    });

    test("TC-FLL03: Navigate to disclaimer", async ({ pages }) => {
      await pages.footerLegalLinks.goToDisclaimer();
      await pages.expectUrl("widerruf");
      await expect(pages.currentPage.getByText("Disclaimer")).toBeVisible();
    });

    test("TC-FLL04: Navigate to house rules", async ({ pages }) => {
      await pages.footerLegalLinks.goToHouseRules();
      await pages.expectUrl("hausordnung");
      await expect(pages.currentPage.getByText("House rules")).toBeVisible();
    });

    test("TC-FLL05: Navigate to terms and conditions", async ({ pages }) => {
      await pages.footerLegalLinks.goToTermsAndConditions();
      await pages.expectUrl("agb");
      await expect(
        pages.currentPage.getByText("Terms and conditions"),
      ).toBeVisible();
    });
  });

  test.describe("Social Links", () => {
    test("TC-FSL01: Navigate to Instagram", async ({ pages }) => {
      await pages.footerSocialLinks.gotToInstagram();
      await pages.expectUrl("instagram");
    });

    test("TC-FSL02: Navigate to TikTok", async ({ pages }) => {
      await pages.footerSocialLinks.goToTikTok();
      await pages.expectUrl("tiktok");
    });

    test("TC-FSL03: Navigate to Facebook", async ({ pages }) => {
      await pages.footerSocialLinks.goToFacebook();
      await pages.expectUrl("facebook");
    });
  });
});
