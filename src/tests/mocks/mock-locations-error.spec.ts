import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const locationsURL = `${process.env.LOCATIONS_URL}`;
test("mock response", async ({ page }) => {
  await page.route(locationsURL, async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(responseBody),
    });
  });
  await page.goto("/locations");
});

test("mocked API response with modified location", async ({ page }) => {
  await page.route(locationsURL, async (route) => {
    const response = await route.fetch();
    const body = await response.json();

    const modified = [
      {
        ...body[0],
        city: "Mocked City",
      },
    ];

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(modified),
    });
  });

  await page.goto("/locations");

  const city = page.getByText("Mocked City").nth(1);
  await expect(city).toBeVisible();
});
