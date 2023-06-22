'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const rooms = await queryInterface.sequelize.query("SELECT id FROM Rooms", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    for (const room of rooms) {
      const bookings = Array.from({ length: 10 }).map(() => ({
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        purpose: faker.word.words(5),
        roomId: room.id,
        isModerator: faker.datatype.boolean() ,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert('bookings', bookings, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bookings', null, {});
  }
};
