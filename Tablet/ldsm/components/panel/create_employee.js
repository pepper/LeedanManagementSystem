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
	informationContainer:{
		flexDirection: "row",
	},
	textInputContainer:{
		flexDirection: "column",
		flex: 1,
		marginRight:10,
	},
	fullWidthTextInput:{
		flex: 1,
		height: 40,
		borderWidth: 0.5,
		borderColor: Color.dark,
		padding: 5,
		paddingLeft: 15,
		marginBottom: 10,
	},
	segmentedContainer:{
		flex: 1,
		flexDirection: "column",
	},
	fullWidthSegmented:{
		flex: 1,
		height: 40,
		marginBottom: 10,
	},
	inputRowTitle:{
		flex: 1,
	},
	inputRowContent:{
		flex: 2,
	},
	avatarContainer:{
		flexDirection: "row",
	},
	cameraContainer:{
		width: 160,
		height: 160,
		marginRight: 20,
	},
	cameraView:{
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		borderWidth: 0.5,
		borderColor: Color.dark,
		borderRadius: 80,
		backgroundColor: Color.transparent,
		overflow: "hidden",
	},
	avatarImage:{
		flex: 1,
		borderWidth: 0.5,
		borderColor: Color.dark,
		borderRadius: 80,
	},
	takePhotoButton:{
		width: 20,
		height: 20,
		marginBottom: 10,
	}
});

export default class CreateEmployeePanel extends Component{
	state = {
		name: "",
		idNumber: "",
		passcode: "",
		confirmPasscode: "",
		permission:[{
			value: "manage_employee",
			select: false,
		},{
			value: "manage_leave",
			select: false,
		},{
			value: "manage_working_record",
			select: false,
		},{
			value: "manage_accounting",
			select: false,
		}],
		avatar: "",
		
		cameraType: Camera.constants.Type.back,
	};
	show = () => {
		this.confirm.show();
	};
	hide = () => {
		this.confirm.hide();
	};
	handleConfirm = () => {
		this.props.onConfirm({
			name: this.state.name,
			id_number: this.state.idNumber,
			passcode: this.state.passcode,
			permission: this.state.permission.filter((permission) => {
				return permission.select;
			}).map((permission) => {
				return permission.value;
			}),
			avatar: this.state.avatar
		});
	};
	render(){
		return (
			<ConfirmPanel ref={(ref) => this.confirm = ref}
				title={I18n.t("company_create_employee")}
				onConfirm={this.handleConfirm}
			>
				<View style={style.container}>
					<View style={style.informationContainer}>
						<View style={style.textInputContainer}>
							<TextInput style={style.fullWidthTextInput}
								autoCapitalize={"none"}
								autoCorrect={false}
								placeholder={I18n.t("company_create_employee_panel_input_name")}
								onChangeText={(text) => this.setState({name: text}) }
							/>
							<TextInput style={style.fullWidthTextInput}
								autoCapitalize={"none"}
								autoCorrect={false}
								placeholder={I18n.t("company_create_employee_panel_input_id_number")}
								onChangeText={(text) => this.setState({idNumber: text})}
							/>
							<TextInput style={style.fullWidthTextInput}
								autoCapitalize={"none"}
								autoCorrect={false}
								placeholder={I18n.t("company_create_employee_panel_input_passcode")}
								password={true}
								keyboardType={"numeric"}
								onChangeText={(text) => this.setState({passcode: text})}
							/>
							<TextInput style={style.fullWidthTextInput}
								autoCapitalize={"none"}
								autoCorrect={false}
								placeholder={I18n.t("company_create_employee_panel_reinput_passcode")}
								password={true} keyboardType={"numeric"}
								onChangeText={(text) => ((this.state.passcode == text)?this.setState({confirmPasscode: text}):false)}
							/>
						</View>
						<View style={style.segmentedContainer}>
							{
								this.state.permission.map(function(permission, index){
									return (
										<SegmentedControlIOS
											key={permission.value}
											style={style.fullWidthSegmented}
											onValueChange={function(value){
												if(value == I18n.t("company_create_employee_panel_no_permission")){
													this.state.permission[index].select = false;
												}
												else{
													this.state.permission[index].select = true;
												}
												this.setState({
													permission: this.state.permission,
												});
											}.bind(this)}
											tintColor={Color.orange}
											values={[I18n.t("company_create_employee_panel_pemission_" + permission.value), I18n.t("company_create_employee_panel_no_permission")]}
											selectedIndex={1}
										/>
									);
								}.bind(this))
							}
						</View>
					</View>
					<View style={style.avatarContainer}>
						<View style={style.cameraContainer}>
							<TouchableWithoutFeedback onPress={this.takePhotoHandler}>
								<Camera
									ref="cam"
									style={style.cameraView}
									type={this.state.cameraType}
									orientation={Camera.constants.Orientation.landscapeRight}
								>
									<Icon name={"camera"} size={20} color={Color.white} style={style.takePhotoButton} />
								</Camera>
							</TouchableWithoutFeedback>
						</View>
						<View style={style.cameraContainer}>
							<Image style={style.avatarImage} source={{uri: this.state.avatar }} />
						</View>
					</View>
				</View>
			</ConfirmPanel>
		);
	}
}