/* @flow */
"use strict";

import React, { Component, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux/native";

import IconMenuItem from "../components/main_menu/icon_menu_item";

exports.Menu = class extends Component {
	render(){
		return (
			<IconMenuItem text={"Time Punch"} icon={"bell-o"} selected={this.props.selected}/>
		);
	}
}

let style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	}
});

class Container extends Component {
	render(){
		return (
			<View style={style.container}>
				
			</View>
		);
	}
}

exports.Container = connect((state) => {
	return {
		company: state.company,
	};
})(Container);