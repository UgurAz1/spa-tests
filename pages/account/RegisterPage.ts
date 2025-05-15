import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export interface RegisterData {
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  countryNumber: number;
  email: string;
  repeatEmail: string;
  birthdayDay: number;
  birthdayMonth: number;
  birthdayYear: number;
  password: string;
  repeatPassword: string;
}

export class RegisterPage extends BasePage {
  private readonly goBackToLoginButton = this.page.getByRole("link", {
    name: "Back to login",
  });
  private readonly salutation = this.page.locator("#salutation");
  private readonly firstName = this.page.getByPlaceholder("Firstname *");
  private readonly lastName = this.page.getByPlaceholder("Lastname *");
  private readonly street = this.page.getByPlaceholder("Street *");
  private readonly houseNumber = this.page.getByPlaceholder("House no. *");
  private readonly zipCode = this.page.getByPlaceholder("ZIP Code *");
  private readonly city = this.page.getByPlaceholder("City *");
  private readonly country = this.page.locator("#country");
  private readonly emailField = this.page
    .getByPlaceholder("E-mail address *")
    .first();
  private readonly confirmEmail = this.page.getByPlaceholder(
    "Repeat e-mail address *",
  );
  private readonly birthdayDay = this.page.locator("#birthdayDay");
  private readonly birthdayMonth = this.page.locator("#birthdayMonth");
  private readonly birthdayYear = this.page.locator("#birthdayYear");
  private readonly passwordField = this.page.getByPlaceholder("Password *", {
    exact: true,
  });
  private readonly confirmPassword =
    this.page.getByPlaceholder("Repeat Password *");
  private readonly policyCheckBox = this.page.locator(
    "#dataProtectionConfirmation",
  );
  private readonly registerButton = this.page.locator(
    'button:has-text("Register")',
  );

  constructor(page: Page) {
    super(page);
  }

  async register(registerData: RegisterData) {
    await this.salutation.selectOption({ value: "0" });
    await this.firstName.fill(registerData.firstName);
    await this.lastName.fill(registerData.lastName);
    await this.street.fill(registerData.street);
    await this.houseNumber.fill(registerData.houseNumber);
    await this.zipCode.fill(registerData.zip);
    await this.city.fill(registerData.city);
    await this.country.selectOption({ value: `${registerData.countryNumber}` });
    await this.emailField.fill(registerData.email);
    await this.confirmEmail.fill(registerData.repeatEmail);
    await this.birthdayDay.selectOption({
      value: `${registerData.birthdayDay}`,
    });
    await this.birthdayMonth.selectOption({
      value: `${registerData.birthdayMonth}`,
    });
    await this.birthdayYear.selectOption({
      value: `${registerData.birthdayYear}`,
    });
    await this.passwordField.fill(registerData.password);
    await this.confirmPassword.fill(registerData.repeatPassword);
    await this.policyCheckBox.check();
    await this.registerButton.click();
  }

  async goBackToLogin() {
    await this.goBackToLoginButton.click();
  }
}
