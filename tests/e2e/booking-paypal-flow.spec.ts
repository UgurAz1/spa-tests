import { test, expect } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';

test('TC-E2E: Complete booking flow with PayPal payment', async ({ page, browser }) => {
  const pages = new PageManager(page);

  await page.goto('/');

  await pages.acceptCookiesIfVisible()
  await pages.header.navigationManager.goToStores()
  console.log('selecting store...');
  await pages.bookingPage.selectFiliale('München');
  console.log('setting check in date...');
  await pages.bookingPage.setCheckinDateFromToday(16);
  console.log('selecting persons...');
  await pages.bookingPage.selectPersons(1);
  console.log('selecting duration...');
  await pages.bookingPage.selectDuration(2);
  console.log('submitting booking');
  await pages.bookingPage.submitBooking();
  await page.waitForTimeout(2000);
  console.log('selecting time');
  await pages.bookingPage.selectTime();
  console.log('confirming booking...');
  await pages.bookingPage.bookWellzone();
  console.log('skipping insurance');
  await pages.bookingPage.skipInsurance();
  console.log('checking checkboxes');
  await pages.bookingPage.scrollToCheckout();
  await pages.bookingPage.acceptTermsAndPrivacy();
  console.log('confirming booking');

  await pages.bookingPage.confirmBooking();

  await pages.bookingPage.pickPaymentMethod("PayPal");
  await pages.bookingPage.continuePayment();
  await page.waitForTimeout(5000);

  console.log('Inserting Paypal email and password...');

  await pages.bookingPage.loginToPaypalAndPay();

  // await expect(page.locator('text=YOUR PAYMENT IS BEING PROCESSED...')).toBeVisible({ timeout: 10000 });

  await pages.mailboxPage.login();
  await pages.mailboxPage.openInbox();
  await pages.mailboxPage.openEmailBySubject('Buchungsbestätigung');
  await pages.mailboxPage.downloadAttachment('Rechnung.pdf');
});
