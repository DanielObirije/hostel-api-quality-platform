import { faker } from "@faker-js/faker";

export const createBookingScenarios = {
  withoutNames: () => ({
    roomid: faker.number.int({ min: 1, max: 10000 }),
    depositpaid: true,
    email: "test@email.com",
    phone: "07123456789",
    bookingdates: {
      checkin: "2026-03-06",
      checkout: "2026-03-07",
    },
  }),

  missingRequiredFields: () => ({
    depositpaid: true,
    email: "test@email.com",
    phone: "07123456789",
    bookingdates: {
      checkin: "2026-03-06",
      checkout: "2026-03-07",
    },
  }),

  invalidDataTypes: () => ({
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
  }),

  minimumLengthNames: () => ({
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
  }),
};

export const bookingErrors = {
  missingRequiredFields: [
    "Lastname should not be blank",
    "must be greater than or equal to 1",
    "Firstname should not be blank",
  ],

  invalidDataTypes: { errors: ["Failed to create booking"] },

  minimumLengthNames:["size must be between 3 and 18", "size must be between 3 and 30"],

  missingNames:  ["Lastname should not be blank", "Firstname should not be blank"],
};
