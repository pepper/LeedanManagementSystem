"use strict";

import validator from "validator";
import md5 from "md5";
import uuid from "uuid";
import Promise from "bluebird";
import React, { NativeModules } from "react-native";

var CouchbaseLite = NativeModules.CouchbaseLite;

var dbPath = "";

// Delegate functions
let connectToCouchbaseLite = Promise.promisify(CouchbaseLite.connectToCouchbaseLite);
let createDatabase = Promise.promisify(CouchbaseLite.createDatabase);
let createView = Promise.promisify(CouchbaseLite.createView);
let createDocument = Promise.promisify(CouchbaseLite.createDocument);
let query = Promise.promisify(CouchbaseLite.query);

// TOOD: This key must fetch from https link with time base ramdom url  
let privateKey = "leedanKey";

let viewList = [{
	name: "login",
	key: "username",
}, {
	name: "search_company",
	key: "title",
}];

class Company {
	constructor(title, description, username, password){
		Object.assign(this, {
			title:			"",
			description:	"",
			uuid:			"",
			username:		"",
			password:		"",
			employee_list:	[],
			avtive_module:	[],
		});
	}
}

exports.initDatabase = (dbName) => {
	return new Promise((resolve, reject) => {
		connectToCouchbaseLite().then(() => createDatabase(dbName)).then((result) => {
			dbPath = result;
			console.log("Couchbacse Lite DB:" + dbPath);
			var promiseList = [];
			for(var {name, key} of viewList){
				promiseList.push(createView(name, key));
			}
			return Promise.all(promiseList);
		}).then(() => {
			return resolve(dbPath);
		}).catch((err) => {
			console.log(err);
			return reject(err);
		});
	});
}

exports.register = (title, username, password) => {
	return new Promise((resolve, reject) => {
		if(validator.toString(title) == ""){
			return reject("Property: title is required.");
		}
		if(validator.toString(username) == ""){
			return reject("Property: username is required.");
		}
		// TODO: Must check passsword weak
		if(validator.toString(password) == ""){
			return reject("Property: password is required.");
		}

		var queryObject = {
			name: "login",
			startKey: username,
			endKey: username,
			limit: 1,
		}
		query(queryObject).then((results) => {
			console.log(results);
			if(results && results.length > 0){
				return Promise.reject("Property: username already exist.");
			}
			return Promise.resolve();
		}).then(() => {
			var company = new Company();
			company.title = title;
			company.username = username;
			company.password = md5(password + privateKey);
			company.uuid = uuid.v4();
			return createDocument(company);
		}).then((newCompany) => {
			console.log("Company in DB");
			console.log(newCompany);
			return resolve(newCompany);
		}).catch((err) => {
			console.log(err);
			return reject(err);
		});
	});
}

exports.login = (username, password) => {

}

exports.checkLogin = () => {
	return new Promise((resolve, reject) => {

	});
}