import { BaseClient } from "./BaseClient";
import { AuthClient } from "./AuthClient";
import { faker } from "@faker-js/faker";
import { roomFeatures, roomType } from "../fixtures/roomData";
const auth = new AuthClient();

export class RoomClient extends BaseClient {
  constructor() {
    super();
  }

  allRoomFetures() {
    return roomFeatures;
  }

  getRandomRoomFeature() {
    const randomIndex = faker.number.int({ min: 0, max: roomFeatures.length - 1 });
    return roomFeatures[randomIndex];
  }

  getRandomRoomFeatures(count: number) {
    const feature = [];
    for (let i = 0; i < count; i++) {
      feature.push(this.getRandomRoomFeature());
    }
    return Array.from(new Set(feature));
  }

  async createRandomRoomBody(roomName?: string, roomPrice?: number) {
    const roomBody = {
      roomName: roomName || faker.lorem.words(5),
      type: roomType[faker.number.int({ min: 0, max: roomType.length - 1 })],
      accessability: faker.datatype.boolean(),
      image: faker.image.url(),
      description: faker.lorem.sentence(),
      roomPrice: roomPrice || faker.string.numeric(3),
      features: this.getRandomRoomFeatures(faker.number.int({ min: 1, max: 5 })),
    };
    return roomBody;
  }

  async createRoom(roomname?: string, price?: number, body?: object) {
    const cookie = await auth.createToken();
    const roomBody = body ?? (await this.createRandomRoomBody(roomname, price));
    const response = await fetch(RoomClient.URL + "api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(roomBody),
    });
    return response;
  }

  async deleteRoom(roomID: number) {
    const cookie = await auth.createToken();
    const response = await fetch(RoomClient.URL + `api/room/${roomID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
    });
    return response;
  }
  async UpdateRoom(roomID: number, body?: object) {
    const cookie = await auth.createToken();
    const roomBody = body ?? (await this.createRandomRoomBody());
    const response = await fetch(RoomClient.URL + `api/room/${roomID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(roomBody),
    });
    return response;
  }
}
