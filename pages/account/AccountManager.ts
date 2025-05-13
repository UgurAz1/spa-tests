import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { Profile } from '../profile/Profile';

export class AccountManager extends BasePage {
  readonly loginPage: LoginPage
  readonly registerPage: RegisterPage
  readonly profile: Profile

  constructor(page: Page) {
    super(page)
    this.loginPage = new LoginPage(page)
    this.registerPage = new RegisterPage(page)
    this.profile = new Profile(page)
  }

  async openAccountEntryPoint() {
    await this.page.locator('#profileMenu').first().click();
  }

  async goToProfile(): Promise<Profile> {
    await this.page.locator('#profileMenu').getByRole('link', { name: 'Profile' }).click()
    return new Profile(this.page)
  }

  async logout() {
    await this.page.locator('#profileMenu').getByRole('link', { name: 'Logout' }).click()
  }
}