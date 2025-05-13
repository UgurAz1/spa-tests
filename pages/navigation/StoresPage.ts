import { expect, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class StoresPage extends BasePage {
  private readonly learnMoreStuttgartButton = this.page.locator('.flex > div > .py-3').first()
  private readonly learnMoreMainzButton = this.page.locator('.lg\\:flex-row-reverse > div:nth-child(2) > div > .py-3').first()
  private readonly learnMoreHannoverButton = this.page.locator('div:nth-child(4) > div:nth-child(2) > div > .py-3')
  private readonly learnMoreMuenchenButton = this.page.locator('div:nth-child(5) > div:nth-child(2) > div > .py-3')
  private readonly learnMoreMannheimButton = this.page.locator('div:nth-child(6) > div:nth-child(2) > div > .py-3')


  constructor(page: Page) {
    super(page)
  }

  async learnMoreAboutStuttgart() {
    await this.learnMoreStuttgartButton.click({ force: true })
    await expect(this.page.getByRole('heading', { name: 'MySpa Stuttgart' })).toBeVisible();
  }

  async learnMoreAboutMainz() {
    await this.learnMoreMainzButton.click({ force: true })
    await expect(this.page.getByRole('heading', { name: 'MySpa Mainz' })).toBeVisible();
  }

  async learnMoreAboutHannover() {
    await this.learnMoreHannoverButton.click({ force: true })
    await expect(this.page.getByRole('heading', { name: 'MySpa Hannover' })).toBeVisible();
  }

  async learnMoreAboutMuenchen() {
    await this.learnMoreMuenchenButton.click({ force: true })
    await expect(this.page.getByRole('heading', { name: 'MySpa München' })).toBeVisible();
  }

  async learnMoreAboutMannheim() {
    await this.learnMoreMannheimButton.click({ force: true })
    await expect(this.page.getByRole('heading', { name: 'MySpa Mannheim' })).toBeVisible();
  }
}
