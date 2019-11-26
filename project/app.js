const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const MongoClient = require('mongodb').MongoClient;
const db = "mongodb+srv://ait618Group:theProject@ait618-vldt3.mongodb.net/test?retryWrites=true&w=majority";


//connecting to mongo
MongoClient.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err, db) {

	if (err) {
		console.log(err); }
		
	else
		console.log("mongodb connected");
		db.close();
});		

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser -- getting data from the form with data.body
app.use(express.urlencoded({ extended: false }));

//routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(3000, console.log('Navagate to localhost: 3000'));