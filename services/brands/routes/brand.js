"use strict";

const Promise = require('bluebird');
const Request = require('request-promise');


function getBrandPublicInfo(request, reply) {
	let brands = [];


}

module.exports = [{
	method: 'POST',
	path: "/brands/getPublicInfo",
	handler: getBrandPublicInfo //,
	// config: {
	// 	validate: {
	// 		payload: {
	// 			brand: Joi.string().required(),
	// 			mobile: Joi.boolean().default(true)
	// 		}
	// 	}
	// }
}]