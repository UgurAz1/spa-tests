import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class AddOnsPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }
}
