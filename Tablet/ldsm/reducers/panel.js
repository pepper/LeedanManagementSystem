import _ from "underscore";
import clone from "clone";
import { handleActions } from "redux-actions";
import LogoutPanel from "../components/panel/logout";

var Constant = require("../constants/index");

let panelList = [{
	key: "logout",
	panel: LogoutPanel
}];

exports.panel = handleActions({
	[Constant.SHOW_PANEL]: (state, action) => {
		var newPanel = Object.assign({}, _(panelList).find((panel) => (panel.key == action.payload.key)));
		newPanel.props = Object.assign({}, action.payload.props);
		let newPanelStack = clone(state.panel_stack);
		newPanelStack.unshift(newPanel);
		return Object.assign({}, state, {
			panel_stack: newPanelStack
		});
	},
	[Constant.HIDE_PANEL]: (state) => {
		let newPanelStack = clone(state.panel_stack);
		newPanelStack.shift();
		return Object.assign({}, state, {
			panel_stack: newPanelStack
		});
	}
}, {
	panel_stack: []
});