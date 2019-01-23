"use strict"

const Boom = require('boom');
const Request = require('request-promise');

const errorUtils = require("../errorUtils");
const handleRequestError = errorUtils.handleRequestError;
const handleBadRequest = errorUtils.handleBadRequest;

const BRANDS_HOST = "demo-brands.3scalegateway.svc"
// const BRANDS_PORT = 8080

module.exports = [{
	method: 'GET',
	path: '/brands/{path}',
	config: {
		auth: false,
		handler: (request, reply) => {
			let path = request.params.path;

			let options = {
				method: "GET",
				// uri: "http://" + BRANDS_HOST + ":" + BRANDS_PORT + "/brands/" + path,
				uri: "http://" + BRANDS_HOST + "/brands/" + path,
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