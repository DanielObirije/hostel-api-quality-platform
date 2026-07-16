export const bookingPayloads = {
  createBooking: {
    roomid: Math.floor(Math.random() * 10000) + 1,
    firstname: "mark",
    lastname: "Deadf",
    depositpaid: true,
    email: "tesdaft@email.com",
    phone: "07123daf456789",
    bookingdates: {
      checkin: "2026-03-06",
      checkout: "2026-03-07",
    },
  },
  updateBooking: {
    roomid: Math.floor(Math.random() * 10000) + 1,
    firstname: "Jane",
    lastname: "Smith",
    depositpaid: false,
    bookingdates: {
      checkin: "2024-12-21",
      checkout: "2024-12-26",
    },
  },
};
