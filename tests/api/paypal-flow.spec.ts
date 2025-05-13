import { test } from '@playwright/test';
import { PayPalHelper } from '../../utils/PaypalHelper';

test('TC-API-004: Create Sandbox Payment', async () => {
  const token = await PayPalHelper.getAccessToken();

  await PayPalHelper.createTestOrder(token);


});