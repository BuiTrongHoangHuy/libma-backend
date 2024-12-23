'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('LoanRecords', {
            transaction_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,

            },
            copy_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            loan_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            due_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            return_date: {
                type: Sequelize.DATE
            },
            fine: {
                type: Sequelize.DECIMAL(10, 2)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('LoanRecords');
    }
};
