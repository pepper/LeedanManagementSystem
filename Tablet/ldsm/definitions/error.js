/* @flow */
"use strict";
var customError = require("custom-error");

var error = {};

var createCustomError = function(name, code, defaultMessage, BaseError){
	var newError = customError(name, BaseError);
	newError.prototype.code = code;
	newError.prototype.message = defaultMessage;
	return newError;
}

var createError = function(name, code, message){
	if(!error[name]){
		error[name] = createCustomError(name, code, message);
	}
	else{
		throw new Error("Error redefined.");
	}
}

var errorDefinition = [
	["NotExistError", -103, "Target not exist"],
	["DataNeedLoad", -105, "Data need fetch from server"],
	["InputPropertyNotAcceptError", -107, "Input property not accept"],
	["UserNotLogin", -109, "User currently not login"],
	["BackendOperationFail", -111, "Backend operation fail"],
	["CompanyNotLoginError", -201, "Company currently not login"],
	["EmployeeNotLoginError", -203, "There is no employee login"],
];

errorDefinition.forEach(function(input){
	createError(input[0], input[1], input[2]);
});

module.exports = error;