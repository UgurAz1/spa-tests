import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class ViewOrders extends BasePage {
  private readonly order = this.page.getByRole('img', { name: 'arrow-down' })
  private readonly cancelButton = this.page.getByRole('button', { name: 'Cancel' })
  private readonly invoiceButton = this.page.getByRole('button', { name: 'Invoice' })

  constructor(page: Page) {
    super(page)
  }


  async cancelOrder(orderNumber: number) {
    await this.order.nth(-1 + orderNumber).click();
    await this.cancelButton.click();
  }

  async downloadInvoice(orderNumber: number) {
    await this.order.nth(-1 + orderNumber).click();
    await this.invoiceButton.click()
  }
}