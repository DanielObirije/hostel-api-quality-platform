import { expect, test } from "@playwright/test";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
test.describe("message/ GET requests @message", async () => {
  test("GET all message @happy", async ({ request }) => {
    const response = await request.get("api/message");
    expect(response.status()).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("GET_all_message", "message", body, true);
  });

  test("GET a message by id @happy", async ({ request }) => {
    const id = 1
    const response = await request.get(`api/message/${id}`);
    expect(response.status()).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("GET_message_id", "message", body, true);
  });
});
