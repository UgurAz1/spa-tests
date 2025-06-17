import { Page } from "@playwright/test";
import { NavigationLinks } from "./NavigationLinks";
import { LegalLinks } from "./LegalLinks";
import { SocialLinks } from "./SocialLinks";
import { BasePage } from "../BasePage";

export class FooterManager extends BasePage {
  private readonly navigationLinks: NavigationLinks;
  private readonly legalLinks: LegalLinks;
  private readonly socialLinks: SocialLinks;

  constructor(page: Page) {
    super(page);
    this.navigationLinks = new NavigationLinks(page);
    this.legalLinks = new LegalLinks(page);
    this.socialLinks = new SocialLinks(page);
  }

  get footerNavigationLinks() {
    return this.navigationLinks;
  }
  get footerLegalLinks() {
    return this.legalLinks;
  }
  get footerSocialinks() {
    return this.socialLinks;
  }
}
