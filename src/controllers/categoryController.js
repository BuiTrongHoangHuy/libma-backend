import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import categoryService from "../services/categoryService";
import readerService from "../services/readerService";

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

const createCategory = async (req, res) => {
    try {
        if (!req.body.categoryName) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const reader = await categoryService.createCategory(req.body);
        res.status(201).json(reader);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};

const deleteCategory = async (req, res) => {
    try {
        let response = await categoryService.deleteCategory(req.params.id)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const user = await categoryService.getCategoryById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'Category not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
module.exports = {listCategory, createCategory, deleteCategory,getCategoryById}