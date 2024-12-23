'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Editions', {
            edition_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            title_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'Titles',
                    key: 'title_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            edition_number: {
                type: Sequelize.INTEGER
            },
            publication_year: {
                type: Sequelize.INTEGER
            },
            publisher: {
                type: Sequelize.STRING
            },
            pages: {
                type: Sequelize.INTEGER
            },
            isbn: {
                type: Sequelize.STRING,
                unique: true
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
        await queryInterface.dropTable('Editions');
    }
};
