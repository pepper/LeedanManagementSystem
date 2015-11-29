"use strict";

import Promise from "bluebird";
import React, { NativeModules } from "react-native";

var CouchbaseLite = NativeModules.CouchbaseLite;

var connectToCouchbaseLite = Promise.promisify(CouchbaseLite.connectToCouchbaseLite);
var createDatabase = Promise.promisify(CouchbaseLite.createDatabase);

export function initDatabase(dbName){
	var resolver = Promise.pedding();
	connectToCouchbaseLite().then(() => createDatabase(dbName)).then((dbPath) => {
		console.log("Couchbacse Lite DB:" + dbPath);
		return resolver.resolve(dbPath);
	}).catch((err) => {
		console.log(err);
		resolver.reject(err);
	});
	return resolver.promise;
}