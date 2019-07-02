'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product.find({
        active: true //Apenas produtos ativos.
    }, `title price slug`);//Passando apenas os campos que deve ser retornados.    
}

//Filtro com parâmetros
exports.getBySlug = (slug) => {
    return Product
        .findOne({
            slug: slug, //Filtrar por slug
            active: true //Apenas produtos ativos.
        }, `title description price slug tags`)
}

//Filtro com parâmetros
exports.getById = (id) => {
    return Product
        .findById(id);
}

exports.getByTag = (tag) => {
    return Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
}

exports.create = (data) => {
    var product = new Product(data); //Opção01
    return product.save();
}

exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
}

exports.delete = (id) => {
    return Product
        .findByIdAndDelete(id);
}