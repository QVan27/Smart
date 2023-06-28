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
        purpose: faker.helpers.arrayElement([`Stratégies d'expérience utilisateur pour les développeurs`, `Optimisation de l'interface utilisateur : une approche multidisciplinaire`, 'Gestion de projet agile pour le design et le développement', 'Réunion de coordination : alignement entre le management et les développeurs', 'Design thinking et développement : fusionner les perspectives', 'Améliorer la collaboration entre le design et le développement', 'Tendances UX/UI : Impacts et opportunités pour les développeurs', 'Leadership dans le domaine du design et du développement', 'Innovation par le design et la technologie : une rencontre cruciale', `Évaluation des performances : alignement entre l'UI/UX et les développeurs`]),
        roomId: room.id,
        isApproved: false,
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

        const randomUserIds = faker.helpers.arrayElements(users.map(user => user.id)).slice(0, faker.number.int({ min: 2, max: 30 }));

        const bookingUserAssociations = randomUserIds.map(userId => ({
          userId: userId,
          bookingId: createdBooking.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('user_bookings', bookingUserAssociations, {});

        if (faker.datatype.boolean()) {
          await queryInterface.sequelize.query("UPDATE bookings SET isApproved = true WHERE id = :id", {
            replacements: { id: createdBooking.id },
            type: queryInterface.sequelize.QueryTypes.UPDATE
          });
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_bookings', null, {});
    await queryInterface.bulkDelete('bookings', null, {});
  }
};