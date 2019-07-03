'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

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

//Filtro com parâmetros
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository
            .getBySlug(req.params.slug)
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
}

//Filtro com parâmetros
exports.getById = async (req, res, next) => {
    try {
        var data = await repository
            .getById(req.params.id)
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
}

//Filtro com parâmetros
exports.getByTag = async (req, res, next) => {
    try {
        var data = repository
            .getByTag(req.params.tags)
        res.status(200).send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descricao deve conter pelo menos 3 caracteres.');

    //Se os dados forem válidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        //Tudo que vem na requisição, atribuo para o corpo do meu produto.
        await repository.create(req.body)
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
};

//Update de um produto, por ID
exports.put = async (req, res, next) => {
    try {
        await repository
            .update(req.params.id, req.body)
        res.status(201).send({
            message: 'Produto atualizado com sucesso!'
        });
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
};

exports.delete = async (req, res, next) => {
    try {
        repository.delete(req.params.id)
        res.status(201).send({
            message: 'Produto deletado com sucesso!'
        });
    }
    catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição.'
        })
    }
};
