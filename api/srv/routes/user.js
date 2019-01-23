"use strict"

const Boom = require('boom');
const Request = require("request-promise");

const errorUtils = require("../errorUtils");
const handleRequestError = errorUtils.handleRequestError;

module.exports = [{
	method: 'GET',
	path: '/users/{path}',
	config: {
		auth: false,
		handler: (request, reply) => {
			let path = request.params.path;

			let options = {
				method: "GET",
				uri: "http://" + "demo-users.3scalegateway.svc" + "/users/" + path,
				// uri: "http://" + USERS_HOST + ":" + USERS_PORT + "/users/" + path,
				body: request.payload,
				json: true
			}

			return Request(options).then((response) => {
				if (response.ok) {
					return reply(response.result)
				} else {
					return reply(Boom.badRequest(response.message));
				}
			}).catch((error) => {
				return reply(handleRequestError(error));
			});
		}
	}
}];