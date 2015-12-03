import _ from "underscore";
import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.module = handleActions({
	[Constant.CHANGE_MODULE]: (state, action) => Object.assign({}, state, {
		current_mudule: action.payload,
	}),
	// TODO: add notification info support, module can hold some info display on menu
}, {
	current_mudule: "time_punch",
});