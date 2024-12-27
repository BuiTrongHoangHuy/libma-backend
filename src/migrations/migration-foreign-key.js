'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint('Titles', {
            fields: ['category_id'],
            type: 'foreign key',
            name: 'fk_titles_category', // optional
            references: {
                table: 'Categories',
                field: 'category_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Editions', {
            fields: ['title_id'],
            type: 'foreign key',
            name: 'fk_editions_title', // optional
            references: {
                table: 'Titles',
                field: 'title_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('BookCopies', {
            fields: ['edition_id'],
            type: 'foreign key',
            name: 'fk_book_copies_edition', // optional
            references: {
                table: 'Editions',
                field: 'edition_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('LoanRecords', {
            fields: ['reader_id'],
            type: 'foreign key',
            name: 'fk_loan_records_reader', // optional
            references: {
                table: 'Readers',
                field: 'reader_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('LoanRecords', {
            fields: ['copy_id'],
            type: 'foreign key',
            name: 'fk_loan_records_copy', // optional
            references: {
                table: 'BookCopies',
                field: 'copy_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Violations', {
            fields: ['transaction_id'],
            type: 'foreign key',
            name: 'fk_violations_transaction', // optional
            references: {
                table: 'LoanRecords',
                field: 'transaction_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Readers', {
            fields: ['account_id'],
            type: 'foreign key',
            name: 'fk_readers_account', // optional
            references: {
                table: 'Accounts',
                field: 'account_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Notifications', {
            fields: ['reader_id'],
            type: 'foreign key',
            name: 'fk_notifications_reader', // optional
            references: {
                table: 'Readers',
                field: 'reader_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        await queryInterface.addConstraint('Users', {
            fields: ['account_id'],
            type: 'foreign key',
            name: 'fk_users_account', // optional
            references: {
                table: 'Accounts',
                field: 'account_id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('Titles', 'fk_titles_category');
        await queryInterface.removeConstraint('Editions', 'fk_editions_title');
        await queryInterface.removeConstraint('BookCopies', 'fk_book_copies_edition');
        await queryInterface.removeConstraint('LoanRecords', 'fk_loan_records_reader');
        await queryInterface.removeConstraint('LoanRecords', 'fk_loan_records_copy');
        await queryInterface.removeConstraint('Violations', 'fk_violations_transaction');
        await queryInterface.removeConstraint('Readers', 'fk_readers_account');
        await queryInterface.removeConstraint('Notifications', 'fk_notifications_reader');
        await queryInterface.removeConstraint('Users', 'fk_users_account');
    }
};
