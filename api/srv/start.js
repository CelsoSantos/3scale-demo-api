"use strict"

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');
const Path = require('path');
const corsHeaders = require('hapi-cors-headers');
const Aguid = require('aguid');
const Fs = require('fs');
const Url = require('url');
const ServiceRoutes = require("./routes/index");

var server = new Hapi.Server({
	connections: {
		routes: {
			files: {
				relativeTo: Path.join(__dirname, '../public')
			}
		}
	}
});

let HOST = '127.0.0.1';
let PORT = process.env.API_SERVICE_PORT || 8080;

server.connection({
	labels: 'http',
	port: PORT,
	host: HOST,
	routes: {
		cors: {
			origin: ['*'],
			headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language", "Origin"],
			additionalHeaders: ['cache-control', 'x-requested-with', 'options']
		}
	}
});


let plugins = [
	Good, Inert
]

//Create a HTTPS connection on port 443
server.register(plugins, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	//Initialize Routes on the server
	server.route(ServiceRoutes);

	//Intercept all calls
	server.ext('onPreResponse', corsHeaders);
});

server.on('request-error', (request, err) => {
	console.error('Error response (500) sent for request: ' + request.id + ' because: ' + err.message);
});

server.start((err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('HTTP Server started at:', server.info.uri);
});