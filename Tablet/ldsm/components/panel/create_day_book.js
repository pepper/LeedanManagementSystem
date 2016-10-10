/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS, ActionSheetIOS} from "react-native";



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
		marginBottom: 10
	},
	segmentedControl:{
		height: 40,
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

export default class CreateDayBookPanel extends Component{
	state = {
		title: ""
	};
	show = () => {
		this.state = {
			title: ""
		};
		this.confirm.show();
	};
	hide = () => {
		this.state = {
			title: ""
		};
		this.confirm.hide();
	};
	getOptionList = () => {
		return this.optionListRef;
	};
	handleConfirm = () => {
		this.props.onConfirm({
			title: this.state.title,
			account_way: ["expenditure", "income"][this.state.accountWaySelectedIndex],
			group: this.state.group
		});
		return true;
	};
	handleSelectGroup = (value) => {
		let options = (this.props.groupList || []).concat([I18n.t("company_create_daybook_panel_new_group")]);
		ActionSheetIOS.showActionSheetWithOptions({
			options: options,
		},
		(buttonIndex) => {
			if(options[buttonIndex] == I18n.t("company_create_daybook_panel_new_group")){
				this.setState({
					show_new_group: true,
					group: ""
				});
			}
			else{
				this.setState({
					show_new_group: false,
					group: options[buttonIndex]
				});
			}
		});
	};
	handleChangeAccountWay = (event) => {
		this.setState({
			accountWaySelectedIndex: event.nativeEvent.selectedSegmentIndex
		});
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				 xtitle={I18n.t("company_create_daybook")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<TextInput style={style.fullWidthTextInput}
						autoCapitalize={"none"}
						autoCorrect={false}
						placeholder={I18n.t("company_create_daybook_panel_input_title")}
						onChangeText={(text) => this.setState({title: text})}
					/>
					<SegmentedControlIOS values={["支出", "收入"]}
						style={style.segmentedControl}
						selectedIndex={this.state.accountWaySelectedIndex}
						onChange={this.handleChangeAccountWay}
						tintColor={Color.dark}
					/>
					<View style={style.selectorContainer}>
						<Button onPress={this.handleSelectGroup}>
							<Text>{(this.state.group && this.state.group !== "")?this.state.group:I18n.t("company_create_daybook_panel_select_group")}</Text>
						</Button>
						
						{
							(this.state.show_new_group)?
							(
								<TextInput style={style.fullWidthTextInput}
									autoCapitalize={"none"}
									autoCorrect={false}
									placeholder={I18n.t("company_create_daybook_panel_input_new_group")}
									onChangeText={(text) => this.setState({group: text}) }
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