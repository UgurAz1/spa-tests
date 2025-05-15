import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class NavigationLinks extends BasePage {
  private readonly storesLink = this.page
    .getByRole("link", { name: "stores" })
    .nth(3);
  private readonly wellzonesLink = this.page
    .getByRole("link", { name: "wellzones" })
    .nth(3);
  private readonly addOnsLink = this.page
    .getByRole("link", { name: "add-ons" })
    .nth(3);
  private readonly howToLink = this.page
    .getByRole("link", { name: "how-to" })
    .nth(3);
  private readonly giftVoucherLink = this.page
    .getByRole("link", { name: "gift voucher" })
    .nth(3);
  private readonly franchiseLink = this.page
    .getByRole("link", { name: "franchise" })
    .nth(3);
  private readonly jobsLink = this.page.getByRole("link", { name: "jobs" });
  private readonly faqLink = this.page.getByRole("link", { name: "faq" });

  constructor(page: Page) {
    super(page);
  }

  async goToStores() {
    await this.storesLink.click();
  }
  async goToWellzones() {
    await this.wellzonesLink.click();
  }
  async goToAddOns() {
    await this.addOnsLink.click();
  }
  async goToHowTo() {
    await this.howToLink.click();
  }
  async goToGiftVoucher() {
    await this.giftVoucherLink.click();
  }
  async goToFranchise() {
    await this.franchiseLink.click();
  }
  async goToJobs() {
    await this.jobsLink.click();
  }
  async goToFaq() {
    await this.faqLink.click();
  }
}
