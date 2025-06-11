import { test } from "../fixtures/pageObjectFixtures";

test("TC-D01: Delete user profile", async ({ page, pages }) => {
  const account = pages.header.accountManager;

  await page.goto("/");

  await account.openAccountEntryPoint();
  await account.goToProfile();
  const changeData = await account.profile.changeData();

  await changeData.deleteProfile();
  await changeData.confirmDeletion();
});
