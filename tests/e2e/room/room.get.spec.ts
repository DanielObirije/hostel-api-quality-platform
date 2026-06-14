import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { BaseClient } from "../../../resources/clients/BaseClient";
import { expect, test } from "@playwright/test";

const baseurl = BaseClient.URL;

test.describe("room/ GET requests @room", () => {
  test("GET all rooms @happy", async () => {
    const response = await fetch(baseurl + "api/room", {
      method: "GET",
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    await validateJsonSchema("GET_all_rooms", "room", body);
  });

  test("GET a room by id @happy", async () => {
    const roomId = 2;
    const response = await fetch(baseurl + `api/room/${roomId}`, {
      method: "GET",
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    await validateJsonSchema("GET_room_id", "room", body);
  });
});
