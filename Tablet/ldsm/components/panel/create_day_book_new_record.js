/* @flow */
"use strict";

import validator from "validator";
import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS, TouchableWithoutFeedback, Image, Picker} from "react-native";
import DropDown, { Select, Option, OptionList, updatePosition } from "react-native-dropdown";

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
	},
	selectorContainer:{
		flex: 1,
		flexDirection: "row"
	},
	select:{
		marginRight: 10,
		borderRadius: 10
	}
});

export default class CreateDayBookNewRecordPanel extends Component{
	state = {
		title: "",
		type: "",
		amount: "",
		show_new_type: false
	};
	show = () => {
		this.confirm.show();
	};
	hide = () => {
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
				amount: parseInt(this.state.amount)
			});
			return true;
		}
		else{
			alert(I18n.t("day_book_add_new_record_amount_must_number"));
			return false;
		}
	};
	handleSelectType = (value) => {
		if(value == I18n.t("day_book_add_new_record_new_type")){
			this.setState({
				show_new_type: true,
				type: ""
			});
		}
		else{
			this.setState({
				type: value
			});
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
						<Select width={300}
							style={style.select}
							ref={(ref) => this.selectRef = ref}
							optionListRef={this.getOptionList}
							defaultValue={I18n.t("day_book_add_new_record_select_type")}
							onSelect={this.handleSelectType}>
							{
								(this.props.dayBook.type_list || []).map((type) => {
									return (
										<Option key={"CreateDayBookNewRecordPanel" + type}>{type}</Option>
									);
								})
							}
							<Option>{I18n.t("day_book_add_new_record_new_type")}</Option>
						</Select>
						<OptionList ref={(ref) => {
							this.optionListRef = ref;
							setTimeout(() => {
								if(this.selectRef && this.optionListRef){
									updatePosition(this.selectRef);
									updatePosition(this.optionListRef);
								}
							}, 500);
						}}/>
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