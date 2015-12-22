/* @flow */
"use strict";

import React, { Component, StyleSheet, TextInput } from "react-native";

import { Color } from "../../definitions";
var style = StyleSheet.create({
	textInput: {
		height: 40,
		backgroundColor: Color.white,
		marginBottom: 10,
		paddingLeft: 10,
		borderRadius: 10,
	}
});

export default class CustomTextInput extends Component{
	render(){
		var renderProp = Object.assign({}, this.props);
		delete renderProp.style;

		return (
			<TextInput style={[style.textInput, this.props.style || {} ]} {...renderProp} />
		);
	}
}