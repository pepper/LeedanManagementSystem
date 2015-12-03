/* @flow */
"use strict";

import React, { Component, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux/native";
import ActionCreators, { Database, Module } from "../actions";
import Login from "./login";
import Message from "./message";
import { Color } from "../definitions";
import MainMenu from "../components/main_menu";

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
		backgroundColor: Color.yellow,
	},
	login: {
		width: 400,
	},
	app: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	mainMenu: {
		flex: 0,
		width: 90,
	}
});

class App extends Component{
	constructor(props){
		super(props);

		// Allocate the local database
		props.dispatch(Database.initDatabase("ldsm"));
	}
	changeModuleHandler(key){
		this.props.dispatch(Module.changeModule(key));
	}
	render(){
		let company = this.props.company || {};
		let module = this.props.module || {};
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
						</View>
					)
					:
					(
						<View style={style.loginContainer}>
							<Login style={style.login}/>
						</View>
					)
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