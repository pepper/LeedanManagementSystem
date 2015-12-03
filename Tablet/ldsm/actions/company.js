/* @flow */
"use strict";

import validator from "validator";
import Promise from "bluebird";
import React, { AsyncStorage } from "react-native";
import { createAction } from "redux-actions";
import Constant from "../constants/";
import database from "../databases";
import { I18n } from "../definitions";

exports.register = (title, username, password) => {
	return (dispatch) => {
		dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_register_start")));
		database.register(title, username, password).then(() => {
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_register_success")));
		}).catch((err) => {
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_register_fail") + ": " + err));
		});
	}
}

exports.login = (username, password) => {
	// TODO: must store id in keychain by react-native-keychain
	return (dispatch) => {
		var companyId;
		dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_start")));
		database.login(username, password).then((result) => {
			companyId = result;
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_success")));
			return AsyncStorage.setItem(Constant.LOGIN_COMPANY_ID, companyId);
		}).then(() => {
			dispatch(createAction(Constant.LOGIN_FINISH)(companyId));
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_status_save_success")));
		}).catch((err) => {
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_login_fail") + ": " + err));
		});
	}
}

exports.checkLogin = () => {
	return (dispatch) => {
		AsyncStorage.getItem(Constant.LOGIN_COMPANY_ID).then((companyId) => {
			if(validator.toString(companyId) != ""){
				dispatch(createAction(Constant.LOGIN_FINISH)(companyId));
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_success")));
			}
			else{
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_status_no_record")));
			}
		}).catch((err) => {
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_login_status_read_fail") + ": " + err));
		});
	}
}

exports.logout = () => {
	return (dispatch) => {
		AsyncStorage.removeItem(Constant.LOGIN_COMPANY_ID).then(() => {
			dispatch(createAction(Constant.LOGOUT_FINISH)());
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_logout_finish")));
		}).catch((err) => {
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_logout_fail") + ": " + err));
		});
	}
}

exports.initDatabase = (daName) => {
	return (dispatch) => {
		dispatch(createAction(Constant.INIT_DATABASE_START)());
		database.initDatabase(daName).then(() => {
			dispatch(createAction(Constant.INIT_DATABASE_FINISH)());
		}).catch((err) => {
			console.log(err);
			dispatch(createAction(Constant.INIT_DATABASE_FAIL)());
		});
	}
}