// import express from 'express';
// import path from 'path';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import App from "../client/App";
// import { UInt8 } from 'bitwise/types';

const express = require('express');
const path = require('path');
const React = require('react');

const ReactDOMServer = require('react-dom/server');
// const App = require("../client/App");
const index = require("../client/index");
const { UInt8 } =require('bitwise/types');
//

const router = express();
console.log("algo");

router.get('/intro', (req, res) =>{
    res.send('Hello world');
});
router.get('/', (req, res) =>{
    // res.send('index');
    const name = 'Marvelous Wololo';
    const component = ReactDOMServer.renderToString(React.createElement(index));
    const html = 'as';

    res.send(html)

});
