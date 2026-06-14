import { expect, test } from "@playwright/test";
import { updateBranding } from "../../../resources/helpers/branding";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { RoomClient } from "../../../resources/clients/RoomClient";
const roomClient = new RoomClient();

test.describe("branding/ PUT requests", async () => {
  test("PUT website branding", async () => {
    const response = await roomClient.updateBranding(updateBranding);
    expect(response.status).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("PUT_branding_id", "brand", body);
  });
});
