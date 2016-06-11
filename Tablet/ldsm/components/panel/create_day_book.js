/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS, TouchableWithoutFeedback, Image} from "react-native";
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

export default class CreateDayBookPanel extends Component{
	state = {
		title: ""
	};
	show = () => {
		this.confirm.show();
	};
	hide = () => {
		this.confirm.hide();
	};
	handleConfirm = () => {
		this.props.onConfirm({
			title: this.state.title
		});
		return true;
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("company_create_daybook")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<TextInput style={style.fullWidthTextInput}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("company_create_daybook_panel_input_title")}
						onChangeText={(text) => this.setState({title: text}) }
					/>
				</View>
			</ConfirmPanel>
		);
	}
}