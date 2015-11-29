"use strict";

import Promise from "bluebird";
import React, { NativeModules } from "react-native";

var CouchbaseLite = NativeModules.CouchbaseLite;

var connectToCouchbaseLite = Promise.promisify(CouchbaseLite.connectToCouchbaseLite);
var createDatabase = Promise.promisify(CouchbaseLite.createDatabase);

exports.initDatabase = (dbName) => {
	return new Promise((resolve, reject) => {
		connectToCouchbaseLite().then(() => createDatabase(dbName)).then((dbPath) => {
			console.log("Couchbacse Lite DB:" + dbPath);
			return resolve(dbPath);
		}).catch((err) => {
			console.log(err);
			reject(err);
		});
	});
}