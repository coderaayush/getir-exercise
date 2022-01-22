require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connect to DB
let DB_STRING = process.env.DB_CONNECTION_STRING;
if (process.env.NODE_ENV === 'test') {
    DB_STRING = process.env.DB_CONNECTION_STRING_TEST;
}

mongoose.connect(DB_STRING, { 
    useNewUrlParser: true 
},() => { console.log('Database Connected') });

const bodyParser = require('body-parser');
const routes = require('./routes/index');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*' );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

//Listen to the server
app.listen(process.env.PORT);

process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });

 module.exports = app;