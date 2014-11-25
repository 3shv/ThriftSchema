var express = require('express');
var log4js = require('log4js');
var thrift = require('thrift');
var StoreService = require("./gen-nodejs/StoreService"),
        user_types = require("./gen-nodejs/user_types");


var JAVA_SERVER_ADDRESS = "127.0.0.1";
var JAVA_SERVER_PORT = "9090";
var LISTENER_PORT = "8080";

//Creating thrift client
var connection = thrift.createConnection(JAVA_SERVER_ADDRESS,JAVA_SERVER_PORT, {
	  transport : thrift.TFramedTransport,
      	  protocol : thrift.TBinaryProtocol
});

connection.on('error', function(err) {
	  err.stack;
	  console.error("Unable to connect to java thrift server");
	  //assert(false, err);
});
connection.on('connect', function() {
	   console.error("Connection established");
});

var client = thrift.createClient(StoreService, connection);

//

var app = express();

app.post('/receive', function(req,res) {
	send(req);
	res.writeHead(200,"OK", {'content-type' : 'text/plain'});
	res.end();
});
console.log("... Starting server at port "+LISTENER_PORT+"...")
app.listen(LISTENER_PORT);

var send = function (req) {
	var json = {};
	try {
	  json = JSON.parse(req);
	}catch(err) {
		err.stack;
		console.log("Error while parsing "+req);
	 }
	var userVar = new user_types.User(json);
	//if(user!=null) console.log(user);
	var client;
	if(connection != null || connection != undefined) client = thrift.createClient(StoreService, connection);
	if(client != undefined || client != null) {
		console.log(userVar);
		client.store(userVar, function(err,response) {
			if(err) {
				console.error(err);
			}
			else {
				console.log("Save successful");
			}
		});
	}
}

var repeat = setInterval(function() {
	// JSON requires double quotes //
	var string = '{ "name": "veer" , "email": "user@email.com" , "comment": "This is a test" , "id": 1}';
	send(string);
},1000);
