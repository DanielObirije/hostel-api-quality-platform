import { BaseClient } from "./BaseClient";
import { AuthClient } from "./AuthClient";
import { faker } from "@faker-js/faker";
const auth = new AuthClient();
export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type Booking = {
  bookingdates: BookingDates;
  bookingid: number;
  depositpaid: boolean;
  firstname: string;
  lastname: string;
  roomid: number;
};

export type BookingsResponse = {
  bookings: Booking[];
};

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

  async getBookingsByRoomIdData(id?: unknown) {
    const response = await this.getBookingsByRoomId(id);
    return response.json();
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
  async postBooking(body: unknown) {
    const cookie = await auth.createToken();
    const response = await fetch(BookingClient.URL + `api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async updateBooking(body: object) {
    const cookie = await auth.createToken();
    const response = await fetch(BookingClient.URL + `api/booking/2`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async futureOpenCheckInDate(roomId: number) {
    const createBookings = await this.getBookingsByRoomIdData(roomId);
    const checkoutArray = [];

    for (let index = 0; index < createBookings.bookings.length; index++) {
      const today = new Date();
      const checkout = new Date(createBookings.bookings[index].checkout);
      if (today < checkout) {
        checkoutArray.push(checkout);
      }
    }
    const mostFutureDate = checkoutArray.sort().pop() || new Date();

    return mostFutureDate;
  }

  async checkoutRandomBookingBody(checkIn: string, checkOut: string) {
    const bookingBody = {
      roomid: faker.number.int({ min: 1, max: 10000 }),
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      depositpaid: faker.datatype.boolean(),
      email: faker.internet.email(),
      phone: `0${faker.string.numeric(10)}`,
      bookingdates: {
        checkin: checkIn,
        checkout: checkOut,
      },
    };
    return bookingBody;
  }
}
