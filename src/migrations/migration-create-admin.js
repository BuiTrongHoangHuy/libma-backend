'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Admins', {
            admin_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            account_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'Accounts',
                    key: 'account_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phone_number: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Admins');
    }
};
