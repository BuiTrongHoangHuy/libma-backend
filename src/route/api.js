import express from 'express';
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import readerController from "../controllers/readerController";
import categoryController from "../controllers/categoryController";
import titleController from "../controllers/titleController";
import editionController from "../controllers/editionController";
import bookCopyController from "../controllers/bookCopyController";
import loanRecordController from "../controllers/loanRecordController";
import violationController from "../controllers/violationController";

let router = express.Router();


let v1Router = (app) => {

    router.get('/', (req, res) => {
        return res.send('test deploy 2');
    });
    router.get("/ping", (req, res) => {
        return res.send("pong");
    })
    router.post('/register', apiController.handleRegister
    );
    router.post('/login', apiController.handleLogin)

    //user
    router.get('/users/list', userController.listUser)
    router.post('/users/add', userController.addUser)
    router.put('/users/delete', userController.deleteUser)
    router.get('/users/:id', userController.getUserById);
    router.put('/users/:id', userController.updateUser);

    //reader
    router.get('/readers/list', readerController.listReader)
    router.post('/readers/add', readerController.createReader)
    router.get('/readers/:id', readerController.getReaderById);
    router.put('/readers/delete/:id', readerController.deleteReader);
    router.put('/readers/:id', readerController.updateReader);


    //category
    router.get('/categories/list', categoryController.listCategory);
    router.post('/categories/add', categoryController.createCategory)
    router.put('/categories/delete/:id', categoryController.deleteCategory);
    router.get('/categories/:id', categoryController.getCategoryById);
    router.put('/categories/:id', categoryController.updateCategory);


    //title
    router.get('/titles/list', titleController.listTitle);
    router.post('/titles/add', titleController.createTitle)
    router.get('/titles/:id', titleController.getTitleById);
    router.put('/titles/delete/:id', titleController.deleteTitle);
    router.put('/titles/:id', titleController.updateTitle);


    //edition
    router.get('/editions/list', editionController.listEdition);
    router.post('/editions/add', editionController.createEdition);
    router.get('/editions/:id', editionController.getEditionById);
    router.put('/editions/delete/:id', editionController.deleteEdition);
    router.put('/editions/:id', editionController.updateEdition);

    //book copy
    router.get('/bookCopies/list', bookCopyController.listBook);
    router.post('/bookCopies/add', bookCopyController.createBook);
    router.get('/bookCopies/:id', bookCopyController.getBookById);
    router.put('/bookCopies/delete/:id', bookCopyController.deleteBook);
    router.put('/bookCopies/:id', bookCopyController.updateBook);


    //loan record
    router.get('/loanRecords/list', loanRecordController.listLoanRecord);
    router.post('/loanRecords/add', loanRecordController.createLoanRecord);
    router.get('/loanRecords/:id', loanRecordController.getLoanRecordById);
    router.put('/loanRecords/delete/:id', loanRecordController.deleteLoanRecord);
    router.put('/loanRecords/:id', loanRecordController.updateLoanRecord);


    //violation
    router.get('/violations/list', violationController.listViolation);

    return app.use("/api/v1", router);
}

module.exports = v1Router;