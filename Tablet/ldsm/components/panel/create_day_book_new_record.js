/* @flow */
"use strict";

import validator from "validator";
import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS, DatePickerIOS, TouchableWithoutFeedback, Image, Picker, ActionSheetIOS} from "react-native";

import ConfirmPanel from "./confirm";
import TextInput from "../basic/text_input";
import Button from "../basic/button.js";
import { Color, I18n } from "../../definitions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "column",
		padding: 10
	},
	fullWidthTextInput:{
		flex: 0,
		height: 40,
		borderWidth: 0.5,
		borderColor: Color.dark,
		padding: 5,
		paddingLeft: 15,
	},
	selectorContainer:{
		flex: 1,
		flexDirection: "row"
	},
	select:{
		marginRight: 10,
		borderRadius: 10
	},
	selectTypeButton: {
		flex: 1,
	},
	datePicker:{
		flex: 1,
	},
});

export default class CreateDayBookNewRecordPanel extends Component{
	state = {
		title: "",
		type: "",
		amount: "",
		show_new_type: false,
		record_datetime: new Date()
	};
	show = () => {
		this.state = {
			title: "",
			type: "",
			amount: "",
			show_new_type: false,
			record_datetime: new Date()
		};
		this.confirm.show();
	};
	hide = () => {
		this.state = {
			title: "",
			type: "",
			amount: "",
			show_new_type: false,
			record_datetime: new Date()
		};
		this.confirm.hide();
	};
	getOptionList = () => {
		return this.optionListRef;
	};
	handleConfirm = () => {
		if(validator.isInt(this.state.amount)){
			this.props.onConfirm({
				title: this.state.title,
				type: this.state.type,
				amount: parseInt(this.state.amount),
				note: this.state.note,
				record_datetime: new Date(this.state.record_datetime.getFullYear(), this.state.record_datetime.getMonth(), this.state.record_datetime.getDate(), 14, 0, 0),
			});
			return true;
		}
		else{
			alert(I18n.t("day_book_add_new_record_amount_must_number"));
			return false;
		}
	};
	handleSelectType = (value) => {
		let options = (this.props.dayBook.type_list || []).concat([I18n.t("day_book_add_new_record_new_type")]);
		ActionSheetIOS.showActionSheetWithOptions({
			options: options,
		},
		(buttonIndex) => {
			if(options[buttonIndex] == I18n.t("day_book_add_new_record_new_type")){
				this.setState({
					show_new_type: true,
					type: ""
				});
			}
			else{
				this.setState({
					show_new_type: false,
					type: options[buttonIndex]
				});
			}
		});
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
					<TextInput style={style.fullWidthTextInput}
						type={"number"}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("day_book_add_new_record_input_amount")}
						onChangeText={(text) => this.setState({amount: text}) }
					/>
					<TextInput style={style.fullWidthTextInput}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("day_book_add_new_record_input_note")}
						onChangeText={(text) => this.setState({note: text}) }
					/>
					<View style={style.selectorContainer}>
						<DatePickerIOS mode={"date"}
							style={style.datePicker}
							date={new Date(this.state.record_datetime)}
							onDateChange={(date) => {
								this.setState({record_datetime: date});
							}}
						/>
						<Button
							style={style.selectTypeButton}
							onPress={this.handleSelectType}
						>
							<Text>{(this.state.type !== "")?this.state.type:I18n.t("day_book_add_new_record_select_type")}</Text>
						</Button>
						{
							(this.state.show_new_type)?
							(
								<TextInput style={style.fullWidthTextInput}
									autoCapitalize={"none"}
									autoCorrect={false}
									placeholder={I18n.t("day_book_add_new_record_input_new_type")}
									onChangeText={(text) => this.setState({type: text}) }
								/>
							)
							:
							null
						}
					</View>
				</View>
			</ConfirmPanel>
		);
	}
}