import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { RegisterPage } from "./RegisterPage";

export class LoginPage extends BasePage {
  readonly emailField = this.page.locator("#email").first();
  readonly passwordField = this.page.locator("#password");
  readonly loginButton = this.page.locator("button", { hasText: "Login" });
  readonly registerButton = this.page.getByRole("link", {
    name: "Register now",
  });
  readonly goBackToLoginButton = this.page.getByText("Back to login");
  readonly forgotPasswordButton = this.page.getByText("Forgot password?");
  readonly resetEmailInput = this.page
    .locator("#modal")
    .getByRole("textbox", { name: "E-mail address *" });
  readonly sendResetLinkButton = this.page.getByRole("button", {
    name: "Send link",
  });
  readonly closeResetModalImg = this.page
    .locator("#modal")
    .getByRole("img", { name: "close" });

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async gotToRegister() {
    await this.registerButton.click();
    return new RegisterPage(this.page);
  }

  async goToResetPassword() {
    await this.forgotPasswordButton.click();
  }

  async goBacktoLogin() {
    await this.goBackToLoginButton.click();
  }

  async enterEmailToResetPassword(email: string) {
    await this.resetEmailInput.fill(email);
  }

  async sendeEmailToResetPassword() {
    await this.sendResetLinkButton.click();
  }

  async closeModal() {
    await this.closeResetModalImg.click();
  }
}
