import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import db from '../models/index'
import {createJWT} from "../middleware/JWTActions"
import {ErrorResponse} from "../libs/response";

require('dotenv').config()
const checkEmailExist = async (email) => {
    let user = await db.Account.findOne({where: {email: email}})
    console.log(user)
    if (user) {
        return true;
    }
    return false;
}

const registerUser = async (rawUserData) => {
    const transaction = await db.sequelize.transaction();
    try {
        let user = await db.Account.findOne({where: {email: email}})
        if (user) {
            return {
                message: 'Email already exists',
                code: 400,
            }
        }
        const salt = bcrypt.genSaltSync(10)

        let hashedPassword = await bcrypt.hash(rawUserData.password, salt)
        const newAccount = await db.Account.create({
            email: rawUserData.email,
            password: hashedPassword,
            salt: salt,
        }, {transaction})
        await db.User.create({
            account_id: newAccount.account_id,
            full_name: rawUserData.full_name,
            email: rawUserData.email,
            role: "Admin",
            phone_number: rawUserData.phoneNumber,
            address: rawUserData.address,
        }, {transaction});

        await transaction.commit()
        return {
            message: 'Successfully created user',
            code: 200,
        }
    } catch (e) {
        console.log(e)
        if (transaction) await transaction.rollback();
        return {
            message: 'Something went wrong',
            code: 500,
            error: e,
        }
    }

}

const loginUser = async (rawUserData) => {
    try {
        const user = await db.User.findOne(
            {
                include: [{model: db.Account, attributes: ['email', 'password', 'salt']}],
                where: {email: rawUserData.email}
            });
        console.log(user)
        if (user && user.Account) {
            const userPassword = await bcrypt.hash(rawUserData.password, user.Account.salt)
            const isPasswordValid = userPassword === user.Account.password
            console.log(userPassword, user.password)
            if (isPasswordValid) {
                let payload = {
                    id: user.user_id,
                    email: user.email,
                    role: user.role,
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }
                let token = createJWT(payload)
                return {
                    message: 'Login successful',
                    code: 200,
                    data: {
                        access_token: token,
                    },
                }
            } else {
                return {
                    message: 'Invalid email or password',
                    code: 401,
                }
            }
        } else {
            return {
                message: 'Invalid email or password',
                code: 401
            }
        }
    } catch (e) {
        return {
            message: e.message,
            code: e.code,
            error: e,
        }
    }
}

const listUser = async () => {
    try {
        const users = await db.User.findAll({
            attributes: ['user_id',
                ['full_name', 'fullName'],
                ['phone_number', 'phoneNumber'],
                'email',
                'address',
                'role',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(users.every(user => user instanceof db.User)); // true

        return {
            message: 'Get list user successful',
            code: 200,
            data: users
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}
const addUser = async (data) => {
    const transaction = await db.sequelize.transaction();
    try {
        let checkEmail = await db.Account.findOne({where: {email: data.email}})
        if (checkEmail) {
            return {
                message: 'Email already exists',
                code: 400,
            }
        }
        const salt = bcrypt.genSaltSync(10)
        let hashedPassword = await bcrypt.hash(data.password, salt)

        const newAccount = await db.Account.create({
            email: data.email,
            password: hashedPassword,
            salt: salt,
        }, {transaction})

        await db.User.create({
            account_id: newAccount.account_id,
            email: data.email,
            password: hashedPassword,
            salt: salt,
            full_name: data.fullName,
            role: data.role || "Staff",
            address: data.address,
            phone_number: data.phoneNumber,
        }, {transaction})

        await transaction.commit()

        return {
            message: 'Successfully add user',
            code: 200,
        }
    } catch (error) {
        await transaction.rollback()
        console.log(error)
        return {
            message: error.message,
            code: 500,
            error: error,
        }
    }
}
const getUserById = async (id) => {
    try {
        const user = await db.User.findOne(
            {
                where: {user_id: id}
            });
        if (!user) {
            return {
                message: 'No user found',
                code: 200,
            }
        }
        return {
            message: 'Get user detail successful',
            code: 200,
            data: user || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}
const deleteUser = async (email) => {
    try {
        let checkEmail = await db.User.findOne({where: {email: email}})
        if (!checkEmail) {
            return {
                message: 'Email not exists',
                code: 400,
            }
        }
        await db.User.update(
            {status: 0},
            {
                where: {
                    email: email,
                },
            },
        );
        return {
            message: 'Successfully delete user',
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

const updateUser = async (userId, userData) => {
    const transaction = await db.sequelize.transaction();

    try {
        const user = await db.User.findByPk(userId);
        if (user) {
            await db.User.update({
                full_name: userData.fullName,
                phone_number: userData.phoneNumber,
                role: userData.role,
                address: userData.address,
                status: userData.status,
            }, {
                where: {user_id: userId}
            },{transaction})

            await db.Account.update({
                status: readerData.status,
            },{
                where: {account_id: reader.account_id}
            },{transaction})
            await transaction.commit()

            return {
                message: 'Successfully update user',
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
module.exports = {
    registerUser,
    loginUser,
    listUser,
    addUser,
    deleteUser,
    getUserById,updateUser
}