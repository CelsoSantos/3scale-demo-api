"use strict"

const Promise = require("bluebird");
const Request = require("request-promise");
const glob = require("glob");
const fs = require("fs");

//FIXME: Move regexes to Util module.
// Create Regex class with all the required regexes
function validateEmailRegex(email) {
	var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

	return email.search(regex) > -1;
}

function getUsers(request, reply) {

	let users = [];

	glob("json/*.json", function (err, files) {
		if (err) {
			console.log("cannot read the folder, something goes wrong with glob", err);
		}
		files.forEach(function (file) {
			fs.readFile(file, 'utf8', function (err, data) { // Read each file
				if (err) {
					console.log("cannot read the file, something goes wrong with the file", err);
				}

				var obj = JSON.parse(data);
				users.push(obj);
			});
		});
	}).then(() => {
		return users;
	})


	// User.getById(userId).then((user) => {
	// 	return {
	// 		ok: true,
	// 		result: user.submissionCounters
	// 	}
	// }).catch((error) => {
	// 	console.error("getSubmissionsCounter error: " + error.message);
	// 	return {
	// 		ok: false,
	// 		message: error.message
	// 	}
	// }).asCallback(reply);
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