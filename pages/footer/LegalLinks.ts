import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LegalLinks extends BasePage {
  private readonly footerImprintLink = this.page.getByRole('link', { name: 'Imprint' })
  private readonly footerPrivacyLink = this.page.getByRole('link', { name: 'Privacy' })
  private readonly footerDisclaimerLink = this.page.getByRole('link', { name: 'Disclaimer' })
  private readonly footerHouseRulesLink = this.page.getByRole('link', { name: 'House rules' })
  private readonly footerTermsAnsConditionsLink = this.page.getByRole('link', { name: 'Terms and conditions' })

  constructor(page: Page) {
    super(page)
  }

  async goToImprint() {
    await this.footerImprintLink.click()
    await this.expectUrl('impressum')
  }

  async goToPrivacyLink() {
    await this.footerPrivacyLink.click()
    await this.expectUrl('datenschutz')
  }

  async goToDisclaimer() {
    await this.footerDisclaimerLink.click()
    await this.expectUrl('widerruf')
  }

  async goToHouseRules() {
    await this.footerHouseRulesLink.click()
    await this.expectUrl('hausordnung')
  }

  async goToTermsAndConditions() {
    await this.footerTermsAnsConditionsLink.click()
    await this.expectUrl('agb')
  }
}