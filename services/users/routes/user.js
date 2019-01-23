"use strict"

const Promise = require("bluebird");
const Request = require("request-promise");
const glob = require("glob-promise");
const fs = Promise.promisifyAll(require('fs'));

//FIXME: Move regexes to Util module.
// Create Regex class with all the required regexes
function validateEmailRegex(email) {
	var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

	return email.search(regex) > -1;
}

function readFile(path) {
	let parseAsync = Promise.method(JSON.parse);
	return fs.readFileAsync(path, 'utf8').then((result) => {
		return parseAsync(result);
	})
}

function getAll(files) {
	let promises = [];

	files.forEach((file) => {
		promises.push(readFile(file));
	});
	return Promise.all(promises);
}

function getUsers(request, reply) {
	return new Promise((resolve, reject) => {
		let users = [];
		glob(__dirname + "/json/*.json").then((files) => {
			return getAll(files);
		}).then((data) => {
			return resolve({
				ok: true,
				result: data
			});
			// return users.push(data);
		}).catch((error) => {
			if (error) {
				console.log("cannot read the folder, something goes wrong with glob", error);
				return reject(error);
			}
		})
	}).asCallback(reply)
}

module.exports = [{
	method: 'GET',
	path: '/users/getUsers',
	handler: getUsers //,
	// config: {
	// 	validate: {
	// 		payload: {
	// 			userId: Joi.string().required()
	// 		}
	// 	}
	// }
}]