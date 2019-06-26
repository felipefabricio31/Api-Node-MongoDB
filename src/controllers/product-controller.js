'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({
        active: true //Apenas produtos ativos.
    }, `title price slug`)//Passando apenas os campos que deve ser retornados.
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

//Filtro com parâmetros
exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug, //Filtrar por slug
        active: true //Apenas produtos ativos.
    }, `title description price slug tags`)//Passando apenas os campos que deve ser retornados.
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

//Filtro com parâmetros
exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}

//Filtro com parâmetros
exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.id,
        active: true
    }, 'title description price slug tags')
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({ e });
        });
}


exports.post = (req, res, next) => {
    //Tudo que vem na requisição, atribuo para o corpo do meu produto.
    var product = new Product(req.body); //Opção01
    //var product = new Product(); //Opção 02
    //product.title = req.body.title;
    product.save()
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

/*exports.put = (req, res, next) => {
    //Recupera parametros vindo da url
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};*/

//Update de um produto, por ID
exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(x => {
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
    Product
        .findByIdAndDelete(req.params.id)
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
