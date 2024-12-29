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
const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const edition = await bookCopyService.getBookCopyById(id);
        if (edition) {
            res.status(200).json(edition);
        } else {
            res.status(404).json({error: 'Book copy not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const deleteBook = async (req, res) => {
    try {
        let response = await bookCopyService.deleteBookCopy(req.params.id)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}


module.exports = {listBook, createBook, getBookById, deleteBook}