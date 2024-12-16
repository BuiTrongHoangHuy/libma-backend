'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('LoanRecords', {
            transaction_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            member_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'Members',
                    key: 'member_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            copy_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                /*references: {
                    model: 'BookCopies',
                    key: 'copy_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'*/
            },
            loan_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            due_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            return_date: {
                type: Sequelize.DATE
            },
            fine: {
                type: Sequelize.DECIMAL(10, 2)
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
        await queryInterface.dropTable('LoanRecords');
    }
};
