import _ from "underscore";
import { get } from "nested-property";
import validator from "validator";
import {manager, ReactCBLite} from "react-native-couchbase-lite";

import { ErrorDinifition } from "../definitions";
let error = ErrorDinifition;

let database = null;

const initReactCBLite = (username, password, port) => {
	return new Promise(async (resolve, reject) => {
		ReactCBLite.init(port, username, password, (err) => {
			if(err){
				console.error(err);
				return reject(err);
			}
			resolve();
		});
	});
};

exports.initDatabase = async (username, password, port, dbName) => {
	await initReactCBLite(username, password, port);
	database = new manager(`http://${username}:${password}@localhost:${port}/`, dbName);
	await database.createDatabase();
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
		break;
	case "number":
		if(isNaN(property[name])){
			throw new error.InputPropertyNotAcceptError("Property: " + name + " is required.");
		}
		break;
	}
	return true;
};

const optionKeySeperator = (option) => {
	let optionList = [];
	if(option.keys && option.keys.length > 0){
		let keysList = [];
		let keys = [];
		let currentSize = 0;
		for(let i in option.keys){
			keys.push(option.keys[i]);
			currentSize = currentSize + option.keys[i].length;
			if(currentSize > 3000){
				keysList.push(keys);
				keys = [];
				currentSize = 0;
			}
		}
		if(keys.length > 0){
			keysList.push(keys);
		}
		optionList = keysList.map((keysInput) => {
			return Object.assign({}, option, {
				keys: keysInput
			});
		});
	}
	else{
		optionList = [option];
	}
	return optionList;
};

exports.checkDocumentNotExist = async (designDocumentName, viewName, option = {}, errorMessage = "", notThrowError) => {
	const optionList = optionKeySeperator(option);
	let resultList = [];
	for(let i in optionList){
		// TODO: must find why return so much key!
		let result = await database.queryView(designDocumentName, viewName, optionList[i]);
		resultList.push(result);
		if(get(result, "rows.length") > 0){
			if(!notThrowError){
				throw new error.AlreadyExistError(errorMessage);
			}
		}
	}

	let result = resultList.reduce((lastValue, resultInput) => {
		return lastValue = Object.assign({}, lastValue, {
			rows: lastValue.rows.concat(resultInput.rows)
		});
	}, Object.assign({}, resultList[0], {
		rows: []
	}));
	result.rows = _.uniq(result.rows, false, (row) => {
		return row.id;
	});
	return result;
};

exports.getDocumentList = async  (designDocumentName, viewName, option = {}) => {
	const optionList = optionKeySeperator(option);
	console.log(optionList);
	let resultList = [];
	for(let i in optionList){
		// TODO: must find why return so much key!
		console.log(optionList[i]);
		let result = await database.queryView(designDocumentName, viewName, optionList[i]);
		resultList.push(result);
	}

	let result = resultList.reduce((lastValue, resultInput) => {
		return lastValue = Object.assign({}, lastValue, {
			rows: lastValue.rows.concat(resultInput.rows)
		});
	}, Object.assign({}, resultList[0], {
		rows: []
	}));
	result.rows = _.uniq(result.rows, false, (row) => {
		return row.id;
	});
	console.log(result);
	return result;
};

exports.getDocument = async (id) => {
	return await database.getDocument(id);
};

exports.checkoutDocuments = async (designDocumentName, viewName, option = {}) => {
	return await database.queryView(designDocumentName, viewName, option);
};

exports.createDocument = async (document) => {
	const result = await database.createDocument(document);
	if(result.ok){
		return await database.getDocument(result.id);
	}
	else{
		throw new ErrorDinifition.CreateDocumentFail(result.stringify());
	}
};

exports.updateDocument = async (document) => {
	return await database.updateDocument(document);
};

exports.modifyDocuments = async (documentList) => {
	return await database.modifyDocuments(documentList);
}
