import { test as base, Page, BrowserContext } from "@playwright/test";
import { PageManager } from "../pages/PageManager";
import fs from "fs";

type MyFixtures = {
  pageManager: PageManager;
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<MyFixtures>({
  context: async ({ browser }, use) => {
    const storagePath = ".auth/state.json";
    const context = await browser.newContext(
      fs.existsSync(storagePath) ? { storageState: storagePath } : undefined,
    );

    await use(context);

    if (!fs.existsSync(storagePath)) {
      await context.storageState({ path: storagePath });
    }

    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect, chromium } from "@playwright/test";
