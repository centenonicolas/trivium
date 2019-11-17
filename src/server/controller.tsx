import express from 'express';
import path from 'path';
import React from 'react';

import ReactDOMServer from 'react-dom/server';
import App from "../client/App";
import { UInt8 } from 'bitwise/types';


const router = express();

router.get('/intro', (req, res) =>{
    res.send('Hello world');
});
router.get('/', (req, res) =>{
    // res.send('index');
    const name = 'Marvelous Wololo';
    const component = ReactDOMServer.renderToString(<App /> );
    const html = 'as';

    res.send(html)

});

router.listen(3000);
