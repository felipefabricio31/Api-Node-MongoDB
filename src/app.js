'Use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');


const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true })
    .then(() => {
        console.log(' mongoDB está conectado ... ')
    })
    .catch((err) => {
        throw err
    });

//Carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carregar as rotas
const indexRoute = require('./routes/index-routes');
const productRoute = require('./routes/product-route.js');
const customerRoute = require('./routes/customer-route.js');
const orderRoute = require('./routes/order-route.js');

//Conversão do conteudo
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    limit: '5mb'
}));



//Habilita o CORS
/*app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})*/


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;

