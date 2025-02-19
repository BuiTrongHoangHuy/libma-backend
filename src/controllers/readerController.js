import readerService from "../services/readerService";
import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";

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

const createReader = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password
            || !req.body.fullName || !req.body.phoneNumber) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const reader = await readerService.createReader(req.body);
        res.status(201).json(reader);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};
const getReaderById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const reader = await readerService.getReaderById(id);
        if (reader) {
            res.status(200).json(reader);
        } else {
            res.status(404).json({error: 'Reader not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const deleteReader = async (req, res) => {
    try {
        let response = await readerService.deleteReader(req.params.id)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const updateReader = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const title = await readerService.updateReader(req.params.id, req.body);
        if (title) {
            res.status(200).json(title);
        } else {
            res.status(404).json({error: 'Reader not found'});
        }

    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
module.exports = {listReader, createReader, getReaderById, deleteReader,updateReader}