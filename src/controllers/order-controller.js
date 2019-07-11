'use strict';

const guide = require('guid');
const repository = require('../repositories/order-repository');

const authService = require('../services/auth-service');

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
        //Recupera o Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodificar o Token
        const data = await authService.decodeToken(token);

        //Tudo que vem na requisição, atribuo para o corpo do meu produto.
        await repository.create({
            customer: data.id, //idCustomer
            number: guide.raw().substring(0, 6),//Automatico
            items: req.body.items
        })
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
};