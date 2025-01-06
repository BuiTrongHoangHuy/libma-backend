'use strict'
import db from '../models/index'
import bcrypt from "bcryptjs";
const { v4: uuidv4 } = require('uuid'); // Import thư viện UUID

const listLoanRecord = async () => {
    try {
        const records = await db.LoanRecord.findAll({
            include: [
                {
                    model: db.Reader,
                    attributes: [
                        ['reader_id', 'readerId'],
                        ['account_id', 'accountId'],
                        ['phone_number', 'phoneNumber'],
                        'email',
                        ['full_name', 'fullName'],
                        'address',
                        'type',
                        'status',
                    ],
                },
                {
                    model: db.BookCopy,
                    attributes: [
                        ['copy_id', 'copyId'],
                        ['edition_id', 'editionId'],
                    ],
                },
            ],
            attributes: [
                ['transaction_id', 'transactionId'],
                ['reader_id', 'readerId'],
                ['copy_id', 'copyId'],
                ['loan_date', 'loanDate'],
                ['due_date', 'dueDate'],
                ['return_date', 'returnDate'],
                'fine',
                'status',
                'createdAt',
                'updatedAt',
            ],
        });

        if (!records || records.length === 0) {
            return {
                message: 'No loan records found',
                code: 404,
            };
        }

        const result = records.reduce((acc, record) => {
            const {
                transactionId,
                readerId,
                loanDate,
                dueDate,
                returnDate,
                fine,
                status,
                createdAt,
                updatedAt,
                Reader,
                BookCopy,
            } = record.get({ plain: true });

            let existingRecord = acc.find((item) => item.transactionId === transactionId);

            if (!existingRecord) {
                existingRecord = {
                    transactionId,
                    readerId,
                    loanDate,
                    dueDate,
                    fine,
                    status,
                    createdAt,
                    updatedAt,
                    Reader,
                    BookCopy: [],
                };
                acc.push(existingRecord);
            }

            existingRecord.BookCopy.push({
                ...BookCopy,
                loanDate,
                dueDate,
                returnDate,
                status
            });
            return acc;
        }, []);

        return {
            message: 'Get list loan records successful',
            code: 200,
            data: result,
        };
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        };
    }
}

const createLoanRecord = async (data) => {
    try {
        if (!data || !data.readerId || !data.loanDate || !Array.isArray(data.loanBooks) || data.loanBooks.length === 0) {
            return {
                message: "Invalid input data",
                code: 400,
            };
        }

        const uuid = uuidv4();
        const transactionId = uuid.replace(/\D/g, '').substring(0, 10);

        const records = await Promise.all(
            data.loanBooks.map( async (book) => {

                const loanRecord = await db.LoanRecord.create({
                    transaction_id: transactionId,
                    reader_id: data.readerId,
                    copy_id: book.copyId,
                    loan_date: data.loanDate,
                    due_date: book.dueDate,
                    return_date: book.returnDate || null,
                    fine: book.fine || null,
                    status: book.status || 1,
                });
                await db.BookCopy.update(
                    { bookStatus: "Borrowed" },
                    { where: { copy_id: book.copyId } }
                );
                return loanRecord;
            })
        );

        return {
            message: "Successfully added loan records",
            code: 200,
            transactionId: transactionId,
            data: records.map((record) => record.get({ plain: true })),
        };
    } catch (error) {
        console.error(error);
        return {
            message: "Failed to add loan records",
            code: error.code || 500,
            error: error.message,
        };
    }
};

const getLoanRecordById = async (id) => {
    try {
        const records = await db.LoanRecord.findAll({
            include: [
                {
                    model: db.Reader,
                    attributes: [
                        ['reader_id', 'readerId'],
                        ['account_id', 'accountId'],
                        ['phone_number', 'phoneNumber'],
                        'email',
                        ['full_name', 'fullName'],
                        'address',
                        'type',
                        'status',
                    ],
                },
                {
                    model: db.BookCopy,
                    attributes: [
                        ['copy_id', 'copyId'],
                        ['edition_id', 'editionId'],
                    ],
                },
            ],
            attributes: [
                ['transaction_id', 'transactionId'],
                ['reader_id', 'readerId'],
                ['copy_id', 'copyId'],
                ['loan_date', 'loanDate'],
                ['due_date', 'dueDate'],
                ['return_date', 'returnDate'],
                'fine',
                'status',
                'createdAt',
                'updatedAt',
            ],
            where: { transaction_id: id },
        });

        if (!records || records.length === 0) {
            return {
                message: 'No loan record found',
                code: 404,
            };
        }

        const result = records.reduce((acc, record) => {
            const {
                transactionId,
                readerId,
                loanDate,
                dueDate,
                returnDate,
                fine,
                status,
                createdAt,
                updatedAt,
                Reader,
                BookCopy,
            } = record.get({ plain: true });

            let existingRecord = acc.find((item) => item.transactionId === transactionId);

            if (!existingRecord) {
                existingRecord = {
                    transactionId,
                    readerId,
                    loanDate,
                    dueDate,
                    fine,
                    status,
                    createdAt,
                    updatedAt,
                    Reader,
                    BookCopy: [],
                };
                acc.push(existingRecord);
            }

            existingRecord.BookCopy.push({
                ...BookCopy,
                loanDate,
                dueDate,
                returnDate,
                status
            });
            return acc;
        }, [])[0];

        return {
            message: 'Get loan record detail successful',
            code: 200,
            data: result,
        };
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        };
    }
}

const deleteLoanRecord = async (id) => {
    try {
        let checkRecord = await db.LoanRecord.findOne({where: {transaction_id: id}})
        if (!checkRecord) {
            return {
                message: 'Loan record not found',
                code: 404,
            }
        }
        await db.LoanRecord.update(
            {status: 0},
            {
                where: {
                    transaction_id: id,
                },
            },
        );
        return {
            message: 'Successfully delete loan record',
            code: 200,
        }
    } catch (error) {
        return {
            message: error.message,
            code: 500,
            error: error,
        }
    }
}

const updateLoanRecord = async (recordId, data) => {
    try {
        const record = await db.LoanRecord.findByPk(recordId);
        if (record) {
            await db.LoanRecord.update({
                reader_id: data.readerId,
                copy_id: data.copyId,
                loan_date: data.loanDate,
                due_date: data.dueDate,
                return_date: data.returnDate,
                fine: data.fine,
                status: data.status,
            }, {
                where: {transaction_id: recordId}
            })
            return {
                message: 'Successfully update loan record',
                code: 200,
            }
        }
    } catch (error) {
        return {
            message: error.message,
            code: 500,
            error: error,
        }
    }

}
const loanReport = async () => {
    try {
        const totalRecords = await db.LoanRecord.count({
            distinct: true,
            col: 'transaction_id',
        });

        const activeRecords = await db.LoanRecord.count({
            distinct: true,
            col: 'transaction_id',
            where: { status: 1 },
        });

        const overdueRecords = await db.LoanRecord.count({
            distinct: true,
            col: 'transaction_id',
            where: {
                status: 1,
                due_date: {
                    [db.Sequelize.Op.lt]: new Date(),
                },
            },
        });

        const dueTodayRecords = await db.LoanRecord.count({
            distinct: true,
            col: 'transaction_id',
            where: {
                status: 1,
                due_date: {
                    [db.Sequelize.Op.eq]: new Date().toISOString().split('T')[0],
                },
            },
        });

        return {
            message: 'Get loan report successful',
            code: 200,
            data: {
                totalRecords,
                activeRecords,
                overdueRecords,
                dueTodayRecords,
            },
        };
    } catch (error) {
        return {
            message: error.message,
            code: 500,
            error: error,
        };
    }
};
const loanRecordsByMonth = async () => {
    try {
        const records = await db.LoanRecord.findAll({
            attributes: [
                [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('loan_date'), '%Y-%m'), 'month'], // Group by year-month
                [db.Sequelize.fn('COUNT', db.Sequelize.col('transaction_id')), 'total'],
            ],
            group: ['month'],
            order: [[db.Sequelize.literal('month'), 'ASC']],
        });

        if (!records || records.length === 0) {
            return {
                message: 'No loan records found',
                code: 404,
            };
        }

        const result = records.map(record => record.get({ plain: true }));

        return {
            message: 'Get loan records by month successful',
            code: 200,
            data: result,
        };
    } catch (error) {
        return {
            message: error.message,
            code: 500,
            error: error,
        };
    }
};

const returnBooks = async (transactionId, newStatus = 2) => {
    try {
        const loanRecords = await db.LoanRecord.findAll({
            where: { transaction_id: transactionId },
            include: [
                {
                    model: db.BookCopy,
                    attributes: ['copy_id', 'book_status'],
                }
            ]
        });

        if (!loanRecords || loanRecords.length === 0) {
            return {
                message: 'No loan records found for this transaction',
                code: 404,
            };
        }

        const updateBookCopies = loanRecords.map(async (record) => {
            const bookCopy = record.BookCopy;
            if (bookCopy) {
                await db.BookCopy.update(
                    { book_status: newStatus },
                    { where: { copy_id: bookCopy.copy_id } }
                );
            }
        });

        await Promise.all(updateBookCopies);

        await db.LoanRecord.update(
            { status: 2 },
            { where: { transaction_id: transactionId } }
        );

        return {
            message: 'Successfully updated book statuses for transaction',
            code: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            message: error.message,
            code: 500,
            error: error,
        };
    }
};
module.exports = {listLoanRecord, createLoanRecord, getLoanRecordById, deleteLoanRecord, updateLoanRecord, loanReport,loanRecordsByMonth,returnBooks};