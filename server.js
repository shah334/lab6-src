//var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('userdata.db')
var cors = require('cors')

var app = express()
app.use(cors())

app.use(bodyParser.urlencoded({
	extended:true
}));

function findRecipies (arr){//take in an array of strings from client and return a recipie calling the edamam api.

}

var port = process.env.PORT || 8000; //Use the port given as an environment variable, otherwise default to 8000
app.listen(port, function() {
	console.log("Running server on port " + port);
});
