import { Page } from '@playwright/test';
import { NavigationLinks } from './NavigationLinks';
import { LegalLinks } from './LegalLinks';
import { SocialLinks } from './SocialLinks';
import { BasePage } from '../base/BasePage';

export class FooterManager extends BasePage {
  readonly navigationLinks: NavigationLinks;
  readonly legalLinks: LegalLinks;
  readonly socialLinks: SocialLinks;

  constructor(page: Page) {
    super(page)
    this.navigationLinks = new NavigationLinks(page);
    this.legalLinks = new LegalLinks(page);
    this.socialLinks = new SocialLinks(page);
  }
}