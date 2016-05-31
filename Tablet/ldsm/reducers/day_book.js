import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.dayBook = handleActions({
	[Constant.DAYBOOK_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		day_book_list: action.payload,
		loaded: true
	}),
	[Constant.DAYBOOK_CHANGE]: (state, action) => Object.assign({}, state, {
		current_day_book_id: action.payload._id,
		current_day_book: action.payload,
		loaded: true
	}),
	[Constant.DAYBOOK_RELOAD]: (state, action) => Object.assign({}, state, {
		day_book_list: state.day_book_list.map((dayBook) => {
			if(dayBook._id == action.payload._id){
				return action.payload;
			}
			return dayBook;
		}),
		current_day_book_id: action.payload._id,
		current_day_book: action.payload,
		loaded: true
	}),


	// [Constant.STOCK_CHECKOUT]: (state, action) => Object.assign({}, state, {
	// 	current_stock: state.stock_list.filter((stock) => (stock._id == action.payload))[0]
	// }),
	// [Constant.SUPPLIER_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
	// 	supplier_list: action.payload,
	// 	loaded: true
	// }),
	// [Constant.SUPPLIER_CHECKOUT]: (state, action) => Object.assign({}, state, {
	// 	current_supplier: state.supplier_list.filter((supplier) => (supplier._id == action.payload))[0]
	// }),
}, {
	loaded: false
});