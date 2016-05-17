/* @flow */
"use strict";

import _ from "underscore";
import validator from "validator";
import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text} from "react-native";
import { connect } from "react-redux";
import { Company, Database, Module, Panel } from "../actions";
import { Color, I18n } from "../definitions";

// Container
import Login from "./login";
import Message from "./message";
import PanelContainer from "./panel";

//Component
import MainMenu from "../components/main_menu";
import LogoutPanel from "../components/panel/logout";

var style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "stretch",
		backgroundColor: Color.dark
	},
	loginContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	login: {
		width: 400
	},
	app: {
		flex: 1,
		flexDirection: "row"
	},
	mainMenu: {
		flex: 0,
		width: 90
	},
	moduleContainer: {
		flex: 1,
		backgroundColor: Color.dark
	},
	systemPreparing: {
		fontSize: 16,
		color: Color.white
	}
});

class App extends Component{
	static propTypes = {
		system: PropTypes.object,
		company: PropTypes.object,
		dispatch: PropTypes.func,
		module: PropTypes.any
	};
	constructor(props){
		super(props);

		// Allocate the local database
		props.dispatch(Database.initDatabase("ldsm"));
		props.dispatch(Module.changeModule("invoicing"));
	}
	state = {
		showLogoutPanel: false
	};
	componentWillReceiveProps(nextProps){
		if(nextProps.company.need_reload){
			nextProps.dispatch(Company.load());
		}
	}
	handlerChangeModule = (key) => {
		if(validator.toString(key) == "logout"){
			this.logoutPanel.show();
		}
		else if(validator.toString(key) != ""){
			this.props.dispatch(Module.changeModule(key));
		}
	};
	handleLogout = () => {
		this.props.dispatch(Company.logout());
	};
	render(){
		let company = this.props.company || {};
		let module = this.props.module || {};
		let currentModule = _(module.module_list).find((item) => item.key == module.current_mudule) || {};
		let ModuleContainer = currentModule.container || View;
		return (
			<View style={style.container}>
				{
					(!!this.props.system.system_ready)?
					(
						(company.login)?
						(
							<View style={style.app}>
								<MainMenu
									style={style.mainMenu}
									moduleListDatasource={module.module_list_datasource}
									onChangeModule={this.handlerChangeModule}
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
					)
					:
					(
						<View style={style.loginContainer}>
							<Text style={style.systemPreparing}>{I18n.t("system_preparing")}</Text>
						</View>
					)
				}
				<LogoutPanel
					ref={(ref) => this.logoutPanel = ref}
					onLogout={this.handleLogout}
				/>

				<Message />
			</View>
		);
	}
}

export default connect((state) => {
	return {
		system: state.system,
		company: state.company,
		module: state.module
	};
})(App);