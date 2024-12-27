'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BookCopies', {
            copy_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            edition_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            condition: {
                type: Sequelize.ENUM('New', 'Good', 'Old'),
            },
            location: {
                type: Sequelize.STRING,
            },
            book_status: {
                type: Sequelize.ENUM('Available', 'Borrowed'),
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
        await queryInterface.dropTable('BookCopies');
    }
};
