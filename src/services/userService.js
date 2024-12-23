import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index'

const checkEmailExist = async (email) => {
    let user = await db.Account.findOne({where: {email: email}})
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
                code: 1,
            }
        }
        const salt = bcrypt.genSaltSync(10)

        let hassPassword = await bcrypt.hash(rawUserData.password, salt)
        await db.Account.create({
            email: rawUserData.email,
            password: hassPassword,
            salt: salt,
            username: rawUserData.email,
        })
        return {
            msg: 'Successfully created user',
            code: 0,
        }
    } catch (e) {
        console.log(e)
        return {
            msg: 'Something went wrong',
            code: 2,
            error: e,
        }
    }

}

module.exports = {
    createUser,
}