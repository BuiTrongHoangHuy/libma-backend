import express from 'express';

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', (req, res) => {
        return res.send('hello world');
    });

    router.get('/libma', (req, res) => {
        return res.send('hello world');
    });

    router.post('/libma/:id', (req, res) => {
    })

    return app.use("/", router);
}

module.exports = initWebRoutes;