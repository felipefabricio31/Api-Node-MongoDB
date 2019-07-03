'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

exports.get = async (data) => {
    var res = await Order.find({}, 'number status' )
    .populate('customer', 'name')
    .populate('items.product', 'title');
    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}