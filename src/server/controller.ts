// import express = require("express");
import express from 'express';

import { UInt8 } from "bitwise/types";


const router = express();

router.get('/intro', (req, res) =>{
    res.send('Hello world');
});
router.get('/', (req, res) =>{
    res.send('index');
});

router.listen(3000);

export = router;
