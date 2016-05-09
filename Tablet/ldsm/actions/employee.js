/* @flow */
"use strict";

import validator from "validator";
import { AsyncStorage } from "react-native";
import { createAction } from "redux-actions";
import Constant from "../constants/";
import database from "../databases";
import { I18n } from "../definitions";

exports.create = (props) => {
	return async (dispatch, getState) => {
		try{
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_create_employee_start")));
			const company = getState().company.company;
			let result = await database.createEmployee(company, props);
			if(result.ok){
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_create_employee_success")));
				dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
			}
			else{
				throw new Error(result.stringify());
			}
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_create_employee_fail") + ": " + err));
		}
	};
}

exports.login = (passcode) => {
	return (dispatch, getState) => {
		const state = getState();
		console.log(state);
		// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_register_start")));
		// database.register(title, username, password).then(() => {
		// 	dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_register_success")));
		// }).catch((err) => {
		// 	dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_register_fail") + ": " + err));
		// });
	};
};