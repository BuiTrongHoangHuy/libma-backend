import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index'
import {createJWT} from "../middleware/JWTActions"

require('dotenv').config()
const checkEmailExist = async (email) => {
    let user = await db.User.findOne({where: {email: email}})
    console.log(user)
    if (user) {
        return true;
    }
    return false;
}

const createUser = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        console.log(isEmailExist)
        if (isEmailExist) {
            return {
                msg: 'Email already exists',
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
            role: "Admin",
        })
        return {
            msg: 'Successfully created user',
            code: 201,
        }
    } catch (e) {
        console.log(e)
        return {
            msg: 'Something went wrong',
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
                    msg: 'Login successful',
                    code: 200,
                    data: {
                        access_token: token,
                    },
                }
            } else {
                return {
                    msg: 'Invalid email or password',
                    code: 401,
                }
            }
        } else {
            return {
                msg: 'Invalid email or password',
                code: 401
            }
        }
    } catch (e) {
        return {
            msg: e.message,
            code: e.code,
            error: e,
        }
    }
}
module.exports = {
    createUser,
    loginUser,
}