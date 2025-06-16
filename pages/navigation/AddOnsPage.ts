import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AddOnsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
