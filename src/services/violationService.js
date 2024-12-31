'use strict'
import db from '../models/index'
import bcrypt from "bcryptjs";

const listViolation = async () => {
    try {
        const violations = await db.Violation.findAll({
            include: [{
                model: db.LoanRecord,
                attributes: [
                    ['reader_id', 'readerId'],
                    ['copy_id', 'copyId'],
                    ],
                include: [{
                    model:db.Reader,
                    attributes: ['email',['full_name','fullName']],
                }]
            }],
            attributes: [['violation_id', 'violationId'],
                ['transaction_id', 'transactionId'],
                ['violation_type', 'violationType'],
                'description',
                ['fine_amount', 'fineAmount'],
                'resolved',
                ['penalty_date', 'penaltyDate'],
                ['penalty_end_date', 'penaltyEndDate'],
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(violations.every(user => user instanceof db.Violation)); // true

        return {
            message: 'Get list violations successful',
            code: 200,
            data: violations || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}


module.exports = {listViolation};