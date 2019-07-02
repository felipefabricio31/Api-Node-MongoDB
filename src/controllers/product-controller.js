'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');


exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

//Filtro com parâmetros
exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

//Filtro com parâmetros
exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

//Filtro com parâmetros
exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tags)
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos 3 caracteres.');

    //Se os dados forem válidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    //Tudo que vem na requisição, atribuo para o corpo do meu produto.
    repository.create(req.body)
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto.',
                data: e
            });
        });
};

//Update de um produto, por ID
exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto.',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    repository.delete(req.params.id)
        .then(x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto.',
                data: e
            });
        });
};
