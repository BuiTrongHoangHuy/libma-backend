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

const createLoanRecord = async (dataArray) => {
    try {
        if (!dataArray || dataArray.length === 0) {
            return {
                message: "Failed to add loan records",
                code: 500,
            };
        }
        const transactionId = uuidv4();

        const Records = await Promise.all(
            dataArray.map((data) => {
                return db.LoanRecord.create({
                    transaction_id: transactionId,
                    reader_id: data.readerId,
                    copy_id: data.copyId,
                    loan_date: data.loanDate,
                    due_date: data.dueDate,
                    return_date: data.returnDate,
                    fine: data.fine,
                    status: data.status,
                });
            })
        );

        return {
            message: "Successfully added loan records",
            code: 200,
            transactionId: transactionId,
            data: Records,
        };
    } catch (error) {
        console.log(error)
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
module.exports = {listLoanRecord, createLoanRecord, getLoanRecordById, deleteLoanRecord, updateLoanRecord};