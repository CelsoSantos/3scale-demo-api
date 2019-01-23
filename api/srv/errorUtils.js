"use strict"

const Boom = require("boom");

function handleRequestError(errorResult) {
	console.error("Message: ", errorResult.message);
	console.error("Options: ", errorResult.options);

	switch (errorResult.statusCode) {
		case 400:
			console.error("Bad request: ", errorResult.error);
			return Boom.badRequest(errorResult.error.message);
		case 404:
			console.error("Service not found: ", errorResult.error);
			return Boom.notFound(errorResult.error.message);
		default:
			console.error("Error: ", errorResult.error);
			return Boom.badImplementation();
	}
}

function handleBadRequest(errorPayload) {
	let error = Boom.badRequest(errorPayload.message);
	error.output.payload.details = errorPayload;

	return error;
}

module.exports = {
	handleRequestError: handleRequestError,
	handleBadRequest: handleBadRequest
}
