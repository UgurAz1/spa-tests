import { expect, test } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("Mobile viewport shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible({
      timeout: 6000,
    });
  });

  test("Desktop shows full menu", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.getByText("How-To").first()).toBeVisible({
      timeout: 6000,
    });
  });
});
