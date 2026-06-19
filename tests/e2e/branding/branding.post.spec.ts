import { expect, test } from "@playwright/test";
import { updateBranding } from "../../../resources/helpers/branding";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { BrandingClient } from "../../../resources/clients/BrandingClient";
const brandClient = new BrandingClient();

test.describe("branding/ PUT requests", async () => {
  test("PUT website branding", async () => {
    const response = await brandClient.updateBranding(updateBranding);
    expect(response.status).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("PUT_branding_id", "brand", body);
  });

  test("PUT website with invalid branding details", async () => {
    const emptyBrandingDetails = {};
    const response = await brandClient.updateBranding(emptyBrandingDetails);
    expect(response.status).toEqual(400);
    const body = await response.json();
    expect(body).toMatchObject({
      error: "BAD_REQUEST",
      errorCode: 400,
    });
  });
});
