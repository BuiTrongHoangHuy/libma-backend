import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from "./config/viewEngine"
import v1Router from "./route/api";

import cookieParser from 'cookie-parser';

require('dotenv').config();
import connectDB from "./config/connectDB";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
viewEngine(app);
//initWebRoutes(app);
v1Router(app);
connectDB();
let port = process.env.PORT || 8080;

app.use((req, res) => {
    return res.send('404 not found')
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});