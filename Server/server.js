//var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var requestProxy = require('express-request-proxy')

var bodyParser = require('body-parser');


var app = express()
var port = process.env.PORT || 8000; //Use the port given as an environment variable, otherwise default to 8000

app.use(express.static('./public'));

function findRecipies (arr){//take in an array of strings from client and return a recipie calling the edamam api.

}
app.get('/', (req, res) => {
  res.sendFile('index.html')
});
app.get('/edamam/*', proxyEdamam);

function proxyEdamam(request, response) {

  console.log('Routing a Edamam request '+request);
  (requestProxy({
    url: `https://api.edamam.com/search`,
    headers: {
      app_id: '8f72e3e8',
      app_key: '1363f2b4807183468fdb7fa877b7983a'}
  }))(request, response);
	console.log(request)
}
//tried on postman using GET localhost:8000/edamam/search?q=chicken&from=0&to=50
app.listen(port, function() {
	console.log("Running server on port " + port);
});
//APP ID: 8f72e3e8
//API KEY: 1363f2b4807183468fdb7fa877b7983a
