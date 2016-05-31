/* @flow */
"use strict";

import validator from "validator";
import { AsyncStorage } from "react-native";
import { createAction } from "redux-actions";
import Constant from "../constants/";
import databases, { Company, Employee } from "../databases";
import { I18n } from "../definitions";

exports.register = (property) => {
	return (dispatch) => {
		dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_register_start")));
		Company.register(property).then(() => {
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_register_success")));
		}).catch((err) => {
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_register_fail") + ": " + err));
		});
	};
};

exports.login = (property) => {
	// TODO: must store id in keychain by react-native-keychain
	return async (dispatch) => {
		try{
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_start")));
			const companyId = await Company.login(property);
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_success")));
			await AsyncStorage.setItem(Constant.LOGIN_COMPANY_ID, companyId);
			dispatch(createAction(Constant.LOGIN_FINISH)(companyId));
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_status_save_success")));
			dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_login_fail") + ": " + err));
		}
	};
};

exports.checkLogin = () => {
	return async (dispatch) => {
		try{
			const companyId = await AsyncStorage.getItem(Constant.LOGIN_COMPANY_ID);
			if(validator.toString(companyId) != ""){
				dispatch(createAction(Constant.LOGIN_FINISH)(companyId));
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_success")));
				dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
			}
			else{
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_login_status_no_record")));
			}
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_login_status_read_fail") + ": " + err));
		}
	};
};

exports.logout = () => {
	return (dispatch) => {
		AsyncStorage.removeItem(Constant.LOGIN_COMPANY_ID).then(() => {
			dispatch(createAction(Constant.LOGOUT_FINISH)());
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_logout_finish")));
		}).catch((err) => {
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_logout_fail") + ": " + err));
		});
	};
};

exports.load = () =>{
	return async (dispatch, getState) => {
		const companyId = getState().company.company_id || "";
		if(companyId != ""){
			const company = await Company.load(companyId);
			dispatch(createAction(Constant.COMPANY_LOAD_FINISH)(company));
			// const employeeList = await company.loadEmployeeList();
			// dispatch(createAction(Constant.EMPLOYEE_LIST_LOAD_FINISH)(employeeList));
			// const stockList = await company.loadStockList();
			// dispatch(createAction(Constant.INVOICING_STOCK_LOAD_FINISH)(stockList));
			// const productList = await company.loadProductList();
			// dispatch(createAction(Constant.INVOICING_PRODUCT_LOAD_FINISH)(productList));
			// const supplierList = await company.loadSupplierList();
			// dispatch(createAction(Constant.INVOICING_SUPPLIER_LOAD_FINISH)(supplierList));
			const dayBookList = await company.loadDayBookList();
			dispatch(createAction(Constant.DAYBOOK_LOAD_FINISH)(dayBookList));
		}
	};
};