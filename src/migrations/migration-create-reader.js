'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Readers', {
            reader_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            account_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            full_name: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.ENUM('Student', 'Guest', 'Teacher')
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Readers');
    }
};
