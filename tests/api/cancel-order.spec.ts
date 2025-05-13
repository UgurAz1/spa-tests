import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

test('Cancel order via API', async ({ request }) => {

  const orderId = 37253;
  const cancellationURL = `${process.env.BASE_URL_BACKEND}/api/v2/cancellation/CancelOrder/${orderId}`;
  const token = process.env.ACCESS_TOKEN


  const response = await request.post(cancellationURL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  expect(response.ok()).toBeFalsy();
});
