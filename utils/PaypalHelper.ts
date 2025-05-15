import { request } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const PAYPAL_BASE_URL = "https://api.sandbox.paypal.com";

export class PayPalHelper {
  static clientId = process.env.PAYPAL_CLIENT_ID!;
  static secret = process.env.PAYPAL_SECRET!;

  static async getAccessToken(): Promise<string> {
    const basicAuth = Buffer.from(`${this.clientId}:${this.secret}`).toString(
      "base64",
    );

    const context = await request.newContext({
      ignoreHTTPSErrors: true,
    });

    const res = await context.post(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials",
    });

    if (!res.ok())
      throw new Error(`❌ Failed to get PayPal token: ${res.status()}`);

    const body = await res.json();

    return body.access_token;
  }

  static async createTestOrder(token: string, amount = "19.99") {
    const context = await request.newContext({
      baseURL: PAYPAL_BASE_URL,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const res = await context.post("/v2/checkout/orders", {
      data: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: amount,
            },
          },
        ],
        application_context: {
          return_url: `https://${process.env.BASE_URL}/payment-success`,
          cancel_url: `https://${process.env.BASE_URL}/payment-cancel`,
        },
      },
    });

    if (!res.ok())
      throw new Error(`❌ Failed to create PayPal order: ${res.status()}`);

    const data = await res.json();

    const approvalUrl = data.links.find(
      (link: { rel: string; href: string }) => link.rel === "approve",
    )?.href;

    return { orderId: data.id, redirectUrl: approvalUrl };
  }
}
