/* @flow */
"use strict";

import { createAction } from "redux-actions";
import Constant from "../constants/";

exports.showInfoMessage = (message) => {
	return createAction(Constant.INFO_MESSAGE)(message);
};

exports.showErrorMessage = (message) => {
	console.log(message);
	return createAction(Constant.ERROR_MESSAGE)(message);
};

exports.alreadyShowMessage = () => {
	return createAction(Constant.ALREADY_SHOW_MESSAGE)();
};