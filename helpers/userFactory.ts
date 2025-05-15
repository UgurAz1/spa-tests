import { faker } from "@faker-js/faker";

export function generateFakeUser(emailAddress: string, password: string) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.street(),
    houseNumber: faker.string.numeric(2),
    zip: faker.location.zipCode("#####"),
    city: faker.location.city(),
    countryNumber: faker.number.int({ min: 1, max: 259 }),
    email: emailAddress,
    repeatEmail: emailAddress,
    birthdayDay: faker.number.int({ min: 1, max: 28 }),
    birthdayMonth: faker.number.int({ min: 1, max: 12 }),
    birthdayYear: faker.number.int({ min: 1960, max: 2007 }),
    password: password,
    repeatPassword: password,
  };
}
