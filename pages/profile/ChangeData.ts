import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ChangeData extends BasePage {
  readonly deleteButton: Locator;
  readonly confirmDeletionButton: Locator;
  readonly cancelDeletionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteButton = page.getByRole("button", {
      name: "Delete profile and data now",
    });
    this.confirmDeletionButton = page.getByRole("button", {
      name: "Delete",
      exact: true,
    });
    this.cancelDeletionButton = page.getByRole("button", {
      name: "Cancel",
      exact: true,
    });
  }

  async deleteProfile() {
    await this.deleteButton.click();
  }

  async confirmDeletion() {
    await this.confirmDeletionButton.click();
  }

  async cancelDeletion() {
    await this.cancelDeletionButton.click();
  }
}
