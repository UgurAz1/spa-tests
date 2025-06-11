import { test as setup } from "../fixtures/pageObjectFixtures";
import { UserHelper } from "../../utils/UserHelper";
import { PageManager } from "../../pages/PageManager";
import fs from "fs";
const storageStatePath = ".auth/state.json";

setup("Login and save storage state", async ({ page, pages, context }) => {
  const user = UserHelper.load();
  const header = pages.header;

  fs.mkdirSync(".auth", { recursive: true });

  await page.goto("/login");

  await header.acceptCookiesIfVisible();
  await header.languageSwitcher.selectLanguage("English");
  await header.accountManager.login.login(user.email, user.password);
  await page.screenshot({ path: "debug-after-login2.png", fullPage: true });

  const [userInfoResponse] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/UserInfo") && r.status() === 200,
      { timeout: 10000 },
    ),
  ]);

  const userInfo = await userInfoResponse.json();

  fs.writeFileSync(".auth/userInfo.json", JSON.stringify(userInfo, null, 2));

  if (userInfoResponse) {
    const userInfo = await userInfoResponse.json();
    fs.writeFileSync(".auth/userInfo.json", JSON.stringify(userInfo, null, 2));
    console.log("userInfo.json saved");
  } else {
    fs.writeFileSync(
      ".auth/userInfo.json",
      JSON.stringify({ error: "not received" }, null, 2),
    );
    console.warn("userInfo.json saved with error message");
  }

  await context.storageState({ path: storageStatePath });
});
