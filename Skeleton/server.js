var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('Data/SampleDB.db');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	return res.send("Hello World");
});

app.get('/ping', function(req, res) {
	var name = req.query.myname;
	if(name) {
		return res.send("Hello " + name);
	}
	else {
		return res.send("Hello CS390!");
	}
});

app.get('/stuff', function(req, res) {
	var {queryA, queryB, queryC} = req.query;
	var params = [];
	var currentQuery = "SELECT * FROM Stuff";
	db.all(currentQuery, params, function(err, rows) {
		if(err) {
			return res.status(500).json(
				{message: "Internal server error"});
		}
		else {
			return res.json(rows);
		}
	});
});

app.post('/stuff', function(req, res) {
	var {title, sst, ssn} = req.body;
	var params = [title, sst, ssn];
	var currentQuery = "INSERT INTO Stuff Values(?,?,?)";
	db.run(currentQuery, params, function(err, result) {
		if(err) {
			return res.status(500).json(
				{message: "Internal server error"});
		}
		else {
			return res.status(200).json({message: "success"});
		}
	});
});


var port = process.env.PORT || 3900;
var server = app.listen(port, function() {
	console.log(`App listening on port ${port}`);
});

