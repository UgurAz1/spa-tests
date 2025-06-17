import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CartPage extends BasePage {
  private readonly finalizeBookingButton: Locator;
  private readonly cancelBookingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.finalizeBookingButton = page.getByRole("button", {
      name: "Finalize booking",
    });
    this.cancelBookingButton = page.locator(".flex > .stroke-white");
  }

  async finalizeBooking() {
    await this.finalizeBookingButton.click();
  }

  async cancelBooking() {
    await this.cancelBookingButton.click();
  }
}
