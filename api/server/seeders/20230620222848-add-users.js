'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordAdmin = "admin";
    const passwordModerator = "moderator";
    const passwordUser = "user";
    const hashedPasswordAdmin = bcrypt.hashSync(passwordAdmin, 8);
    const hashedPasswordModerator = bcrypt.hashSync(passwordModerator, 8);
    const hashedPasswordUser = bcrypt.hashSync(passwordUser, 8);

    const admin = {
      firstName: "Quentin",
      lastName: "Vannarath",
      email: "admin@smart.com",
      position: "developer",
      picture: "https://media.licdn.com/dms/image/C4E03AQH8u8YIiiczfA/profile-displayphoto-shrink_800_800/0/1607001937665?e=1693440000&v=beta&t=kA7vju3Au11g1MYpdsPt7lhL5tXgHJ03P5eujtwSmpg",
      password: hashedPasswordAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const modo = {
      firstName: "John",
      lastName: "Doe",
      email: "moderator@smart.com",
      position: "manager",
      picture: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=766&q=80",
      password: hashedPasswordModerator,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = {
      firstName: "Jane",
      lastName: "Doe",
      email: "user@smart.com",
      position: "designer",
      picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      password: hashedPasswordUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const users = Array.from({ length: 30 }).map(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@smart.com`;

      return {
        firstName,
        lastName,
        email,
        position: faker.helpers.arrayElement(["developer", "designer", "marketing", "UX/UI", "manager"], { min: 1, max: 1 }),
        picture: faker.image.avatar(),
        password: bcrypt.hashSync('password123', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const allUsers = [admin, modo, user, ...users];

    await queryInterface.bulkInsert('Users', allUsers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};