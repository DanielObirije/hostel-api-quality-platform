import { test, expect } from "@playwright/test";
import { BookingClient } from "../../../resources/clients/BookingClient";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { dateByDays } from "../../../resources/helpers/room";
import { createBookingScenarios, bookingErrors } from "../../../resources/fixtures/bookingData";
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
    const bookingBody = createBookingScenarios.missingRequiredFields();

    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.errors).toEqual(expect.arrayContaining(bookingErrors.missingRequiredFields));
  });

  test("POST New Booking with Invalid Data Types in Request Body", async () => {
    const bookingBody = createBookingScenarios.invalidDataTypes();
    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toMatchObject(bookingErrors.invalidDataTypes);
  });

  test("POST New Booking with Minimum-Length String Values", async () => {
    const bookingBody = createBookingScenarios.minimumLengthNames();

    const response = await bookingClient.postBooking(bookingBody);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.errors).toEqual(expect.arrayContaining(bookingErrors.minimumLengthNames));
  });
});
