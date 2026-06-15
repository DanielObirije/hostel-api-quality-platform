import { faker } from "@faker-js/faker";

export const newMessageBody = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.string.numeric(11),
  subject: faker.company.buzzPhrase(),
  description: faker.lorem.sentence(),
};
