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
		padding: 10
	},
	fullWidthTextInput:{
		flex: 1,
		height: 40,
		borderWidth: 0.5,
		borderColor: Color.dark,
		padding: 5,
		paddingLeft: 15,
		marginBottom: 10
	}
});

export default class CreateDayBookNewRecordPanel extends Component{
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
		if(validator.isInt(this.state.amount)){
			this.props.onConfirm({
				title: this.state.title,
				type: this.state.type,
				amount: parseInt(this.state.amount)
			});
		}
		else{
			alert(I18n.t("day_book_add_new_record_amount_must_number"));
		}
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("day_book_add_new_record")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<TextInput style={style.fullWidthTextInput}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("day_book_add_new_record_input_title")}
						onChangeText={(text) => this.setState({title: text}) }
					/>
					<Picker
						selectedValue={this.state.type}
						onValueChange={(text) => this.setState({type: text})}>
						{
							(this.props.dayBook.type_list || []).map((type) => {
								return (
									<Picker.Item key={"CreateDayBookNewRecordPanel" + type} label={type} value={type} />
								);
							})
						}
					</Picker>
					<TextInput style={style.fullWidthTextInput}
						type={"number"}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("day_book_add_new_record_input_amount")}
						onChangeText={(text) => this.setState({amount: text}) }
					/>
				</View>
			</ConfirmPanel>
		);
	}
}