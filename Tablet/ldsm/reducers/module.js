import _ from "underscore";
import { handleActions } from "redux-actions";
import { ListView, View } from "react-native";

// Module import
import TimePunchContainer from "../containers/time_punch";
import TimePunchMenu from "../components/main_menu/time_punch";
import WorkingRecordContainer from "../containers/working_record";
import WorkingRecordMenu from "../components/main_menu/working_record";
import Logout from "../components/main_menu/logout";

var Constant = require("../constants/index");

let moduleList = [{
	key: "time_punch",
	menu: TimePunchMenu,
	container: TimePunchContainer
}, {
	key: "working_record",
	menu: WorkingRecordMenu,
	container: WorkingRecordContainer
}];

exports.module = handleActions({
	[Constant.CHANGE_MODULE]: (state, action) => Object.assign({}, state, {
		current_mudule: action.payload,
		module_list_datasource: state.module_list_datasource.cloneWithRows((() => {
			var menuItemList = _(moduleList).filter(
				(module) => (state.active_module_list.indexOf(module.key) >= 0)
			).map((module) => {
				return {
					key: module.key,
					menu: module.menu,
					selected: action.payload == module.key
				};
			}) || [];
			while(menuItemList.length < 9){
				menuItemList.push({
					key: "",
					menu: View,
					selected: false
				});
			}
			menuItemList.push({
				key: "logout",
				menu: Logout,
				selected: true
			});
			console.log(menuItemList);
			return menuItemList;
		})())
	})
	// TODO: add notification info support, module can hold some info display on menu
}, {
	current_mudule: "",
	module_list: moduleList,
	active_module_list: ["time_punch", "working_record"],
	module_list_datasource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
});