/* @flow */
"use strict";

import React, { Component, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux/native";
import ActionCreators, { Database } from "../actions";
import Login from "./login";
import Message from "./message";
import { Color } from "../definitions";

var style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Color.dark,
	},
	login: {
		width: 400,
	}
});

// TODO: Need add i18n support react-native-i18n-complete

class App extends Component{
	constructor(props){
		super(props);

		// Allocate the local database
		props.dispatch(Database.initDatabase("ldsm"));
	}
	render(){
		return (
			<View style={style.container}>
				<Login style={style.login}/>
				<Message />
			</View>
		);
	}
}

export default connect(
  state => ({})
)(App)