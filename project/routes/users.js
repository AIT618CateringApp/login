const express = require("express");
const router = express.Router();


//login page
router.get('/login', function(req, res){
	res.render("login")
});



//register page
router.get('/register', function(req, res){
	res.render("register")
});


module.exports = router;
