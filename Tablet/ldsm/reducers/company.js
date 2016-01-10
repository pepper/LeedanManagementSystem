import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.company = handleActions({
	[Constant.LOGIN_FINISH]: (state, action) => Object.assign({}, state, {
		company_id: action.payload,
		login: true
	}),
	[Constant.LOGOUT_FINISH]: () => Object.assign({}, {
		company_id: "",
		login: false
	})
}, {
	company_id: "",
	login: false
});