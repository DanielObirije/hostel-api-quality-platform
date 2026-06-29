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
