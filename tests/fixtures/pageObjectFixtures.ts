import { test as base, Page, BrowserContext } from "@playwright/test";
import { PageManager } from "../../pages/PageManager";

type pageManagerFixture = {
  pages: PageManager;
  context: BrowserContext;
};

export const test = base.extend<pageManagerFixture>({
  pages: async ({ page }, use) => {
    await use(new PageManager(page));
  },
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
});

export { expect } from "@playwright/test";
