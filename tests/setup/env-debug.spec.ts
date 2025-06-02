import * as dotenv from "dotenv";
dotenv.config();

import { test } from "@playwright/test";

test("Debug BASE_URL and test navigation", async ({ page }) => {
  console.log(">>> BASE_URL =", process.env.BASE_URL);

  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL is NOT defined");
  }

  await page.goto("/login");
});
