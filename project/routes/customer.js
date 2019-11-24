const express = require("express");
const router = express.Router();
const Order = require("../models/order");

//customer landing page
router.get('/vendors', function(req, res){
    res.render("vendor");
});

router.get('/:restaurant', function(req, res){
    res.render("customer", {
        message: `Place order with ${req.params.restaurant}`
    })
});


//customer order creation page
router.post('/', function(req, res){
    const newOrder = new Order(req.body);
    newOrder.save().then(() => {
        res.render("ordersuccessful", {
            message: 'Order created'
        })
    }).catch(error => {
        console.log(error);
        res.render("customer", {
            message: 'Order not created'
        })
    });
	//res.render("register")
});


module.exports = router;
