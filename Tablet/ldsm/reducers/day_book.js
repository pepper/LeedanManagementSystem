import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.dayBook = handleActions({
	[Constant.DAYBOOK_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		day_book_collect: action.payload,
		day_book_list: Object.entries(action.payload.children).map((entries) => (Object.assign(entries[1], {"key": entries[0]}))),
		loaded: true
	}),
	[Constant.DAYBOOK_CHANGE]: (state, action) => Object.assign({}, state, {
		current_day_book_key: action.payload.key,
		current_day_book: action.payload,
		loaded: true
	}),
	[Constant.DAYBOOK_CHANGE_DATE_DURATION]: (state, action) => Object.assign({}, state, {
		date_duration: action.payload
	}),
	[Constant.DAYBOOK_CLEAR_DATE_DURATION]: (state) => Object.assign({}, state, {
		date_duration: {}
	})
}, {
	loaded: false
});