import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ManageAddress extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
