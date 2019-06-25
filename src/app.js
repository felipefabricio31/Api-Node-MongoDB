'use strict';

const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();

//Carregar as rotas
const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/product-route.js');

//Conversão do conteudo
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;
