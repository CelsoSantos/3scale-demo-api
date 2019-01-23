"use strict"

module.exports = [{
	method: "GET",
	path: "/",
	config: {
		auth: false
	},
	handler: (request, reply) => {
		reply({
			text: 'Hello! Welcome to 3scale API Gateway Demo by Syone'
		});
	}
}];