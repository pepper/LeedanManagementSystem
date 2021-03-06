import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.company = handleActions({
	[Constant.LOGIN_FINISH]: (state, action) => Object.assign({}, state, {
		company_id: action.payload,
		login: true
	}),
	[Constant.LOGOUT_FINISH]: () => Object.assign({}, {
		company_id: "",
		login: false,
		need_reload: false
	}),
	[Constant.COMPANY_NEED_RELOAD]: (state) => Object.assign({}, state, {
		need_reload: true
	}),
	[Constant.COMPANY_LOAD_FINISH]: (state, action) => Object.assign({}, state, {
		company: action.payload,
		need_reload: false
	})
}, {
	company_id: "",
	login: false,
	need_reload: false
});