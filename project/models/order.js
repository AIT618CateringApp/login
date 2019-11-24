const mongoose = require('mongoose');

const order = mongoose.model('orders', {
    menu: String,
    firstname: String,
    lastname: String,
    address: String,
    zipcode: String,
    phonenumber: String,
    email: String,
    city: String,
    state: String,
    cardtype: String,
    expirymonth: String,
    expiryyear: String,
    card: String,
});

module.exports = order;
