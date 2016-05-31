/* @flow */
"use strict";

import validator from "validator";
import { AsyncStorage } from "react-native";
import { createAction } from "redux-actions";
import Constant from "../constants/";
import API from "../databases/api";
import { I18n } from "../definitions";

exports.loadStock = () => {
	return async (dispatch) => {
		try{
			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_stock_start")));
			let stockList = await API.loadStock();
			dispatch(createAction(Constant.STOCK_LOAD_FINISH)(stockList));
			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("load_fail") + ": " + err));
		}
	};
};

exports.getStock = (id) => {
	return async (dispatch) => {
		dispatch(createAction(Constant.STOCK_CHECKOUT)(id));
	};
};

exports.loadSupplier = () => {
	return async (dispatch) => {
		try{
			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_stock_start")));
			let supplierList = await API.loadSupplier();
			dispatch(createAction(Constant.SUPPLIER_LOAD_FINISH)(supplierList));
			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("load_fail") + ": " + err));
		}
	};
};

exports.getSupplier = (id) => {
	return async (dispatch) => {
		dispatch(createAction(Constant.SUPPLIER_CHECKOUT)(id));
	};
};