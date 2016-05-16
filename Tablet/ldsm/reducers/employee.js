import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.employee = handleActions({
	[Constant.EMPLOYEE_LIST_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		employee_list: action.payload
	}),
	[Constant.EMPLOYEE_LOGIN]: (state, action) => Object.assign({}, state, {
		current_employee_id: action.payload._id,
		current_employee: action.payload,
		login: true
	}),
	[Constant.EMPLOYEE_LOGOUT]: (state) => Object.assign({}, state, {
		current_employee_id: "",
		current_employee: null,
		login: false
	})
}, {
	employee_list: [],
	current_employee_id: "",
	current_employee: null,
	login: false,
	need_reload: false
});