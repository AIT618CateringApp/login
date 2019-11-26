const express = require("express");
const router = express.Router();

// Welcome Page 
router.get('/', function(req, res){
	res.render("welcome")
});

// Dashboard Page 
router.get('/dashboard', function(req, res){
});


module.exports = router;
