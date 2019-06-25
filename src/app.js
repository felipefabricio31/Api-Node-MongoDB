'use strict';

const express = require('express');
const bodyParser = require('body-parse');

const app = express();
const router = express.Router();

//Carregar as rotas
const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/product-route.js');

//Conversão do conteudo
app.use(bodyParser.json());
app.use(bodyParser.urlenoded({
    extended: false
}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;

//

    //200 - ok
    //201 - created
    //400 - Erro bad request
    //401 - Não autenticado
    //403 - Acesso negado
    //500 - Erro que acontece na aplicacao