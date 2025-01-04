import userService from "../services/userService";
import {ErrorResponse, SimpleResponse} from "../libs/response";
import readerService from "../services/readerService";
import titleService from "../services/titleService";

const listUser = async (req, res) => {
    try {
        let response = await userService.listUser()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

const addUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password
            || !req.body.fullName) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        let response = await userService.addUser(req.body);
        return res.status(200).json({
            message: response.message,
            code: response.code,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const deleteUser = async (req, res) => {
    try {
        let response = await userService.deleteUser(req.body.email)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const user = await userService.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const title = await userService.updateUser(req.params.id, req.body);
        if (title) {
            res.status(200).json(title);
        } else {
            res.status(404).json({error: 'User not found'});
        }

    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
module.exports = {
    listUser,
    addUser,
    deleteUser,
    getUserById,
    updateUser
}