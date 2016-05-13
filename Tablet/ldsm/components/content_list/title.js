/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		alignSelf: "stretch",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	column:{
		paddingTop: Size.title_padding_top,
		paddingLeft: 10,
	},
	text:{
		color: Color.white,
		fontSize: Size.title_font_size,
	}
});

export default class Title extends Component {
	render(){
		return (
			<View style={style.container}>
				{
					this.props.columnList.map((column, index) => {
						return (
							<View key={"Title" + index} style={[style.column, {flex: column.flex}]}>
								<Text style={style.text}>{column.title}</Text>
							</View>
						)
					})
				}
			</View>
		)
	}
}