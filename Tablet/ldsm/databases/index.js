/* @flow */
"use strict";

import validator from "validator";
import md5 from "md5";
import uuid from "uuid";
import Promise from "bluebird";
import { NativeModules } from "react-native";

var CouchbaseLite = NativeModules.CouchbaseLite;

// Delegate functions
if(!CouchbaseLite.connectToCouchbaseLite ||
	!CouchbaseLite.createDatabase ||
	!CouchbaseLite.createView ||
	!CouchbaseLite.createDocument ||
	!CouchbaseLite.query){
	throw new Error("CouchbaseLite delegate functions not loaded.");
}

// TOOD: This key must fetch from https link with time base ramdom url  
let privateKey = "leedanKey";

let viewList = [{
	name: "login",
	key: "username"
}, {
	name: "search_company",
	key: "title"
}];

class Company {
	constructor(){
		Object.assign(this, {
			title:			"",
			description:	"",
			uuid:			"",
			username:		"",
			password:		"",
			employee_list:	[],
			avtive_module:	[]
		});
	}
}

exports.initDatabase = (dbName) => {
	return new Promise(async (resolve, reject) => {
		try{
			await CouchbaseLite.connectToCouchbaseLite();
			var dbPath = await CouchbaseLite.createDatabase(dbName);
			let promiseList = viewList.map(({name, key}) =>  CouchbaseLite.createView(name, key));
			await Promise.all(promiseList);
			return resolve(dbPath);
		}
		catch(err){
			console.error(err);
			return reject(err);
		}
	});
};

exports.register = (title, username, password) => {
	return new Promise(async (resolve, reject) => {
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
			limit: 1
		};

		try{
			let results = await CouchbaseLite.query(queryObject);
			if(results && results.length > 0){
				return reject("Property: username already exist.");
			}
			let company = new Company();
			company.title = title;
			company.username = username;
			company.password = md5(password + privateKey);
			company.uuid = uuid.v4();
			let newCompany = await CouchbaseLite.createDocument(company);
			return resolve(newCompany);
		}
		catch(err){
			console.error(err);
			return reject(err);
		}
	});
};

exports.login = (username, password) => {
	return new Promise(async (resolve, reject) => {
		if(validator.toString(username) == ""){
			return reject("Property: username is required.");
		}
		if(validator.toString(password) == ""){
			return reject("Property: password is required.");
		}
		var queryObject = {
			name: "login",
			startKey: username,
			endKey: username,
			limit: 1
		};

		try{
			let results = await CouchbaseLite.query(queryObject);
			if(results && results.length > 0 && results[0].password == md5(password + privateKey)){
				return resolve(results[0]._id);
			}
			else{
				return reject("Username or password wrong.");
			}
		}
		catch(err){
			console.error(err);
			return reject(err);
		}
	});
};