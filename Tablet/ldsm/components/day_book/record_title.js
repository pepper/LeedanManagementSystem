/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text} from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 0,
		height: Size.row_height,
		flexDirection: "row"
	},
	column:{
		height: Size.row_height,
		alignItems: "center",
		justifyContent: "center"
	},
	columnText:{
		fontSize: 18,
		fontWeight: "bold",
		color: Color.white
	}
});

export default class RecordTitle extends Component{
	state = {
		column_list: [{
			title: "序號",
			width: 1
		}, {
			title: "類別",
			width: 1
		}, {
			title: "標題",
			width: 4
		}, {
			title: "時間",
			width: 1
		}, {
			title: "金額",
			width: 1
		}]
	}
	render(){
		return (
			<View style={[style.container, this.props.style]}>
				{
					this.state.column_list.map((column, index) => {
						return (
							<View key={column.title} style={[style.column, {
								flex: column.width,
								backgroundColor: (index % 2 == 0)?Color.light_blue:Color.light_blue_overlay
							}]}>
								<Text style={style.columnText}>{column.title}</Text>
							</View>
						);
					})
				}
			</View>
		);
	}
}