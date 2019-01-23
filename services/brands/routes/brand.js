"use strict";

const Promise = require('bluebird');
const Request = require('request-promise');
const glob = require("glob-promise");
const fs = Promise.promisifyAll(require('fs'));

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

function getBrandPublicInfo(request, reply) {
	return new Promise((resolve, reject) => {
		let brands = [];
		glob(__dirname + "/json/*.json").then((files) => {
			return getAll(files);
		}).then((data) => {
			return resolve({
				ok: true,
				result: data
			});
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
	path: "/brands/getPublicInfo",
	handler: getBrandPublicInfo
}]