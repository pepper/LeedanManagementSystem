/* @flow */
"use strict";

import React, { Component, PropTypes, StyleSheet, TextInput } from "react-native";

import { Color } from "../../definitions";
var style = StyleSheet.create({
	textInput: {
		height: 40,
		backgroundColor: Color.white,
		marginBottom: 10,
		paddingLeft: 10,
		borderRadius: 10
	}
});

export default class CustomTextInput extends Component{
	static propTypes = {
		children: PropTypes.node,
		style: PropTypes.object
	};
	static defaultProps = {
		style: {}
	};
	render(){
		return (
			<TextInput
				{...this.props}
				style={[style.textInput, this.props.style]}
			/>
		);
	}
}