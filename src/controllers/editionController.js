import readerService from "../services/readerService";
import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import categoryService from "../services/categoryService";
import {title} from "process";
import editionService from "../services/editionService";

const listEdition = async (req, res) => {
    try {
        let response = await editionService.listEdition()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const createEdition = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.titleId) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const edition = await editionService.createEdition(req.body);
        if(edition.code !==200){
            return res.status(400).json(edition);
        }
        res.status(200).json(edition);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};
const getEditionById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const edition = await editionService.getEditionById(id);
        if (edition) {
            res.status(200).json(edition);
        } else {
            res.status(404).json({error: 'Edition not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const deleteEdition = async (req, res) => {
    try {
        let response = await editionService.deleteEdition(req.params.id)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

const updateEdition = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const edition = await editionService.updateEdition(req.params.id, req.body);
        if (edition) {
            res.status(200).json(edition);
        } else {
            res.status(404).json({error: 'Edition not found'});
        }

    } catch (err) {
        return res.status(400).send(ErrorResponse(err))

    }
}
const addBookFast = async (req,res) =>{
    try{
        if (!req.body.title|| !req.body.isbn || !req.body.author) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const edition = await editionService.addBookFast(req.body);
        if(edition.code !==200){
            return res.status(400).json(edition);
        }
        res.status(200).json(edition);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }

}
module.exports = {listEdition, createEdition, getEditionById, deleteEdition, updateEdition,addBookFast}