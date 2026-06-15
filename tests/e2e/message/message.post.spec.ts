import { expect, test } from "@playwright/test";
import { newMessageBody } from "../../../resources/helpers/message";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";

test.describe("message/ POST requests @message", async () => {
  test("POST a message @happy", async ({ request }) => {
    const response = await request.post("api/message", { data: newMessageBody });
    expect(response.status()).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("POST_message", "message", body, true);
  });

  test.only("POST a message with invalid message data", async ({ request }) => {
    const message = {};
    const response = await request.post("api/message", { data: message });
    expect(response.status()).toEqual(400);
    const body = await response.json();
    expect(body).toEqual(
      expect.arrayContaining([
        "Subject must be set",
        "Email must be set",
        "Phone may not be blank",
        "Name must be set",
        "Message may not be blank",
        "Email may not be blank",
        "Phone must be set",
        "Name may not be blank",
        "Subject may not be blank",
        "Message must be set",
      ])
    );
  });
});
