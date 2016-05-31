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

	"CHANGE_MODULE",

	"COMPANY_NEED_RELOAD",
	"COMPANY_LOAD_FINISH",

	"EMPLOYEE_LIST_LOAD_FINISH",
	"EMPLOYEE_LOGIN",
	"EMPLOYEE_LOGOUT",

	"INVOICING_STOCK_LOAD_FINISH",
	"INVOICING_PRODUCT_LOAD_FINISH",
	"INVOICING_SUPPLIER_LOAD_FINISH",
	"INVOICING_SELECT_PRODUCT",
	"INVOICING_SELECT_SUPPLIER",
	"INVOICING_SELECT_STOCK",
	"INVOICING_CHANGE_CURRENT_SUPPLIER",

	"SUPPLIER_LOAD_FINISH",
	"SUPPLIER_CHECKOUT",

	"DAYBOOK_LOAD_FINISH",
	"DAYBOOK_CHANGE",
	"DAYBOOK_RELOAD",
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