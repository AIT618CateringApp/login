const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://ait618Group:theProject@ait618-vldt3.mongodb.net/test?retryWrites=true&w=majority";


//login page
router.get('/login', function(req, res){
	res.render("login")
});

//register page
router.get('/register', function(req, res){
	res.render("register")
});


//dashboard page // THIS IS WHERE YOU WOULD CHANGE THE PAGE YOU WANT 
// CUSTOMER OR VENDOR PAGES --> ALSO NEED TO CHANGE ON THE BELOW CODE ON REDIRCT 
router.get('/dashboard', function(req, res){
	res.render("dashboard")
});


// ________________________________________________________________________________ \\
//register post page -- getting information from registration forms
router.post('/register', function(req, res){
	const { fname, lname, email, job, password, password2} = req.body;
	let check = [];

	// checking missing information
	if (!fname || !lname || !email || !job || !password || !password2) {
		check.push({ message: 'Please fill in all missing fields!'});
	}


	// checking if passwords match
	if (password != password2) {
		check.push({ message: '\nPasswords do not match!' });

	}

	/// checking to see if reason is correct
	if (!(job.toLowerCase() == 'customer' || job.toLowerCase() == 'vendor')) {
		check.push({ message: '\nPlease enter the correct reason'});
		//console.log(reason);
	}

	// check errors
	if (check.length > 0) {
		res.render('register', {
			check, 
			fname,
			lname,
			job, 
			email 
			//password, 
			//password2
		});

	} else {
		
			//DB config
			//connect to mongo
			MongoClient.connect(
				(url), {
			    useNewUrlParser: true,
			    useUnifiedTopology: true 
			}, function(err, db) {
				if(err) throw err;
				var dbo = db.db("test");
				dbo.collection("users").findOne({email: email }, function(err, data)
				{
					if(err) throw err;
					else
					{
						// if there is data matched - email already used
						if(data)
						{
							check.push({message: 'Email is already use!'});
							res.render('register', {
							check, 
							fname,
							lname, 
							email, 
							job
							});
						}
					
						else
						{
							// inserting record into the database
							var DateString = new Date();
							var reason = job.toLowerCase();
							var login = {fname, lname, email, reason, password, DateString};
							dbo.collection("users")
							.insertOne(login, function(err,result){
								if(err) throw err;
								console.log("1 record inserted");
								// THIS IS WHERE YOU WOULD CHANGE THE PAGE YOU WANT 
								res.redirect('/users/dashboard');
							});
									
						}
					}
					
				});
			});
			
		}
});

// ________________________________________________________________________________ \\
//LOGIN post page -- getting information from LOGIN forms
router.post('/login', function(req, res){
	const {email, password} = req.body;
	let check = [];

	// checking missing information
	if (!email || !password) {
		check.push({ message: 'Please fill in all missing fields!'});

	}

	// check errors
	if (check.length > 0) {
		res.render('login', {
			check,
			email 
		});
	} else {
			//DB config
			//connect to mongo
			MongoClient.connect(
				(url), {
			    useNewUrlParser: true,
			    useUnifiedTopology: true 
			}, function(err, db) {
				if(err) throw err;
				var dbo = db.db("test");
				
				//searching for already used email
				dbo.collection("users").findOne({email: email }, function(err, data)
				{
					if(err) throw err;
					else
					{
						// email located
						if(data)
						{	
								// password given doesn't match password in datebase 
								if(password != data.password)
								{
									check.push({message: 'Email and/or Password were incorrect!'});
									res.render('login', {
									check, 
									email, 
									});
								}
								else
								{
									console.log("Login Success");
									// THIS IS WHERE YOU WOULD CHANGE THE PAGE YOU WANT 
									res.redirect('/users/dashboard');
								}
						}
						// email not located. 
						else
						{
							console.log("Login Failure - no email record");
							check.push({message: 'Email was not found, please register account'});
							res.render('login', {
							check, 
							email 
							});
						}
					}
					
				});
			});
			
		}	
});





module.exports = router;