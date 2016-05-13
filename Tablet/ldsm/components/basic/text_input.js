/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, TextInput, View} from "react-native";

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
		style: View.propTypes.style
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