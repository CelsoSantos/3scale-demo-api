"use strict"

const Request = require("request-promise");
const tokenUtils = require("../JWTUtils");
var decodeToken = tokenUtils.decodeToken;

const CHAT_HOST = process.env.MESSAGECENTER_SERVICE_HOST || "0.0.0.0";
const CHAT_PORT = process.env.MESSAGECENTER_SERVICE_PORT || "8101";

exports.handshake = function (message) {
	decodeToken(null, message.token).then(() => {
		delete message['token'];

		let options = {
			method: "POST",
			uri: "http://" + CHAT_HOST + ":" + CHAT_PORT + "/chat/handshake",
			body: message,
			json: true
		}
		return Request(options).then((response) => {
			if (response.ok) {
				this.emit('handshakeAck', { channelId: response.result.docId });
				this.join(response.result.docId);
			} else {
				this.emit('handshakeFailed');
			}
		});
	}).catch((error) => {
		console.error("Chat handshake Error: ", error);
		this.emit('handshakeRejected');
	});
}

exports.send = function (message) {
	let options = {
		method: "POST",
		uri: "http://" + CHAT_HOST + ":" + CHAT_PORT + "/chat/send",
		body: message,
		json: true
	}

	return Request(options).then((response) => {
		if (response.ok) {
			this.broadcast.to(message.channelId).emit('chatMessage', response.result);
		} else {
			this.emit('chatMessage', { message: 'No connection could be made at this time' });
		}
	}).catch((error) => {
		console.error("Chat send Error: ", error);
		this.emit('sendFailed');
	});
}

exports.read = function (message) {
	let options = {
		method: "POST",
		uri: "http://" + CHAT_HOST + ":" + CHAT_PORT + "/chat/read",
		body: message,
		json: true
	}

	return Request(options).then((response) => {
		if (!response.ok) {
			this.emit('chatMessage', { message: 'No connection could be made at this time' });
		}
	}).catch(() => {
		this.emit('readFailed');
	});
}

exports.broadcastToUsers = function (message) {
	let options = {
		method: "POST",
		uri: "http://" + CHAT_HOST + ":" + CHAT_PORT + "/chat/broadcastToUsers",
		body: message,
		json: true
	}

	return Request(options).then((response) => {
		if (response.ok) {
			let result = response.result
			let messages = result.messages;

			messages.forEach((msg) => {
				this.broadcast.to(msg.channelId).emit('chatMessage', msg);
			});

			this.emit('groupMessage', result.groupId);
		} else {
			this.emit('chatMessage', { message: 'No connection could be made at this time' });
		}
	}).catch((error) => {
		console.error("Chat send Error: ", error);
		this.emit('sendFailed');
	});
}

exports.leaveChannel = function (message) {
	if (!message) {
		this.leaveAll();
	} else {
		this.leave(message.channelId);
	}
}
