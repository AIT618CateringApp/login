const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const MongoClient = require('mongodb').MongoClient;
const db = "mongodb+srv://ait618Group:theProject@ait618-vldt3.mongodb.net/test?retryWrites=true&w=majority";
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(db,  { useNewUrlParser: true })
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
app.use('/public', express.static(path.join(__dirname, 'public')))
// BodyParser -- getting data from the form with data.body
app.use(express.urlencoded({ extended: false }));

//routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/customer', require('./routes/customer'));
app.route('/vendorOrder').get(function(req,res)
{
MongoClient.connect(
    (db), {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err, db) {
    if(err) throw err;
    console.log("you are connected to the database");
    var dbo = db.db("ays");

   dbo.collection("orders").find().toArray(function(err,docs){
        
        res.render("vendorOrder", {orders:docs})
        
        

        db.close();

   });
   
});
});
app.listen(3000, console.log('Navagate to localhost: 3000'));