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
        isModerator: faker.datatype.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert('bookings', bookings, {});

      const createdBookings = await queryInterface.sequelize.query("SELECT id FROM bookings WHERE roomId = :roomId", {
        replacements: { roomId: room.id },
        type: queryInterface.sequelize.QueryTypes.SELECT
      });

      for (const createdBooking of createdBookings) {
        const users = await queryInterface.sequelize.query("SELECT id FROM Users", {
          type: queryInterface.sequelize.QueryTypes.SELECT
        });

        const randomUserIds = faker.helpers.arrayElements(users.map(user => user.id)).slice(0, faker.number.int({ min: 1, max: 5 }));

        const bookingUserAssociations = randomUserIds.map(userId => ({
          userId: userId,
          bookingId: createdBooking.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('user_bookings', bookingUserAssociations, {});
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_bookings', null, {});
    await queryInterface.bulkDelete('bookings', null, {});
  }
};