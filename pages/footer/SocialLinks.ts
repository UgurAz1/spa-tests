import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SocialLinks extends BasePage {
  private readonly footerInstagramLink: Locator
  private readonly footerTikTokLink: Locator
  private readonly footerFacebookLink: Locator

  constructor(page: Page) {
    super(page)
    this.footerInstagramLink = page.getByRole('link', { name: 'instagram' })
    this.footerTikTokLink = page.getByRole('link', { name: 'tiktok' })
    this.footerFacebookLink = page.getByRole('link', { name: 'facebook' })
  }


  async gotToInstagram() {
    await this.footerInstagramLink.click()
    await this.expectUrl('instagram')
  }

  async goToTikTok() {
    await this.footerTikTokLink.click()
    await this.expectUrl('tiktok')
  }

  async goToFacebook() {
    await this.footerFacebookLink.click()
    await this.expectUrl('facebook')
  }
}