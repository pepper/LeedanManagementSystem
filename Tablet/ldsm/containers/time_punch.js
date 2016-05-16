/* @flow */
"use strict";

import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import { connect } from "react-redux";
import { get } from "nested-property";

import { Company, Employee } from "../actions";
import { Color, Size, I18n } from "../definitions";
import ContentList, { Container, Title, Item, List, Button, People } from "../components/content_list";
import Keypad from "../components/time_punch/keypad";
import IconTextButton from "../components/basic/icon_text_button";
import CreateEmployeePanel from "../components/panel/create_employee";
import Panel from "../components/panel/basic";

const style = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row"
	},
	peopleList: {
		flex: 0,
		width: 300,
	},
	content: {
		flex: 1,
		flexDirection: "column",
		alignItems: "stretch"
	},
	headArea: {
		height: Size.first_row_height,
		paddingTop: Size.first_row_padding_top,
		paddingLeft: Size.title_padding_left,
	},
	status:{
		fontSize: Size.title_font_size,
		color: Color.gray,
	},
	logoutContainer:{
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingTop: 25,
		paddingRight: 57,
	}
});

class TimePunchContainer extends Component {
	state = {
		logout_counter: 0,
		current_input: "",
		login_state: false,
		employee: null,
		keypad_mode: "login",
	};
	handleKeyPress = (key) => {
		switch(this.state.keypad_mode){
			case "login":
				this.state.current_input + key;
				if((this.state.current_input + key).length == 8){
					this.props.dispatch(Employee.login(this.state.current_input + key));
					this.setState({
						current_input: "",
					});
				}
				else{
					this.setState({
						current_input: this.state.current_input + key,
					});
				}
				break;
			case "leave_manager":
				// break;
			case "employee":
				switch(key){
					case "上班":
						// Action.addTimePunchRecord(Constant.TIME_PUNCH_ON_DUTY);
						break;
					case "下班":
						// Action.addTimePunchRecord(Constant.TIME_PUNCH_OFF_DUTY);
						// Action.changeModule("working_record");
						break;
					case "休息":
						// Action.addTimePunchRecord(Constant.TIME_PUNCH_BREAK);
						// Action.changeModule("working_record");
						break;
					case "訂餐":
						// AlertIOS.alert(
						// 	"功能尚未開通",
						// 	"您不具備所點擊的功能操作權限，或是該功能尚未開通",
						// );
						break;
				}
				break;
		}
	};
	logoutCount = () => {
		if(this.state.logout_counter > 0){
			this.setState({
				logout_counter: this.state.logout_counter - 1,
			});
			if(logoutTimer){
				this.clearTimeout(logoutTimer);
			}
			logoutTimer = this.setTimeout(function(){
				this.logoutCount();
			}.bind(this), 1000);
		}
		else{
			Action.employeeLogout();
		}
	};
	handleCreateEmployee = () => {
		this.createEmployeePanel.show();
	};
	handleCreateEmployeeSubmit = (property) => {
		this.props.dispatch(Employee.create(property));
	};
	handleAddPunchRecord = (type) => {

	};
	rebuildState = (props) => {
		let employee = props.loginEmployee;
		if(employee){
			let managePermissionFound = employee.permission.some(function(permission){
				if(permission == "manage_leave"){
					this.setState({
						logout_counter: 30,
						keypad_mode: "leave_manager",
					});
					return true;
				}
			}.bind(this));
			if(!managePermissionFound){
				this.setState({
					logout_counter: 30,
					keypad_mode: "employee",
				});
			}
			if(logoutTimer){
				this.clearTimeout(logoutTimer);
			}
			logoutTimer = this.setTimeout(function(){
				this.logoutCount();
			}.bind(this), 1000);
		}
		else{
			if(logoutTimer){
				this.clearTimeout(logoutTimer);
			}
			this.setState({
				logout_counter: 0,
				keypad_mode: "login",
			});
		}
	};
	render(){
		return (
			<View style={style.container}>
				<Container style={style.peopleList} header={
					<Title columnList={[{
							flex: 11,
							title: "員工列表"
						}, {
							flex: 9,
							title: "總積分"
						}]}
					/>
				}>
					<Button icon="plus-circle" text={I18n.t("company_create_employee")} onPress={this.handleCreateEmployee}/>
					<List itemList={(get(this.props.employee, "employee_list") || []).map((employee) => {
						return (employee._id == get(this.props.employee, "current_employee_id"))?Object.assign({}, employee, {selected: true}):Object.assign({}, employee)
					})}
						currentItem={get(this.props.employee, "current_employee_id")}
						minimalRowCount={9}
						renderRow={(rowData, sectionID, rowID, highlightRow) => {
							return (
								<People
									name={rowData.name}
									idNumber={rowData.id_number}
									selected={rowData.selected}
									totalScore={0}
								/>
							);
						}}
					/>
				</Container>
				
				<View style={style.content}>
					<View style={style.headArea}>
						<Text style={style.status}>
						{
							(this.state.logout_counter > 0 && this.props.loginEmployee)?
							("目前登入帳號：" + this.props.loginEmployee.name + "      登出倒數" + this.state.logout_counter + "秒")
							:
							("輸入帳號：" + this.state.current_input)
						}
						</Text>
					</View>
					<Keypad mode={this.state.keypad_mode} callback={this.handleKeyPress}></Keypad>
					<View style={style.logoutContainer}>
						<IconTextButton icon={"sign-out"} text={"登出"} size={30} onPress={this.onLogoutPressHandler}/>
					</View>
				</View>
				<CreateEmployeePanel ref={(ref) => this.createEmployeePanel = ref} onConfirm={this.handleCreateEmployeeSubmit} />
			</View>
		);
	}
}

export default connect((state) => {
	return {
		company: state.company,
		employee: state.employee
	};
})(TimePunchContainer);