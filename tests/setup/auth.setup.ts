import { test as setup, chromium } from "@playwright/test";
import { UserHelper } from "../../utils/UserHelper";
import { PageManager } from "../../pages/PageManager";
import fs from "fs";
const storageStatePath = ".auth/state.json";

setup("Login and save storage state", async ({ page, context }) => {
  const user = UserHelper.load();
  const pages = new PageManager(page);
  const header = pages.header;
  fs.mkdirSync(".auth", { recursive: true });

  await page.goto("/login");

  await header.languageSwitcher.selectLanguage("English");
  await header.acceptCookiesIfVisible();
  await header.accountManager.goToLogin();
  await header.accountManager.login.login(user.email, user.password);
  await page.waitForTimeout(5000);
  await page.screenshot({ path: "debug-after-login.png", fullPage: true });

  page.on("request", (request) => {
    if (request.url().includes("/UserInfo")) {
      console.log("Request to /UserInfo:", request.method(), request.url());
    }
  });

  page.on("response", (response) => {
    if (response.url().includes("/UserInfo")) {
      console.log(" /UserInfo Response:", response.status(), response.url());
    }
  });

  const userInfoResponse = await page
    .waitForResponse(
      (r) => r.url().includes("/UserInfo") && r.status() === 200,
      { timeout: 10000 },
    )
    .catch(() => {
      console.warn(
        " /UserInfo wurde nicht empfangen oder hatte nicht Status 200",
      );
      return null;
    });

  // const [userInfoResponse] = await Promise.all([
  //   page.waitForResponse(
  //     (r) => r.url().includes("/UserInfo") && r.status() === 200
  //   ),
  // ]);

  // const userInfo = await userInfoResponse.json();

  // fs.writeFileSync(".auth/userInfo.json", JSON.stringify(userInfo, null, 2));

  if (userInfoResponse) {
    const userInfo = await userInfoResponse.json();
    fs.writeFileSync(".auth/userInfo.json", JSON.stringify(userInfo, null, 2));
    console.log("userInfo.json gespeichert");
  } else {
    fs.writeFileSync(
      ".auth/userInfo.json",
      JSON.stringify({ error: "not received" }, null, 2),
    );
    console.warn("userInfo.json mit Fehlermeldung gespeichert");
  }

  await context.storageState({ path: storageStatePath });
});
