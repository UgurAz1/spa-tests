import { test } from '@playwright/test';
import { PayPalHelper } from '../../utils/PaypalHelper';

test('TC-PAYPAL: Create Sandbox Payment', async () => {
  const token = await PayPalHelper.getAccessToken();

  const { orderId, redirectUrl } = await PayPalHelper.createTestOrder(token);

  console.log('🆗 Testbestellung erfolgreich erstellt');
  console.log('💳 Order ID:', orderId);
  console.log('🌍 Zum Bezahlen öffnen (Sandbox):', redirectUrl);
});