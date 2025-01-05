'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Violations', {
            violation_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            reader_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            violation_type: {
                type: DataTypes.ENUM('Late_Return', 'Lost_Book', 'Damaged_Book'),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            fine_amount: {
                type: DataTypes.DECIMAL(10, 2),
            },
            resolved: {
                type: DataTypes.INTEGER,
                defaultValue: false,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,

            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Violations');
    }
};
