import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ViewOrders extends BasePage {
  private readonly order = this.page.getByRole("img", { name: "arrow-down" });
  private readonly cancelButton = this.page.getByRole("button", {
    name: "Cancel",
  });
  private readonly invoiceButton = this.page.getByRole("button", {
    name: "Invoice",
  });

  constructor(page: Page) {
    super(page);
  }

  async cancelFirstCancelableOrder() {
    await this.order.first().waitFor({ state: "visible" });
    const orderCount = await this.order.count();

    for (let i = 0; i < orderCount; i++) {
      await this.order.nth(i).click();

      if (await this.cancelButton.isVisible({ timeout: 500 })) {
        await this.cancelButton.click();
        return;
      }
    }
  }

  // async cancelOrder(orderNumber: number) {
  //   await this.order.nth(orderNumber - 1).click();
  //   if (await this.cancelButton.isVisible()) {
  //     await this.cancelButton.click();
  //   } else {
  //     await this.invoiceButton.click();
  //   }
  // }

  async downloadInvoice(orderNumber: number) {
    await this.order.nth(orderNumber - 1).click();
    await this.invoiceButton.click();
  }
}
