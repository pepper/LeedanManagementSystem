/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import { Color, Size, I18n } from "../../definitions";

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
			title: I18n.t("index"),
			width: 1
		}, {
			title: I18n.t("type"),
			width: 2
		}, {
			title: I18n.t("content"),
			width: 3
		}, {
			title: I18n.t("time"),
			width: 1
		}, {
			title: I18n.t("amount"),
			width: 1
		}]
	}
	render(){
		return (
			<View style={[style.container, this.props.style]}>
				{
					this.state.column_list.map((column, index) => {
						return (
							<TouchableWithoutFeedback key={column.title} onPress={() => {
								if(this.props.onPress){
									this.props.onPress(column.title);
								}
							}}>
								<View style={[style.column, {
									flex: column.width,
									backgroundColor: (index % 2 == 0)?Color.light_blue:Color.light_blue_overlay
								}]}>
									<Text style={style.columnText}>{column.title}</Text>
								</View>
							</TouchableWithoutFeedback>
						);
					})
				}
			</View>
		);
	}
}