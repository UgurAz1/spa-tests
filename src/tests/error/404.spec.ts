import { test, expect } from "@playwright/test";

test("TC-E001: Unknown route shows blank or invalid content", async ({
  page,
}) => {
  await page.goto("/does-not-exist");

  await expect(
    page.getByText("Oops... Sit back and relax for a moment."),
  ).toBeVisible();
});
