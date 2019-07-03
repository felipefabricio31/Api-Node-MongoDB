'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.get = async () => {
    //await - aguarda a execucao
    const res = await Product.find({
        active: true //Apenas produtos ativos.
    }, `title price slug`);//Passando apenas os campos que deve ser retornados.    
    return res;
}

//Filtro com parâmetros
exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            slug: slug, //Filtrar por slug
            active: true //Apenas produtos ativos.
        }, `title description price slug tags`);
    return res;
}

//Filtro com parâmetros
exports.getById = async (id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags')
    return res;
}

exports.create = async (data) => {
    var product = new Product(data); //Opção01
    await product.save();
}

exports.update = async (id, data) => {
    await Product
        .updateOne(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
}

exports.delete = async (id) => {
    await Product
        .findByIdAndDelete(id);
}