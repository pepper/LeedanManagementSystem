import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.dayBook = handleActions({
	[Constant.DAYBOOK_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		day_book_collect: action.payload,
		day_book_list: Object.entries(action.payload.children).map((entries) => (Object.assign(entries[1], {
			"key": entries[0],
			"revenue": entries[1].total_amount,
			"balance": entries[1].total_amount
		}))),
		loaded: true
	}),
	[Constant.DAYBOOK_TOTAL_GROUP_CHANGE]: (state, action) => {
		return Object.assign({}, state, {
			current_day_book_total_group: action.payload
		});
	},
	[Constant.DAYBOOK_GROUP_CHANGE]: (state, action) => {
		return Object.assign({}, state, {
			current_day_book_group: action.payload
		});
	},
	[Constant.DAYBOOK_CHANGE]: (state, action) => Object.assign({}, state, {
		current_day_book_group: action.payload.group,
		current_day_book_key: action.payload.key,
		current_day_book: action.payload,
		loaded: true
	}),
	[Constant.DAYBOOK_CHANGE_DATE_DURATION]: (state, action) => {
		let dayBookList = (state.day_book_list || []).map((dayBook) => {
			let result = dayBook.record_list.reduce((result, record) => {
				let recordDate = new Date(record.record_datetime);
				if(recordDate <= action.payload.end){
					result.balance += record.amount;
					if(recordDate >= action.payload.start){
						result.revenue += record.amount;
					}
				}
				return result;
			}, {
				revenue: 0,
				balance: 0
			});
			return Object.assign({}, dayBook, result);
		});
		return Object.assign({}, state, {
			date_duration: action.payload,
			day_book_list: dayBookList,
			current_day_book: dayBookList.find((dayBook) => (state.current_day_book_key == dayBook.key))
		});
	},
	[Constant.DAYBOOK_CLEAR_DATE_DURATION]: (state) => {
		let dayBookList = Object.entries(state.day_book_collect.children).map((entries) => (Object.assign(entries[1], {
			"key": entries[0],
			"revenue": entries[1].total_amount,
			"balance": entries[1].total_amount
		})));
		return Object.assign({}, state, {
			date_duration: {},
			day_book_list: dayBookList,
			current_day_book: dayBookList.find((dayBook) => (state.current_day_book_key == dayBook.key))
		});
	}
}, {
	loaded: false
});