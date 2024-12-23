'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Members', {
            member_id: {
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
            phone_number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            full_name: {
                type: Sequelize.STRING
            },
            address: {
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
        await queryInterface.dropTable('Members');
    }
};
