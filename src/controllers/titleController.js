import readerService from "../services/readerService";
import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import titleService from "../services/titleService";
import categoryService from "../services/categoryService";
import {title} from "process";

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
const createTitle = async (req, res) => {
    try {
        if (!req.body.titleName || !req.body.author
            || !req.body.categoryId) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const reader = await titleService.createTitle(req.body);
        res.status(201).json(reader);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};
const getTitleById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const title = await titleService.getTitleById(id);
        if (title) {
            res.status(200).json(title);
        } else {
            res.status(404).json({error: 'Title not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const deleteTitle = async (req, res) => {
    try {
        let response = await titleService.deleteTitle(req.params.id)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
module.exports = {listTitle, createTitle, getTitleById, deleteTitle}