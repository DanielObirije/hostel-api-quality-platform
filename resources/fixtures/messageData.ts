import { faker } from "@faker-js/faker";

export const newMessageBody = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.string.numeric(11),
  subject: faker.company.buzzPhrase(),
  description: faker.lorem.sentence(),
};

export const messageErrors = {
  empty: [
    "Subject must be set",
    "Email must be set",
    "Phone may not be blank",
    "Name must be set",
    "Message may not be blank",
    "Email may not be blank",
    "Phone must be set",
    "Name may not be blank",
    "Subject may not be blank",
    "Message must be set",
  ],
};
