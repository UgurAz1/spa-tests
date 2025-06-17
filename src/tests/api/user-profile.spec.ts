import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("User Profile API", () => {
  test("TC-API-003: Delete user profile via API", async ({ request }) => {
    const email = "my-spa@mailbox.org";
    const deleteUrl = `${process.env.BASE_URL_BACKEND}/api/v1/identity/delete-account?email=${email}`;
    const token = process.env.ACCESS_TOKEN;
    const response = await request.delete(deleteUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.ok()).toBeFalsy();
  });
});
