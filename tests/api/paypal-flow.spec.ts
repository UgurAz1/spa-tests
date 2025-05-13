import { test } from '@playwright/test';
import { PayPalHelper } from '../../utils/PaypalHelper';

test('TC-PAYPAL: Create Sandbox Payment', async () => {
  const token = await PayPalHelper.getAccessToken();

  await PayPalHelper.createTestOrder(token);


});