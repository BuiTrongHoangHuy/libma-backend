import db from '../models/index'
import bcrypt from "bcryptjs";

const listReader = async () => {
    try {
        const readers = await db.Reader.findAll({
            attributes: ['reader_id',
                ['full_name', 'fullName'],
                ['phone_number', 'phoneNumber'],
                'email',
                'address',
                'type',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(readers.every(user => user instanceof db.Reader)); // true

        return {
            message: 'Get list user successful',
            code: 200,
            data: readers || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

const createReader = async (readerData) => {
    const transaction = await db.sequelize.transaction();
    try {
        let checkEmail = await db.Account.findOne({where: {email: readerData.email}})
        if (checkEmail) {
            return {
                message: 'Email already exists',
                code: 400,
            }
        }
        const salt = bcrypt.genSaltSync(10)
        let hashedPassword = await bcrypt.hash(readerData.password, salt)

        const newAccount = await db.Account.create({
            email: readerData.email,
            password: hashedPassword,
            salt: salt,
        }, {transaction})

        await db.Reader.create({
            account_id: newAccount.account_id,
            email: readerData.email,
            password: hashedPassword,
            salt: salt,
            full_name: readerData.fullName,
            type: readerData.type || "Guest",
            address: readerData.address,
            phone_number: readerData.phoneNumber,
        }, {transaction})

        await transaction.commit()

        return {
            message: 'Successfully add reader',
            code: 200,
        }
    } catch (error) {
        await transaction.rollback()
        console.log(error)
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
};
module.exports = {listReader, createReader};