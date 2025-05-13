import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test('Delete user profile via API', async ({ request }) => {

  const email = 'my-spa@mailbox.org';
  const deleteUrl = `${process.env.BASE_URL_BACKEND}/api/v1/identity/delete-account?email=${email}`;
  const token = process.env.ACCESS_TOKEN
  const response = await request.delete(deleteUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  console.log('Status:', response.status());
  console.log('Body:', await response.text());

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.text();
  console.log('Antwort vom Server:', responseBody);


});
