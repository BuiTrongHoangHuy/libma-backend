import readerService from "../services/readerService";
import {ErrorResponse} from "../libs/response";

const listReader = async (req, res) => {
    try {
        let response = await readerService.listReader()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

module.exports = {listReader}