'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Adding foreign key to Editions
        await queryInterface.addConstraint('Editions', {
            fields: ['title_id'],
            type: 'foreign key',
            name: 'FK_title_id', // tên khóa ngoại
            references: {
                table: 'Titles',
                field: 'title_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to BookCopies
        await queryInterface.addConstraint('BookCopies', {
            fields: ['edition_id'],
            type: 'foreign key',
            name: 'FK_edition_id',
            references: {
                table: 'Editions',
                field: 'edition_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to LoanRecords
        await queryInterface.addConstraint('LoanRecords', {
            fields: ['member_id'],
            type: 'foreign key',
            name: 'FK_member_id',
            references: {
                table: 'Members',
                field: 'member_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        await queryInterface.addConstraint('LoanRecords', {
            fields: ['copy_id'],
            type: 'foreign key',
            name: 'FK_copy_id',
            references: {
                table: 'BookCopies',
                field: 'copy_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to Violations
        await queryInterface.addConstraint('Violations', {
            fields: ['transaction_id'],
            type: 'foreign key',
            name: 'FK_transaction_id',
            references: {
                table: 'LoanRecords',
                field: 'transaction_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to Notifications
        await queryInterface.addConstraint('Notifications', {
            fields: ['member_id'],
            type: 'foreign key',
            name: 'FK_member_notification',
            references: {
                table: 'Members',
                field: 'member_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to Members
        await queryInterface.addConstraint('Members', {
            fields: ['account_id'],
            type: 'foreign key',
            name: 'FK_account_member',
            references: {
                table: 'Accounts',
                field: 'account_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to Admins
        await queryInterface.addConstraint('Admins', {
            fields: ['account_id'],
            type: 'foreign key',
            name: 'FK_account_admin',
            references: {
                table: 'Accounts',
                field: 'account_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Adding foreign key to Librarians
        await queryInterface.addConstraint('Librarians', {
            fields: ['account_id'],
            type: 'foreign key',
            name: 'FK_account_librarian',
            references: {
                table: 'Accounts',
                field: 'account_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('Editions', 'FK_title_id');
        await queryInterface.removeConstraint('BookCopies', 'FK_edition_id');
        await queryInterface.removeConstraint('LoanRecords', 'FK_member_id');
        await queryInterface.removeConstraint('LoanRecords', 'FK_copy_id');
        await queryInterface.removeConstraint('Violations', 'FK_transaction_id');
        await queryInterface.removeConstraint('Notifications', 'FK_member_notification');
        await queryInterface.removeConstraint('Members', 'FK_account_member');
        await queryInterface.removeConstraint('Admins', 'FK_account_admin');
        await queryInterface.removeConstraint('Librarians', 'FK_account_librarian');
    }
};
