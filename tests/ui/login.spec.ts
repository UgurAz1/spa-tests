import { test, expect } from "../fixtures/pageObjectFixtures";
import { UserHelper } from "../../utils/UserHelper";

test("TC-L01: Login mit gültigen Daten", async ({ page, pages }) => {
  const account = pages.header.accountManager;
  const user = UserHelper.load();

  await page.goto("/");

  await account.openAccountEntryPoint();
  await account.login.login(user.email, user.password);

  await expect(page.getByText("Welcome back")).toBeVisible();
});
