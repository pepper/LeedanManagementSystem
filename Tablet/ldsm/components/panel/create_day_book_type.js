/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS, TouchableWithoutFeedback, Image} from "react-native";
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

export default class CreateDayBookTypePanel extends Component{
	state = {
		type: ""
	};
	show = () => {
		this.state = {
			type: ""
		};
		this.confirm.show();
	};
	hide = () => {
		this.state = {
			type: ""
		};
		this.confirm.hide();
	};
	handleConfirm = () => {
		this.props.onConfirm({
			type: this.state.type
		});
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("day_book_add_new_type")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<TextInput style={style.fullWidthTextInput}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("day_book_add_new_type_input_type")}
						onChangeText={(text) => this.setState({type: text}) }
					/>
				</View>
			</ConfirmPanel>
		);
	}
}