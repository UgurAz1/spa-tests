import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { StoresPage } from './StoresPage';
import { WellzonesPage } from './WellzonesPage';
import { AddOnsPage } from './AddOnsPage';
import { HowToPage } from './HowToPage';
import { VoucherPage } from './VoucherPage';
import { FranchisePage } from './FranchisePage';

export class Navigation extends BasePage {
  private readonly storesPage = this.page.getByRole('link', { name: 'Stores' }).first()
  private readonly wellzonesPage = this.page.getByRole('link', { name: 'Wellzones' }).first()
  private readonly addOnsPage = this.page.getByRole('link', { name: 'Add-Ons' }).first()
  private readonly howToPage = this.page.getByRole('link', { name: 'How-To' }).first()
  private readonly voucherPage = this.page.getByRole('link', { name: 'Gift Voucher' }).first()
  private readonly franchisePage = this.page.getByRole('link', { name: 'Franchise' }).first()

  constructor(page: Page) {
    super(page)
  }

  async goToStores(): Promise<StoresPage> {
    await this.storesPage.click()
    return new StoresPage(this.page)
  }

  async goToWellzones(): Promise<WellzonesPage> {
    await this.wellzonesPage.click()
    return new WellzonesPage(this.page)
  }

  async goToAddOns(): Promise<AddOnsPage> {
    await this.addOnsPage.click()
    return new AddOnsPage(this.page)
  }
  async goToHowTo(): Promise<HowToPage> {
    await this.howToPage.click()
    return new HowToPage(this.page)
  }

  async goToVoucher(): Promise<VoucherPage> {
    await this.voucherPage.click()
    return new VoucherPage(this.page)
  }

  async goToFranchise(): Promise<FranchisePage> {
    await this.franchisePage.click()
    return new FranchisePage(this.page)
  }
}