import { createAction } from "redux-actions";
import Constant from "../constants/";
import database from "../databases";

exports.showInfoMessage = (message) => {
	return createAction(Constant.INFO_MESSAGE)(message);
}

exports.showErrorMessage = (message) => {
	return createAction(Constant.ERROR_MESSAGE)(message);
}

exports.alreadyShowMessage = () => {
	return createAction(Constant.ALREADY_SHOW_MESSAGE)();
}