var Handlers = require('./handlers');

exports.register = function (server, options, next) {
	var io = require('socket.io').listen(server.listener);

	io.on('connection', function (socket) {
		socket.on('handshake', Handlers.handshake);
		socket.on('send', Handlers.send);
		socket.on('read', Handlers.read);
		socket.on('leaveChannel', Handlers.leaveChannel);
		socket.on('broadcastToUsers', Handlers.broadcastToUsers);
	});

	next();
};

exports.register.attributes = {
	name: 'hapi-chat'
};