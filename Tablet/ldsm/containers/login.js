/* @flow */
"use strict";

import validator from "validator";
import React, { Component, StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux/native";
import TextInput from "../components/basic/text_input";
import Button from "../components/basic/button";

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
			this.props.dispatch(Message.showErrorMessage("請輸入正確的帳號密碼"));
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
			this.props.dispatch(Message.showErrorMessage("所有項目均為必填項目，並且密碼必須輸入一致"));
		}
	}
	render(){
		return (
			<View style={[style.container, this.props.style || {} ]}>
				{
					(this.state.mode == "register")?
					(
						<TextInput onChangeText={(text) => this.setState({title: text})} placeholder={"Please enter your company title."} />
					)
					:
					(null)
				}
				<TextInput onChangeText={(text) => this.setState({username: text})} placeholder={"Please enter your company username."} />
				<TextInput onChangeText={(text) => this.setState({password: text})} placeholder={"Please enter your password."} password={true} />
				{
					(this.state.mode == "register")?
					(
						<TextInput onChangeText={(text) => this.setState({password_again: text})} placeholder={"Please enter your password again."} password={true} />
					)
					:
					(null)
				}
				{
					(this.state.mode == "register")?
					(
						<View style={style.buttonContainer}>
							<Button style={style.button} onPress={() => this.setState({mode: "login"})}>
								<Text>{"Cancel"}</Text>
							</Button>
							<Button style={style.button} onPress={this.onRegisterPressHandler.bind(this)}>
								<Text>{"Submit"}</Text>
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
								<Text>{"Register"}</Text>
							</Button>
							<Button style={style.button} onPress={this.onLoginPressHandler.bind(this)}>
								<Text>{"Login"}</Text>
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
