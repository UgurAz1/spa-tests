import { faker } from '@faker-js/faker';

export function generatePassword(length: number, specialChars: string): string {
  return faker.internet.password({ length: length }) + specialChars;
}