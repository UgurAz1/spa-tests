import { expect, test } from "../fixtures/pageObjectFixtures";
import { UserHelper } from "../../utils/UserHelper";
import { argosScreenshot } from "@argos-ci/playwright";

test("TC-S01: Subscribe to newsletter", async ({ page, pages }) => {
  const mailbox = pages.mailbox;
  const user = UserHelper.load();

  await page.goto("/");

  await pages.subscribeToNewsletter(user.email);
  await mailbox.login();
  await mailbox.openInbox();
  await mailbox.openEmailBySubject("Newsletter bestätigen");
  await mailbox.confirmNewsletter();
  const page1Promise = page.waitForEvent("popup");
  const page1 = await page1Promise;

  await expect(
    page1.getByText("You have successfully subscribed to the newsletter."),
  ).toBeVisible({ timeout: 6000 });
  await argosScreenshot(page1, "newsletter confirmation");
});
