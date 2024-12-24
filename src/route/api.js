import express from 'express';
import bodyParser from 'body-parser';
import apiController from "../controllers/apiController";
import {checkUserJWT} from "../middleware/JWTActions";

let router = express.Router();


let v1Router = (app) => {

    router.get('/', (req, res) => {
        return res.send('hello  12');
    });

    router.post('/register', apiController.handleRegister
    );
    router.post('/login', apiController.handleLogin)


    return app.use("/api/v1", router);
}

module.exports = v1Router;