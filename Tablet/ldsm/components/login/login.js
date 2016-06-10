/* @flow */
"use strict";

import validator from "validator";
import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Text} from "react-native";
import TextInput from "../basic/text_input";
import Button from "../basic/button";
import { I18n } from "../../definitions";

import { Company, Message } from "../../actions";

import { FIRAuth, FIRDatabase } from "react-native-google-firebase";

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

export default class Login extends Component{
	static propTypes = {
		dispatch: PropTypes.func,
		onChangeMode: PropTypes.func,
		style: View.propTypes.style
	};
	state = {
		username: "",
		password: ""
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
	handleLogin = async () => {
		if(validator.toString(this.state.username) != "" && validator.toString(this.state.password) != ""){
			this.props.dispatch(Company.login({
				username: this.state.username,
				password: this.state.password
			}));
		}
		else{
			this.props.dispatch(Message.showErrorMessage(I18n.t("login_username_format_wong")));
		}
	};
	render(){
		return (
			<View style={[style.container, this.props.style || {} ]}>
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
				<View style={style.buttonContainer}>
					<Button
						style={style.button}
						onPress={this.props.onChangeMode}
					>
						<Text>{I18n.t("login_register")}</Text>
					</Button>
					<Button
						style={style.button}
						onPress={this.handleLogin}
					>
						<Text>{I18n.t("login_login")}</Text>
					</Button>
				</View>
			</View>
		);
	}
}
