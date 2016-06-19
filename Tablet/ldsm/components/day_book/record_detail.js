/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import { Color, Size } from "../../definitions";

let style = StyleSheet.create({
	wrap:{
		flexDirection: "column"
	},
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
	},
	alignLeftColumn:{
		alignItems: "flex-start",
		paddingLeft: 10,
	},
	alignRightColumn:{
		alignItems: "flex-end",
		paddingRight: 10,
	}
});

export default class RecordDetail extends Component{
	state = {
		show_note: false
	};
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
	handleToggleNote = () => {
		this.setState({
			show_note: !this.state.show_note
		});
	};
	render(){
		const recordDatetime = new Date(this.props.record.record_datetime);
		return (
			<TouchableWithoutFeedback onLongPress={this.props.onLongPress} onPress={this.handleToggleNote}>
				<View style={style.wrap}>
					<View style={[style.container, this.props.style]}>
						<View style={[style.column, { flex: 1 }, style.alignLeftColumn]}>
							<Text style={style.columnText}>{this.props.record.index}</Text>
						</View>
						<View style={[style.column, { flex: 2 }, style.alignLeftColumn]}>
							<Text style={style.columnText}>{this.props.record.type}</Text>
						</View>
						<View style={[style.column, { flex: 3 }, style.alignLeftColumn]}>
							<Text style={style.columnText}>{this.props.record.title}</Text>
						</View>
						<View style={[style.column, { flex: 1 }, style.alignLeftColumn]}>
							<Text style={style.columnText}>{recordDatetime.getFullYear() + "." + (recordDatetime.getMonth() + 1) + "." + recordDatetime.getDate()}</Text>
						</View>
						<View style={[style.column, { flex: 1 }, style.alignRightColumn]}>
							<Text style={style.columnText}>{this.toNumberString(this.props.record.amount)}</Text>
						</View>
					</View>
					{
						(this.state.show_note)?
						(
							<View style={[style.container, this.props.style]}>
								<View style={[style.column, style.alignLeftColumn]}>
									<Text style={style.columnText}>{(!this.props.record.note || this.props.record.note == "")?"沒有備註資訊":this.props.record.note}</Text>
								</View>
							</View>
						)
						:
						null
					}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}