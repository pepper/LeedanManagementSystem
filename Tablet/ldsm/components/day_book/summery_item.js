/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 0,
		height: Size.row_height,
		width: Size.row_height * 3,
		flexDirection: "row",
		padding: 15,
	},
	headBar:{
		width: 15
	},
	content:{
		flexDirection: "column",
		paddingLeft: 15
	},
	title:{
		fontSize: 16,
		marginBottom: 6,
		fontWeight: "bold"
	},
	description:{
		fontSize: 12,
	}
});

export default class RecordTitle extends Component{
	state = {
	}
	render(){
		return (
			<View style={[style.container, this.props.style]}>
				<View style={[style.headBar, {backgroundColor: this.props.color}]} />
				<View style={style.content}>
					<Text style={[style.title, {color: this.props.color}]}>{this.props.title}</Text>
					<Text style={[style.description, {color: this.props.color}]}>{this.props.description}</Text>
				</View>
			</View>
		);
	}
}