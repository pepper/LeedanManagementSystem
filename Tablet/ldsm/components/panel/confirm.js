/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import Panel from "./basic";
import Button from "../basic/button";
import { Color, I18n } from "../../definitions";

let style = StyleSheet.create({
	headerContainer:{
		flex: 0,
		height: 55,
		borderBottomWidth: 0.5,
		borderBottomColor: Color.dark,
		padding: 15,
		backgroundColor: Color.transparent,
	},
	contentContainer:{
		flex: 1,
		backgroundColor: Color.transparent
	},
	footerContainer:{
		flex: 0,
		alignItems: "center",
		justifyContent: "flex-end",
		height: 70,
		borderTopWidth: 0.5,
		borderTopColor: Color.dark,
		flexDirection: "row",
		backgroundColor: Color.transparent,
		padding: 20,
	},
	titleText: {
		fontSize: 25,
		fontWeight: "bold"
	},
	cancelButton: {
		backgroundColor: Color.gray,
		marginRight: 10
	},
	confirmButton: {
		backgroundColor: Color.light_blue
	},
	buttonText: {
		fontSize: 14,
		color: Color.white
	}
});

export default class ConfirmPanel extends Component{
	static propTypes = {
		cancelButtonText: PropTypes.string,
		confirmButtonText: PropTypes.string,
		message: PropTypes.string,
		onCancel: PropTypes.func,
		onConfirm: PropTypes.func,
		title: PropTypes.string,
	};
	static defaultProps = {
		cancelButtonText: I18n.t("cancel"),
		confirmButtonText: I18n.t("confirm"),
		message: I18n.t("content_not_set_yet")
	};
	handleCancel = () => {
		this.panel.hide();
		if(this.props.onCancel){
			this.props.onCancel();
		}
	};
	handleConfirm = () => {
		if(this.props.onConfirm){
			if(this.props.onConfirm()){
				this.panel.hide();
			}
		}
		else{
			this.panel.hide();
		}
	};
	show = () => {
		this.panel.show();
	};
	hide = () => {
		this.panel.hide();
	};
	render(){
		return (
			<Panel ref={(ref) => this.panel = ref}>
				<View style={style.headerContainer}>
					<Text style={style.titleText}>{this.props.title}</Text>
				</View>
				<ScrollView style={style.contentContainer}>{this.props.children}</ScrollView>
				<View style={style.footerContainer}>
					<Button
						style={style.cancelButton}
						onPress={this.handleCancel}
					>
						<Text style={style.buttonText}>{this.props.cancelButtonText}</Text>
					</Button>
					<Button
						style={style.confirmButton}
						onPress={this.handleConfirm}
					>
						<Text style={style.buttonText}>{this.props.confirmButtonText}</Text>
					</Button>
				</View>
			</Panel>
		);
	}
}