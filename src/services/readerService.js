import db from '../models/index'
import bcrypt from "bcryptjs";

const listReader = async () => {
    try {
        const readers = await db.Reader.findAll({
            attributes: ['reader_id',
                ['account_id','accountId'],
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

        const newReader = await db.Reader.create({
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
            data: newReader,
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

const getReaderById = async (id) => {
    try {
        const reader = await db.Reader.findOne(
            {
                where: {reader_id: id}
            });
        if (!reader) {
            return {
                message: 'No reader found',
                code: 200,
            }
        }
        return {
            message: 'Get reader detail successful',
            code: 200,
            data: reader || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

const deleteReader = async (id) => {
    try {
        let checkEmail = await db.Reader.findOne({where: {reader_id: id}})
        if (!checkEmail) {
            return {
                message: 'Reader not found',
                code: 400,
            }
        }
        await db.Reader.update(
            {status: 0},
            {
                where: {
                    reader_id: id,
                },
            },
        );
        return {
            message: 'Successfully delete reader',
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
const updateReader = async (readerId, readerData) => {
    const transaction = await db.sequelize.transaction();
    try {
        const reader = await db.Reader.findByPk(readerId);
        if (reader) {
            await db.Reader.update({
                full_name: readerData.fullName,
                phone_number: readerData.phoneNumber,
                type: readerData.type,
                address: readerData.address,
                status: readerData.status,
            }, {
                where: {reader_id: readerId}
            },{transaction})
            await db.Account.update({
                status: readerData.status,
            },{
                where: {account_id: reader.account_id}
            },{transaction})
            await transaction.commit()
            return {
                message: 'Successfully update reader',
                code: 200,
            }
        }
    } catch (error) {

        if(transaction) await transaction.rollback()
        return {
            message: error.message,
            code: 500,
            error: error,
        }
    }

}
module.exports = {listReader, createReader, getReaderById, deleteReader,updateReader};