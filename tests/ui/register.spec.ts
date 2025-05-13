import { expect, test } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';
import { UserHelper } from '../../utils/UserHelper';
import { generateFakeUser } from '../../helpers/userFactory';
import { generatePassword } from '../../helpers/passwordFactory';
import dotenv from 'dotenv';

dotenv.config();

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

test.use({ storageState: { cookies: [], origins: [] } });

test('TC-R01: Registration and confirmation', async ({ page }) => {
  const pages = new PageManager(page);
  const emailAddress = process.env.MAILBOX_ORG_EMAIL!;
  const password = generatePassword(12, '!A1')
  const account = pages.headerManager.accountManager
  const mailboxPage = pages.mailboxPage

  console.log('📝 E-Mail:', emailAddress);
  console.log('📝 Passwort:', password);

  await page.goto('/');
  await account.openAccountEntryPoint()
  await account.loginPage.gotToRegister()

  const fakeUser = generateFakeUser(emailAddress, password)

  await account.registerPage.register(fakeUser)

  await mailboxPage.login();
  await mailboxPage.openInbox();

  await mailboxPage.openEmailBySubject('Aktiviere Deinen Account')

  await mailboxPage.confirmRegistration();

  UserHelper.save({ email: emailAddress, password: password });
});


