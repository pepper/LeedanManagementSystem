/* @flow */
"use strict";

import React, { Component, View, Text } from "react-native";

exports.Menu = class extends Component {
	render(){
		return (
			<View>
				<Text style={[this.props.selected && {color:"#FF0000"}]}>{"Pu"}</Text>
			</View>
		);
	}
}

exports.Container = class extends Component {
	render(){
		return (
			<View>
				<Text>{"Punch container"}</Text>
			</View>
		);
	}
}