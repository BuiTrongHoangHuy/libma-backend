import express from 'express';
import bodyParser from 'body-parser';
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import {checkUserJWT} from "../middleware/JWTActions";
import {route} from "express/lib/application";
import readerController from "../controllers/readerController";

let router = express.Router();


let v1Router = (app) => {

    router.get('/', (req, res) => {
        return res.send('hello  12');
    });

    router.post('/register', apiController.handleRegister
    );
    router.post('/login', apiController.handleLogin)
    router.get('/users/list', userController.listUser)
    router.post('/users/add', userController.addUser)
    router.put('/users/delete', userController.deleteUser)
    router.get('/readers/list', readerController.listReader)
    router.post('/readers/add', readerController.createReader)
    router.get('/readers/:id', readerController.getReaderById);
    return app.use("/api/v1", router);
}

module.exports = v1Router;