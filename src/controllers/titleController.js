import readerService from "../services/readerService";
import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import titleService from "../services/titleService";

const listTitle = async (req, res) => {
    try {
        let response = await titleService.listTitle()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

module.exports = {listTitle}