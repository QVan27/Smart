'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = Array.from({ length: 30 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      position: faker.helpers.arrayElement(["developpeur", "designer", "marketing", "UX/UI", "manager"], { min: 1, max: 1 }),
      picture: faker.image.avatar(),
      password: bcrypt.hashSync('password123', 8), // Remplacer 'password123' par le mot de passe souhaité
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};