import userService from "../services/userService";
import {ErrorResponse, SimpleResponse, SuccessResponse} from "../libs/response";

const handleRegister = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.full_name) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }

        let response = await userService.registerUser(req.body)
        return res.status(200).json({
            message: response.message,
            code: response.code,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
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
        /*return res.status(200).json({
            message: response.msg,
            code: response.code,
            data: response.data ? response.data : {},
        })*/
        return res.status(200).send(response)

    } catch (err) {
        return res.status(400).json({message: err.message, data: err.data})
    }
}
module.exports = {
    handleRegister,
    handleLogin,
}