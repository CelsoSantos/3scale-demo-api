"use strict"

const Hapi = require('hapi');

var ServiceRoutes = require("../routes/index");

const server = new Hapi.Server();

let PORT = process.env.BRANDS_SERVICE_PORT || 8082;
let HOST = '0.0.0.0';

server.connection({ port: PORT, host: HOST });

server.register([], (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	//Initialize Routes on the server
	server.route(ServiceRoutes);
})

server.start((err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('Server started at:', server.info.uri);
});
