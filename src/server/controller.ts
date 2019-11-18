// import express from 'express';
// import ReactDOMServer from 'react-dom/server';
// import { UInt8 } from 'bitwise/types';
import cors from "cors";
import {cipher} from "./cipher";
import {processFile} from "./fileCipher";

const express = require('express');

const router = express();
console.log("algo");
const options:cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:3000",
    preflightContinue: false
};
router.use(cors(options));
router.get('/intro', (req, res) =>{
    console.log("hola de nuevo");
    res.send('Hello world');
});
router.get('/', (req, res) =>{
    //todo
});
router.post('/', (req, res) => {
    // processFile(req);
});

router.options("*", cors(options));
router.listen(3001);
