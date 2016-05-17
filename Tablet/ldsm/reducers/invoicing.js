import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.invoiving = handleActions({
	[Constant.INVOIVING_STOCK_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		stock_list: action.payload,
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