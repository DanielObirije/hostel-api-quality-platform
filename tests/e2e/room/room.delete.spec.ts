// import { expect, test } from "@playwright/test";
// // import { BaseClient } from "../../../resources/clients/BaseClient";
// import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
// import { RoomClient } from "../../../resources/clients/RoomClient";
// const roomClient = new RoomClient();
// // const baseurl = BaseClient.URL;
// test.describe("room/ DELETE requests @room", () => {
//   test("DELETE /rooms to delete a room", async () => {
//     const roomPrice = 10;
//     const roomName = "xxx";
//     const responsei = await roomClient.createRoom(roomName, roomPrice);
//     expect(responsei.status).toBe(200);
//     const body = await responsei.json();
//     console.log("post" + body);

//     const roomid = Math.floor(Math.random() * 3) + 1;
//     const response = await roomClient.deleteRoom(roomid);
//     console.log(response);
//     expect(response.status).toBe(202);
//     await validateJsonSchema("DELETE_room", "room", response, true);
//   });
// });
