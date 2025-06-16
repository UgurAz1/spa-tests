import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { LoginPage } from "./LoginPage";
import { Profile } from "../profile/Profile";
import { RegisterPage } from "./RegisterPage";

export class AccountManager extends BasePage {
  private readonly loginPage: LoginPage;
  private readonly registerPage: RegisterPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPage(page);
    this.registerPage = new RegisterPage(page);
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

  get register() {
    return new RegisterPage(this.page);
  }
}
