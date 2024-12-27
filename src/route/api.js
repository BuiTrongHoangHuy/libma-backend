import express from 'express';
import bodyParser from 'body-parser';
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import {checkUserJWT} from "../middleware/JWTActions";
import {route} from "express/lib/application";

let router = express.Router();


let v1Router = (app) => {

    router.get('/', (req, res) => {
        return res.send('hello  12');
    });

    router.post('/register', apiController.handleRegister
    );
    router.post('/login', apiController.handleLogin)
    router.get('/user/list', userController.listUser)
    router.post('/user/add', userController.addUser)

    return app.use("/api/v1", router);
}

module.exports = v1Router;