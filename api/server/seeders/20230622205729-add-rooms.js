'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rooms = Array.from({ length: 5 }).map(() => ({
      name: faker.helpers.arrayElement(['Salle Catalyst', 'Espace Stratégia', 'Chambre de la Collaboration', 'Labo des Solutions', 'Salle Inspire']),
      image: faker.image.url(),
      capacity: faker.number.int({ min: 5, max: 30 }),
      floor: faker.helpers.arrayElement(['1er', '2ème', '3ème', '4ème']),
      pointOfContactEmail: faker.internet.email(),
      pointOfContactPhone: faker.phone.number('07 ## ## ## ##'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Rooms', rooms);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};