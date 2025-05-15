import { Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { BookingManager } from "./booking/BookingManager";
import { MailboxManager } from "./email/MailBoxManager";
import { HeaderManager } from "./header/HeaderManager";
import { FooterManager } from "./footer/FooterManager";

export class PageManager extends BasePage {
  private readonly bookingManager: BookingManager;
  private readonly mailboxManager: MailboxManager;
  private readonly headerManager: HeaderManager;
  private readonly footerManager: FooterManager;

  constructor(page: Page) {
    super(page);
    this.bookingManager = new BookingManager(page);
    this.mailboxManager = new MailboxManager(page);
    this.headerManager = new HeaderManager(page);
    this.footerManager = new FooterManager(page);
  }

  get currentPage() {
    return this.page;
  }

  get header() {
    return this.headerManager;
  }

  get footer() {
    return this.footerManager;
  }

  get booking() {
    return this.bookingManager;
  }

  get mailbox() {
    return this.mailboxManager;
  }

  get headerNavigation() {
    return this.header.navigationManager;
  }

  get footerNavigation() {
    return this.footer.footerNavigationLinks;
  }

  get footerLegalLinks() {
    return this.footer.footerLegalLinks;
  }

  get footerSocialLinks() {
    return this.footer.footerSocialinks;
  }
}
