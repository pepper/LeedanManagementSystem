"use strict";

import React, { Component, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux/native";
import ActionCreators, { Database } from "../actions";

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	hello_text: {
		fontSize: 50,
		color: "#FF0000",
	},
});

class App extends Component{
	constructor(props){
		super(props);

		// Allocate the local database
		props.dispatch(Database.initDatabase("ldsm"));
	}
	render(){
		return (
			<View style={styles.container}>
				<Text style={styles.hello_text}>{"Hello World!!!"}</Text>
			</View>
		);
	}
}

export default connect(
  state => ({})
)(App)