import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index'
import {createJWT} from "../middleware/JWTActions"
import {ErrorResponse} from "../libs/response";

require('dotenv').config()
const checkEmailExist = async (email) => {
    let user = await db.User.findOne({where: {email: email}})
    console.log(user)
    if (user) {
        return true;
    }
    return false;
}

const registerUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        console.log(isEmailExist)
        if (isEmailExist) {
            return {
                message: 'Email already exists',
                code: 400,
            }
        }
        const salt = bcrypt.genSaltSync(10)

        let hassPassword = await bcrypt.hash(rawUserData.password, salt)
        await db.User.create({
            email: rawUserData.email,
            password: hassPassword,
            salt: salt,
            username: rawUserData.email,
            full_name: rawUserData.full_name,
            role: "Reader",
        })
        return {
            message: 'Successfully created user',
            code: 200,
        }
    } catch (e) {
        console.log(e)
        return {
            message: 'Something went wrong',
            code: 500,
            error: e,
        }
    }

}

const loginUser = async (rawUserData) => {
    try {
        const user = await db.User.findOne({where: {email: rawUserData.email}});
        if (user) {
            const userPassword = await bcrypt.hash(rawUserData.password, user.salt)
            const isPasswordValid = userPassword === user.password
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
            attributes: ['username',
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
    try {
        let checkEmail = await db.User.findOne({where: {email: data.email}})
        if (checkEmail) {
            return {
                message: 'Email already exists',
                code: 400,
            }
        }
        let checkUsername = await db.User.findOne({where: {username: data.username}})
        if (checkUsername) {
            return {
                message: 'Username already exists',
                code: 400,
            }
        }
        const salt = bcrypt.genSaltSync(10)
        let hassPassword = await bcrypt.hash(data.password, salt)
        await db.User.create({
            email: data.email,
            password: hassPassword,
            salt: salt,
            username: data.username || "",
            full_name: data.fullName,
            role: data.role,
            address: data.address,
            phone_number: data.phoneNumber,
        })
        return {
            message: 'Successfully created user',
            code: 200,
        }
    } catch (error) {
        console.log(error)
        return {
            message: error.message,
            code: 500,
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
module.exports = {
    registerUser,
    loginUser,
    listUser,
    addUser,
    deleteUser
}