import type { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const genders: string[] = ['male', 'female'];

function createFakeUser() {
  const genderNumber = Math.floor(Math.random() * genders.length);

  return {
    email: faker.internet.exampleEmail(),
    password: bcrypt.hashSync('qwerty12345', 8),
    avatar: faker.internet.avatar(),
    gender: genders[genderNumber],
    firstName: faker.name.firstName(genderNumber),
    lastName: faker.name.lastName(genderNumber),
    bio: faker.lorem.words(6),
    phoneNumber: faker.phone.phoneNumber(),
  };
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const users = Array.from({ length: 24 }, (_, i) => i + 1).map(createFakeUser);

  // Inserts seed entries
  await knex('users').insert(users);
}