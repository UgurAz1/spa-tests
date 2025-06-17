import { test, expect } from "@playwright/test";
import { PageManager } from "../../pages/PageManager";

test("TC-E2E: Complete booking flow with PayPal payment", async ({ page }) => {
  const pages = new PageManager(page);

  await page.goto("/");

  await pages.acceptCookiesIfVisible();
  await pages.headerNavigation.goToStores();
  await pages.booking.selectLocation("München");
  await pages.booking.setCheckinDateFromToday(16);
  await pages.booking.selectPersons(1);
  await pages.booking.selectDuration(2);
  await pages.booking.submitBooking();
  await page.waitForTimeout(2000);
  await pages.booking.selectTime();
  await pages.booking.bookWellzone();
  await pages.booking.skipInsurance();
  await pages.booking.scrollToCheckout();
  await pages.booking.acceptTermsAndPrivacy();

  await pages.booking.confirmBooking();

  await pages.booking.pickPaymentMethod("PayPal");
  await pages.booking.continuePayment();
  await page.waitForTimeout(5000);

  await pages.booking.loginToPaypalAndPay();

  const page1Promise = page.waitForEvent("load");
  const page1 = await page1Promise;

  await expect(page1.getByText("Your booking was successful")).toBeVisible();
  await page1.screenshot({ path: "screenshots/paymentSuccess.png" });

  await pages.mailbox.login();
  await pages.mailbox.openInbox();
  await pages.mailbox.openEmailBySubject("Buchungsbestätigung");
  await pages.mailbox.downloadAttachment("Rechnung.pdf");
});
