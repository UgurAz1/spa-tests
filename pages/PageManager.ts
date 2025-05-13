import { Page } from '@playwright/test';;
import { BasePage } from './base/BasePage';
import { BookingPage } from './booking/BookingPage';
import { MailboxPage } from './email/MailBoxPage';
import { HeaderManager } from './header/HeaderManager';
import { FooterManager } from './footer/FooterManager';


export class PageManager extends BasePage {
  private readonly bookingPage: BookingPage;
  private readonly mailboxPage: MailboxPage;
  private readonly headerManager: HeaderManager;
  private readonly footerManager: FooterManager;

  constructor(page: Page) {
    super(page)
    this.bookingPage = new BookingPage(page);
    this.mailboxPage = new MailboxPage(page);
    this.headerManager = new HeaderManager(page);
    this.footerManager = new FooterManager(page)
  }

  get currentPage() {
    return this.page;
  }

  get header() {
    return this.headerManager;
  }

  get footer() {
    return this.footerManager
  }

  get booking() {
    return this.bookingPage
  }

  get mailbox() {
    return this.mailboxPage
  }

  get headerNavigation() {
    return this.header.navigationManager
  }

  get footerNavigation() {
    return this.footer.navigationLinks
  }

  get footerLegalLinks() {
    return this.footer.legalLinks
  }

  get footerSocialLinks() {
    return this.footer.socialLinks
  }
}

