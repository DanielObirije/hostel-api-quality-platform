import { test, expect } from "@playwright/test";
import { validateJsonSchema } from "../../../resources/helpers/validateJsonSchema";
import { BookingClient } from "../../../resources/clients/BookingClient";
const bookingClient = new BookingClient();

test.describe("booking/ GET requests @booking", async () => {
  test("GET booking by id with specific room id @happy", async () => {
    const id = 1;
    const response = await bookingClient.getBookingsByid(id);
    expect(response.status).toEqual(200);
    const body = await response.json();
    await validateJsonSchema("GET_booking_id", "booking", body, true);
  });

  test("GET booking by id with a room id that doesn't exist", async () => {
    const id = 9000;
    const response = await bookingClient.getBookingsByid(id);
    expect(response.status).toEqual(404);
  });

  test("GET booking by id  without any room id ", async () => {
    const id = "";
    const response = await bookingClient.getBookingsByid(id);
    const body = await response.json();
    expect(response.status).toEqual(400);
    expect(body).toMatchObject({
      error: "Room ID is required",
    });
  });

  test("GET booking by id without any room id ", async () => {
    const id = "";
    const response = await bookingClient.getBookingsByid(id);
    const body = await response.json();
    expect(response.status).toEqual(400);
    expect(body).toMatchObject({
      error: "Room ID is required",
    });
  });

  test("GET booking by id without valid token", async ({ request }) => {
    const id = 1;
    const response = await request.get(`api/booking/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: "token=invalid",
      },
    });
    expect(response.status()).toBe(403);
  });

  test("GET booking by roomid ", async () => {
    const roomId = 1;
    const response = await bookingClient.getBookingsByRoomId(roomId);
    const body = await response.json();
    expect(response.status).toEqual(200);
    await validateJsonSchema("GET_booking_roomid", "booking", body, true);
  });

  test("GET booking by roomid with invalid room id ", async () => {
    const roomId = 100;
    const response = await bookingClient.getBookingsByRoomId(roomId);
    expect(response.status).toEqual(200);
    const body = await response.json();
    expect(body).toMatchObject({
      bookings: [],
    });
  });

  test("GET booking summary by room id ", async () => {
    const roomId = 1;
    const response = await bookingClient.getBookingRoomSummary(roomId);
    expect(response.status).toEqual(200);
    const body = await response.json();

    await validateJsonSchema("GET_booking_summary", "booking", body, true);
  });

  test("GET booking summary  with wrong room id ", async () => {
    const roomId = 1000;
    const response = await bookingClient.getBookingRoomSummary(roomId);
    expect(response.status).toEqual(200);
    const body = await response.json();
    expect(body).toMatchObject({
      bookings: [],
    });
  });
});
