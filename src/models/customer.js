'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id - Cria automatico
    name: {
        type: String,
        required: [true, 'O name é obrigatório.'],
        trim: true
    },
    //Ex: Cadeira Gamer / slug: cadeira-gamer
    email: {
        type: String,
        required: [true, 'O email é obrigatório.']
    },
    //Descricao do Produto
    password: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Customer', schema);
//Saída do Schema
/*{
	"name":"Felipe Souza"
	"email":"felipe.fabricio.m3@gmail.com"
	"password":"3456789"
}*/