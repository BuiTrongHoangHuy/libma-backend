import express from 'express';
import bodyParser from 'body-parser';
import apiController from "../controllers/apiController";

let router = express.Router();

let v1Router = (app) => {

    router.get('/', (req, res) => {
        return res.send('hello  12');
    });

    router.post('/libma/create', apiController.handleRegister
    );


    return app.use("/", router);
}

module.exports = v1Router;