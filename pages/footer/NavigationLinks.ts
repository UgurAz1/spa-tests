import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class NavigationLinks extends BasePage {
  private readonly storesLink = this.page.getByRole('link', { name: 'stores' }).nth(3);
  private readonly wellzonesLink = this.page.getByRole('link', { name: 'wellzones' }).nth(3);
  private readonly addOnsLink = this.page.getByRole('link', { name: 'add-ons' }).nth(3);
  private readonly howToLink = this.page.getByRole('link', { name: 'how-to' }).nth(3);
  private readonly giftVoucherLink = this.page.getByRole('link', { name: 'gift voucher' }).nth(3);
  private readonly franchiseLink = this.page.getByRole('link', { name: 'franchise' }).nth(3);
  private readonly jobsLink = this.page.getByRole('link', { name: 'jobs' });
  private readonly faqLink = this.page.getByRole('link', { name: 'faq' });

  constructor(page: Page) {
    super(page)
  }

  async goToStores() {
    await this.storesLink.click()
    await this.expectUrl('locations')
  }
  async goToWellzones() {
    await this.wellzonesLink.click()
    await this.expectUrl('wellzones')
  }
  async goToAddOns() {
    await this.addOnsLink.click()
    await this.expectUrl('add-ons')
  }
  async goToHowTo() {
    await this.howToLink.click()
    await this.expectUrl('how-to')
  }
  async goToGiftVoucher() {
    await this.giftVoucherLink.click()
    await this.expectUrl('gutscheine')
  }
  async goToFranchise() {
    await this.franchiseLink.click()
    await this.expectUrl('franchise')
  }
  async goToJobs() {
    await this.jobsLink.click()
    await this.expectUrl('jobs')
  }
  async goToFaq() {
    await this.faqLink.click()
    await this.expectUrl('faq')
  }
}