/* @flow */
"use strict";

import validator from "validator";
import md5 from "md5";
import uuid from "uuid";
import Promise from "bluebird";
import {manager, ReactCBLite} from "react-native-couchbase-lite";

import { ErrorDinifition } from "../definitions";
let error = ErrorDinifition;

// ESLint hack
let emit;

const port = 5984;
const username = "react-native-sync-model";
const password = "ledom-cnys-evitan-tcaer";

ReactCBLite.init(port, username, password, (err) => {
	if(err){
		console.error(err);
	}
});

// TOOD: This key must fetch from https link with time base ramdom url  
let privateKey = "leedanKey";

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
Company.views = {
	lists:{
		map: function(doc){
			emit(doc.username, doc);
		}.toString()
	}
};

class Employee {
	constructor(){
		Object.assign(this, {
			name:			"",
			id_number:		"",
			serial_number:	"",
			passcode:		"",
			avatar:			"",
			permission:		"",
			group:			""
		});
	}
}

let database = null;

let checkRequire = (property, name, type = "string") => {
	return new Promise(async (resolve, reject) => {
		switch(type){
			case "string":
				if(validator.toString(property[name]) == ""){
					return reject(new error.InputPropertyNotAcceptError("Property: " + name + " is required."));
				}
				return resolve();
		}
	});
}

exports.initDatabase = async (dbName) => {
	database = new manager(`http://${username}:${password}@localhost:${port}/`, dbName);
	await database.createDatabase();
	await database.createDesignDocument("company", Company.views);
};

exports.register = (title, username, password) => {
	return new Promise(async (resolve, reject) => {
		if(validator.toString(title) == ""){
			return reject(new Error("Property: title is required."));
		}
		if(validator.toString(username) == ""){
			return reject(new Error("Property: username is required."));
		}
		// TODO: Must check passsword weak
		if(validator.toString(password) == ""){
			return reject(new Error("Property: password is required."));
		}

		try{
			let results = await database.queryView("company", "lists", {
				keys: [username],
				limit: 1
			});
			if(results && results.rows && results.rows.length > 0){
				return reject(new Error("Property: username already exist."));
			}
			let company = new Company();
			company.title = title;
			company.username = username;
			company.password = md5(password + privateKey);
			company.uuid = uuid.v4();
			let newCompany = await database.createDocument(company);
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
			return reject(new Error("Property: username is required."));
		}
		if(validator.toString(password) == ""){
			return reject(new Error("Property: password is required."));
		}
		try{
			let result = await database.queryView("company", "lists", {
				keys: [username],
				limit: 1
			});
			if(result && result.rows && result.rows.length > 0 && result.rows[0].value.password == md5(password + privateKey)){
				return resolve(result.rows[0].id);
			}
			else{
				return reject(new Error("Username or password wrong."));
			}
		}
		catch(err){
			console.error(err);
			return reject(err);
		}
	});
};

exports.loadCompany = async (companyId) => {
	return await database.getDocument(companyId);
};

exports.createEmployee = async (company, property) => {
	await checkRequire(property, "name");
	await checkRequire(property, "id_number");
	await checkRequire(property, "passcode");
	let number = Math.floor(Math.random() * 1000000000);
	let serialNumber = ("1" + (new Array(10 - number.toString().length)).join("0") + number);
	
	if(company.employee_list.every((employee) => {
		return employee.id_number != property.id_number && employee.passcode != property.passcode;
	})){
		let newEmployee = new Employee();
		newEmployee.name = property.name;
		newEmployee.id_number = property.id_number;
		newEmployee.passcode = property.passcode;
		newEmployee.permission = [].concat(property.permission);
		newEmployee.serial_number = serialNumber;
		company.employee_list.push(newEmployee);
		return await database.updateDocument(company);
	}
	else{
		throw new error.EmployeeAlreadyExistError();
	}
};