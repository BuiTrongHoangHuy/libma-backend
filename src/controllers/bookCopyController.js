import readerService from "../services/readerService";
import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import categoryService from "../services/categoryService";
import {title} from "process";
import editionService from "../services/editionService";
import bookCopyService from "../services/bookCopyService";

const listBook = async (req, res) => {
    try {
        let response = await bookCopyService.listBookCopy()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

module.exports = {listBook}