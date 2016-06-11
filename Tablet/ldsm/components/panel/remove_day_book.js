/* @flow */
"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import ConfirmPanel from "./confirm";
import TextInput from "../basic/text_input";
import { Color, I18n } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "column",
		padding: 30
	},
	text:{
		fontSize: 20,
		marginBottom: 5
	}
});

export default class RemoveDayBookPanel extends Component{
	state = {
		title: "",
		type: "",
		amount: ""
	};
	show = () => {
		this.confirm.show();
	};
	hide = () => {
		this.confirm.hide();
	};
	handleConfirm = () => {
		this.props.onConfirm(this.props.dayBook.key);
		return true;
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("day_book_confirm_remove_day_book")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<Text style={style.text}>{"標題：" + this.props.dayBook.title}</Text>
					<Text style={style.text}>{"類型：" + this.props.dayBook.account_way}</Text>
				</View>
			</ConfirmPanel>
		);
	}
}