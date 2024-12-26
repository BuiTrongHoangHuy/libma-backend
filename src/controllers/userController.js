import userService from "../services/userService";
import {ErrorResponse} from "../libs/response";

const listUser = async (req, res) => {
    try {
        let response = await userService.listUser()
        return res.status(200).json({
            message: response.msg,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
module.exports = {
    listUser
}