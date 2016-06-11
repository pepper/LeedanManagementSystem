/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
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
		fontSize: 14,
		fontWeight: "bold",
		color: Color.white
	}
});

export default class RecordDetail extends Component{
	toNumberString = (input) => {
		input += "";
		var x = input.split(".");
		var x1 = x[0];
		var x2 = x.length > 1 ? "." + x[1] : "";
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, "$1" + "," + "$2");
		}
		return x1 + x2;
	};
	render(){
		const recordDatetime = new Date(this.props.record.record_datetime);
		return (
			<TouchableWithoutFeedback onLongPress={this.props.onLongPress}>
				<View style={[style.container, this.props.style]}>
					<View style={[style.column, { flex: 1 }]}>
						<Text style={style.columnText}>{this.props.record.index}</Text>
					</View>
					<View style={[style.column, { flex: 1 }]}>
						<Text style={style.columnText}>{this.props.record.type}</Text>
					</View>
					<View style={[style.column, { flex: 4 }]}>
						<Text style={style.columnText}>{this.props.record.title}</Text>
					</View>
					<View style={[style.column, { flex: 1 }]}>
						<Text style={style.columnText}>{recordDatetime.getFullYear() + "." + (recordDatetime.getMonth() + 1) + "." + recordDatetime.getDate()}</Text>
					</View>
					<View style={[style.column, { flex: 1 }]}>
						<Text style={style.columnText}>{this.toNumberString(this.props.record.amount)}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}