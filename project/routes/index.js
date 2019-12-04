const express = require("express");
const router = express.Router();

// Welcome Page 
router.get('/', function(req, res){
	res.render("welcome")
});

// Dashboard Page 
router.get('/dashboard', function(req, res){
});

router.get('/vendorpage', function(req, res) {
	res.render('vendorPage');
})

router.get('/calendar', function(req, res) {
	res.render('calendar');
})


module.exports = router;
