'use strict'
import db from '../models/index'
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";

const listViolation = async () => {
    try {
        const violations = await db.Violation.findAll({
            include: [{
                model: db.Reader,
                attributes: ['email',['full_name','fullName']],
            }],
            attributes: [['violation_id', 'violationId'],
                ['reader_id', 'readerId'],
                ['violation_type', 'violationType'],
                'description',
                ['fine_amount', 'fineAmount'],
                'resolved',
                ['penalty_date', 'penaltyDate'],
                ['penalty_end_date', 'penaltyEndDate'],
                'status',
                'createdAt',
                'updatedAt'
            ],
            where: {
                status: 1
            }
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

const createViolation = async (data) => {
    try {
        const reader = await db.Reader.findByPk(data.readerId);
        if (!reader) {
            return { message: 'Reader not found' }
        }

        const violation = await db.Violation.create({
            reader_id: data.readerId,
            violation_type: data.violationType,
            description: data.description,
            fine_amount: data.fineAmount,
            penalty_date: data.penaltyDate,
            penalty_end_date: data.penaltyEndDate,
            resolved: data.resolved || false,
        });

        return {
            message: 'Violation created successfully',
            code:200,
            data:violation,
        }
    } catch (error) {
        console.error('Error creating violation:', error);
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
};

module.exports = {listViolation,createViolation};