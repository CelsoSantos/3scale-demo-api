"use strict"

const Boom = require('boom');
const Request = require('request-promise');

const errorUtils = require("../errorUtils");
const handleRequestError = errorUtils.handleRequestError;
const handleBadRequest = errorUtils.handleBadRequest;

const BRANDS_HOST = process.env.BRANDS_SERVICE_HOST || "0.0.0.0";
const BRANDS_PORT = process.env.BRANDS_SERVICE_PORT || 8082;

module.exports = [{
	method: 'GET',
	path: '/brands/{path}',
	config: {
		auth: false,
		handler: (request, reply) => {
			let path = request.params.path;

			let options = {
				method: "GET",
				uri: "http://" + BRANDS_HOST + ":" + BRANDS_PORT + "/brands/" + path,
				body: request.payload,
				json: true
			}

			return Request(options).then((response) => {
				if (response.ok) {
					return reply(response.result)
				} else {
					return reply(handleBadRequest(response.message));
				}
			});
		}
	}
}];