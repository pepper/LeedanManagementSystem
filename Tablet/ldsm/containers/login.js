/* @flow */
"use strict";

import validator from "validator";
import React, { Component, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux/native";
import TextInput from "../components/basic/text_input";
import Button from "../components/basic/button";
import { I18n } from "../definitions";

import ActionCreators, { Company, Message } from "../actions";

let style = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer:{
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
	},
	button:{
		marginLeft: 10,
	}
});

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			mode: "login",
			title: "",
			username: "",
			password: "",
			password_again: "",
		};
	}
	onLoginPressHandler(){
		if(validator.toString(this.state.username) != "" && validator.toString(this.state.password) != ""){
			this.props.dispatch(Company.login(this.state.username, this.state.password));
		}
		else{
			this.props.dispatch(Message.showErrorMessage(I18n.t("login_username_format_wong")));
		}
	}
	onRegisterPressHandler(){
		if(
			validator.toString(this.state.title) != ""
			&& validator.toString(this.state.username) != ""
			&& validator.toString(this.state.password) != ""
			&& validator.toString(this.state.password_again) != ""
			&& this.state.password_again == this.state.password
		){
			this.props.dispatch(Company.register(this.state.title ,this.state.username, this.state.password));
			this.setState({
				mode: "login",
				title: "",
				username: "",
				password: "",
				password_again: "",
			});
		}
		else{
			this.props.dispatch(Message.showErrorMessage(I18n.t("login_register_format_wong")));
		}
	}
	render(){
		return (
			<View style={[style.container, this.props.style || {} ]}>
				{
					(this.state.mode == "register")?
					(
						<TextInput onChangeText={(text) => this.setState({title: text})} placeholder={I18n.t("login_enter_title")} />
					)
					:
					(null)
				}
				<TextInput onChangeText={(text) => this.setState({username: text})} placeholder={I18n.t("login_enter_username")} />
				<TextInput onChangeText={(text) => this.setState({password: text})} placeholder={I18n.t("login_enter_password")} password={true} />
				{
					(this.state.mode == "register")?
					(
						<TextInput onChangeText={(text) => this.setState({password_again: text})} placeholder={I18n.t("login_enter_password_again")} password={true} />
					)
					:
					(null)
				}
				{
					(this.state.mode == "register")?
					(
						<View style={style.buttonContainer}>
							<Button style={style.button} onPress={() => this.setState({mode: "login"})}>
								<Text>{I18n.t("cancel")}</Text>
							</Button>
							<Button style={style.button} onPress={this.onRegisterPressHandler.bind(this)}>
								<Text>{I18n.t("submit")}</Text>
							</Button>
						</View>
					)
					:
					(null)
				}
				{
					(this.state.mode == "login")?
					(
						<View style={style.buttonContainer}>
							<Button style={style.button} onPress={() => this.setState({mode: "register"})}>
								<Text>{I18n.t("login_register")}</Text>
							</Button>
							<Button style={style.button} onPress={this.onLoginPressHandler.bind(this)}>
								<Text>{I18n.t("login_login")}</Text>
							</Button>
						</View>
					)
					:
					(null)
				}
			</View>
		);
	}
}

export default connect(
  state => ({})
)(Login);
