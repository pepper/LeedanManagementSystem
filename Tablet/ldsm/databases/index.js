"use strict";

import validator from "validator";
import Promise from "bluebird";
import React, { NativeModules } from "react-native";

var CouchbaseLite = NativeModules.CouchbaseLite;

var dbPath = "";
var connectToCouchbaseLite = Promise.promisify(CouchbaseLite.connectToCouchbaseLite);
var createDatabase = Promise.promisify(CouchbaseLite.createDatabase);
var createView = Promise.promisify(CouchbaseLite.createView);
let createDocument = Promise.promisify(CouchbaseLite.createDocument);

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
			serial_number:	"",
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
		if(validator.toString(password) == ""){
			return reject("Property: password is required.");
		}
		var number = Math.floor(Math.random() * 1000000000);
		var serialNumber = ("9" + (new Array(10 - number.toString().length)).join("0") + number);
		// Must check serial number not exist

		

		var company = new Company();
		company.title = title;
		company.username = username;
		company.password = password;
		company.serial_number = serialNumber;
		createDocument(company).then((newCompany) => {
			console.log("Company in DB");
			console.log(newCompany);
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