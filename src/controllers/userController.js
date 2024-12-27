import userService from "../services/userService";
import {ErrorResponse} from "../libs/response";

const listUser = async (req, res) => {
    try {
        let response = await userService.listUser()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

const addUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password
            || !req.body.fullName || !req.body.username) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        let response = await userService.addUser(req.body);
        return res.status(200).json({
            message: response.message,
            code: response.code,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
module.exports = {
    listUser,
    addUser
}