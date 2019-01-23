"use strict"

const Boom = require('boom');
const Request = require('request-promise');

const errorUtils = require("../errorUtils");
const handleRequestError = errorUtils.handleRequestError;
const handleBadRequest = errorUtils.handleBadRequest;

module.exports = [{
	method: 'GET',
	path: '/brands/{path}',
	config: {
		auth: false,
		handler: (request, reply) => {
			let path = request.params.path;

			let options = {
				method: "GET",
				uri: "http://" + "demo-brands.3scalegateway.svc" + "/brands/" + path,
				// uri: "http://" + BRANDS_HOST + ":" + BRANDS_PORT + "/brands/" + path,
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