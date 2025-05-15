import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectUrl(partialUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }

  async isVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async scrollToElement(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  // todo: decline/configure
  async acceptCookiesIfVisible() {
    const cookieButton = this.page.getByRole("button", {
      name: "Necessary only",
    });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }
  }

  async subscribeToNewsletter(email: string) {
    const newsletterBanner = this.page.locator(
      ".bg-white > div:nth-child(2) > div > .border-myspa-blue",
    );
    await newsletterBanner.click();
    await this.page
      .getByRole("textbox", { name: "E-Mail address *" })
      .fill(email);
    await this.page.locator("form").getByRole("button").click();
  }
}
