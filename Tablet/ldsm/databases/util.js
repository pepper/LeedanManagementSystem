import validator from "validator";
import {manager, ReactCBLite} from "react-native-couchbase-lite";

import { ErrorDinifition } from "../definitions";
let error = ErrorDinifition;

let database = null;

initReactCBLite = (username, password, port) => {
	return new Promise(async (resolve, reject) => {
		ReactCBLite.init(port, username, password, (err) => {
			if(err){
				console.error(err);
				return reject(err);
			}
			resolve();
		});
	});
}

exports.initDatabase = async (username, password, port, dbName) => {
	await initReactCBLite(username, password, port);
	database = new manager(`http://${username}:${password}@localhost:${port}/`, dbName);
	await database.createDatabase();
	console.log(database);
	
};

exports.createDesignDocument = async (designDocumentName, views) => {
	await database.createDesignDocument(designDocumentName, views);
};

exports.checkPropertyRequire = (property, name, type = "string") => {
	switch(type){
		case "string":
			if(validator.toString(property[name]) == ""){
				throw new error.InputPropertyNotAcceptError("Property: " + name + " is required.");
			}
	}
	return true;
};

exports.checkDocumentNotExist = async (designDocumentName, viewName, option = {}, errorMessage = "") => {
	console.log(database);
	let results = await database.queryView(designDocumentName, viewName, option);
	if(results && results.rows && results.rows.length > 0){
		throw new error.AlreadyExistError(errorMessage);
	}
};

exports.getDocument = async (id) => {
	return await database.getDocument(id);
}

exports.checkoutDocuments = async (designDocumentName, viewName, option = {}) => {
	return await database.queryView(designDocumentName, viewName, option);
}

exports.createDocument = async (document) => {
	return await database.createDocument(document);
};