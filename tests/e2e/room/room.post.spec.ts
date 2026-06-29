import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { RoomClient } from "../../../resources/clients/RoomClient";
import { BaseClient } from "../../../resources/clients/BaseClient";
import { expect, test } from "@playwright/test";
import type { GetRoomsResponse } from "../../../resources/models/room.types";
import { invalidRoomTypeBody } from "../../../resources/fixtures/roomData";
const roomClient = new RoomClient();
const baseurl = BaseClient.URL;

test.describe("room/ GET requests @room", () => {
  test("POST create room and validate creation @happy ", async () => {
    const roomPrice = 100;
    const roomName = "GET";
    const response = await roomClient.createRoom(roomName, roomPrice);

    expect(response.status).toBe(200);
    const roomsBody = await fetch(baseurl + "api/room", {
      method: "GET",
    });
    expect(roomsBody.status).toBe(200);
    const roomsBodyJson: GetRoomsResponse = await roomsBody.json();

    const rooms = roomsBodyJson.rooms.find((r) => r.roomName === roomName && r.roomPrice === roomPrice);
    expect(rooms).toBeDefined();

    await validateJsonSchema("POST_room", "room", roomsBodyJson);
  });

  test("POST /create room with invalid data types ", async () => {
    const roomPrice = undefined;
    const roomName = undefined;
    const body = invalidRoomTypeBody;
    const response = await roomClient.createRoom(roomName, roomPrice, body);

    expect(response.status).toBe(400);
    const jsonbody = await response.json();
    expect(jsonbody).toMatchObject({
      errors: ["Type can only contain the room options Single, Double, Twin, Family or Suite"],
    });
  });
});
