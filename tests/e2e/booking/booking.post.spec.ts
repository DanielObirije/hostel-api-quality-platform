import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { BookingClient } from "../../../resources/clients/BookingClient";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { dateByDays } from "../../../resources/helpers/room";
const bookingClient = new BookingClient();

test.describe("booking/ POST requests @booking", () => {
  test("POST new booking with full body @happy", async () => {
    const roomid = 1;
    const futureCheckIndate = await bookingClient.futureOpenCheckInDate(roomid);
    const checkInString = futureCheckIndate.toISOString().split("T")[0];
    const checkOutString = dateByDays(futureCheckIndate, 2);
    const requestBody = await bookingClient.checkoutRandomBookingBody(checkInString!, checkOutString!);
    const response = await bookingClient.postBooking(requestBody);
    expect(response.status).toBe(201);
    const body = await response.json();
    await validateJsonSchema("POST_booking", "booking", body);
  });

  test("POST new booking with invalid body", async () => {
    const bookingBody = {
      depositpaid: true,
      email: "test@email.com",
      phone: "07123456789",
      bookingdates: {
        checkin: "2026-03-06",
        checkout: "2026-03-07",
      },
    };

    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.errors).toEqual(
      expect.arrayContaining([
        "Lastname should not be blank",
        "must be greater than or equal to 1",
        "Firstname should not be blank",
      ])
    );
  });

  test("POST New Booking with Invalid Data Types in Request Body", async () => {
    const bookingBody = {
      roomid: false,
      firstname: true,
      lastname: 1,
      depositpaid: true,
      email: "test@email.com",
      phone: "07123456789",
      bookingdates: {
        checkin: "2026-03-06",
        checkout: "2026-03-07",
      },
    };

    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toMatchObject({
      errors: ["Failed to create booking"],
    });
  });

  test("POST New Booking with Minimum-Length String Values", async () => {
    const bookingBody = {
      roomid: faker.number.int({ min: 1, max: 10000 }),
      firstname: "K",
      lastname: "D",
      depositpaid: true,
      email: "test@email.com",
      phone: "07123456789",
      bookingdates: {
        checkin: "2026-03-06",
        checkout: "2026-03-07",
      },
    };

    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.errors).toEqual(
      expect.arrayContaining(["size must be between 3 and 18", "size must be between 3 and 30"])
    );
  });

  
});
