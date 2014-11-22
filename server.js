var express = require('express');
var log4js = require('log4js');
var thrift = require('thrift');

var JAVA_SERVER_ADDRESS = "127.0.0.1";
var JAVA_SERVER_PORT = "9090";
var LISTENER_PORT = "8080";

var app = express();

app.post('/receive', function(req,res) {
	send(req);
	res.writeHead(200,"OK", {'content-type' : 'text/plain'});
	res.end();
});
console.log("... Starting server at port "+LISTENER_PORT+"...")
app.listen(LISTENER_PORT);

var send(req) {
	console.log("Parsing data");
	try {
	  var json = JSON.stringify(req);
	}catch(err) {
		
	 }
}
