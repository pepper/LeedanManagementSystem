/* @flow */
"use strict";

import _ from "underscore";

let apiActionConstant = [
	"LOGIN_COMPANY_ID",

	"ALREADY_SHOW_MESSAGE",
	"ERROR_MESSAGE",
	"INFO_MESSAGE",

	"INIT_DATABASE_START",
	"INIT_DATABASE_FINISH",
	"INIT_DATABASE_FAIL",

	"LOGIN_FINISH",
	"LOGOUT_FINISH",

	"CHANGE_MODULE"
];

let viewActionConstant = [
	"SHOW_PANEL",
	"HIDE_PANEL"
];

let constantArray = _.union(apiActionConstant, viewActionConstant);

var constantObject = {};
constantArray.forEach(function(constant){
	constantObject[constant] = constant;
});

module.exports = constantObject;