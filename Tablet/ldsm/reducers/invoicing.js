import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.invoicing = handleActions({
	[Constant.INVOICING_STOCK_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		stock_list: action.payload,
		stock_loaded: true
	}),
	[Constant.INVOICING_PRODUCT_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		product_list: action.payload,
		product_loaded: true
	}),
	[Constant.INVOICING_SUPPLIER_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		supplier_list: action.payload,
		supplier_loaded: true
	}),
	[Constant.INVOICING_SELECT_PRODUCT]: (state, action) => Object.assign({}, state, {
		mode: "product",
		current_product: action.payload,
	}),
	[Constant.INVOICING_SELECT_SUPPLIER]: (state, action) => Object.assign({}, state, {
		mode: "supplier",
		current_supplier: action.payload,
		selected_stock_list: state.stock_list.filter(() => (Math.random() > 0.98))
	}),
	[Constant.INVOICING_SELECT_STOCK]: (state, action) => Object.assign({}, state, {
		mode: "stock",
		current_stock: action.payload,
		selected_supplier_list: state.supplier_list.filter(() => (Math.random() > 0.95))
	}),
	[Constant.INVOICING_CHANGE_CURRENT_SUPPLIER]: (state, action) => Object.assign({}, state, {
		current_supplier: action.payload,
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
	mode: "dashboard"
});