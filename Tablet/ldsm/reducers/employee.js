import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.employee = handleActions({
	[Constant.EMPLOYEE_LOGIN]: (state, action) => Object.assign({}, state, {
		employee_id: action.payload._id,
		employee: action.payload,
		login: true
	}),
	// [Constant.LOGOUT_FINISH]: () => Object.assign({}, {
	// 	company_id: "",
	// 	login: false,
	// 	need_reload: false
	// }),
	// [Constant.COMPANY_NEED_RELOAD]: (state) => Object.assign({}, state, {
	// 	need_reload: true
	// }),
	// [Constant.COMPANY_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
	// 	company: action.payload,
	// 	need_reload: false
	// })
}, {
	employee_id: "",
	login: false,
	need_reload: false
});