const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();


const mongoose = require('mongoose');

console.log(process.env.MONGO);
mongoose.connect(process.env.MONGO,  { useNewUrlParser: true })

//ejs
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')))

//DB config
//const db = require('....')
// connect to mongo

//routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/customer', require('./routes/customer'));


app.listen(3000, console.log('Navagate to localhost: 3000'));