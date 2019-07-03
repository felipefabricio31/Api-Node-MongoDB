'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.create = async (data) => {
    var customer = new Customer(data); //Opção01
    await customer.save();
}