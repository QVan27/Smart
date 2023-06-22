'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rooms = Array.from({ length: 5 }).map(() => ({
      name: faker.helpers.arrayElement(['Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5']),
      image: faker.image.url(),
      capacity: faker.number.int({ min: 5, max: 30 }),
      floor: faker.helpers.arrayElement(['1st', '2nd', '3rd', '4th']),
      pointOfContactEmail: faker.internet.email(),
      pointOfContactPhone: faker.phone.number('+33 07 ## ## ## ##'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Rooms', rooms);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};