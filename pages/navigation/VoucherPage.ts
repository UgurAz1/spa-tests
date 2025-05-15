import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class VoucherPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
