const Hapi = require('hapi');

var ServiceRoutes = require("../routes/index");

const server = new Hapi.Server();

var PORT = process.env.USERS_SERVICE_PORT || 8080;
var HOST = '0.0.0.0';

server.connection({
	port: PORT,
	host: HOST
});

server.register([], (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	server.route(ServiceRoutes);
});

server.start((err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('Server started at:', server.info.uri);
});