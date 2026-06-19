import { BaseClient } from "./BaseClient";
import { AuthClient } from "./AuthClient";
const auth = new AuthClient();
export class BookingClient extends BaseClient {
  constructor() {
    super();
  }


  async getBookingsByid(id?: unknown) {
    const cookie = await auth.createToken();
    const response = await fetch(BookingClient.URL + `api/booking/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
    });
    return response;
  }

  async getBookingsByRoomId(id?: unknown) {
    const cookie = await auth.createToken();
    const response = await fetch(BookingClient.URL + `api/booking/?roomid=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
    });
    return response;
  }

  async getBookingRoomSummary(id?: unknown) {
    const cookie = await auth.createToken();
    const response = await fetch(BookingClient.URL + `api/booking/summary?roomid=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
    });
    return response;
  }
}
