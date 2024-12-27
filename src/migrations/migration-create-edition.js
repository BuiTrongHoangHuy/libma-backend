'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Editions', {
            edition_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            title_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            edition_number: {
                type: Sequelize.INTEGER,
            },
            publication_year: {
                type: Sequelize.INTEGER,
            },
            publisher: {
                type: Sequelize.STRING,
            },
            pages: {
                type: Sequelize.INTEGER,
            },
            thumbnail_url: {
                type: Sequelize.STRING()
            },
            isbn: {
                type: Sequelize.STRING,
                unique: true,
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
        await queryInterface.dropTable('Editions');
    }
};
