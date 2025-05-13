import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class FranchisePage extends BasePage{

  constructor(page: Page) {
    super(page)
  }

  async checkFranchiseInfo() {
    await this.page.waitForSelector('text=Franchise');
  }
}
