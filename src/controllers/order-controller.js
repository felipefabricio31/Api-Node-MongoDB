'use strict';

const guide = require('guid');
const repository = require('../repositories/order-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
}


exports.post = async (req, res, next) => {
    try {
        //Tudo que vem na requisição, atribuo para o corpo do meu produto.
        await repository.create({
            customer: req.body.customer, //idCustomer
            number: guide.raw().substring(0, 6),//Automatico
            items: req.body.items
        })
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
};