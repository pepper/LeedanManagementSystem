/* @flow */
"use strict";

import validator from "validator";
import { AsyncStorage } from "react-native";
import { createAction } from "redux-actions";
import { get } from "nested-property";

import Constant from "../constants/";
import API from "../databases/api";
// import databases, { Stock } from "../databases";
import { I18n } from "../definitions";

exports.loadStockFromServer = () => {
	return async (dispatch, getState) => {
		try{
			let company = get(getState(), "company.company");
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_stock_start")));
			let stockObjectList = await API.loadStock();
			company = await company.createMultipleStock(stockObjectList);
			console.log(company);
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));
			dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("load_fail") + ": " + err));
		}
	};
};

exports.loadSupplierFromServer = () => {
	return async (dispatch, getState) => {
		try{
			let company = get(getState(), "company.company");
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_supplier_start")));
			let supplierList = await API.loadSupplier();
			company = await company.createMultipleSupplier(supplierList);
			console.log(company);
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));
			dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("load_fail") + ": " + err));
		}
	};
};

exports.loadProductFromServer = () => {
	return async (dispatch, getState) => {
		try{
			let company = get(getState(), "company.company");
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_product_start")));
			let productObjectList = await API.loadProduct();
			company = await company.createMultipleProduct(productObjectList.map((productObject) => {
				return Object.assign({}, productObject, {
					sku_number: productObject.serial_number
				});
			}));
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("load_success")));
			dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("load_fail") + ": " + err));
		}
	};
};


exports.selectItem = (type, id) => {
	return async (dispatch, getState) => {
		const invoicing = get(getState(), "invoicing");
		switch(type){
		case "product":
			const product = invoicing.product_list.find((productInput) => {
				return productInput._id == id;
			});
			dispatch(createAction(Constant.INVOICING_SELECT_PRODUCT)(product));
			break;
		case "supplier":
			const supplier = invoicing.supplier_list.find((supplierInput) => {
				return supplierInput._id == id;
			});
			dispatch(createAction(Constant.INVOICING_SELECT_SUPPLIER)(supplier));
			break;
		case "stock":
			const stock = invoicing.stock_list.find((stockInput) => {
				return stockInput._id == id;
			});
			dispatch(createAction(Constant.INVOICING_SELECT_STOCK)(stock));
			break;
		}
	};
};

exports.changeCurrentSupplier = (id) => {
	return async (dispatch, getState) => {
		const invoicing = get(getState(), "invoicing");
		const supplier = invoicing.supplier_list.find((supplierInput) => {
			return supplierInput._id == id;
		});
		dispatch(createAction(Constant.INVOICING_CHANGE_CURRENT_SUPPLIER)(supplier));
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
}