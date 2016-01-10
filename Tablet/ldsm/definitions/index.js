/* @flow */
"use strict";

// var Config = require("../config");
var Animation = require("./animation");
var Color = require("./color");
// var Size = require("./size")[Config.platform];
var Size = require("./size");
var ErrorDinifition = require("./error");
var I18n = require("./i18n");

module.exports = {
	Animation: Animation,
	Color: Color,
	Size: Size,
	ErrorDinifition: ErrorDinifition,
	I18n: I18n
};