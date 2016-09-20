/* @flow */
"use strict";

import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text, SegmentedControlIOS} from "react-native";
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
		if(value == I18n.t("company_create_daybook_panel_new_group")){
			this.setState({
				show_new_group: true,
				group: ""
			});
		}
		else{
			this.setState({
				show_new_group: false,
				group: value
			});
		}
	};
	handleChangeAccountWay = (event) => {
		this.setState({
			accountWaySelectedIndex: event.nativeEvent.selectedSegmentIndex
		});
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
						onChangeText={(text) => this.setState({title: text})}
					/>
					<SegmentedControlIOS values={["支出", "收入"]}
						style={style.segmentedControl}
						selectedIndex={this.state.accountWaySelectedIndex}
						onChange={this.handleChangeAccountWay}
						tintColor={Color.dark}
					/>
					<View style={style.selectorContainer}>
						<Select width={300}
							style={style.select}
							ref={(ref) => this.selectRef = ref}
							optionListRef={this.getOptionList}
							defaultValue={I18n.t("company_create_daybook_panel_select_group")}
							onSelect={this.handleSelectGroup}>
							{
								(this.props.groupList || []).map((group) => {
									return (
										<Option key={"CompanyCreateDaybookPanelGroup" + group}>{group}</Option>
									);
								})
							}
							<Option>{I18n.t("company_create_daybook_panel_new_group")}</Option>
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