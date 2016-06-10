/* @flow */
"use strict";

import validator from "validator";
import { get } from "nested-property";
import { createAction } from "redux-actions";
import Constant from "../constants/";
import { I18n } from "../definitions";
import databases, { DayBookCollect } from "../databases";

exports.create = (props) => {
	return async (dispatch, getState) => {
		try{
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_create_daybook_start")));
			const dayBookList = get(getState(), "dayBook.day_book_collect");
			await dayBookList.add(props);
			// await company.createDayBook(props);
			dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("company_create_daybook_success")));
			// dispatch(createAction(Constant.COMPANY_NEED_RELOAD)());
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_create_daybook_fail") + ": " + err));
		}
	};
};

exports.sync = () => {
	return async (dispatch, getState) => {
		try{
			const companyId = get(getState(), "company.company_id");
			if(validator.toString(companyId) != ""){
				DayBookCollect.load(companyId, (newDayBookCollect) => {
					dispatch(createAction(Constant.DAYBOOK_LOAD_FINISH)(newDayBookCollect));
				});
			}
		}
		catch(err){
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("company_create_daybook_fail") + ": " + err));
		}
	}
};

exports.changeDayBook = (dayBookId) => {
	return async (dispatch, getState) => {
		const dayBookList = get(getState().dayBook, "day_book_list") || [];
		let dayBook = dayBookList.find((employeeToCheck) => {
			return employeeToCheck._id == dayBookId;
		});
		dispatch(createAction(Constant.DAYBOOK_CHANGE)(dayBook));
	};
};

exports.addType = (property) => {
	return async (dispatch, getState) => {
		const dayBook = get(getState().dayBook, "current_day_book") || [];
		if(dayBook){
			try{
				const newDayBook = await dayBook.addType(property);
				dispatch(createAction(Constant.DAYBOOK_RELOAD)(newDayBook));
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("day_book_add_new_type_success")));
			}
			catch(err){
				dispatch(createAction(Constant.ERROR_MESSAGE)(err));
			}
		}
		else{
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("day_book_need_select_day_book_first")));
		}
	};
};

exports.addRecord = (property) => {
	return async (dispatch, getState) => {
		const dayBook = get(getState().dayBook, "current_day_book") || [];
		if(dayBook){
			try{
				const newDayBook = await dayBook.addRecord(property);
				dispatch(createAction(Constant.DAYBOOK_RELOAD)(newDayBook));
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("day_book_add_new_recoed_success")));
			}
			catch(err){
				dispatch(createAction(Constant.ERROR_MESSAGE)(err));
			}
		}
		else{
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("day_book_need_select_day_book_first")));
		}
	};
};

exports.removeRecord = (index) => {
	return async (dispatch, getState) => {
		const dayBook = get(getState().dayBook, "current_day_book") || [];
		if(dayBook){
			try{
				const newDayBook = await dayBook.removeRecord(index);
				dispatch(createAction(Constant.DAYBOOK_RELOAD)(newDayBook));
				dispatch(createAction(Constant.INFO_MESSAGE)(I18n.t("day_book_remove_recoed_success")));
			}
			catch(err){
				dispatch(createAction(Constant.ERROR_MESSAGE)(err));
			}
		}
		else{
			dispatch(createAction(Constant.ERROR_MESSAGE)(I18n.t("day_book_need_select_day_book_first")));
		}
	};
};