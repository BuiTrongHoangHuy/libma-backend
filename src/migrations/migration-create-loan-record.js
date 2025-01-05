'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('LoanRecords', {
            transaction_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
            },
            reader_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            copy_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            loan_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            due_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            return_date: {
                type: Sequelize.DATE,
            },
            fine: {
                type: Sequelize.DECIMAL(10, 2),
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,

            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        await queryInterface.addConstraint('LoanRecords', {
            fields: ['transaction_id', 'copy_id'],
            type: 'primary key',
            name: 'loanrecords_composite_pk',
        });
    },



    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('LoanRecords');
    }
};
