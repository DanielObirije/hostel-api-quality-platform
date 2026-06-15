import { expect, test } from "@playwright/test";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
test.describe("branding/ GET requests @branding", async () => {
  test("GET website branding @happy", async ({ request }) => {
    const response = await request.get("api/branding/");
    expect(response.status()).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("GET_branding_id", "brand", body, true);
  });
});
