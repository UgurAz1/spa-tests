import { test } from '@playwright/test'
import { PageManager } from '../../pages/PageManager';
import { UserHelper } from '../../utils/UserHelper';



test('TC-D01: Delete user profile', async ({ page }) => {
  const pages = new PageManager(page)
  const user = UserHelper.load()
  const account = pages.header.accountManager

  await page.goto('/');

  await account.openAccountEntryPoint()
  await account.goToProfile()
  const changeData = await account.profile.changeData()

  await changeData.deleteProfile()
  await changeData.confirmDeletion()

});