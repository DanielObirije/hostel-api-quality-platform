import { check, group } from "k6";
import { head, Response } from "k6/http";
import { endpoint } from "endpoint";
import { performGet, performPost, performPut } from "src/lib/requestUtils";
import { AuthOperation } from "./AuthOperation";
import { roomData } from "src/payloads/roomPayload";

interface CreateRoom {
  success: boolean;
}

interface Room {
  accessible: boolean;
  description: string;
  features: string[];
  image: string;
  roomName: string;
  roomPrice: number;
  roomid: number;
  type: string;
}

interface RoomsResponse {
  rooms: Room[];
}

export class RoomOperation extends AuthOperation {
  constructor() {
    super();
  }

  getRoom() {
    group("GET room", () => {
      this.login("admin", "password");
      const url = endpoint.room.list;
      const headers = this.getHeaders();
      const response = performGet(url, headers, `Successfully retrieved rooms `, `Get Rooms`);
      if (response) {
        const data = response.json() as unknown as RoomsResponse;

        check(response, {
          "Rooms status is 200": (r: Response) => r.status === 200,
          "Rooms array exists": () => Array.isArray(data.rooms),
          "Rooms array is not empty": () => data.rooms.length > 0,
          "Rooms have accessible": () => data.rooms.every((room) => typeof room.accessible === "boolean"),
          "Rooms have description": () => data.rooms.every((room) => typeof room.description === "string"),
          "Rooms have features": () => data.rooms.every((room) => Array.isArray(room.features)),
          "Rooms have image": () => data.rooms.every((room) => typeof room.image === "string"),
          "Rooms have room name": () => data.rooms.every((room) => typeof room.roomName === "string"),
          "Rooms have room price": () => data.rooms.every((room) => typeof room.roomPrice === "number"),
          "Rooms have room ID": () => data.rooms.every((room) => typeof room.roomid === "number"),
          "Rooms have type": () => data.rooms.every((room) => typeof room.type === "string"),
        });
      }
    });
  }

  getRoomById() {
    group("GET room by ID", () => {
      this.login("admin", "password");
      const url = endpoint.room.detail(1);
      const headers = this.getHeaders();
      const response = performGet(url, headers, `Successfully retrieved rooms by ID `, `Get Rooms By ID`);
      if (response) {
        const data = response.json() as unknown as Room;

        check(response, {
          "Room status is 200": (r: Response) => r.status === 200,
          "Room accessible is a boolean": () => typeof data.accessible === "boolean",
          "Room description is a string": () => typeof data.description === "string",
          "Room features is an array": () => Array.isArray(data.features),
          "Room image is a string": () => typeof data.image === "string",
          "Room name is a string": () => typeof data.roomName === "string",
          "Room price is a number": () => typeof data.roomPrice === "number",
          "Room ID is a number": () => typeof data.roomid === "number",
          "Room type is a string": () => typeof data.type === "string",
        });
      }
    });
  }

  createMessage() {
    group("POST room", () => {
      this.login("admin", "password");
      const url = endpoint.room.create;
      const headers = this.getAuthHeaders();
      const response = performPost(url, headers, roomData, `Successfully created room `, `POST Room`);
      if (response) {
        const data = response.json() as unknown as CreateRoom;
        check(response, {
          "Create Room status is 200": (r: Response) => r.status === 200,
          "Create Room is a string": () => typeof data.success === "boolean",
        });
      }
    });
  }

  updateMessage() {
    group("PUT room", () => {
      this.login("admin", "password");
      const url = endpoint.room.update(1);
      const headers = this.getAuthHeaders();
      const response = performPut(url, headers, roomData, `Successfully updated room `, `PUT Room`);
      console.warn(response?.json());
      if (response) {
        const data = response.json() as unknown as Room;
        check(response, {
          "Update Room status is 202": (r: Response) => r.status === 202,
          "Update Room accessible is a boolean": () => typeof data.accessible === "boolean",
          "Update Room description is a string": () => typeof data.description === "string",
          "Update Room features is an array": () => Array.isArray(data.features),
          "Update Room image is a string": () => typeof data.image === "string",
          "Update Room name is a string": () => typeof data.roomName === "string",
          "Update Room price is a number": () => typeof data.roomPrice === "number",
          "Update Room ID is a number": () => typeof data.roomid === "number",
          "Update Room type is a string": () => typeof data.type === "string",
        });
      }
    });
  }
}
