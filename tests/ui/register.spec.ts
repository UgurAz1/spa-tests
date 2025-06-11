import { test } from "../fixtures/pageObjectFixtures";
import { UserHelper } from "../../utils/UserHelper";
import { generateFakeUser } from "../../helpers/userFactory";
import { generatePassword } from "../../helpers/passwordFactory";
import dotenv from "dotenv";

dotenv.config();

test.skip("TC-R01: Registration and confirmation", async ({ page, pages }) => {
  const emailAddress = process.env.MAILBOX_ORG_EMAIL!;
  const password = generatePassword(12, "!A1");
  const account = pages.header.accountManager;
  const mailboxPage = pages.mailbox;

  await page.goto("/");
  await account.openAccountEntryPoint();
  const registerPage = await account.login.gotToRegister();

  const fakeUser = generateFakeUser(emailAddress, password);

  await registerPage.register(fakeUser);

  await mailboxPage.login();
  await mailboxPage.openInbox();

  await mailboxPage.openEmailBySubject("Aktiviere Deinen Account");

  await mailboxPage.confirmRegistration();

  UserHelper.save({ email: emailAddress, password: password });
});
