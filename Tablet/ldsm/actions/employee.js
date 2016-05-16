/* @flow */
"use strict";

import { createAction } from "redux-actions";
import { get } from "nested-property";

import Constant from "../constants/";
import databases, { Company } from "../databases";
import { I18n } from "../definitions";

exports.create = (props) => {
	return async (dispatch, getState) => {
		try{
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_create_employee_start")));
			const company = get(getState(), "company.company");
			await company.createEmployee(props);
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_create_employee_success")));
			dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_create_employee_fail") + ": " + err));
		}
	};
};

exports.login = (passcode) => {
	return (dispatch, getState) => {
		const employeeList = get(getState().employee, "employee_list") || [];
		let employee = employeeList.find((employeeToCheck) => {
			return employeeToCheck.passcode == passcode;
		});
		if(employee){
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("employee_login_success")));
			return dispatch(createAction(Constant.EMPLOYEE_LOGIN)(employee));
		}
		dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("employee_not_found")));
	};
};

exports.logout = () => {
	return createAction(Constant.EMPLOYEE_LOGOUT)();
}