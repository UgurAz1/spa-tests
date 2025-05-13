import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class ManageAddress extends BasePage {


  constructor(page: Page) {
    super(page)
  }
}