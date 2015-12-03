/* @flow */
"use strict";

import React, { Component, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../../definitions";

var style = StyleSheet.create({
	textInput: {
		height: 40,
		backgroundColor: Color.white,
		justifyContent: "center",
		marginBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
	}
});

export default class Button{
	render(){
		var renderProp = Object.assign({}, this.props);
		delete renderProp.style;

		return (
			<TouchableOpacity style={[style.textInput, this.props.style || {} ]} {...renderProp}>
				{this.props.children}
			</TouchableOpacity>
		);
	}
}