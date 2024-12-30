import express from 'express';
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import readerController from "../controllers/readerController";
import categoryController from "../controllers/categoryController";
import titleController from "../controllers/titleController";
import editionController from "../controllers/editionController";
import bookCopyController from "../controllers/bookCopyController";
import loanRecordController from "../controllers/loanRecordController";

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

    return app.use("/api/v1", router);
}

module.exports = v1Router;