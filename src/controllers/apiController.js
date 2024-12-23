import userService from "../services/userService";
import {use} from "express/lib/application";

const testApi = (req, res, next) => {
    return res.status(200).json({
        message: 'oke',
        data: 'test api'
    })
}

const handleRegister = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.full_name) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }

        let response = await userService.createUser(req.body)
        return res.status(200).json({
            message: response.msg,
            code: response.code,
        })
    } catch (err) {
        return res.status(400).json({message: err.message, data: err.data})
    }
}
const handleLogin = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }

        let response = await userService.loginUser(req.body)
        return res.status(200).json({
            message: response.msg,
            code: response.code,
        })

    } catch (err) {
        return res.status(400).json({message: err.message, data: err.data})
    }
}
module.exports = {
    handleRegister,
    handleLogin,
}