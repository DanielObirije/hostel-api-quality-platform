import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { expect, test } from "@playwright/test";
import { RoomClient } from "../../../resources/clients/RoomClient";

const roomClient = new RoomClient();
test.describe("room/ PUT requests @room", () => {
  test("PUT /rooms to update values all rooms", async () => {
    const roomid = 2;
    const response = await roomClient.UpdateRoom(roomid);
    expect(response.status).toBe(202);
    const body = await response.json();

    await validateJsonSchema("PUT_rooms", "room", body, true);
  });

  test("PUT /rooms with empty body", async () => {
    const roomid = 2;
    const body = {};
    const response = await roomClient.UpdateRoom(roomid, body);
    expect(response.status).toBe(400);
    expect(response).toMatchObject({
      status: 400,
      statusText: "Bad Request",
    });
  });
});
