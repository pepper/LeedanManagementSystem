import _ from "underscore";
import { handleActions } from "redux-actions";

var Constant = require("../constants/index");

exports.message = handleActions({
	[Constant.ALREADY_SHOW_MESSAGE]: (state) => Object.assign({}, state, {
		current_index: (state.current_index + 1 < state.message_list.length)?state.current_index + 1:state.message_list.length
	}),
	[Constant.ERROR_MESSAGE]: (state, action) => {
		console.log(action.payload);
		return Object.assign({}, state, {
			message_list: _.chain(state.message_list).push({
				index: state.message_list.length,
				type: "error",
				message: action.payload + " [" + (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString() + "]",
				date: new Date()
			}).value()
		});
	},
	[Constant.INFO_MESSAGE]: (state, action) => Object.assign({}, state, {
		message_list: _.chain(state.message_list).push({
			index: state.message_list.length,
			type: "info",
			message: action.payload + " [" + (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString() + "]",
			date: new Date()
		}).value()
	})
}, {
	message_list: [],
	current_index: 0
});