/* @flow */
"use strict";

import validator from "validator";
import React, { Component, PropTypes, StyleSheet, View, Text } from "react-native";
import TextInput from "../basic/text_input";
import Button from "../basic/button";
import { I18n } from "../../definitions";

import { Company, Message } from "../../actions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	buttonContainer:{
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end"
	},
	button:{
		marginLeft: 10
	}
});

export default class Register extends Component{
	static propTypes = {
		dispatch: PropTypes.func,
		onChangeMode: PropTypes.func,
		style: View.propTypes.style
	};
	state = {
		title: "",
		username: "",
		password: "",
		password_again: ""
	};
	handleTitleChange = (text) => {
		this.setState({
			title: text
		});
	};
	handleUsernameChange = (text) => {
		this.setState({
			username: text
		});
	};
	handlePasswordChange = (text) => {
		this.setState({
			password: text
		});
	};
	handlePasswordAgainChange = (text) => {
		this.setState({
			password_again: text
		});
	};
	handleRegister = () => {
		if(
			validator.toString(this.state.title) != ""
			&& validator.toString(this.state.username) != ""
			&& validator.toString(this.state.password) != ""
			&& validator.toString(this.state.password_again) != ""
			&& this.state.password_again == this.state.password
		){
			this.props.dispatch(Company.register(this.state.title ,this.state.username, this.state.password));
			this.props.onChangeMode();
		}
		else{
			this.props.dispatch(Message.showErrorMessage(I18n.t("login_register_format_wong")));
		}
	};
	render(){
		return (
			<View style={[style.container, this.props.style || {} ]}>
				<TextInput
					autoCapitalize={"none"}
					autoCorrect={false}
					onChangeText={this.handleTitleChange}
					placeholder={I18n.t("login_enter_title")}
				/>
				<TextInput
					autoCapitalize={"none"}
					autoCorrect={false}
					onChangeText={this.handleUsernameChange}
					placeholder={I18n.t("login_enter_username")}
				/>
				<TextInput
					autoCapitalize={"none"}
					autoCorrect={false}
					onChangeText={this.handlePasswordChange}
					placeholder={I18n.t("login_enter_password")}
					password={true}
				/>
				<TextInput
					autoCapitalize={"none"}
					autoCorrect={false}
					onChangeText={this.handlePasswordAgainChange}
					placeholder={I18n.t("login_enter_password_again")}
					password={true}
				/>
				<View style={style.buttonContainer}>
					<Button
						style={style.button}
						onPress={this.props.onChangeMode}
					>
						<Text>{I18n.t("cancel")}</Text>
					</Button>
					<Button
						style={style.button}
						onPress={this.handleRegister}
					>
						<Text>{I18n.t("submit")}</Text>
					</Button>
				</View>
			</View>
		);
	}
}
