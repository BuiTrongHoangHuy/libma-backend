import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import categoryService from "../services/categoryService";

const listCategory = async (req, res) => {
    try {
        let response = await categoryService.listCategory()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

module.exports = {listCategory}