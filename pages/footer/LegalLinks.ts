import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class LegalLinks extends BasePage {
  private readonly footerImprintLink = this.page.getByRole("link", {
    name: "Imprint",
  });
  private readonly footerPrivacyLink = this.page.locator(
    "//a[normalize-space(text())='Privacy']",
  );
  private readonly footerDisclaimerLink = this.page.getByRole("link", {
    name: "Disclaimer",
  });
  private readonly footerHouseRulesLink = this.page.getByRole("link", {
    name: "House rules",
  });
  private readonly footerTermsAnsConditionsLink = this.page.getByRole("link", {
    name: "Terms and conditions",
  });

  constructor(page: Page) {
    super(page);
  }

  async goToImprint() {
    await this.footerImprintLink.click();
  }

  async goToPrivacyLink() {
    await this.footerPrivacyLink.click();
  }

  async goToDisclaimer() {
    await this.footerDisclaimerLink.click();
  }

  async goToHouseRules() {
    await this.footerHouseRulesLink.click();
  }

  async goToTermsAndConditions() {
    await this.footerTermsAnsConditionsLink.click();
  }
}
