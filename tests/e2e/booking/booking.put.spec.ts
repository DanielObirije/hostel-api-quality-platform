import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../resources/clients/BookingClient";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { dateByDays } from "../../../resources/helpers/room";
import { createBookingScenarios, bookingErrors } from "../../../resources/fixtures/bookingData";
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
    const bookingBody = createBookingScenarios.withoutNames();
    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.errors).toEqual(expect.arrayContaining(bookingErrors.missingNames));
  });

  test("PUT booking id with invalid authentication", async ({ request }) => {
    const bookingBody = createBookingScenarios.withoutNames();
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
