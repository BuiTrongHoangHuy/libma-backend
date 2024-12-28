import express from 'express';
import bodyParser from 'body-parser';
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import {checkUserJWT} from "../middleware/JWTActions";
import {route} from "express/lib/application";
import readerController from "../controllers/readerController";
import categoryController from "../controllers/categoryController";
import titleController from "../controllers/titleController";

let router = express.Router();


let v1Router = (app) => {

    router.get('/', (req, res) => {
        return res.send('hello  12');
    });

    router.post('/register', apiController.handleRegister
    );
    router.post('/login', apiController.handleLogin)

    //user
    router.get('/users/list', userController.listUser)
    router.post('/users/add', userController.addUser)
    router.put('/users/delete', userController.deleteUser)

    //reader
    router.get('/readers/list', readerController.listReader)
    router.post('/readers/add', readerController.createReader)
    router.get('/readers/:id', readerController.getReaderById);
    router.put('/readers/:id', readerController.deleteReader);


    //category
    router.get('/categories/list', categoryController.listCategory);
    router.post('/categories/add', categoryController.createCategory)
    router.put('/categories/:id', categoryController.deleteCategory);


    //title
    router.get('/titles/list', titleController.listTitle);
    router.post('/titles/add', titleController.createTitle)
    router.get('/titles/:id', titleController.getTitleById);
    router.put('/titles/:id', titleController.deleteTitle);

    return app.use("/api/v1", router);
}

module.exports = v1Router;