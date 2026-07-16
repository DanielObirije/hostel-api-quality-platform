import { check, group } from "k6";
import { Response } from "k6/http";
import { endpoint } from "endpoint";
import { performGet } from "src/lib/requestUtils";
import { AuthOperation } from "./AuthOperation";

// export interface BookingDates {
//   checkin: string;
//   checkout: string;
// }

export interface BookingSummary {
  bookingDates: BookingDates;
}

export interface BookingSummaryResponse {
  bookings: BookingSummary[];
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  bookingid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  roomid: number;
  bookingdates: BookingDates;
}

export interface GetBookingsResponse {
  bookings: Booking[];
}

export class BookingOperation extends AuthOperation {
  constructor() {
    super();
  }

  getAllBookings() {
    group("Get all bookings", () => {
      this.login("admin", "password");
      const url = endpoint.booking.list(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, "Successfully retrieved all bookings", "Get All Bookings");
      if (response) {
        const data = response.json() as unknown as GetBookingsResponse;
        check(response, {
          "Boookings Status is 200": (r: Response) => r.status === 200,
          "Bookings array exists": () => Array.isArray(data.bookings),
          "Response contains at least one booking": () => data.bookings.length > 0,
          "First booking has required fields": () => {
            const booking = data.bookings[0];
            return (
              booking &&
              typeof booking.bookingid === "number" &&
              typeof booking.firstname === "string" &&
              typeof booking.lastname === "string" &&
              typeof booking.depositpaid === "boolean" &&
              typeof booking.roomid === "number" &&
              booking.bookingdates &&
              typeof booking.bookingdates.checkin === "string" &&
              typeof booking.bookingdates.checkout === "string"
            );
          },
        });
      }
    });
  }

  getBookingById() {
    group("Get booking by ID", () => {
      this.login("admin", "password");
      const url = endpoint.booking.detail(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved booking `, `Get Booking`);
      if (response) {
        const data = response.json() as unknown as Booking;
        check(response, {
          "Boooking Status is 200": (r: Response) => r.status === 200,
          "Booking id matches": () => {
            return (
              typeof data.bookingid === "number" &&
              typeof data.firstname === "string" &&
              typeof data.lastname === "string" &&
              typeof data.depositpaid === "boolean" &&
              typeof data.roomid === "number" &&
              data.bookingdates &&
              typeof data.bookingdates.checkin === "string" &&
              typeof data.bookingdates.checkout === "string"
            );
          },
        });
      }
    });
  }

  getBookingSummary() {
    group("Get bookingDates by ID", () => {
      this.login("admin", "password");
      const url = endpoint.booking.summary(1);
      const headers = this.getAuthHeaders();
      const response = performGet(url, headers, `Successfully retrieved booking Dates `, `Get Booking Dates`);
      if (response) {
        const data = response.json() as unknown as BookingSummaryResponse;
        check(response, {
          "Bookings dates status is 200": (r: Response) => r.status === 200,

          "Bookings dates array exists": () => Array.isArray(data.bookings),

          "Bookings dates array is not empty": () => data.bookings.length > 0,

          "Booking dates exist": () => data.bookings.every((booking) => booking.bookingDates !== undefined),

          "Booking dates have checkin and checkout": () =>
            data.bookings.every(
              (booking) =>
                typeof booking.bookingDates.checkin === "string" && typeof booking.bookingDates.checkout === "string"
            ),
        });
      }
    });
  }
}
