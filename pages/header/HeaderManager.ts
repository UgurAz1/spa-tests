import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { HomePage } from './HomePage';
import { Navigation } from '../navigation/NavigationManager';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AccountManager } from '../account/AccountManager';
import { CartPage } from './CartPage';

export class HeaderManager extends BasePage {
  readonly homePage: HomePage
  readonly navigationManager: Navigation
  readonly languageSwitcher: LanguageSwitcher
  readonly accountManager: AccountManager
  readonly cartPage: CartPage

  constructor(page: Page) {
    super(page)
    this.homePage = new HomePage(page)
    this.navigationManager = new Navigation(page)
    this.languageSwitcher = new LanguageSwitcher(page)
    this.accountManager = new AccountManager(page)
    this.cartPage = new CartPage(page)
  }
}