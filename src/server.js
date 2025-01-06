import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from "./config/viewEngine"
import v1Router from "./route/api";
const cors = require("cors");

import cookieParser from 'cookie-parser';

require('dotenv').config();
import connectDB from "./config/connectDB";
import {sendEmail} from "./sesClient";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
viewEngine(app);
//initWebRoutes(app);
app.use(cors());
v1Router(app);
connectDB();
let port = process.env.PORT || 8080;

app.use((req, res) => {
    return res.send('404 not found')
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});