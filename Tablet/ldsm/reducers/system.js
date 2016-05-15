import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.system = handleActions({
	[Constant.INIT_DATABASE_FINISH]: (state) => Object.assign({}, state, {
		system_ready: true,
		database_ready: true
	}),
	[Constant.INIT_DATABASE_FAIL]: (state) => Object.assign({}, state, {
		system_ready: false,
		database_ready: false
	})
}, {
	system_ready: false,
	database_ready: false
});