/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { Color } from "../../definitions";

var style = StyleSheet.create({
	textInput: {
		height: 40,
		backgroundColor: Color.white,
		justifyContent: "center",
		marginBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10
	}
});

export default class Button extends Component{
	static propTypes = {
		children: PropTypes.node,
		style: View.propTypes.style
	};
	static defaultProps = {
		style: {}
	};
	render(){
		return (
			<TouchableOpacity
				{...this.props}
				style={[style.textInput, this.props.style]}
			>
				{this.props.children}
			</TouchableOpacity>
		);
	}
}