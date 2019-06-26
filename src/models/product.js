'Use strict';

const mogoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id - Cria automatico
    title: {
        title: String,
        required: true,
        trim: true
    },
    //Ex: Cadeira Gamer / slug: cadeira-gamer
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    //Descricao do Produto
    description: {
        title: String,
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
    }]
});

module.exports = mogoose.model('Product', schema);

//Saída do Schema
/*{
    "title":"titulo",
    "description":"xpto",
    "tags":[
        "teste","123","pessoas"
    ]
}*/