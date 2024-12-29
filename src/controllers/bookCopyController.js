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
const createBook = async (req, res) => {
    try {
        if (!req.body.editionId) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const edition = await bookCopyService.createBookCopy(req.body);
        res.status(201).json(edition);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};

module.exports = {listBook, createBook}