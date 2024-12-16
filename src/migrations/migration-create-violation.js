'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Violations', {
            violation_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            transaction_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'LoanRecords',
                    key: 'transaction_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            violation_type: {
                type: Sequelize.ENUM('Late_Return', 'Lost_Book', 'Damaged_Book'),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT
            },
            fine_amount: {
                type: Sequelize.DECIMAL(10, 2)
            },
            resolved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        await queryInterface.dropTable('Violations');
    }
};
