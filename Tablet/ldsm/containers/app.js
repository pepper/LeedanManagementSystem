/* @flow */
"use strict";

import _ from "underscore";
import validator from "validator";
import React, { Component, PropTypes, StyleSheet, View } from "react-native";
import { connect } from "react-redux/native";
import { Database, Module, Panel } from "../actions";
import { Color } from "../definitions";

// Container
import Login from "./login";
import Message from "./message";
import PanelContainer from "./panel";

//Component
import MainMenu from "../components/main_menu";

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
		backgroundColor: Color.red
	}
});

class App extends Component{
	static propTypes = {
		company: PropTypes.object,
		dispatch: PropTypes.func,
		module: PropTypes.module
	};
	constructor(props){
		super(props);

		this.state = {
			showLogoutPanel: false
		};

		// Allocate the local database
		props.dispatch(Database.initDatabase("ldsm"));
		props.dispatch(Module.changeModule("time_punch"));
	}
	handlerChangeModule = (key) => {
		if(validator.toString(key) == "logout"){
			this.props.dispatch(Panel.showPanel("logout"));
		}
		else if(validator.toString(key) != ""){
			this.props.dispatch(Module.changeModule(key));
		}
	};
	render(){
		let company = this.props.company || {};
		let module = this.props.module || {};
		let currentModule = _(module.module_list).find((item) => item.key == module.current_mudule) || {};
		let ModuleContainer = currentModule.container || View;
		return (
			<View style={style.container}>
				{
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
				}
				<PanelContainer />
				<Message />
			</View>
		);
	}
}

export default connect((state) => {
	return {
		company: state.company,
		module: state.module
	};
})(App);