'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Violations', 'penalty_date', {
      type: Sequelize.DATE
    });

    await queryInterface.addColumn('Violations', 'penalty_end_date', {
      type: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Violations', 'penalty_date');
    await queryInterface.removeColumn('Violations', 'penalty_end_date');
  }
};
