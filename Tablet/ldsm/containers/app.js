/* @flow */
"use strict";

import _ from "underscore";
import validator from "validator";
import React, { Component, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux/native";
import ActionCreators, { Database, Module, Company } from "../actions";
import Login from "./login";
import Message from "./message";
import { Color } from "../definitions";
import MainMenu from "../components/main_menu";
import ConfirmPanel from "../components/basic/confirm_panel";

// Module import
import TimePunch from "./time_punch";
import WorkingRecord from "./working_record";

let moduleList = [{
	key: "time_punch",
	menu: TimePunch.Menu,
	container: TimePunch.Container,
}, {
	key: "working_record",
	menu: WorkingRecord.Menu,
	container: WorkingRecord.Container,
}];

var style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "stretch",
		backgroundColor: Color.dark,
	},
	loginContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	login: {
		width: 400,
	},
	app: {
		flex: 1,
		flexDirection: "row",
	},
	mainMenu: {
		flex: 0,
		width: 90,
	},
	moduleContainer: {
		flex: 1,
		backgroundColor: Color.red,
	},
	panelContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		width: 1024,
		height: 768,
		flexDirection: "column",
		backgroundColor: Color.transparent_black,
	},
});

class App extends Component{
	constructor(props){
		super(props);

		this.state = {
			showLogoutPanel: false,
		}

		// Allocate the local database
		props.dispatch(Database.initDatabase("ldsm"));
	}
	changeModuleHandler(key){
		if(validator.toString(key) == "logout"){
			console.log("Must remove this");
			this.props.dispatch(Company.logout());
			// this.setState({
			// 	showLogoutPanel: true,
			// });
		}
		else if(validator.toString(key) != ""){
			this.props.dispatch(Module.changeModule(key));
		}
	}
	render(){
		let company = this.props.company || {};
		let module = this.props.module || {};
		let currentModule = _(moduleList).find((item) => item.key == module.current_mudule) || {};
		let ModuleContainer = currentModule.container || View;
		return (
			<View style={style.container}>
				{
					//company.avtive_module
					(company.login)?
					(
						<View style={style.app}>
							<MainMenu
								style={style.mainMenu}
								moduleList={moduleList}
								activeModule={["time_punch", "working_record"]}
								currentModule={module.current_mudule}
								changeModule={this.changeModuleHandler.bind(this)}
							/>
							<View style={style.moduleContainer}>
								<ModuleContainer />
							</View>
						</View>
					)
					:
					(
						<View style={style.loginContainer}>
							<Login style={style.login}/>
						</View>
					)
				}
				{
					(this.state.showLogoutPanel)?
					(
						<View style={style.panelContainer}>
							<ConfirmPanel
								visible={this.state.showLogoutPanel}
								message={"確定要登出系統嗎？"}
								cancelButtonText={"取消"}
								confirmButtonText={"登出"}
								onCancel={() => this.setState({showLogoutPanel: false})}
								onConfirm={() =>{
									this.setState({showLogoutPanel: false});
									this.props.dispatch(Company.logout());
								}}
							/>
						</View>
					)
					:
					(null)
				}
				<Message />
			</View>
		);
	}
}

export default connect((state) => {
	return {
		company: state.company,
		module: state.module,
	};
})(App);