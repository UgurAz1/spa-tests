import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class HomePage extends BasePage {
  private readonly header: Locator;
  private readonly navigation: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator("header");
    this.navigation = page.locator("nav");
  }

  async checkPageLoaded() {
    await expect(this.header).toBeVisible();
    await expect(this.navigation).toBeVisible();
  }
}
