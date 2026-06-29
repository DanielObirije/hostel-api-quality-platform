import { expect, test } from "@playwright/test";
import { newMessageBody, messageErrors } from "../../../resources/fixtures/messageData";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";

test.describe("message/ POST requests @message", async () => {
  test("POST a message @happy", async ({ request }) => {
    const response = await request.post("api/message", { data: newMessageBody });
    expect(response.status()).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("POST_message", "message", body);
  });

  test("POST a message with invalid message data", async ({ request }) => {
    const message = {};
    const response = await request.post("api/message", { data: message });
    expect(response.status()).toEqual(400);
    const body = await response.json();
    expect(body).toEqual(expect.arrayContaining(messageErrors.empty));
  });
});
