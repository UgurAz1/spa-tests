import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class VoucherPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
