import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { generateTimeSlots } from "../../helpers/timeHelpers";
import dotenv from "dotenv";
dotenv.config();

export class BookingManager extends BasePage {
  readonly locationSelector: Locator;
  readonly checkinSelector: Locator;
  readonly personsSelector: Locator;
  readonly durationSelector: Locator;
  readonly submitButton: Locator;
  readonly stepContainer = this.page.locator(".stepSelection");
  constructor(page: Page) {
    super(page);

    const bookingContainer = page.locator("#bannerContainer");

    this.stepContainer = this.page.locator(".stepSelection");
    this.locationSelector = bookingContainer.getByText("Location");
    this.checkinSelector = bookingContainer.getByText("Check-in");
    this.personsSelector = bookingContainer.getByText("Who");
    this.durationSelector = bookingContainer.getByText("Duration");
    this.submitButton = bookingContainer.getByRole("button", { name: "Book" });
  }

  async selectLocation(name: string) {
    await this.locationSelector.click();

    const locationContent = this.page
      .locator("#step-0 .flex.flex-col.text-myspa-blue")
      .first();
    await locationContent.scrollIntoViewIfNeeded();

    await this.page.getByText(name, { exact: true }).first().click();
  }

  async selectPersons(persons: number) {
    await this.personsSelector.click();
    const personSelection = this.page.locator(
      ".text-black.text-md.text-center.font-overpass-light",
    );
    await personSelection.nth(-1 + persons).click();
  }

  async selectDuration(duration: number) {
    await this.durationSelector.click();
    const durationSelection = this.page.locator(
      ".cursor-pointer.text-base.text-myspa-blue",
    );
    await durationSelection.nth(-2 + duration).click();
  }

  async submitBooking() {
    await this.submitButton.click({ force: true });
  }

  async selectTime() {
    const times = generateTimeSlots(9, 17);

    for (const time of times) {
      const label = this.page.locator("label", { hasText: time }).first();
      if ((await label.count()) > 0 && (await label.isVisible())) {
        await label.check({ force: true });
        return;
      }
    }
  }

  async bookWellzone() {
    const button = this.page.getByRole("button", { name: "Book Wellzone" });
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  async skipInsurance() {
    await expect(
      this.page.getByText("Continue without insurance"),
    ).toBeVisible();
    await this.page
      .getByRole("button", { name: "continue without insurance" })
      .click();
  }

  async scrollToCheckout() {
    await this.page
      .locator("text=Check your information")
      .scrollIntoViewIfNeeded();
  }

  async acceptTermsAndPrivacy() {
    const checkboxes = this.page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 1; i < count; i++) {
      await checkboxes.nth(i).check();
    }
  }

  async confirmBooking() {
    await this.page
      .getByRole("button", { name: "Pay for your Wellzone now" })
      .click();
  }

  async pickPaymentMethod(payment: string) {
    await this.page.getByRole("button", { name: `${payment}` }).click();
  }

  async continuePayment() {
    await this.page.getByRole("button", { name: "Pay Now" }).click();
  }

  async loginToPaypalAndPay() {
    const emailInput = this.page.locator('input[name="login_email"]');
    const passwordInput = this.page.locator("#password");
    const email = process.env.PAYPAL_BUYER_EMAIL || "";
    const password = process.env.PAYPAL_BUYER_PASSWORD || "";

    await this.page.locator("#email").waitFor({ timeout: 10000 });

    if (await passwordInput.isVisible()) {
      await passwordInput.fill(password);
      await this.page.getByRole("button", { name: "Einloggen" }).click();
    } else {
      await expect(emailInput).toBeVisible();
      await emailInput.fill(email);

      await this.page.getByRole("button", { name: "Weiter" }).click();
      await expect(passwordInput).toBeVisible();
      await passwordInput.fill(password);

      await this.page.getByRole("button", { name: "Einloggen" }).click();
    }

    const confirmBtn = this.page.getByRole("button", {
      name: "Weiter zur Überprüfung der Bestellung",
    });
    await confirmBtn.waitFor();
    await confirmBtn.click();
  }

  async setCheckinDateFromToday(numberOfDaysFromToday: number) {
    const checkIn = this.page.getByText("Check-in");
    await checkIn.first().click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday,
    );

    const checkInDate = this.page.locator(
      "#step-1 .text-myspa-blue.text-md.font-semibold",
    );
    await expect(checkInDate).toHaveText(dateToAssert);
  }

  private async selectDateInTheCalendar(
    numberOfDaysFromToday: number,
  ): Promise<string> {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);

    const expectedDate = date.getDate().toString();

    const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedDay = date.getDate().toString().padStart(2, "0");
    const expectedYear = date.getFullYear();
    const dateToAssert = `on ${expectedMonthShort} ${expectedDay}`;
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;

    const calendarInput = this.page
      .locator(".flex.flex-row.self-center")
      .first();
    await calendarInput.scrollIntoViewIfNeeded();

    while (true) {
      const calendarLeft = await this.page
        .locator("#step-1 .basis-5\\/12.flex.justify-center")
        .first()
        .textContent();
      const calendarRight = await this.page
        .locator("#step-1 .basis-5\\/12.flex.justify-center")
        .nth(1)
        .textContent();

      if (
        calendarLeft?.includes(expectedMonthAndYear) ||
        calendarRight?.includes(expectedMonthAndYear)
      ) {
        const matchingDays = this.page
          .locator(".w-full.flex.flex-row.justify-center.selectable")
          .getByText(`${expectedDate}`, { exact: true });

        if (calendarLeft?.includes(expectedMonthAndYear)) {
          await matchingDays.nth(0).click();
        } else {
          await matchingDays.nth(1).click();
        }

        break;
      }

      await this.page
        .locator(".flex.justify-end.cursor-pointer.self-center")
        .first()
        .click();
      await this.page.waitForTimeout(300);
    }

    return dateToAssert;
  }
}
