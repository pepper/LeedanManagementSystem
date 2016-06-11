/* @flow */
"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, DatePickerIOS } from "react-native";

import ConfirmPanel from "./confirm";
import Button from "../basic/button";
import { Color, I18n } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "column",
		alignItems: "stretch",
		padding: 30
	},
	fullWidthContiner:{
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	text:{
		flex: 1,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold"
	},
	datePicker:{
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	clearFilter:{
		backgroundColor: Color.red,
		alignItems: "center",
		justifyContent: "center"
	},
	buttonText:{
		fontSize: 16,
		color: Color.white
	}
});

export default class DateDurationPickerPanel extends Component{
	state = {
		start_date: new Date(),
		end_date: new Date()
	};
	show = () => {
		this.confirm.show();
	};
	hide = () => {
		this.confirm.hide();
	};
	handleConfirm = () => {
		this.props.onConfirm(this.state.start_date, this.state.end_date);
		return true;
	};
	handleClearFilter = () => {
		this.props.onConfirm();
		this.confirm.hide();
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("day_book_confirm_remove_day_book")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<View style={style.fullWidthContiner}>
						<Text style={style.text}>{I18n.t("start_date")}</Text>
						<Text style={style.text}>{I18n.t("end_date")}</Text>
					</View>
					<View style={style.fullWidthContiner}>
						<DatePickerIOS mode={"date"}
							style={style.datePicker}
							date={new Date(this.state.start_date)}
							maximumDate={new Date(this.state.end_date)}
							onDateChange={(date) => {
								this.setState({start_date: date});
							}}
						/>
						<DatePickerIOS mode={"date"}
							style={style.datePicker}
							date={new Date(this.state.end_date)}
							minimumDate={new Date(this.state.start_date)}
							onDateChange={(date) => {
								this.setState({end_date: date});
							}}
						/>
					</View>
					<Button
						style={style.clearFilter}
						onPress={this.handleClearFilter}
					>
						<Text style={style.buttonText}>{I18n.t("clear_filter_rule")}</Text>
					</Button>
				</View>
			</ConfirmPanel>
		);
	}
}