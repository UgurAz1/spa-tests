import { test as setup, chromium } from "@playwright/test";
import { UserHelper } from "../../utils/UserHelper";
import { PageManager } from "../../pages/PageManager";
import fs from "fs";

const storageStatePath = ".auth/state.json";

setup("Login and save storage state", async ({}) => {
  const user = UserHelper.load();

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const pages = new PageManager(page);
  const header = pages.header;

  await page.goto(`${process.env.BASE_URL}/login`);

  await header.languageSwitcher.selectLanguage("English");
  await header.accountManager.goToLogin();
  await header.accountManager.login.login(user.email, user.password);

  const [userInfoResponse] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/UserInfo") && r.status() === 200,
    ),
  ]);

  const userInfo = await userInfoResponse.json();

  fs.writeFileSync(".auth/userInfo.json", JSON.stringify(userInfo, null, 2));

  await page.context().storageState({ path: storageStatePath });
  await browser.close();
});
