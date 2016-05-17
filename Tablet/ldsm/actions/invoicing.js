/* @flow */
"use strict";

import validator from "validator";
import { AsyncStorage } from "react-native";
import { createAction } from "redux-actions";
import { get } from "nested-property";

import Constant from "../constants/";
import API from "../databases/api";
import databases, { Stock } from "../databases";
import { I18n } from "../definitions";

exports.loadDataFromServer = () => {
	return async (dispatch, getState) => {
		try{
			const company = get(getState(), "company.company");
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_stock_start")));
			let stockObjectList = await API.loadStock();
			await company.createMultipleStock(stockObjectList);

			// console.log(stockObjectList);
			// let stockList = [];
			// for(let index in stockObjectList){
			// 	stockList.push(await company.createStock(stockObjectList[index]));
			// }
			// console.log(stockList);
			// dispatch(createAction(Constant.STOCK_LOAD_FINISH)(stockList));
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));

			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_supplier_start")));
			// let supplierList = await API.loadSupplier();
			// console.log(supplierList);
			// // dispatch(createAction(Constant.SUPPLIER_LOAD_FINISH)(supplierList));
			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));

			// dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_product_start")));
			// let productList = await API.loadProduct();
			// console.log(productList);
			// // dispatch(createAction(Constant.PRODUCT_LOAD_FINISH)(productList));
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
}

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
}