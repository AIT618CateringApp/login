
const express = require("express");
var app = express();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    //BSON = require('mongodb').pure().BSON,
    assert = require('assert');
const url = "mongodb+srv://ait618Group:theProject@ait618-vldt3.mongodb.net/test?retryWrites=true&w=majority";

app.set('view engine','ejs');



app.route('/vendorOrder').get(function(req,res)
{
MongoClient.connect(
    (url), {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, function(err, db) {
    if(err) throw err;
    console.log("you are connected to the database");
    var dbo = db.db("ays");

   dbo.collection("orders").find().toArray(function(err,docs){
        assert.equal(null, err);
        
        res.render("vendorOrder", {orders:docs})
        
        

        db.close();

   });
   
});
});

app.listen(3000, function(){});

