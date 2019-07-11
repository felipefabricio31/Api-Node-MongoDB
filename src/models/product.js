'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id - Cria automatico
    title: {
        type: String,
        required: [true, 'O title é obrigatório.'],
        trim: true
    },
    //Ex: Cadeira Gamer / slug: cadeira-gamer
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório.'],
        trim: true,
        index: true,
        unique: true
    },
    //Descricao do Produto
    description: {
        type: String,
        required: true,
        trim: true
    },
    //Preço do produto
    price: {
        type: Number,
        required: true
    },
    //Ativado ou não
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    //Array de Tags
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Product', schema);
//Saída do Schema
/*{
    "title":"titulo",
    "description":"xpto",
    "tags":[
        "teste","123","pessoas"
    ]
}*/