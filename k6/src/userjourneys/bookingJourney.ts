import { BookingOperation } from "src/operations/BookingOperation";
export default function bookingJourney() {
  const operation = new BookingOperation();

  operation.getAllBookings()
  operation.getBookingById()
  operation.getBookingSummary()
}
