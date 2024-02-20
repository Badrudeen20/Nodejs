'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{ username: 'John', email: 'example@test.com', password:'1234', createdAt: new Date(), updatedAt: new Date() }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {}); 
  }
};
