'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BookCopies', {
            copy_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            edition_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'Editions',
                    key: 'edition_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            condition: {
                type: Sequelize.ENUM('New', 'Good', 'Old')
            },
            location: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.ENUM('Available', 'Borrowed')
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BookCopies');
    }
};
