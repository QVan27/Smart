'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const roles = await queryInterface.sequelize.query("SELECT id FROM roles WHERE id in (1, 2)", {
    //   type: queryInterface.sequelize.QueryTypes.SELECT
    // });

    // const users = await queryInterface.sequelize.query("SELECT id FROM users", {
    //   type: queryInterface.sequelize.QueryTypes.SELECT
    // });

    // const userRoleMappings = users.map(user => ({
    //   userId: user.id,
    //   roleId: faker.helpers.arrayElement(roles).id,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }));
    const role1 = await queryInterface.sequelize.query("SELECT id FROM roles WHERE id = 1", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const role2 = await queryInterface.sequelize.query("SELECT id FROM roles WHERE id = 2", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const users = await queryInterface.sequelize.query("SELECT id, position FROM users", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const userRoleMappings = users.map(user => ({
      userId: user.id,
      roleId: user.position === 'manager' ? role2[0].id : role1[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('user_roles', userRoleMappings, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};