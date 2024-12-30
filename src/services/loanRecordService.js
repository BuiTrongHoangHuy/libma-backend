'use strict'
import db from '../models/index'
import bcrypt from "bcryptjs";

const listLoanRecord = async () => {
    try {
        const records = await db.LoanRecord.findAll({
            include: [{
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
            }],
            attributes: [['transaction_id', 'transactionId'],
                ['reader_id', 'readerId'],
                ['copy_id', 'copyId'],
                ['loan_date', 'loanDate'],
                ['due_date', 'dueDate'],
                'fine',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(records.every(user => user instanceof db.LoanRecord)); // true

        return {
            message: 'Get list loan records successful',
            code: 200,
            data: records || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

module.exports = {listLoanRecord};