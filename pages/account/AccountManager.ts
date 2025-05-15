import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { LoginPage } from "./LoginPage";
import { Profile } from "../profile/Profile";

export class AccountManager extends BasePage {
  private readonly loginPage: LoginPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
  }

  async openAccountEntryPoint() {
    await this.page.locator("#profileMenu").first().click();
  }

  async goToProfile(): Promise<Profile> {
    await this.page
      .locator("#profileMenu")
      .getByRole("link", { name: "Profile" })
      .click();
    return new Profile(this.page);
  }

  async goToLogin(): Promise<LoginPage> {
    await this.openAccountEntryPoint();
    return this.login;
  }

  async logout() {
    await this.page
      .locator("#profileMenu")
      .getByRole("link", { name: "Logout" })
      .click();
  }

  get login() {
    return this.loginPage;
  }

  get profile() {
    return new Profile(this.page);
  }
}
