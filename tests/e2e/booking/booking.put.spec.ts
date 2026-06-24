import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../resources/clients/BookingClient";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { dateByDays } from "../../../resources/helpers/room";
import { faker } from "@faker-js/faker";
const bookingClient = new BookingClient();

test.describe("booking/ PUT requests @booking", () => {
  test("PUT booking with specific room id @happy", async () => {
    const roomid = 1;
    const futureCheckIndate = await bookingClient.futureOpenCheckInDate(roomid);
    const checkInString = futureCheckIndate.toISOString().split("T")[0];
    const checkOutString = dateByDays(futureCheckIndate, 2);
    const requestBody = await bookingClient.checkoutRandomBookingBody(checkInString!, checkOutString!);
    const response = await bookingClient.updateBooking(requestBody);
    expect(response.status).toBe(200);
    const body = await response.json();
    await validateJsonSchema("PUT_booking", "booking", body);
  });

  test("PUT booking without firstname and lastname in body", async () => {
    const bookingBody = {
      roomid: faker.number.int({ min: 1, max: 10000 }),
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
      expect.arrayContaining(["Lastname should not be blank", "Firstname should not be blank"])
    );
  });

  test("PUT booking id with invalid authentication", async ({ request }) => {
    const bookingBody = {
      roomid: faker.number.int({ min: 1, max: 10000 }),
      depositpaid: true,
      email: "test@email.com",
      phone: "07123456789",
      bookingdates: {
        checkin: "2026-03-06",
        checkout: "2026-03-07",
      },
    };
    const response = await request.put("api/booking/1", {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${"dum ass"}`,
      },
      data: bookingBody,
    });
    expect(response.status()).toBe(400);
  });
});
