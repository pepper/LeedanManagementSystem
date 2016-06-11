import _ from "underscore";
import { get } from "nested-property";
import validator from "validator";
import { FIRApp, FIRAuth, FIRDatabase } from "react-native-google-firebase";

import { ErrorDinifition } from "../definitions";
let error = ErrorDinifition;

let auth;
let database;

exports.initFirebase = async () => {
	FIRApp.configure();
};

exports.initAuth = async () => {
	auth = await FIRAuth.auth();
	return auth;
};

exports.initDatabase = async () => {
	database = await FIRDatabase.database(true);
	return database;
};

exports.auth = () => {
	return auth;
};

exports.database = () => {
	return database;
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