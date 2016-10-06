import _ from "underscore";
import { get } from "nested-property";
import validator from "validator";
// import { FIRApp, FIRAuth, FIRDatabase } from "react-native-google-firebase";
import firebase from "firebase";
import { ErrorDinifition } from "../definitions";
let error = ErrorDinifition;

let auth;
let database;

exports.initFirebase = async () => {
	// FIRApp.configure();
	var config = {
		apiKey: "AIzaSyBESpJhyP-OLPr7O_iDyr1Lv2qDnVSRLOI",
		authDomain: "project-4087478582471658430.firebaseapp.com",
		databaseURL: "https://project-4087478582471658430.firebaseio.com",
		storageBucket: "project-4087478582471658430.appspot.com",
		messagingSenderId: "137623236536"
	};
	firebase.initializeApp(config);
	auth = firebase.auth();
	database = firebase.database();
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