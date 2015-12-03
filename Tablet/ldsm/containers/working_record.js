/* @flow */
"use strict";

import React, { Component, View, Text } from "react-native";

exports.Menu = class extends Component {
	render(){
		return (
			<View>
				<Text style={[this.props.selected && {color:"#FF0000"}]}>{"Wr"}</Text>
			</View>
		);
	}
}

exports.Container = class extends Component {
	render(){
		return (
			<View>
				<Text>{"Working container"}</Text>
			</View>
		);
	}
}