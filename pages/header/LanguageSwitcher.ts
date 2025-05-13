import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LanguageSwitcher extends BasePage {
  private readonly languageMenu: Locator;

  constructor(page: Page) {
    super(page)
    this.languageMenu = page.locator('#langMenu span')
  }

  async open() {
    await this.languageMenu.click();
  }

  async selectLanguage(language: string) {
    await this.open();
    await this.page.getByRole('link', { name: language }).click();
  }
}