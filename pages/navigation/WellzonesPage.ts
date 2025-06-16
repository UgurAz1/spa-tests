import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class WellzonesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async checkWellzonesContent() {
    await this.page.waitForSelector("text=Wellzones");
  }
}
