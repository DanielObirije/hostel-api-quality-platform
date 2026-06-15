//import { expect, request } from "@playwright/test";
import { BaseClient } from "./BaseClient";
import { AuthClient } from "./AuthClient";
import { faker } from "@faker-js/faker";
const baseurl = BaseClient.URL;
const auth = new AuthClient();

const roomFeatures = [
  "King Bed",
  "Ocean View",
  "Private Balcony",
  "Smart TV",
  "Mini Fridge",
  "Air Conditioning",
  "Walk-in Closet",
  "Rainfall Shower",
  "High-Speed WiFi",
  "Coffee Maker",
];

const roomType = ["Single", "Double", "Twin"];

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
    // const roomBody = body ?? (await this.createRandomRoomBody());
    const roomBody = body ?? (await this.createRandomRoomBody(roomname, price));
    // console.log("room body", roomBody);
    const response = await fetch(baseurl + "api/room", {
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
    const response = await fetch(baseurl + `api/room/${roomID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
    });
    return response;
  }
  // async UpdateRoom(roomID: number) {
  //   const cookie = await auth.createToken();
  //   const roomBody = await this.createRandomRoomBody();
  //   const response = await fetch(baseurl + `api/room/${roomID}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: `token=${cookie}`,
  //     },
  //     body: JSON.stringify(roomBody),
  //   });
  //   return response;
  // }

  async UpdateRoom(roomID: number, body?: object) {
    const cookie = await auth.createToken();
    const roomBody = body ?? (await this.createRandomRoomBody());
    const response = await fetch(baseurl + `api/room/${roomID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(roomBody),
    });
    return response;
  }

  async updateBranding(brandingData: object) {
    const cookie = await auth.createToken();
    const response = await fetch(baseurl + `api/branding`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(brandingData),
    });
    return response;
  }

  // async createMessage(messageData: object) {
  //   const cookie = await auth.createToken();
  //   const response = await fetch(baseurl + `api/message`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: `token=${cookie}`,
  //     },
  //     body: JSON.stringify(messageData),
  //   });
  //   return response;
  // }

  // async createRoomById(roomname: string, price: number) {
  //   const roomBody =
  //   return response;
  // }

  defultRoom = {
    roomid: 1,
    roomName: "100",
    type: "single",
    accessible: true,
    image: faker.image.url(),
    description:
      "this is is a defult room with basic features, it is a single room with a king bed, private balcony, and a mini fridge.",
    features: ["TV", "WiFi", "Safe"],
    roomPrice: 100,
  };
}
