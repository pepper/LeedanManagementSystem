/* @flow */
"use strict";

var Config = require("../config");
var Animation = require("./animation");
var Color = require("./color");
var Size = require("./size")[Config.platform];
var ErrorDinifition = require("./error");

module.exports = {
	Animation: Animation,
	Color: Color,
	Size: Size,
	ErrorDinifition: ErrorDinifition,
};