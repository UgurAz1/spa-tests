import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
require('dotenv').config();

export class MailboxManager extends BasePage {
  constructor(page: Page) {
    super(page);

  }

  async login() {
    await this.page.goto('https://mailbox.org/de/');
    await this.page.getByRole('link', { name: 'Login' }).click();


    await this.page.getByRole('textbox', { name: 'E-Mail-Adresse' }).click();
    await this.page.getByRole('textbox', { name: 'E-Mail-Adresse' }).fill(`${process.env.MAILBOX_ORG_EMAIL}`);

    await this.page.getByRole('button', { name: 'Weiter' }).click();

    await this.page.getByRole('textbox', { name: 'Passwort' }).click();
    await this.page.getByRole('textbox', { name: 'Passwort' }).fill(`${process.env.MAILBOX_ORG_PASSWORD}`);
    await this.page.getByRole('button', { name: 'Login' }).click();

    await this.page.goto(`${process.env.MAILBOX_INBOX}`);
  }

  async openInbox() {
    await this.page.getByRole('button', { name: 'E-Mail' }).click();
  }

  async openEmailBySubject(subjectText: string) {
    const waitTime = subjectText.includes('Buchungsbestätigung') ? 60000 : 20000;
    await this.page.waitForTimeout(waitTime);
    await this.page.getByLabel(subjectText).getByText(subjectText).first().click();
  }

  async confirmRegistration() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.locator('iframe[title="E-Mail-Inhalt"]').contentFrame().getByRole('cell', { name: 'E-Mailadresse bestätigen' }).nth(1).click();
    const page1 = await page1Promise;

    await page1.goto(`${process.env.BASE_URL}/login?success=true`);
  }

  async confirmNewsletter() {
    await this.page.locator('iframe[title="E-Mail-Inhalt"]').contentFrame().getByRole('cell', { name: 'Newsletter bestätigen', exact: true }).click();
  }


  async downloadAttachment(filename: string) {
    await this.page.getByRole('button', { name: 'Anhänge' }).click();
    await this.page.getByRole('button', { name: filename }).first().click();

    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('menuitem', { name: 'Herunterladen' }).click();
    await downloadPromise;

  }
}
