import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class HowToPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async checkHowToSection() {
    await this.page.waitForSelector("text=How-To");
  }
}
