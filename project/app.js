const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

//DB config
//const db = require('....')
// connect to mongo

//routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(3000, console.log('Navagate to localhost: 3000'));