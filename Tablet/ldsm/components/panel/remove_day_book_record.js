/* @flow */
"use strict";

import validator from "validator";
import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS, TouchableWithoutFeedback, Image, Picker} from "react-native";
import Camera from "react-native-camera";
import Icon from "react-native-vector-icons/FontAwesome";

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

export default class RemoveDayBooRecordPanel extends Component{
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
		this.props.onConfirm(this.props.record.index);
		return true;
	};
	render(){
		const recordDatetime = new Date(this.props.record.record_datetime);
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("day_book_confirm_remove_record")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<Text style={style.text}>{"類別：" + this.props.record.type}</Text>
					<Text style={style.text}>{"標題：" + this.props.record.title}</Text>
					<Text style={style.text}>{"時間：" + recordDatetime.getFullYear() + "." + (recordDatetime.getMonth() + 1) + "." + recordDatetime.getDate()}</Text>
				</View>
			</ConfirmPanel>
		);
	}
}